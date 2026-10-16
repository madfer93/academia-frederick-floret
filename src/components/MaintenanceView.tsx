'use client';

import React, { useState } from 'react';
import { 
  Server, 
  RotateCw, 
  ShieldCheck, 
  Activity, 
  Lock, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Database,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function MaintenanceView() {
  const [checking, setChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Línea oficial del cliente (Academia Frederick Floret) desde .env
  const ownerWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573205206613';
  const whatsappPredefinedMessage = 'Hola, intento ingresar a la página web pero me aparece un aviso de mantenimiento técnico (Código SVC-INFRA-402). Deseo comunicarme directamente con ustedes.';
  const whatsappUrl = `https://wa.me/${ownerWhatsapp}?text=${encodeURIComponent(whatsappPredefinedMessage)}`;

  const handleVerifyStatus = () => {
    setChecking(true);
    setStatusMessage(null);
    setTimeout(() => {
      setChecking(false);
      setStatusMessage(
        'Diagnóstico de infraestructura [SVC-INFRA-402]: El servidor responde correctamente. El clúster se encuentra en pausa operativa por labores de optimización de bases de datos y verificación de licenciamiento. Por favor, comuníquese con la administración para cualquier consulta urgente.'
      );
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-[100] min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 flex flex-col justify-between overflow-y-auto font-sans selection:bg-[#D51C28] selection:text-white">
      {/* Background Gradients sutiles idénticos al Hero del sitio oficial */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
      </div>

      {/* Top Bar Header Institucional Blanco */}
      <header className="relative z-10 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-4 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-auto flex items-center justify-center p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
              <img 
                src="/logo.png" 
                alt="Academia Frederick Floret" 
                className="h-9 w-auto object-contain" 
              />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base tracking-tight text-slate-900 block">
                ACADEMIA FREDERICK FLORET
              </span>
              <span className="text-[10px] tracking-wider text-slate-500 uppercase font-bold block">
                Portal Institucional · Infraestructura Cloud
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
            </span>
            <span>VENTANA DE MANTENIMIENTO TÉCNICO</span>
          </div>
        </div>
      </header>

      {/* Main Content Area con Tarjeta Blanca Impecable */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 flex flex-col justify-center">
        <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-12">
          
          {/* Badge de Código de Evento */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-mono border border-slate-200">
              <Activity className="w-3.5 h-3.5 text-[#D51C28]" />
              <span className="text-slate-500 font-semibold">EVENT CODE:</span>
              <span className="text-[#D51C28] font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-50 border border-red-200">
                SVC-INFRA-402
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Sincronización técnica en proceso</span>
            </div>
          </div>

          {/* Icono Institucional y Título */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 shadow-sm flex items-center justify-center shrink-0">
              <Server className="w-8 h-8 text-[#D51C28]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Mantenimiento Programado de Plataforma
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Actualización de componentes centrales y auditoría de servicios
              </p>
            </div>
          </div>

          {/* Mensaje Corporativo Requerido */}
          <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 text-slate-800 text-sm sm:text-base leading-relaxed mb-8">
            <p className="font-medium text-slate-800">
              <span className="text-[#D51C28] font-bold">Aviso Técnico:</span> Pausa técnica programada por optimización de servidores, actualización de base de datos y verificación de licenciamiento operativo.
            </p>
          </div>

          {/* Matriz Técnica de Estado */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-slate-500 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
                <Cpu className="w-3 h-3 text-[#D51C28]" /> Nodo / Clúster
              </div>
              <div className="text-slate-900 font-semibold truncate">Edge-Node CO-04</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-slate-500 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
                <Database className="w-3 h-3 text-[#FF8C01]" /> Base de Datos
              </div>
              <div className="text-slate-900 font-semibold truncate">Reindexación & Migración</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-slate-500 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
                <Lock className="w-3 h-3 text-amber-600" /> Protocolo
              </div>
              <div className="text-slate-900 font-semibold truncate">SYS-AUDIT-402 (Isolated)</div>
            </div>
          </div>

          {/* Paneles de Información Contextual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Para Estudiantes y Aspirantes
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nuestros canales institucionales y registros se normalizarán una vez culmine la sincronización en los servidores. Puede solicitar orientación directa mediante el enlace de atención.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Administración del Sitio
              </h2>
              <p className="text-slate-600 leading-relaxed">
                El titular o administrador responsable puede validar el estado del licenciamiento y agilizar el desbloqueo contactando al canal directo registrado.
              </p>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            {/* Botón Principal WhatsApp: Conecta con el dueño/administrador con el mensaje estricto */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.28 0-7.761 3.481-7.762 7.76 0 1.369.356 2.709 1.032 3.882l-1.097 4.009 4.105-1.076c1.13.616 2.408.941 3.718.942 4.28 0 7.762-3.481 7.763-7.761 0-4.281-3.483-7.756-7.759-7.756z" />
              </svg>
              <span>Contactar a la Administración vía WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </a>

            {/* Botón Secundario: Verificar Estatus (Simulación Técnica) */}
            <button
              type="button"
              onClick={handleVerifyStatus}
              disabled={checking}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 transition-all duration-200 disabled:opacity-60 cursor-pointer shadow-xs"
            >
              <RotateCw className={`w-4 h-4 text-[#D51C28] ${checking ? 'animate-spin' : ''}`} />
              <span>{checking ? 'Comprobando Clúster...' : 'Verificar Estatus'}</span>
            </button>
          </div>

          {/* Respuesta Dinámica de Verificación Técnica */}
          {statusMessage && (
            <div className="mt-5 p-4 rounded-xl bg-amber-50/90 border border-amber-300 text-xs font-mono text-amber-900 leading-relaxed animate-in fade-in duration-300">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-800 uppercase">[Diagnóstico del Sistema] </span>
                  {statusMessage}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer Oficial Obligatorio con Firma de Autoría */}
      <footer className="relative z-10 w-full border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-5 text-center text-xs text-slate-600">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            &copy; {new Date().getFullYear()} Academia Frederick Floret S.A.S. · Todos los derechos reservados.
          </div>

          {/* Firma Oficial Intocable */}
          <div className="text-slate-700 font-medium">
            Desarrollado y administrado por{' '}
            <a
              href="https://www.jymtechsolutions.online/es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D51C28] hover:text-red-700 font-bold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <span>J&M Tech Solutions</span>
              <ExternalLink className="w-3 h-3 text-[#D51C28]" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
