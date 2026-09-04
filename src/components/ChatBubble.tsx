'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw,
  ChevronDown,
  ShieldCheck,
  ExternalLink,
  Lock,
  Scale,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface BotConfig {
  nombre: string;
  subtitulo: string;
  avatar_url: string;
  bienvenida: string;
}

const DEFAULT_CONFIG: BotConfig = {
  nombre: 'FloretBot',
  subtitulo: 'Academia Frederick Floret · En línea',
  avatar_url: '',
  bienvenida: '¡Hola! 👋 Soy **FloretBot**, el asesor virtual con Inteligencia Artificial de la **Academia Frederick Floret**. ¿En qué programa técnico te gustaría capacitarte o qué duda tienes sobre requisitos, horarios o pagos en cuotas?'
};

export default function ChatBubble() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadRegistered, setLeadRegistered] = useState(false);
  const [botConfig, setBotConfig] = useState<BotConfig>(DEFAULT_CONFIG);
  
  // Consentimiento previo informado (Ley 1581 / Habeas Data / ISO 42001)
  const [hasAcceptedPolicies, setHasAcceptedPolicies] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: DEFAULT_CONFIG.bienvenida
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Verificar consentimiento previo almacenado en el navegador
  useEffect(() => {
    try {
      const consent = localStorage.getItem('floret_consentimiento_politicas_v1');
      if (consent === 'true') {
        setHasAcceptedPolicies(true);
      }
    } catch (e) {
      console.warn('[ChatBubble] Error accediendo a localStorage:', e);
    }
  }, []);

  // Cargar configuración de identidad del chatbot desde Supabase (sitio_configuracion)
  useEffect(() => {
    async function loadBotConfig() {
      try {
        const { data, error } = await supabase
          .from('sitio_configuracion')
          .select('clave, valor')
          .in('clave', ['chatbot_nombre', 'chatbot_subtitulo', 'chatbot_avatar_url', 'chatbot_bienvenida']);

        if (!error && data && data.length > 0) {
          const cfg: Record<string, string> = {};
          data.forEach(item => {
            if (item.valor) cfg[item.clave] = item.valor;
          });

          const newConfig: BotConfig = {
            nombre: cfg['chatbot_nombre'] || DEFAULT_CONFIG.nombre,
            subtitulo: cfg['chatbot_subtitulo'] || DEFAULT_CONFIG.subtitulo,
            avatar_url: cfg['chatbot_avatar_url'] || DEFAULT_CONFIG.avatar_url,
            bienvenida: cfg['chatbot_bienvenida'] || DEFAULT_CONFIG.bienvenida
          };

          setBotConfig(newConfig);

          // Si solo está el mensaje de bienvenida por defecto, actualizarlo con el configurado
          setMessages(prev => {
            if (prev.length <= 1 && prev[0]?.id === 'welcome-msg') {
              return [{ id: 'welcome-msg', role: 'assistant', content: newConfig.bienvenida }];
            }
            return prev;
          });
        }
      } catch (err) {
        console.warn('[ChatBubble] Error al cargar configuración personalizada:', err);
      }
    }

    loadBotConfig();
  }, []);

  // Auto-scroll al recibir mensajes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, hasAcceptedPolicies]);

  // Si estamos dentro del panel /admin, no mostrar la burbuja para no interferir con las tablas
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleAcceptPolicies = () => {
    if (!termsChecked) return;
    try {
      localStorage.setItem('floret_consentimiento_politicas_v1', 'true');
    } catch (e) {
      console.warn('[ChatBubble] Error guardando consentimiento en localStorage:', e);
    }
    setHasAcceptedPolicies(true);
    setMessages(prev => [
      ...prev,
      {
        id: 'consent-accepted-msg',
        role: 'assistant',
        content: '✅ **¡Consentimiento registrado con éxito!** Tus datos se tratan conforme a la Ley 1581 de 2012 y bajo gobernanza ética de IA (ISO/IEC 42001:2023).\n\n¿En cuál de nuestros 6 programas técnicos en salud estás interesado o qué duda te gustaría resolver hoy?'
      }
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    if (!hasAcceptedPolicies) return;

    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsgId = Date.now().toString();
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: 'user', content: text }
    ];

    setMessages(newMessages);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el asistente.');
      }

      const data = await response.json();
      let replyContent = data.reply || 'Disculpa, no pude procesar tu consulta en este momento. Por favor contáctanos al WhatsApp 320 520 6613.';

      // Detectar si la IA capturó un lead para enviarlo al CRM y Q10
      const leadMatch = replyContent.match(/<!--LEAD_CAPTURED:(.*?)-->/);
      if (leadMatch && leadMatch[1]) {
        try {
          const leadData = JSON.parse(leadMatch[1]);
          // Enviar silenciosamente al endpoint de CRM & Q10
          fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nombres: leadData.nombres || 'Aspirante',
              telefono: leadData.telefono,
              programa_interes: leadData.programa || 'Auxiliar en Enfermería',
              origen: `Chat IA 24/7 (${botConfig.nombre})`
            })
          });
          setLeadRegistered(true);
        } catch (e) {
          console.warn('Error parseando lead:', e);
        }
        // Limpiar el tag de la respuesta visible
        replyContent = replyContent.replace(/<!--LEAD_CAPTURED:(.*?)-->/, '').trim();
      }

      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: replyContent }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Ocurrió un inconveniente temporal de conexión con el motor de IA. Puedes comunicarte directamente con la secretaría académica al WhatsApp **320 520 6613**.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const QUICK_QUESTIONS = [
    '¿Cuáles son los 6 programas?',
    '¿Cómo funciona el pago en 4 cuotas?',
    '¿Qué requisitos exigen?',
    '¿Dónde queda la sede en Montería?'
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Ventana Flotante del Chat */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[390px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header del Chatbot */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#041933] text-white p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                {botConfig.avatar_url ? (
                  <img
                    src={botConfig.avatar_url}
                    alt={botConfig.nombre}
                    className="w-10 h-10 rounded-2xl object-cover shadow-md border border-slate-700 bg-slate-800"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D51C28] to-[#FF8C01] flex items-center justify-center font-black text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight">{botConfig.nombre}</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-red-500/20 text-red-400 text-[9px] font-extrabold uppercase border border-red-500/30 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> IA 24/7
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">{botConfig.subtitulo}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: 'welcome-msg',
                      role: 'assistant',
                      content: botConfig.bienvenida
                    }
                  ]);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reiniciar chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Cerrar chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notificación de lead capturado en CRM */}
          {leadRegistered && (
            <div className="bg-emerald-50 border-b border-emerald-200 px-3 py-1.5 text-[10px] text-emerald-800 font-bold flex items-center gap-1.5 justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Tus datos fueron transferidos a Secretaría &amp; CRM Q10</span>
            </div>
          )}

          {/* Historial de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    botConfig.avatar_url ? (
                      <img
                        src={botConfig.avatar_url}
                        alt={botConfig.nombre}
                        className="w-7 h-7 rounded-xl object-cover shrink-0 mt-0.5 shadow-xs border border-slate-200 bg-white"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#D51C28] to-[#FF8C01] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )
                  )}

                  <div
                    className={`max-w-[82%] p-3 rounded-2xl leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white rounded-tr-xs'
                        : 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Tarjeta de Consentimiento Previo Obligatorio (si no ha aceptado aún) */}
            {!hasAcceptedPolicies && (
              <div className="bg-white border border-amber-300 rounded-2xl p-3.5 shadow-sm space-y-3 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">
                      Aviso de Privacidad &amp; Consentimiento Previo
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      Antes de interactuar con nuestro asesor virtual con IA, debes autorizar el tratamiento de datos y consultar nuestras políticas institucionales:
                    </p>
                  </div>
                </div>

                {/* Enlaces a las 4 políticas */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <Link
                    href="/politicas/tratamiento-datos"
                    target="_blank"
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-700 hover:text-[#D51C28] flex items-center justify-between font-medium group transition-colors"
                  >
                    <span className="truncate">1. Datos (Ley 1581)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#D51C28] shrink-0" />
                  </Link>

                  <Link
                    href="/politicas/habeas-data"
                    target="_blank"
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-700 hover:text-emerald-700 flex items-center justify-between font-medium group transition-colors"
                  >
                    <span className="truncate">2. Habeas Data ARCO</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                  </Link>

                  <Link
                    href="/politicas/uso-ia-iso-42001"
                    target="_blank"
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 text-slate-700 hover:text-purple-700 flex items-center justify-between font-medium group transition-colors"
                  >
                    <span className="truncate">3. Uso IA (ISO 42001)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-purple-600 shrink-0" />
                  </Link>

                  <Link
                    href="/politicas/consentimiento-imagenes"
                    target="_blank"
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 text-slate-700 hover:text-amber-700 flex items-center justify-between font-medium group transition-colors"
                  >
                    <span className="truncate">4. Uso de Imagen/Voz</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-600 shrink-0" />
                  </Link>
                </div>

                {/* Checkbox de confirmación */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <label className="flex items-start gap-2 text-[10px] text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                      className="rounded text-[#D51C28] focus:ring-[#D51C28] mt-0.5 cursor-pointer"
                    />
                    <span>
                      He leído y autorizo el tratamiento de mis datos personales y acepto los lineamientos de gobernanza ética de IA de Frederick Floret S.A.S.
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={handleAcceptPolicies}
                    disabled={!termsChecked}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white font-bold text-xs shadow-xs hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aceptar Políticas y Continuar</span>
                  </button>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex gap-2 items-center text-slate-500 text-[11px] pt-1">
                {botConfig.avatar_url ? (
                  <img
                    src={botConfig.avatar_url}
                    alt={botConfig.nombre}
                    className="w-7 h-7 rounded-xl object-cover shrink-0 shadow-xs border border-slate-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#D51C28] to-[#FF8C01] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="bg-white border border-slate-200 p-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-[#D51C28] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#FF8C01] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preguntas Sugeridas Rápidas (habilitadas solo tras aceptar políticas) */}
          {hasAcceptedPolicies && messages.length <= 2 && (
            <div className="p-2 bg-white border-t border-slate-100 flex flex-wrap gap-1.5 shrink-0">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold transition-colors cursor-pointer text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input para Escribir */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={!hasAcceptedPolicies || loading}
              placeholder={
                hasAcceptedPolicies
                  ? "Escribe tu consulta o pide requisitos..."
                  : "Acepta las políticas arriba para chatear..."
              }
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-500 font-medium focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden bg-white shadow-xs disabled:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400"
            />
            <button
              type="submit"
              disabled={!hasAcceptedPolicies || !inputMessage.trim() || loading}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white flex items-center justify-center hover:brightness-105 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              title="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Barra inferior de Transparencia */}
          <div className="bg-slate-50 border-t border-slate-100 px-3 py-1.5 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
            <Link 
              href="/politicas" 
              target="_blank" 
              className="hover:text-slate-700 flex items-center gap-1 transition-colors"
            >
              <Lock className="w-2.5 h-2.5 text-emerald-600" />
              <span>Transparencia &amp; Privacidad</span>
            </Link>
            <span>ISO/IEC 42001 · Ley 1581</span>
          </div>

        </div>
      )}

      {/* Botón Circular Flotante (Burbuja) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#D51C28] via-red-600 to-[#FF8C01] text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
        title={`Asistente Virtual IA 24/7 (${botConfig.nombre})`}
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : botConfig.avatar_url ? (
            <img
              src={botConfig.avatar_url}
              alt={botConfig.nombre}
              className="w-5 h-5 rounded-full object-cover border border-white"
            />
          ) : (
            <MessageSquare className="w-5 h-5" />
          )}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse"></span>
          )}
        </div>

        <span className="hidden sm:inline-block font-extrabold tracking-tight">
          {isOpen ? 'Cerrar Chat' : `¿Dudas? ${botConfig.nombre} 24/7`}
        </span>
      </button>

    </div>
  );
}
