import { supabase } from '@/lib/supabase';

/**
 * Utilidad oficial para alertas inmediatas a Telegram
 * Academia Frederick Floret
 */

let cachedTelegramConfig: { token: string; chatId: string; timestamp: number } | null = null;

async function getTelegramCredentials(): Promise<{ token: string; chatId: string } | null> {
  let token = process.env.TELEGRAM_BOT_TOKEN;
  let chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    return { token, chatId };
  }

  if (cachedTelegramConfig && Date.now() - cachedTelegramConfig.timestamp < 5 * 60 * 1000) {
    return { token: cachedTelegramConfig.token, chatId: cachedTelegramConfig.chatId };
  }

  try {
    const { data } = await supabase
      .from('sitio_configuracion')
      .select('clave, valor')
      .in('clave', ['telegram_bot_token', 'telegram_chat_id']);

    if (data && data.length > 0) {
      data.forEach((item) => {
        if (item.clave === 'telegram_bot_token' && item.valor) token = item.valor.trim();
        if (item.clave === 'telegram_chat_id' && item.valor) chatId = item.valor.trim();
      });
    }

    if (token && chatId) {
      cachedTelegramConfig = { token, chatId, timestamp: Date.now() };
      return { token, chatId };
    }
  } catch (e) {
    console.warn('[Telegram Config Lookup Warning]:', e);
  }

  return token && chatId ? { token, chatId } : null;
}

export async function sendTelegramAlert(message: string): Promise<boolean> {
  const creds = await getTelegramCredentials();

  if (!creds || !creds.token || !creds.chatId) {
    console.warn('[Telegram Alert] No se configuró token o chat_id de Telegram en .env o sitio_configuracion.');
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${creds.token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: creds.chatId,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('[Telegram API Error]:', data.description || data);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Telegram Exception]:', err);
    return false;
  }
}

export function formatLeadAlert(lead: {
  nombres: string;
  apellidos?: string;
  tipo_documento?: string;
  documento?: string;
  telefono: string;
  email?: string | null;
  programa_interes: string;
  jornada_interes?: string | null;
  nivel_educativo?: string | null;
  mensaje?: string | null;
  origen?: string;
  acudiente_nombre?: string;
  acudiente_documento?: string;
  acudiente_telefono?: string;
  acudiente_parentesco?: string;
}): string {
  const cleanPhone = (lead.telefono || '').replace(/\D/g, '');
  const fullName = `${lead.nombres} ${lead.apellidos || ''}`.trim();
  const docInfo = lead.documento && lead.documento !== 'PENDIENTE' 
    ? `${lead.tipo_documento || 'CC'} ${lead.documento}` 
    : 'No especificado';

  const esMenor = lead.tipo_documento === 'TI' || Boolean(lead.acudiente_nombre);

  let text = esMenor 
    ? `🚨 *¡NUEVA PREMATRÍCULA (ASPIRANTE MENOR DE EDAD)!* 🚨\n\n`
    : `🚨 *¡NUEVA PREMATRÍCULA / PROSPECTO CAPTURADO!* 🚨\n\n`;

  text += `👤 *Aspirante:* ${fullName}\n`;
  text += `📄 *Documento:* ${docInfo} ${esMenor ? '_(Menor de Edad)_' : ''}\n`;
  text += `📱 *WhatsApp / Tel:* [${lead.telefono}](https://wa.me/57${cleanPhone})\n`;
  if (lead.email) {
    text += `✉️ *Correo:* ${lead.email}\n`;
  }
  text += `🎓 *Programa:* ${lead.programa_interes}\n`;
  if (lead.jornada_interes) {
    text += `☀️ *Jornada:* ${lead.jornada_interes}\n`;
  }
  if (lead.nivel_educativo) {
    text += `📚 *Nivel:* ${lead.nivel_educativo}\n`;
  }
  text += `📍 *Canal / Origen:* ${lead.origen || 'Formulario Web Oficial'}\n`;

  // Datos del acudiente si aplica
  if (esMenor) {
    text += `\n🛡️ *DATOS OBLIGATORIOS DEL ACUDIENTE / TUTOR LEGAL:*\n`;
    text += `• *Nombre Acudiente:* ${lead.acudiente_nombre || 'Pendiente por confirmar'}\n`;
    if (lead.acudiente_documento) {
      text += `• *Cédula Acudiente:* ${lead.acudiente_documento}\n`;
    }
    if (lead.acudiente_telefono) {
      const cleanAcudientePhone = lead.acudiente_telefono.replace(/\D/g, '');
      text += `• *WhatsApp Acudiente:* [${lead.acudiente_telefono}](https://wa.me/57${cleanAcudientePhone})\n`;
    }
    if (lead.acudiente_parentesco) {
      text += `• *Parentesco:* ${lead.acudiente_parentesco}\n`;
    }
  }

  if (lead.mensaje) {
    text += `\n💬 *Observaciones:* \n_${lead.mensaje.slice(0, 300)}_\n`;
  }

  text += `\n⏰ *Fecha:* ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}`;

  return text;
}

export function formatAdvisorRequestAlert(data: {
  mensaje: string;
  nombres?: string;
  telefono?: string;
  programa?: string;
  origen?: string;
}): string {
  let text = `🔔 *¡SOLICITUD DE ASESOR HUMANO (CHAT IA)!* 🔔\n\n`;
  if (data.nombres) {
    text += `👤 *Usuario:* ${data.nombres}\n`;
  }
  if (data.telefono) {
    const cleanPhone = data.telefono.replace(/\D/g, '');
    text += `📱 *Teléfono detectado:* [${data.telefono}](https://wa.me/57${cleanPhone})\n`;
  }
  if (data.programa) {
    text += `🎓 *Programa de Interés:* ${data.programa}\n`;
  }
  text += `💬 *Consulta o mensaje del usuario:* \n"${data.mensaje.slice(0, 350)}"\n\n`;
  text += `⚡ *Acción:* Un asesor debe contactar al usuario o responder en la plataforma.\n`;
  text += `⏰ *Hora:* ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}`;

  return text;
}
