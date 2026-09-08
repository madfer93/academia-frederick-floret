import { NextResponse } from 'next/server';
import { getQ10ApiKey } from '@/lib/q10';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim();

    if (!q) {
      return NextResponse.json({ error: 'Parámetro de búsqueda requerido' }, { status: 400 });
    }

    const apiKey = await getQ10ApiKey();
    const q10BaseUrl = process.env.Q10_BASE_URL || 'https://api.q10.com/v1';

    // 1. Intentar consultar directamente por documento en Q10 /v1/estudiantes/{id}
    const cleanDoc = q.replace(/[^\d]/g, '');
    let estudianteData: any = null;

    if (cleanDoc.length >= 6) {
      try {
        const estRes = await fetch(`${q10BaseUrl}/estudiantes/${cleanDoc}`, {
          headers: { 'Api-Key': apiKey },
          next: { revalidate: 60 }
        });
        if (estRes.ok) {
          const d = await estRes.json();
          if (d && (d.Numero_identificacion || d.Primer_nombre)) {
            estudianteData = {
              Consecutivo_inscripcion: Number(d.Codigo_estudiante) || 9999,
              Codigo_estudiante: d.Codigo_estudiante,
              Nombre_completo: `${d.Primer_nombre} ${d.Segundo_nombre || ''} ${d.Primer_apellido} ${d.Segundo_apellido || ''}`.replace(/\s+/g, ' ').trim(),
              Codigo_tipo_identificacion: d.Codigo_tipo_identificacion || '1',
              Codigo_programa: 'SIN_PROGRAMA',
              Nombre_programa: 'Registrado en Q10',
              Consecutivo_sede_jornada: 0,
              Nombre_sede_jornada: 'Pendiente',
              Periodo_nombre: 'Pendiente',
              Fecha_inscripcion: new Date().toISOString(),
              email: d.Email || '',
              telefono: d.Celular || d.Telefono || '',
              direccion: d.Direccion || '',
              origen_q10: 'estudiante_directo'
            };
          }
        }
      } catch (e) {
        console.error('Error buscando estudiante por documento en Q10:', e);
      }
    }

    return NextResponse.json({
      success: true,
      found: Boolean(estudianteData),
      estudiante: estudianteData
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
