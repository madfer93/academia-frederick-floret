import React from 'react';
import { Target, Eye, Shield, Users, Sparkles, Building2, Monitor, BookOpen } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#D51C28] text-xs font-bold uppercase tracking-wider">
            Identidad &amp; Horizonte Institucional
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Una Institución Comprometida con la Transformación de Córdoba
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Desde el 18 de noviembre de 1991, la <strong>Academia Frederick Floret</strong> ha sido un pilar educativo fundamental en Montería, capacitando con vocación, calidad pedagógica y rigor técnico a más de dos mil egresados.
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Misión */}
          <div className="bg-gradient-to-br from-slate-50 to-red-50/40 p-8 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#D51C28] text-white flex items-center justify-center mb-5 shadow-md shadow-red-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">Nuestra Misión</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ser una institución líder en la formación técnico laboral de calidad, reconocida por su compromiso con la innovación, la excelencia académica y el desarrollo sostenible de la comunidad, basada en los principios y valores de liderazgo, integridad, inclusión y servicio.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 p-8 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#FF8C01] text-white flex items-center justify-center mb-5 shadow-md shadow-amber-500/20">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">Nuestra Visión</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Formar técnicos laborales competentes y ciudadanos comprometidos, con valores éticos y sociales, a través de una educación integral que promueva el desarrollo humano, la productividad regional y la transformación social en el Caribe colombiano.
            </p>
          </div>

        </div>

        {/* 4 Principios Fundamentales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#D51C28] transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#D51C28] flex items-center justify-center font-bold mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1.5">Liderazgo</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Promover la iniciativa, el trabajo en equipo y la capacidad de transformación en nuestros estudiantes y comunidad.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#D51C28] transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1.5">Integridad</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fomentar la honestidad, la transparencia y el respeto irrestricto en todas nuestras acciones formativas.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#D51C28] transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1.5">Inclusión</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Garantizar la participación, permanencia y aprendizaje de todos los estudiantes, reconociendo la diversidad de nuestra región.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#D51C28] transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1.5">Servicio</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dirigir nuestra labor hacia el bienestar colectivo y la mejora de la calidad de vida de las familias de Córdoba.
            </p>
          </div>
        </div>

        {/* Sección de Sede / Instalaciones */}
        <div id="sede" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Infraestructura Propia en el Corazón de la Ciudad
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Edificio Frederick Floret: 353 m² Diseñados para tu Aprendizaje Práctico
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ubicada en la <strong>Calle 27 #10-21 (Barrio Centro)</strong>, nuestra sede cuenta con tres plantas distribuidas para impartir clases teóricas y laboratorios prácticos con estándares de confort, seguridad y tecnología.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <Monitor className="w-5 h-5 text-blue-400 mb-2" />
                  <strong className="block text-white text-sm font-bold">80 Computadores</strong>
                  <span className="text-slate-400">Sala de informática con internet de alta velocidad</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <Building2 className="w-5 h-5 text-emerald-400 mb-2" />
                  <strong className="block text-white text-sm font-bold">3 Niveles</strong>
                  <span className="text-slate-400">Aulas dotadas con proyectores y sonido</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <BookOpen className="w-5 h-5 text-amber-400 mb-2" />
                  <strong className="block text-white text-sm font-bold">Sala Magistral</strong>
                  <span className="text-slate-400">Espacios para conferencias y seminarios</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
              <h4 className="text-base font-bold text-white border-b border-slate-700 pb-2">
                Información de Atención Presencial
              </h4>
              <div className="space-y-2.5 text-xs text-slate-300">
                <p>
                  📍 <strong>Dirección:</strong> Calle 27 No. 10 - 21, Barrio Centro, Montería, Córdoba.
                </p>
                <p>
                  🕒 <strong>Horario Administrativo:</strong><br />
                  Lunes a Viernes: 8:00 a.m. – 12:00 m | 2:00 p.m. – 6:00 p.m.<br />
                  Sábados: 8:00 a.m. – 1:00 p.m.
                </p>
                <p>
                  📞 <strong>Línea Celular / WhatsApp:</strong><br />
                  <a href="https://wa.me/573205206613" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">
                    (+57) 320 520 6613
                  </a>
                </p>
                <p>
                  ✉️ <strong>Correo Oficial:</strong><br />
                  <a href="mailto:academiafrederickfloret@gmail.com" className="text-blue-400 hover:underline">
                    academiafrederickfloret@gmail.com
                  </a>
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/573205206613?text=Hola,%20deseo%20visitar%20la%20sede%20de%20la%20Academia%20Frederick%20Floret%20en%20Monter%C3%ADa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white font-bold text-xs text-center block shadow-md hover:brightness-105 transition-all"
                >
                  Agendar Visita a la Sede por WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
