import { NextResponse } from 'next/server';
import { getQ10ApiKey } from '@/lib/q10';

export async function GET(req: Request) {
  try {
    const apiKey = await getQ10ApiKey();
    const q10BaseUrl = process.env.Q10_BASE_URL || 'https://api.q10.com/v1';

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key de Q10 no configurada' }, { status: 400 });
    }

    // 1. Obtener Periodos
    const periodosRes = await fetch(`${q10BaseUrl}/periodos`, {
      headers: { 'Api-Key': apiKey },
      next: { revalidate: 60 } // cache 1 minuto
    });

    if (!periodosRes.ok) {
      return NextResponse.json({ error: 'Error consultando periodos en Q10' }, { status: 502 });
    }

    const periodos = await periodosRes.json();
    const allInscripciones: any[] = [];

    // 2. Obtener inscripciones de cada periodo
    for (const p of periodos) {
      try {
        const res = await fetch(`${q10BaseUrl}/inscripciones?consecutivo_periodo=${p.Consecutivo}&limit=100`, {
          headers: { 'Api-Key': apiKey },
          next: { revalidate: 60 }
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            data.forEach((item: any) => {
              allInscripciones.push({
                ...item,
                Periodo_nombre: p.Nombre,
                Periodo_activo: p.Estado
              });
            });
          }
        }
      } catch (e) {
        console.error(`Error consultando periodo ${p.Consecutivo}:`, e);
      }
    }

    // 3. Obtener Descuentos
    let descuentos: any[] = [];
    try {
      const descRes = await fetch(`${q10BaseUrl}/descuentos`, {
        headers: { 'Api-Key': apiKey },
        next: { revalidate: 60 }
      });
      if (descRes.ok) {
        descuentos = await descRes.json();
      }
    } catch (e) {
      console.error('Error consultando descuentos Q10:', e);
    }

    return NextResponse.json({
      success: true,
      total_inscripciones: allInscripciones.length,
      periodos,
      inscripciones: allInscripciones,
      descuentos
    });
  } catch (err: any) {
    console.error('[Q10 Admin API Error]:', err);
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}
