import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  FileText, 
  Cpu, 
  Camera, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  BookOpen,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Centro de Transparencia, Políticas y Privacidad | Academia Frederick Floret',
  description: 'Conoce nuestras políticas de tratamiento de datos personales (Ley 1581), Habeas Data, gobernanza ética de Inteligencia Artificial (ISO 42001) y uso de imágenes.',
};

export default function PoliticasHubPage() {
  const POLICIES = [
    {
      title: 'Tratamiento y Protección de Datos Personales',
      badge: 'Ley 1581 de 2012',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Lock,
      iconBg: 'from-blue-600 to-indigo-600',
      desc: 'Principios rectores, finalidades de recolección de aspirantes y estudiantes, medidas de seguridad cibernética y vigencia de las bases de datos.',
      href: '/politicas/tratamiento-datos',
      normas: ['Ley 1581 de 2012', 'Decreto 1377 de 2013', 'Circular SIC']
    },
    {
      title: 'Habeas Data & Ejercicio de Derechos ARCO',
      badge: 'Derecho Fundamental',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Scale,
      iconBg: 'from-emerald-600 to-teal-600',
      desc: 'Mecanismos y canales oficiales para que titulares puedan Conocer, Actualizar, Rectificar o Suprimir sus datos personales ante la institución.',
      href: '/politicas/habeas-data',
      normas: ['Artículo 15 Constitución Política', 'Tiempos de respuesta ARCO (10 a 15 días)', 'Canal Oficial de Peticiones']
    },
    {
      title: 'Gobernanza Ética y Uso de IA',
      badge: 'Norma ISO/IEC 42001:2023',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Cpu,
      iconBg: 'from-purple-600 to-pink-600',
      desc: 'Marco de gestión y uso ético del Asistente Virtual IA (FloretBot). Principios de transparencia, supervisión humana continua, cero discriminación y anti-alucinaciones.',
      href: '/politicas/uso-ia-iso-42001',
      normas: ['AIMS ISO/IEC 42001', 'Supervisión Humana (HITL)', 'Trazabilidad y No Discriminación']
    },
    {
      title: 'Consentimiento de Imágenes y Derechos de Autor',
      badge: 'Ley 23 de 1982',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Camera,
      iconBg: 'from-amber-600 to-orange-600',
      desc: 'Autorización y lineamientos para la captación, tratamiento y difusión de fotografías y videos institucionales en prácticas clínicas y ceremonias académicas.',
      href: '/politicas/consentimiento-imagenes',
      normas: ['Ley 23 de 1982', 'Protección de Menores de Edad', 'Fines Exclusivamente Académicos']
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Header Institucional */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-[#041933] text-white py-16 sm:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D51C28_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/15 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Marco de Cumplimiento Normativo &amp; Transparencia</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Políticas Institucionales, Privacidad y Gobernanza de IA
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            En la <strong>Academia Frederick Floret</strong> garantizamos la protección de tus derechos fundamentales, la estricta custodia de tus datos y la implementación de Inteligencia Artificial ética bajo estándares internacionales.
          </p>
        </div>
      </section>

      {/* Grid de Políticas */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {POLICIES.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${p.iconBg} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-[#D51C28] transition-colors tracking-tight">
                      {p.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Aspectos Clave:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {p.normas.map((n, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-4">
                  <Link
                    href={p.href}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-[#D51C28] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm group-hover:shadow-md"
                  >
                    <span>Consultar Política Completa</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Declaración de Compromiso Institucional */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D51C28] to-[#FF8C01] text-white flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <h3 className="text-base font-black text-slate-900">
              Compromiso con la Ética Educativa y la Privacidad de Montería
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              La Academia Frederick Floret dispone de un Oficial de Protección de Datos y un Comité de Ética Digital para resolver cualquier requerimiento en un término no mayor a 10 días hábiles.
            </p>
          </div>
          <a
            href="mailto:academiafrederickfloret@gmail.com?subject=Consulta%20Oficial%20sobre%20Tratamiento%20de%20Datos%20y%20Privacidad"
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-900 text-slate-800 text-xs font-bold transition-colors whitespace-nowrap"
          >
            Contactar Oficial de Datos
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
