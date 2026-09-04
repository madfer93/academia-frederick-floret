/**
 * Utilidad oficial para alertas inmediatas a Telegram
 * Academia Frederick Floret
 */

export async function sendTelegramAlert(message: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Telegram Alert] No se configuró TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en las variables de entorno.');
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
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

  let text = `🚨 *¡NUEVO PROSPECTO REGISTRADO!* 🚨\n\n`;
  text += `👤 *Aspirante:* ${fullName}\n`;
  text += `📄 *Documento:* ${docInfo}\n`;
  text += `📱 *WhatsApp / Tel:* [${lead.telefono}](https://wa.me/57${cleanPhone})\n`;
  if (lead.email) {
    text += `✉️ *Correo:* ${lead.email}\n`;
  }
  text += `🎓 *Programa de Interés:* ${lead.programa_interes}\n`;
  if (lead.jornada_interes) {
    text += `☀️ *Jornada:* ${lead.jornada_interes}\n`;
  }
  if (lead.nivel_educativo) {
    text += `📚 *Nivel Educativo:* ${lead.nivel_educativo}\n`;
  }
  text += `📍 *Canal / Origen:* ${lead.origen || 'Formulario Web'}\n`;

  // Datos del acudiente si aplica
  if (lead.acudiente_nombre || lead.tipo_documento === 'TI') {
    text += `\n🛡️ *DATOS DEL ACUDIENTE (T.I. - Menor de edad):*\n`;
    text += `• *Nombre:* ${lead.acudiente_nombre || 'No registrado'}\n`;
    if (lead.acudiente_documento) {
      text += `• *Cédula:* ${lead.acudiente_documento}\n`;
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
