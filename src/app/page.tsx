import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  HeartPulse, 
  Smile, 
  Pill, 
  FileSpreadsheet, 
  ShieldPlus, 
  Briefcase, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Building2 
} from 'lucide-react';

const QUICK_PROGRAMS = [
  {
    titulo: 'Auxiliar en Enfermería',
    categoria: 'Área Salud',
    color: '#D51C28',
    icon: <HeartPulse className="w-5 h-5 text-white" />,
    desc: 'Cuidado directo, asistencia clínica, toma de muestras y apoyo quirúrgico.'
  },
  {
    titulo: 'Auxiliar en Salud Oral',
    categoria: 'Área Salud',
    color: '#169CD9',
    icon: <Smile className="w-5 h-5 text-white" />,
    desc: 'Asistencia odontológica, esterilización, higiene bucal y consultorios privados.'
  },
  {
    titulo: 'Servicios Farmacéuticos',
    categoria: 'Área Salud',
    color: '#0A8640',
    icon: <Pill className="w-5 h-5 text-white" />,
    desc: 'Dispensación técnica, control de inventarios y normatividad Invima.'
  },
  {
    titulo: 'Educación Primera Infancia',
    categoria: 'Área Comercial',
    color: '#8B5CF6',
    icon: <GraduationCap className="w-5 h-5 text-white" />,
    desc: 'Apoyo pedagógico y desarrollo integral en jardines, preescolares y CDIs.'
  },
  {
    titulo: 'Contable y Financiero',
    categoria: 'Área Comercial',
    color: '#1E40AF',
    icon: <FileSpreadsheet className="w-5 h-5 text-white" />,
    desc: 'Cuentas por pagar, liquidación de nómina, conciliación y compras.'
  },
  {
    titulo: 'Marketing y Comunicación',
    categoria: 'Área Comercial',
    color: '#15803D',
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
    desc: 'Marketing digital, ventas comerciales, publicidad y atención al cliente.'
  },
  {
    titulo: 'Deporte y Recreación',
    categoria: 'Área Comercial',
    color: '#D97706',
    icon: <HeartPulse className="w-5 h-5 text-white" />,
    desc: 'Acondicionamiento físico, escuelas deportivas y centros recreacionales.'
  },
  {
    titulo: 'Administrativo Organizacional',
    categoria: 'Área Comercial',
    color: '#334155',
    icon: <Briefcase className="w-5 h-5 text-white" />,
    desc: 'Gestión empresarial, talento humano, nómina, servicio al cliente y 660 horas.'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 relative">
      <Navbar />

      {/* Hero Principal */}
      <Hero />

      {/* Resumen de Programas Técnicos (Conciso y Directo) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D51C28]">
                Formación Técnica Laboral
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Nuestros 8 Programas Técnicos Laborales
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                3 semestres de formación presencial con 50% de horas prácticas orientadas a las exigencias laborales de Montería.
              </p>
            </div>

            <Link
              href="/programas"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D51C28] hover:text-red-700 transition-colors shrink-0"
            >
              <span>Ver pensum y requisitos completos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grilla rápida de los 6 programas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {QUICK_PROGRAMS.map((prog, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#D51C28]/40 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: prog.color }}
                    >
                      {prog.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                      {prog.categoria}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#D51C28] transition-colors leading-snug">
                    {prog.titulo}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">Duración: 3 Semestres</span>
                  <Link
                    href="/programas"
                    className="text-xs font-bold text-slate-900 group-hover:text-[#D51C28] flex items-center gap-1"
                  >
                    Detalles
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/programas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-[#D51C28] text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>Explorar Catálogo Completo de Programas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Por qué Elegirnos (4 Pilares Clave) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D51C28]">
              Ventajas Institucionales
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              ¿Por Qué Estudiar en Frederick Floret?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Formamos con altos estándares técnicos, acompañamiento personalizado y flexibilidad real.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <ShieldCheck className="w-7 h-7 text-[#D51C28]" />
              <h3 className="font-bold text-slate-900 text-sm">35 Años de Respaldo</h3>
              <p className="text-slate-600 leading-relaxed">
                Licencia de funcionamiento 001514 y aval del Ministerio de Salud. Más de dos mil técnicos graduados.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <GraduationCap className="w-7 h-7 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Portal Académico Q10</h3>
              <p className="text-slate-600 leading-relaxed">
                Seguimiento de notas, módulos y asistencia en tiempo real desde celular o computador para cada alumno.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <Clock className="w-7 h-7 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">4 Jornadas a Elección</h3>
              <p className="text-slate-600 leading-relaxed">
                Estudia en jornada mañana, tarde, nocturna o sábados todo el día sin descuidar tu empleo o responsabilidades.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <Building2 className="w-7 h-7 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Sede Propia Centro</h3>
              <p className="text-slate-600 leading-relaxed">
                Edificio de 3 pisos en la Calle 27 #10-21 con 353 m², sala de 80 computadores y laboratorios prácticos.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Banner CTA Final a Admisiones */}
      <section className="py-14 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              ¡Cupos Limitados para el Ciclo 2026!
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Inicia tu Carrera Técnica en Montería Hoy Mismo
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Diligencia tu preinscripción en línea en menos de dos minutos y reserva tu cupo con facilidades de pago en cuotas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/inscripciones"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white font-bold text-xs shadow-xl shadow-red-500/25 hover:brightness-105 transition-all text-center"
            >
              Ir a Inscripciones Online
            </Link>
            <Link
              href="/sede"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-all text-center"
            >
              Conocer la Sede
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
