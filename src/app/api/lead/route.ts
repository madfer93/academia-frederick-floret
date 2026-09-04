import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { syncLeadToQ10 } from '@/lib/q10';
import { sendTelegramAlert, formatLeadAlert } from '@/lib/telegram';

// In-memory rate limiter (máximo 10 registros por 5 minutos por IP)
const leadRateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isLeadRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const maxRequests = 10;

  const record = leadRateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    leadRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (isLeadRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Has enviado múltiples solicitudes en poco tiempo. Por favor espera unos minutos.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    const nombres = (body.nombres || 'Aspirante').trim().slice(0, 100);
    const apellidos = (body.apellidos || '').trim().slice(0, 100);
    const rawPhone = (body.telefono || '').toString().trim();
    // Limpiar caracteres no numéricos excepto el signo +
    const telefono = rawPhone.replace(/[^\d+]/g, '').slice(0, 20);
    const email = body.email ? body.email.trim().slice(0, 150) : null;
    const programa_interes = (body.programa_interes || 'Auxiliar en Enfermería').slice(0, 120);
    const jornada_interes = (body.jornada_interes || 'Diurna (Mañana)').slice(0, 50);
    const mensaje = (body.mensaje || 'Prospecto registrado a través del Asistente Virtual IA 24/7').slice(0, 500);
    const origen = (body.origen || 'Chat IA 24/7').slice(0, 100);

    if (!telefono || telefono.length < 7) {
      return NextResponse.json(
        { error: 'El número de teléfono/WhatsApp proporcionado no es válido.' },
        { status: 400 }
      );
    }

    // 1. Guardar en Supabase (CRM Admin)
    const { data: dbData, error: dbError } = await supabase
      .from('inscripciones')
      .insert([
        {
          nombres,
          apellidos,
          tipo_documento: body.tipo_documento || 'CC',
          documento: body.documento || 'PENDIENTE',
          telefono,
          email,
          programa_interes,
          jornada_interes,
          mensaje: `[Origen: ${origen}] - ${mensaje}`,
          estado: 'pendiente',
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('[DB Insert Error]:', dbError);
    }

    // 2. Sincronizar automáticamente con Q10 Académico
    const q10Result = await syncLeadToQ10({
      nombres,
      apellidos,
      telefono,
      email: email || undefined,
      programa_interes,
      jornada_interes,
      origen,
    });

    // 3. Notificación Inmediata al Grupo de Telegram Directivo
    sendTelegramAlert(formatLeadAlert({
      nombres,
      apellidos,
      tipo_documento: body.tipo_documento,
      documento: body.documento,
      telefono,
      email,
      programa_interes,
      jornada_interes,
      nivel_educativo: body.nivel_educativo,
      mensaje,
      origen,
      acudiente_nombre: body.acudiente_nombre,
      acudiente_documento: body.acudiente_documento,
      acudiente_telefono: body.acudiente_telefono,
      acudiente_parentesco: body.acudiente_parentesco,
    })).catch((err) => console.error('[Telegram Lead Notification Error]:', err));

    return NextResponse.json({
      success: true,
      lead_id: dbData?.id || null,
      q10_sync: q10Result,
      message: 'Prospecto registrado exitosamente en el CRM administrativo, enviado a Telegram y preparado para Q10.'
    });
  } catch (err: any) {
    console.error('[Lead API Exception]:', err);
    return NextResponse.json(
      { error: err.message || 'Error procesando el registro del prospecto.' },
      { status: 500 }
    );
  }
}
