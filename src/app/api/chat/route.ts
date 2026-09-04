import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// In-memory sliding rate limiter (25 peticiones por minuto por IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 25;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
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
    // 0. Rate limiting & Validación de seguridad
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Has alcanzado el límite de consultas por minuto. Por favor espera un momento.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'El historial de mensajes es inválido.' },
        { status: 400 }
      );
    }

    // Sanitizar y limitar longitud de mensajes
    const sanitizedMessages = messages.slice(-15).map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: typeof m.content === 'string' ? m.content.slice(0, 1000).trim() : ''
    }));

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'La clave de API de Groq no está configurada en las variables de entorno.' },
        { status: 500 }
      );
    }

    // 1. OBTENER INFORMACIÓN VERIFICADA EN TIEMPO REAL DESDE SUPABASE (RAG ANTI-ALUCINACIONES)
    let programasText = '';
    let configuracionText = '';
    let botName = 'FloretBot';

    try {
      // Consultar programas activos
      const { data: programas, error: progError } = await supabase
        .from('programas')
        .select('*')
        .eq('activo', true);

      if (!progError && programas && programas.length > 0) {
        programasText = programas.map((p, idx) => `
${idx + 1}. ${p.titulo} (${p.categoria === 'salud' ? 'Área de la Salud' : 'Área Administrativa'})
- Duración: ${p.duracion}
- Modalidad: ${p.modalidad || 'Presencial (50% Teórico · 50% Práctico)'}
- Jornadas: ${Array.isArray(p.jornadas) ? p.jornadas.join(', ') : 'Diurna, Nocturna, Sabatina'}
- Requisitos: ${Array.isArray(p.requisitos) ? p.requisitos.join(', ') : '9° grado aprobado o bachiller, fotocopia documento, edad mínima 16 años'}
- Salidas laborales: ${Array.isArray(p.salidas_laborales) ? p.salidas_laborales.join(', ') : 'Clínicas, hospitales y empresas del sector'}
- Resolución Oficial: ${p.resolucion || 'Aprobado Secretaría de Educación de Montería'}
- Descripción: ${p.descripcion_corta}
`).join('\n');
      }

      // Consultar configuración y textos institucionales en vivo
      const { data: configs, error: cfgError } = await supabase
        .from('sitio_configuracion')
        .select('clave, valor');

      if (!cfgError && configs && configs.length > 0) {
        configuracionText = configs.map(c => `- ${c.clave}: ${c.valor}`).join('\n');
        const botNameConfig = configs.find(c => c.clave === 'chatbot_nombre');
        if (botNameConfig?.valor) botName = botNameConfig.valor.trim();
      }
    } catch (dbErr) {
      console.warn('[Chat RAG Warning] No se pudo consultar Supabase para RAG, usando datos base:', dbErr);
    }

    // 2. CONSTRUIR SYSTEM PROMPT DINÁMICO BLINDADO
    const DYNAMIC_SYSTEM_PROMPT = `Eres ${botName}, el Asistente Oficial con Inteligencia Artificial de la Academia Frederick Floret (Montería, Córdoba).
Tu objetivo es orientar a los aspirantes con respuestas precisas, educadas y amables, basándote ÚNICAMENTE en la base de datos institucional en vivo.

REGLA DE ORO ANTI-ALUCINACIONES:
- NO inventes precios exactos si no están en la información provista; en su lugar explica que el crédito es DIRECTO con la Academia pagadero en 4 cuotas mensuales sin bancos ni intermediarios.
- NUNCA inventes programas que no aparezcan en la lista de abajo.
- Si no sabes un dato con certeza, invita al usuario a comunicarse directamente a la línea oficial de secretaría académica.

=== DATOS Y TEXTOS EN TIEMPO REAL DESDE LA BASE DE DATOS ===
${configuracionText || `
- Direccion Sede: Calle 27 #10-21, Edificio Frederick Floret, Centro de Montería, Córdoba.
- Telefono y WhatsApp Oficial: 320 520 6613.
- Horarios de Atencion: Lunes a Viernes de 7:30 am a 12:00 m y 2:00 pm a 6:00 pm. Sábados de 8:00 am a 1:00 pm.
- Trayectoria: 34 años de liderazgo (Fundada en 1991 mediante Licencia de Funcionamiento 001514).
- Instalaciones: Edificio propio de 3 plantas, 353 m², sala con 80 computadores y laboratorios clínicos simulados.
- Financiacion: Crédito institucional directo en 4 cuotas mensuales sin cobro de intereses bancarios.
`}

=== PROGRAMAS TÉCNICOS LABORALES ACTIVOS EN BASE DE DATOS ===
${programasText || `
1. Auxiliar en Enfermería (3 semestres, 50% práctico en clínicas y hospitales, avalado MinSalud/MEN Rad. 200478261).
2. Auxiliar en Salud Oral (3 semestres, asistencia odontológica y esterilización).
3. Auxiliar en Servicios Farmacéuticos (3 semestres, dispensación y normatividad Invima).
4. Auxiliar Administrativo en Salud (3 semestres, facturación médica y admisión).
5. Auxiliar en Salud Pública (3 semestres, brigadas comunitarias y vigilancia).
6. Auxiliar Administrativo Organizacional (3 semestres, 660 horas certificadas, nómina y talento humano).
`}

=== CAPTURA DE PROSPECTOS (LEADS) PARA CRM Y Q10 ===
- Cuando el usuario manifieste interés en inscribirse, consultar costos o iniciar clases, solicita cordialmente: Nombre completo, WhatsApp y Programa de interés.
- En cuanto el usuario te proporcione su nombre y teléfono en el chat, agrega AL FINAL de tu respuesta este formato exacto para que el sistema lo registre en Supabase y lo despache a Q10:
<!--LEAD_CAPTURED:{"nombres":"NOMBRE","telefono":"TELEFONO","programa":"PROGRAMA"}-->`;

    const payloadMessages = [
      { role: 'system', content: DYNAMIC_SYSTEM_PROMPT },
      ...sanitizedMessages
    ];

    // 3. CONSULTAR GROQ (GPT-OSS 120B con fallback a GPT-OSS 20B)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: payloadMessages,
        temperature: 0.3,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      console.warn('[Groq Primary Model busy, executing fallback 20b]');
      const fallbackResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: payloadMessages,
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!fallbackResponse.ok) {
        const errorText = await fallbackResponse.text();
        console.error('[Groq Error]:', errorText);
        return NextResponse.json(
          { error: 'Error comunicándose con el motor de IA.' },
          { status: 502 }
        );
      }

      const fallbackJson = await fallbackResponse.json();
      const reply = fallbackJson.choices?.[0]?.message?.content || 'Hola, ¿en qué programa técnico te gustaría capacitarte?';
      return NextResponse.json({ reply });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Hola, ¿en qué programa técnico te gustaría capacitarte?';

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('[API Chat Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Error procesando consulta de IA.' },
      { status: 500 }
    );
  }
}
