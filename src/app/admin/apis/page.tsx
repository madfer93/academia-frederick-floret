'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  KeyRound, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Cpu, 
  CreditCard, 
  Mail, 
  Globe, 
  Share2, 
  Send,
  Bot,
  Sparkles,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';

export default function AdminApisPage() {
  const [activeTab, setActiveTab] = useState<'meta' | 'google' | 'wompi' | 'smtp' | 'ai'>('ai');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Estados de configuración de APIs
  const [formData, setFormData] = useState({
    // 1. Meta (Facebook & Instagram)
    meta_pixel_id: '',
    meta_conversions_api_token: '',
    meta_app_id: '',
    meta_app_secret: '',

    // 2. Google Marketing & Cloud
    google_analytics_id: '',
    google_tag_manager_id: '',
    google_maps_api_key: '',
    google_site_verification: 'R8F6UkNMybScXYaszR0NuWk1lbzGOo_vmIkOVuKzEa4',
    google_recaptcha_site_key: '',
    google_recaptcha_secret_key: '',

    // 3. Wompi Bancolombia
    wompi_mode: 'test',
    wompi_pub_key: '',
    wompi_prv_key: '',
    wompi_integrity_secret: '',
    wompi_events_secret: '',

    // 4. Servidor SMTP (Correos)
    smtp_host: 'smtp.gmail.com',
    smtp_port: '465',
    smtp_user: 'academiafrederickfloret@gmail.com',
    smtp_pass: '',
    smtp_secure: 'ssl',
    smtp_from_name: 'Academia Frederick Floret',

    // 5. JYM AI Engine, Groq & Q10
    groq_api_key: '',
    jym_engine_url: 'https://engine.jymtechsolutions.online',
    q10_api_key: '',
    telegram_bot_token: '',
    telegram_chat_id: '',

    // 6. Personalización Chatbot IA 24/7 (FloretBot)
    chatbot_nombre: 'FloretBot',
    chatbot_subtitulo: 'Academia Frederick Floret · En línea',
    chatbot_avatar_url: '',
    chatbot_bienvenida: '¡Hola! 👋 Soy **FloretBot**, el asesor virtual con Inteligencia Artificial de la **Academia Frederick Floret**. ¿En qué programa técnico te gustaría capacitarte o qué duda tienes sobre requisitos, horarios o pagos en cuotas?',
  });

  // Cargar llaves desde Supabase (sitio_configuracion)
  const fetchApiConfigs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sitio_configuracion')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        const loaded: Record<string, string> = {};
        data.forEach((item: { clave: string; valor: string }) => {
          loaded[item.clave] = item.valor;
        });

        setFormData(prev => ({
          ...prev,
          ...loaded,
        }));
      }
    } catch (err) {
      console.error('Error cargando configuración de APIs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiConfigs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Guardar todas las llaves en Supabase (sitio_configuracion)
  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const updates = Object.entries(formData).map(([clave, valor]) => ({
        clave,
        valor: valor || '',
        categoria: 'apis',
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('sitio_configuracion')
        .upsert(updates, { onConflict: 'clave' });

      if (error) throw error;

      setSuccessMsg('¡Todas las APIs, Píxeles y Llaves de Integración se guardaron con éxito!');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Error al sincronizar las credenciales.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado al estilo Syspro */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-slate-800">
        <div>
          <span className="inline-block bg-[#D51C28] text-white px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider mb-2">
            Central de Integraciones &amp; Marketing
          </span>
          <h1 className="text-2xl sm:text-3xl font-black italic tracking-tight">
            Centro de Control de APIs &amp; Credenciales
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl font-light">
            Administra en tiempo real los Píxeles de Meta, Google Analytics 4, Pasarela Wompi, Correos SMTP, Motor de IA (Groq) y sincronización con Q10.
          </p>
        </div>

        <button
          onClick={fetchApiConfigs}
          className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors self-start shrink-0"
          title="Recargar credenciales"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border-2 border-emerald-500 text-emerald-900 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-black text-emerald-950">¡Configuración guardada exitosamente!</p>
            <p className="text-[11px] text-emerald-700 font-normal">
              Las nuevas llaves, pasarelas de pago y credenciales de IA ya están disponibles en todo el ecosistema.
            </p>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSaveAll} className="space-y-6">
        
        {/* Pestañas de Navegación Rápida */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ai'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-4 h-4 text-[#FF8C01]" />
            <span>🤖 Motor de IA (Groq) &amp; Q10</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wompi')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'wompi'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-500" />
            <span>💳 Wompi (Bancolombia)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('meta')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'meta'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Share2 className="w-4 h-4 text-blue-500" />
            <span>🔵 Meta (Pixel &amp; Ads)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'google'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-4 h-4 text-amber-500" />
            <span>🟦 Google Marketing (GA4/GTM)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('smtp')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'smtp'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4 text-red-500" />
            <span>✉️ Correos (SMTP)</span>
          </button>
        </div>

        {/* 1. SECCIÓN IA ENGINE (GROQ) & Q10 */}
        {activeTab === 'ai' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#FF8C01]" />
                  <span>JYM AI Engine, Groq &amp; CRM Q10</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Conexión con el motor de IA para respuestas automáticas, LLMs y sincronización con el sistema académico Q10.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
                Llama 3 / Groq Powered
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Groq Cloud API Key (Llama 3 70B / Mixtral) *
                </label>
                <input
                  type="password"
                  name="groq_api_key"
                  value={formData.groq_api_key}
                  onChange={handleChange}
                  placeholder="gsk_..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
                <p className="text-[11px] text-slate-400">
                  Clave de procesamiento ultrarrápido para análisis de prospectos e inteligencia institucional.
                </p>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Q10 REST API Token (Admisiones &amp; Estudiantes)
                </label>
                <input
                  type="text"
                  name="q10_api_key"
                  value={formData.q10_api_key}
                  onChange={handleChange}
                  placeholder="Token de integración facilitado por la Sra. Ana"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
                <p className="text-[11px] text-slate-400">
                  Permite crear automáticamente al aspirante en la plataforma Q10 en cuanto envía el formulario en la web.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Telegram Bot Token (Alertas Inmediatas)
                </label>
                <input
                  type="text"
                  name="telegram_bot_token"
                  value={formData.telegram_bot_token}
                  onChange={handleChange}
                  placeholder="123456789:AAF..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Telegram Chat ID Directivo
                </label>
                <input
                  type="text"
                  name="telegram_chat_id"
                  value={formData.telegram_chat_id}
                  onChange={handleChange}
                  placeholder="Ej. -100..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>
            </div>

            {/* SUB-SECCIÓN: PERSONALIZACIÓN VISUAL DEL CHATBOT */}
            <div className="border-t border-slate-200 pt-6 mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#D51C28]" />
                    <span>Personalización &amp; Marca del Asistente Virtual (FloretBot)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modifica el nombre, avatar, subtítulo y mensaje de bienvenida que ven los estudiantes en la web.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-red-50 text-[#D51C28] text-[10px] font-black uppercase border border-red-200 self-start">
                  Burbuja Web 24/7
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Formulario de Campos */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Nombre del Asistente *
                      </label>
                      <input
                        type="text"
                        name="chatbot_nombre"
                        value={formData.chatbot_nombre}
                        onChange={handleChange}
                        placeholder="Ej: FloretBot"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Subtítulo / Estado
                      </label>
                      <input
                        type="text"
                        name="chatbot_subtitulo"
                        value={formData.chatbot_subtitulo}
                        onChange={handleChange}
                        placeholder="Ej: Academia Frederick Floret · En línea"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      URL de la Imagen / Avatar del Bot
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        name="chatbot_avatar_url"
                        value={formData.chatbot_avatar_url}
                        onChange={handleChange}
                        placeholder="https://... o deja vacío para usar el ícono del bot"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50 font-mono"
                      />
                      {formData.chatbot_avatar_url && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, chatbot_avatar_url: '' }))}
                          className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                          title="Restablecer al ícono predeterminado"
                        >
                          Limpiar
                        </button>
                      )}
                    </div>
                    {/* Atajos de avatares */}
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-semibold">Avatares rápidos:</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, chatbot_avatar_url: '/logo.png' }))}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                      >
                        Logo Institucional
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, chatbot_avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' }))}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                      >
                        Asesora Académica
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, chatbot_avatar_url: '' }))}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                      >
                        Robot Naranja (Default)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Mensaje de Bienvenida Inicial *
                    </label>
                    <textarea
                      rows={4}
                      name="chatbot_bienvenida"
                      value={formData.chatbot_bienvenida}
                      onChange={handleChange}
                      placeholder="Escribe el saludo que verá el usuario..."
                      className="w-full p-3.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50 leading-relaxed font-sans"
                    />
                    <p className="text-[10px] text-slate-400">
                      Tip: Puedes usar asteriscos para **negrita** o emojis para dar calidez al saludo.
                    </p>
                  </div>
                </div>

                {/* Previsualizador en Vivo (Live Mockup) */}
                <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-4 text-white flex flex-col justify-between border border-slate-800 shadow-inner">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                      <span>Vista Previa en Tiempo Real</span>
                      <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> En Vivo
                      </span>
                    </div>

                    {/* Simulación Ventana Chat */}
                    <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-700 text-xs">
                      {/* Header Simulado */}
                      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#041933] text-white p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="relative">
                            {formData.chatbot_avatar_url ? (
                              <img
                                src={formData.chatbot_avatar_url}
                                alt="Avatar preview"
                                className="w-9 h-9 rounded-xl object-cover border border-slate-700 bg-slate-800"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D51C28] to-[#FF8C01] flex items-center justify-center font-black text-white shadow-xs">
                                <Bot className="w-4 h-4" />
                              </div>
                            )}
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-xs">{formData.chatbot_nombre || 'FloretBot'}</span>
                              <span className="px-1 py-0.5 rounded-md bg-red-500/20 text-red-400 text-[8px] font-extrabold uppercase border border-red-500/30 flex items-center gap-0.5">
                                <Sparkles className="w-2 h-2" /> IA 24/7
                              </span>
                            </div>
                            <p className="text-[9px] text-slate-300 truncate max-w-[150px]">
                              {formData.chatbot_subtitulo || 'Academia Frederick Floret · En línea'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Cuerpo Simulado con el mensaje */}
                      <div className="p-3 bg-slate-50 space-y-2">
                        <div className="flex gap-2 items-start">
                          {formData.chatbot_avatar_url ? (
                            <img
                              src={formData.chatbot_avatar_url}
                              alt="Avatar"
                              className="w-6 h-6 rounded-lg object-cover shrink-0 mt-0.5 border border-slate-200 bg-white"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#D51C28] to-[#FF8C01] text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Bot className="w-3 h-3" />
                            </div>
                          )}
                          <div className="bg-white border border-slate-200 p-2.5 rounded-xl rounded-tl-xs text-[11px] text-slate-800 leading-relaxed shadow-xs">
                            {formData.chatbot_bienvenida || 'Escribe un mensaje de bienvenida...'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 text-center mt-3">
                    Así se mostrará a los visitantes en la esquina de la página.
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 2. SECCIÓN WOMPI BANCOLOMBIA */}
        {activeTab === 'wompi' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <span>Pasarela de Pagos Wompi (Bancolombia)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Procesamiento de recaudos de matrícula y cuotas con tarjetas, PSE, Nequi y corresponsales.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
                Wompi Gateway
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Modo de Operación *
                </label>
                <select
                  name="wompi_mode"
                  value={formData.wompi_mode}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                >
                  <option value="test">🧪 Pruebas (Sandbox / Llaves Test)</option>
                  <option value="production">⚡ Producción (Llaves Reales de Recaudo)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Llave Pública (Public Key) *
                </label>
                <input
                  type="text"
                  name="wompi_pub_key"
                  value={formData.wompi_pub_key}
                  onChange={handleChange}
                  placeholder="pub_test_... o pub_prod_..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Llave Privada (Private Key)
                </label>
                <input
                  type="password"
                  name="wompi_prv_key"
                  value={formData.wompi_prv_key}
                  onChange={handleChange}
                  placeholder="prv_test_... o prv_prod_..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Secreto de Integridad (Integrity Secret)
                </label>
                <input
                  type="text"
                  name="wompi_integrity_secret"
                  value={formData.wompi_integrity_secret}
                  onChange={handleChange}
                  placeholder="test_integrity_... o prod_integrity_..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. SECCIÓN META ADS & PIXEL */}
        {activeTab === 'meta' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <span>Meta Ads, Píxel &amp; Conversions API</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rastreo de eventos de clientes potenciales (Leads) para campañas en Facebook e Instagram.
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-200">
                Meta Graph
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Pixel ID (ID del Píxel de Facebook)
                </label>
                <input
                  type="text"
                  name="meta_pixel_id"
                  value={formData.meta_pixel_id}
                  onChange={handleChange}
                  placeholder="Ej. 1405004776454498"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Token de la API de Conversiones (Meta CAPI Token)
                </label>
                <textarea
                  rows={2}
                  name="meta_conversions_api_token"
                  value={formData.meta_conversions_api_token}
                  onChange={handleChange}
                  placeholder="EAA..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Meta App ID</label>
                <input
                  type="text"
                  name="meta_app_id"
                  value={formData.meta_app_id}
                  onChange={handleChange}
                  placeholder="Ej. 857351220683113"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Meta App Secret</label>
                <input
                  type="password"
                  name="meta_app_secret"
                  value={formData.meta_app_secret}
                  onChange={handleChange}
                  placeholder="••••••••••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. SECCIÓN GOOGLE MARKETING SUITE */}
        {activeTab === 'google' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-500" />
                  <span>Google Marketing Suite &amp; Cloud</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Google Tag Manager, Google Analytics 4, Search Console y reCAPTCHA v3.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
                Google Cloud
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Google Analytics 4 ID (GA4 G-ID)
                </label>
                <input
                  type="text"
                  name="google_analytics_id"
                  value={formData.google_analytics_id}
                  onChange={handleChange}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Google Tag Manager ID (GTM-ID)
                </label>
                <input
                  type="text"
                  name="google_tag_manager_id"
                  value={formData.google_tag_manager_id}
                  onChange={handleChange}
                  placeholder="GTM-XXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Google Search Console Verification Token
                </label>
                <input
                  type="text"
                  name="google_site_verification"
                  value={formData.google_site_verification}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. SECCIÓN SERVIDOR SMTP (CORREOS) */}
        {activeTab === 'smtp' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-red-500" />
                  <span>Servidor de Correos (SMTP Transaccional)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Notificaciones automáticas de preinscripciones para coordinadores y confirmaciones para aspirantes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">SMTP Host</label>
                <input
                  type="text"
                  name="smtp_host"
                  value={formData.smtp_host}
                  onChange={handleChange}
                  placeholder="smtp.gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Puerto SMTP</label>
                <input
                  type="text"
                  name="smtp_port"
                  value={formData.smtp_port}
                  onChange={handleChange}
                  placeholder="465"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Correo Emisor</label>
                <input
                  type="email"
                  name="smtp_user"
                  value={formData.smtp_user}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Contraseña de Aplicación</label>
                <input
                  type="password"
                  name="smtp_pass"
                  value={formData.smtp_pass}
                  onChange={handleChange}
                  placeholder="••••••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Botón de Guardado Flotante / Sticky */}
        <div className="sticky bottom-6 z-30 bg-slate-900/95 backdrop-blur-md p-4 rounded-3xl border border-slate-700 shadow-2xl flex items-center justify-between gap-4">
          <div className="text-xs text-slate-300 hidden sm:block">
            💾 <strong>Sincronización en Vivo:</strong> Los cambios se guardan directamente en Supabase y actualizan el ecosistema al instante.
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <span>Sincronizando con Supabase...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar Todas las APIs &amp; Credenciales</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
