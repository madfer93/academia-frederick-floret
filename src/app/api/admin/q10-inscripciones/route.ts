import { NextResponse } from 'next/server';
import { getQ10ApiKey } from '@/lib/q10';

let memoryCache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 2 * 60 * 1000; // 2 minutos

export async function GET() {
  try {
    if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL) {
      return NextResponse.json(memoryCache.data);
    }

    const apiKey = await getQ10ApiKey();
    const q10BaseUrl = process.env.Q10_BASE_URL || 'https://api.q10.com/v1';

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key de Q10 no configurada' }, { status: 400 });
    }

    // 1. Obtener Periodos, Descuentos, Docentes y Usuarios en paralelo
    const [periodosRes, descRes, usuariosRes, docentesRes] = await Promise.all([
      fetch(`${q10BaseUrl}/periodos`, {
        headers: { 'Api-Key': apiKey },
        next: { revalidate: 120 }
      }).catch(() => null),
      fetch(`${q10BaseUrl}/descuentos`, {
        headers: { 'Api-Key': apiKey },
        next: { revalidate: 120 }
      }).catch(() => null),
      fetch(`${q10BaseUrl}/usuarios?limit=100`, {
        headers: { 'Api-Key': apiKey },
        next: { revalidate: 120 }
      }).catch(() => null),
      fetch(`${q10BaseUrl}/docentes`, {
        headers: { 'Api-Key': apiKey },
        next: { revalidate: 120 }
      }).catch(() => null)
    ]);

    const periodos = periodosRes && periodosRes.ok ? await periodosRes.json() : [];
    const descuentos = descRes && descRes.ok ? await descRes.json() : [];
    const usuarios = usuariosRes && usuariosRes.ok ? await usuariosRes.json() : [];
    const docentes = docentesRes && docentesRes.ok ? await docentesRes.json() : [];

    // Mapear docentes por documento o código
    const docentesMap = new Set<string>();
    if (Array.isArray(docentes)) {
      docentes.forEach((d: any) => {
        if (d.Numero_identificacion) docentesMap.add(d.Numero_identificacion);
        if (d.Codigo_docente) docentesMap.add(d.Codigo_docente);
        if (d.Codigo_persona) docentesMap.add(d.Codigo_persona);
      });
    }

    // 2. Obtener inscripciones de todos los periodos en paralelo
    const inscripcionesPromises = periodos.map(async (p: any) => {
      try {
        const res = await fetch(`${q10BaseUrl}/inscripciones?consecutivo_periodo=${p.Consecutivo}&limit=100`, {
          headers: { 'Api-Key': apiKey },
          next: { revalidate: 120 }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            return data.map((item: any) => ({
              ...item,
              Periodo_nombre: p.Nombre,
              Periodo_activo: p.Estado
            }));
          }
        }
      } catch (e) {
        console.error(`Error consultando periodo ${p.Consecutivo}:`, e);
      }
      return [];
    });

    const results = await Promise.all(inscripcionesPromises);
    const allInscripcionesRaw = results.flat();

    // 3. Procesar inscripciones oficiales de Q10
    const studentsMap = new Map<string, any>();

    allInscripcionesRaw.forEach((item: any) => {
      const key = item.Numero_identificacion || item.Codigo_estudiante;
      if (key) {
        studentsMap.set(key, {
          ...item,
          categoria: 'matriculado_oficial',
          estado_matricula: 'Matriculado Oficial',
          cargo_funcion: 'Estudiante Matriculado',
          area_dependencia: item.Nombre_programa || 'Programa Técnico',
          origen_q10: 'inscripcion_oficial'
        });
      }
    });

    // 4. Agregar todos los docentes directos de la API de Q10
    if (Array.isArray(docentes)) {
      docentes.forEach((d: any) => {
        const key = d.Numero_identificacion || d.Codigo;
        if (key) {
          const nombreCompleto = [d.Primer_nombre, d.Segundo_nombre, d.Primer_apellido, d.Segundo_apellido]
            .filter(Boolean)
            .join(' ')
            .trim();

          studentsMap.set(key, {
            Consecutivo_inscripcion: Number(d.Numero_identificacion) || Math.floor(1000 + Math.random() * 9000),
            Codigo_estudiante: d.Codigo,
            Nombre_completo: nombreCompleto,
            Codigo_tipo_identificacion: d.Codigo_tipo_identificacion || '1',
            Numero_identificacion: d.Numero_identificacion,
            Codigo_programa: 'DOCENTE',
            Nombre_programa: 'Planta Docente Institucional',
            Consecutivo_sede_jornada: 0,
            Nombre_sede_jornada: 'Sede Principal Montería',
            Periodo_nombre: 'Docente Activo',
            Fecha_inscripcion: new Date().toISOString(),
            categoria: 'empleado_docente',
            estado_matricula: 'Docente / Instructor(a)',
            cargo_funcion: 'Docente / Instructor(a) Académico(a)',
            area_dependencia: 'Planta Docente & Formación',
            email: d.Email || undefined,
            telefono: d.Celular || d.Telefono || undefined,
            direccion: d.Direccion || undefined,
            origen_q10: 'docente_q10'
          });
        }
      });
    }

    // 5. Agregar usuarios/personas de Q10 clasificando empleados administrativos y aspirantes
    if (Array.isArray(usuarios)) {
      usuarios.forEach((u: any) => {
        const key = u.Numero_identificacion || u.Nombre_usuario;
        if (key && !studentsMap.has(key)) {
          const roles = u.Roles || [];
          const isDocente = docentesMap.has(u.Numero_identificacion) || roles.some((r: any) => r.Nombre === 'Docente');
          const isSuperAdmin = roles.some((r: any) => r.Nombre === 'Superadministrador');
          const isCajero = roles.some((r: any) => r.Nombre === 'Cajero' || r.Nombre?.toLowerCase().includes('cajer'));
          const isSecretaria = roles.some((r: any) => r.Nombre === 'Secretaria' || r.Nombre?.toLowerCase().includes('secretar'));
          const isCoordinador = roles.some((r: any) => r.Nombre === 'Coordinador' || r.Nombre?.toLowerCase().includes('coordinad'));
          const isStaff = roles.some((r: any) => ['Administrador', 'Cajero', 'Secretaria', 'Coordinador', 'Tesorería'].includes(r.Nombre));
          
          let categoria = 'sin_matricula';
          let cargoFuncion = 'Aspirante / Contacto Registrado';
          let areaDependencia = 'Admisiones & Registro';
          let nombrePrograma = 'Sin Matrícula Activa';

          if (isDocente) {
            categoria = 'empleado_docente';
            cargoFuncion = 'Docente / Instructor(a) Académico(a)';
            areaDependencia = 'Planta Docente & Formación';
            nombrePrograma = 'Planta Docente Institucional';
          } else if (isSuperAdmin) {
            categoria = 'empleado_docente';
            cargoFuncion = 'Superadministrador del Sistema Q10';
            areaDependencia = 'Dirección de Tecnología & Sistemas';
            nombrePrograma = 'Administración General';
          } else if (isCajero) {
            categoria = 'empleado_docente';
            cargoFuncion = 'Cajero(a) / Tesorería Institucional';
            areaDependencia = 'Tesorería & Facturación';
            nombrePrograma = 'Gestión Financiera';
          } else if (isSecretaria) {
            categoria = 'empleado_docente';
            cargoFuncion = 'Secretaría Académica';
            areaDependencia = 'Registro & Control Académico';
            nombrePrograma = 'Secretaría';
          } else if (isCoordinador) {
            categoria = 'empleado_docente';
            cargoFuncion = 'Coordinación Académica';
            areaDependencia = 'Dirección Académica';
            nombrePrograma = 'Coordinación';
          } else if (isStaff) {
            categoria = 'empleado_docente';
            cargoFuncion = 'Funcionario Administrativo';
            areaDependencia = 'Administración Institucional';
            nombrePrograma = 'Personal de Apoyo';
          }

          studentsMap.set(key, {
            Consecutivo_inscripcion: Number(u.Codigo_persona) || Math.floor(1000 + Math.random() * 9000),
            Codigo_estudiante: u.Codigo_persona,
            Nombre_completo: u.Nombre_completo,
            Codigo_tipo_identificacion: u.Codigo_tipo_identificacion || '1',
            Numero_identificacion: u.Numero_identificacion || u.Nombre_usuario,
            Codigo_programa: categoria === 'empleado_docente' ? 'EMPLEADO' : 'SIN_PROGRAMA',
            Nombre_programa: nombrePrograma,
            Consecutivo_sede_jornada: 0,
            Nombre_sede_jornada: categoria === 'empleado_docente' ? 'Sede Principal Montería' : 'Pendiente Asignación',
            Periodo_nombre: categoria === 'empleado_docente' ? 'Personal Activo' : 'Pendiente',
            Fecha_inscripcion: new Date().toISOString(),
            categoria,
            estado_matricula: cargoFuncion,
            cargo_funcion: cargoFuncion,
            area_dependencia: areaDependencia,
            email: u.Nombre_usuario?.includes('@') ? u.Nombre_usuario : undefined,
            origen_q10: 'usuario_q10'
          });
        }
      });
    }

    const finalInscripciones = Array.from(studentsMap.values());

    const responsePayload = {
      success: true,
      total_inscripciones: finalInscripciones.length,
      periodos,
      inscripciones: finalInscripciones,
      descuentos
    };

    memoryCache = {
      data: responsePayload,
      timestamp: Date.now()
    };

    return NextResponse.json(responsePayload);
  } catch (err: any) {
    console.error('[Q10 Admin API Error]:', err);
    if (memoryCache) {
      return NextResponse.json(memoryCache.data);
    }
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}
