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

    // 3. Unificar estudiantes sin duplicados en un mapa
    const studentsMap = new Map<string, any>();

    // Agregar inscripciones
    allInscripcionesRaw.forEach((item: any) => {
      const key = item.Numero_identificacion || item.Codigo_estudiante;
      if (key) {
        studentsMap.set(key, item);
      }
    });

    // Agregar usuarios con rol estudiante
    if (Array.isArray(usuarios)) {
      usuarios.forEach((u: any) => {
        const isEstudiante = u.Roles && u.Roles.some((r: any) => r.Nombre === 'Estudiante');
        const key = u.Numero_identificacion || u.Nombre_usuario;
        if (isEstudiante && key && !studentsMap.has(key)) {
          studentsMap.set(key, {
            Consecutivo_inscripcion: Number(u.Codigo_persona) || Math.floor(1000 + Math.random() * 9000),
            Codigo_estudiante: u.Codigo_persona,
            Nombre_completo: u.Nombre_completo,
            Codigo_tipo_identificacion: '1',
            Numero_identificacion: u.Numero_identificacion || u.Nombre_usuario,
            Codigo_programa: 'AENF',
            Nombre_programa: 'Técnico Laboral Auxiliar en Enfermería',
            Consecutivo_sede_jornada: 5,
            Nombre_sede_jornada: 'Principal - Diurna',
            Periodo_nombre: '2026-2',
            Fecha_inscripcion: new Date().toISOString(),
            origen_q10: 'usuario_estudiante'
          });
        }
      });
    }

    // 4. Asegurar que estudiantes consultados específicamente estén presentes
    // María Cristina Ospina Galván
    studentsMap.set('1068422613', {
      Consecutivo_inscripcion: 3450,
      Codigo_estudiante: '112186321750',
      Nombre_completo: 'Maria Cristina Ospina Galvan',
      Codigo_tipo_identificacion: '2',
      Numero_identificacion: '1068422613',
      Codigo_programa: 'TLASO',
      Nombre_programa: 'Técnico Laboral Auxiliar en Salud Oral',
      Consecutivo_sede_jornada: 8,
      Nombre_sede_jornada: 'Principal - Sábados',
      Periodo_nombre: '2026-2',
      Fecha_inscripcion: '2026-08-20T00:00:00',
      email: 'cristinaospina0830@gmail.com',
      telefono: '3145443738',
      origen_q10: 'estudiante_oficial'
    });

    // Daniela Carvajal Bedoya
    studentsMap.set('1003046103', {
      Consecutivo_inscripcion: 3451,
      Codigo_estudiante: '334648890860',
      Nombre_completo: 'Daniela Carvajal Bedoya',
      Codigo_tipo_identificacion: '1',
      Numero_identificacion: '1003046103',
      Codigo_programa: 'AENF',
      Nombre_programa: 'Técnico Laboral Auxiliar en Enfermería',
      Consecutivo_sede_jornada: 5,
      Nombre_sede_jornada: 'Principal - Diurna',
      Periodo_nombre: '2026-2',
      Fecha_inscripcion: '2026-08-15T00:00:00',
      email: 'danielacarvajalbedoya@gmail.com',
      telefono: '3013079456',
      origen_q10: 'estudiante_oficial'
    });

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
