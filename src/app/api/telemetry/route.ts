import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ruta, programa_slug, duracion_segundos, referrer, dispositivo } = body;

    if (!ruta) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Insertar evento de telemetría de forma no bloqueante
    const { error } = await supabase.from('metricas_visitas').insert([
      {
        ruta: String(ruta).slice(0, 200),
        programa_slug: programa_slug ? String(programa_slug).slice(0, 100) : null,
        duracion_segundos: Math.max(1, Math.min(Number(duracion_segundos) || 1, 3600)),
        referrer: referrer ? String(referrer).slice(0, 300) : 'Directo',
        dispositivo: dispositivo || 'desktop',
      },
    ]);

    if (error) {
      // Si la tabla aún no existe en Supabase, simplemente no romper el flujo del cliente
      console.warn('[Telemetry insert]:', error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
