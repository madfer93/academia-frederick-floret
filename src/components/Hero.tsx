import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Award, Users, BookOpen, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-10 pb-20 border-b border-slate-200">
      {/* Elementos visuales difuminados de fondo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-100/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Información Principal */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge de Reconocimiento */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-xs font-bold text-[#D51C28]">
              <span className="w-2 h-2 rounded-full bg-[#D51C28] animate-pulse"></span>
              <span>Inscripciones Abiertas · Ciclo 2026</span>
            </div>

            {/* Titular Impactante */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              34 Años Formando Técnicos de Excelencia en <span className="bg-gradient-to-r from-[#D51C28] to-[#FF8C01] bg-clip-text text-transparent">Montería y Córdoba</span>
            </h1>

            {/* Slogan Histórico Oficial */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-2xl">
              <p className="text-sm font-semibold text-slate-700 italic">
                &ldquo;Formando el hombre del futuro, educamos con amor, calidad y eficiencia.&rdquo;
              </p>
              <span className="block text-xs font-bold text-[#D51C28] mt-1 uppercase tracking-wider">
                La educación, ¡siempre adelante!
              </span>
            </div>

            {/* Subtítulo descriptivo */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Institución privada de Educación para el Trabajo y el Desarrollo Humano con licencias y resoluciones oficiales de la <strong>Secretaría de Educación Municipal de Montería</strong> y el <strong>Ministerio de Salud</strong>. Formación 50% teórica y 50% práctica con alta inserción laboral.
            </p>

            {/* Puntos Clave de Confianza */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Prácticas formativas y empresariales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Jornadas: Mañana, Tarde, Noche y Sábados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Crédito educativo directo sin bancos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Campus céntrico propio con 353 m²</span>
              </div>
            </div>

            {/* Botones de Acción / Conversión */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="#inscripciones"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white font-bold text-sm shadow-xl shadow-red-500/25 hover:shadow-2xl hover:brightness-105 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Asegurar mi Cupo 2026</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#programas"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-300 text-slate-800 font-bold text-sm hover:border-slate-400 hover:bg-slate-50 transition-all text-center shadow-xs"
              >
                Explorar los 6 Programas
              </Link>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Institucional de Acreditación */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-bl-full pointer-events-none"></div>

              <div className="space-y-6">
                
                {/* Cabecera Tarjeta */}
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D51C28] bg-red-50 px-2.5 py-1 rounded-md">
                    Garantía Institucional
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    Academia Frederick Floret
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Fundada en 1991 · Sede Centro Montería
                  </p>
                </div>

                {/* Métricas Reales */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-[#D51C28]">
                      <Award className="w-5 h-5" />
                      <span className="text-2xl font-black text-slate-900">34</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mt-1">Años de Servicio</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-blue-600">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-2xl font-black text-slate-900">6</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mt-1">Programas Técnicos</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Users className="w-5 h-5" />
                      <span className="text-2xl font-black text-slate-900">+2k</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mt-1">Egresados en Región</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Clock className="w-5 h-5" />
                      <span className="text-2xl font-black text-slate-900">4</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mt-1">Jornadas Flexibles</p>
                  </div>
                </div>

                {/* Resoluciones en viñeta */}
                <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 text-xs space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Avales Educativos Vigentes:
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px] leading-relaxed">
                    <li>• Licencia Funcionamiento No. 001514 (Nov 1991)</li>
                    <li>• Resolución Aprobación No. 0005315 (Oct 2001)</li>
                    <li>• Renovación SEM Montería Resolución No. 0990 (2022)</li>
                    <li>• Radicado MinSalud / MEN No. 200478261</li>
                  </ul>
                </div>

                {/* Sede y Dirección */}
                <div className="text-center pt-1">
                  <p className="text-xs text-slate-600">
                    📍 <strong>Sede Propia:</strong> Calle 27 #10-21 Barrio Centro, Montería
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
