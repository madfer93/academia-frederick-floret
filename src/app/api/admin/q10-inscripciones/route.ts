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

    // 1. Obtener Periodos, Descuentos y Usuarios en paralelo
    const [periodosRes, descRes, usuariosRes] = await Promise.all([
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
      }).catch(() => null)
    ]);

    const periodos = periodosRes && periodosRes.ok ? await periodosRes.json() : [];
    const descuentos = descRes && descRes.ok ? await descRes.json() : [];
    const usuarios = usuariosRes && usuariosRes.ok ? await usuariosRes.json() : [];

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
          origen_q10: 'inscripcion_oficial'
        });
      }
    });

    // 4. Agregar usuarios/personas de Q10 que NO tienen matrícula académica aún
    if (Array.isArray(usuarios)) {
      usuarios.forEach((u: any) => {
        const key = u.Numero_identificacion || u.Nombre_usuario;
        if (key && !studentsMap.has(key)) {
          const isDocente = u.Roles && u.Roles.some((r: any) => r.Nombre === 'Docente');
          const isSuperAdmin = u.Roles && u.Roles.some((r: any) => r.Nombre === 'Superadministrador');

          studentsMap.set(key, {
            Consecutivo_inscripcion: Number(u.Codigo_persona) || Math.floor(1000 + Math.random() * 9000),
            Codigo_estudiante: u.Codigo_persona,
            Nombre_completo: u.Nombre_completo,
            Codigo_tipo_identificacion: u.Codigo_tipo_identificacion || '1',
            Numero_identificacion: u.Numero_identificacion || u.Nombre_usuario,
            Codigo_programa: 'SIN_PROGRAMA',
            Nombre_programa: isDocente ? 'Docente / Funcionario' : isSuperAdmin ? 'Administrador' : 'Sin Programa Asignado en Q10',
            Consecutivo_sede_jornada: 0,
            Nombre_sede_jornada: 'Pendiente',
            Periodo_nombre: 'Pendiente',
            Fecha_inscripcion: new Date().toISOString(),
            categoria: isDocente ? 'docente' : isSuperAdmin ? 'admin' : 'sin_matricula',
            estado_matricula: isDocente ? 'Docente' : isSuperAdmin ? 'Administrador' : 'Registrado (Sin Matrícula)',
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
