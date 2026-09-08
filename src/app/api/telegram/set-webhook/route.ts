import { NextResponse } from 'next/server';
import { getTelegramCredentials } from '@/lib/telegram';

export async function POST(req: Request) {
  try {
    const creds = await getTelegramCredentials();

    if (!creds?.token) {
      return NextResponse.json({ error: 'Token de Telegram no configurado.' }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    let webhookUrl = body.webhook_url;

    if (!webhookUrl) {
      // Deducir URL del host de la petición
      const host = req.headers.get('host') || 'academia-frederick-floret.vercel.app';
      const protocol = host.includes('localhost') ? 'http' : 'https';
      webhookUrl = `${protocol}://${host}/api/telegram/webhook`;
    }

    const response = await fetch(`https://api.telegram.org/bot${creds.token}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['callback_query', 'message']
      })
    });

    const data = await response.json();

    return NextResponse.json({
      success: data.ok,
      webhook_url: webhookUrl,
      telegram_response: data
    });
  } catch (err: any) {
    console.error('[Set Telegram Webhook Error]:', err);
    return NextResponse.json({ error: err.message || 'Error registrando webhook' }, { status: 500 });
  }
}
