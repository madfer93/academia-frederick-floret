import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getTelegramCredentials, buildLeadInlineKeyboard } from '@/lib/telegram';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Manejar Callback Queries (Clics en los botones del Inline Keyboard)
    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const callbackId = callbackQuery.id;
      const dataStr = callbackQuery.data || '';
      const fromUser = callbackQuery.from;
      const fromName = [fromUser?.first_name, fromUser?.last_name].filter(Boolean).join(' ') || fromUser?.username || 'Coordinador(a)';
      const originalMessage = callbackQuery.message;
      const chatId = originalMessage?.chat?.id;
      const messageId = originalMessage?.message_id;
      const originalText = originalMessage?.text || '';

      // Formato esperado: lead:<accion>:<id>
      if (dataStr.startsWith('lead:')) {
        const parts = dataStr.split(':');
        const action = parts[1]; // contactado | matriculado | no_interesado
        const leadId = parts[2];

        if (!leadId) {
          return NextResponse.json({ ok: true });
        }

        let dbStatus = 'pendiente';
        let statusLabel = 'Pendiente';

        if (action === 'contactado') {
          dbStatus = 'contactado';
          statusLabel = '📞 Contactado';
        } else if (action === 'matriculado') {
          dbStatus = 'matriculado';
          statusLabel = '🎓 Matriculado';
        } else if (action === 'no_interesado') {
          dbStatus = 'descartado';
          statusLabel = '❌ No Interesado';
        }

        // 2. Actualizar estado en Supabase (CRM)
        const { data: updatedLead, error: dbError } = await supabase
          .from('inscripciones')
          .update({
            estado: dbStatus,
            updated_at: new Date().toISOString()
          })
          .eq('id', leadId)
          .select()
          .single();

        if (dbError) {
          console.error('[Telegram Webhook DB Update Error]:', dbError);
        }

        const creds = await getTelegramCredentials();
        if (creds?.token) {
          // 3. Responder al Callback Query (Toast emergente en Telegram)
          await fetch(`https://api.telegram.org/bot${creds.token}/answerCallbackQuery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              callback_query_id: callbackId,
              text: `✅ Estado actualizado: ${statusLabel}`,
              show_alert: false
            })
          }).catch((e) => console.warn('[answerCallbackQuery error]:', e));

          // 4. Actualizar el texto del mensaje en Telegram para mostrar quién lo cambió
          if (chatId && messageId) {
            // Limpiar actualizaciones de estado previas en el texto
            let baseText = originalText.split('\n\n━━━━━━━━━━━━━━━━━━━━')[0].trim();

            const timestamp = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
            const updatedFooter = `\n\n━━━━━━━━━━━━━━━━━━━━\n⚡ *ESTADO ACTUALIZADO:* ${statusLabel.toUpperCase()}\n👤 *Gestionado por:* \`${fromName}\`\n⏰ *Fecha:* ${timestamp}`;
            const fullEditedText = `${baseText}${updatedFooter}`;

            const phone = updatedLead?.telefono || undefined;
            const acudientePhone = updatedLead?.acudiente_telefono || undefined;
            const newKeyboard = buildLeadInlineKeyboard(leadId, dbStatus, phone, acudientePhone);

            await fetch(`https://api.telegram.org/bot${creds.token}/editMessageText`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                message_id: messageId,
                text: fullEditedText,
                parse_mode: 'Markdown',
                reply_markup: {
                  inline_keyboard: newKeyboard
                }
              })
            }).catch((e) => console.warn('[editMessageText error]:', e));
          }
        }
      }

      return NextResponse.json({ ok: true, handled: 'callback_query' });
    }

    return NextResponse.json({ ok: true, status: 'ignored' });
  } catch (err: any) {
    console.error('[Telegram Webhook Exception]:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}

export async function GET() {
  const creds = await getTelegramCredentials();
  let webhookInfo = null;

  if (creds?.token) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${creds.token}/getWebhookInfo`);
      webhookInfo = await res.json();
    } catch (e) {
      console.warn('[getWebhookInfo error]:', e);
    }
  }

  return NextResponse.json({
    status: 'online',
    endpoint: '/api/telegram/webhook',
    telegram_configured: Boolean(creds?.token),
    webhook_info: webhookInfo
  });
}
