import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Award, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nuestra Institución | 35 Años de Trayectoria en Montería',
  description: 'Conoce la historia, misión, modelo pedagógico y marco normativo de la Academia Frederick Floret en Montería, fundada el 18 de noviembre de 1991.',
  alternates: {
    canonical: 'https://academia-frederick-floret.vercel.app/nosotros',
  },
  openGraph: {
    title: 'Nuestra Institución | 35 Años de Trayectoria en Montería',
    description: 'Conoce la historia, misión, modelo pedagógico y marco normativo de la Academia Frederick Floret en Montería, fundada el 18 de noviembre de 1991.',
    url: 'https://academia-frederick-floret.vercel.app/nosotros',
    type: 'website',
    locale: 'es_CO',
  },
};

const NOSOTROS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Acerca de la Academia Frederick Floret",
  "url": "https://academia-frederick-floret.vercel.app/nosotros",
  "mainEntity": {
    "@type": "EducationalOrganization",
    "name": "Academia Frederick Floret S.A.S.",
    "foundingDate": "1991-11-18",
    "description": "Institución de Educación para el Trabajo y el Desarrollo Humano en Montería con licencias No. 001514 y Resolución SEM 0990 de 2022.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle 27 No. 10 - 21 Barrio Centro",
      "addressLocality": "Montería",
      "addressRegion": "Córdoba",
      "addressCountry": "CO"
    },
    "slogan": "Formando el hombre del futuro, educamos con amor, calidad y eficiencia",
    "knowsAbout": ["Auxiliar en Enfermería", "Auxiliar en Salud Oral", "Servicios Farmacéuticos", "Auxiliar Administrativo Organizacional"]
  }
};

export default function NosotrosPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      {/* Schema JSON-LD AboutPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NOSOTROS_SCHEMA) }}
      />

      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-3 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <Award className="w-3.5 h-3.5" /> Trayectoria Desde 1991
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            35 Años Educando con Amor, Calidad y Eficiencia
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Nuestra institución se consolidó como el referente de formación técnica laboral de Montería y Córdoba, articulando la teoría con la práctica ocupacional directa.
          </p>
        </div>
      </section>

      {/* Sección Institucional */}
      <AboutSection />

      {/* Marco Normativo y Legal Oficial */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D51C28]">
              Marco Jurídico y Reglamentario
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Sustento Legal y Aprobaciones del Estado Colombiano
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              La Academia Frederick Floret opera bajo los más rigurosos estándares de la Ley General de Educación (Ley 115 de 1994), Ley 1064 de 2006 y el Decreto Único Reglamentario 1075 de 2015 del Ministerio de Educación Nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Scale className="w-4 h-4 text-[#D51C28]" />
                Licencia Fundacional
              </div>
              <p className="text-slate-600 leading-relaxed">
                Licencia de funcionamiento No. 001514 del 18 de noviembre de 1991, expedida por la Secretaría de Educación Departamental de Córdoba.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Aprobación Oficial
              </div>
              <p className="text-slate-600 leading-relaxed">
                Aprobada en Resolución N.º 0005315 del 25 de octubre de 2001 por la Secretaría de Educación y Cultura Departamental.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Renovación SEM
              </div>
              <p className="text-slate-600 leading-relaxed">
                Resolución No. 0990 del 27 de julio de 2022 emitida por la Secretaría de Educación Municipal de Montería (Córdoba).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Award className="w-4 h-4 text-amber-600" />
                Aval MinSalud / MEN
              </div>
              <p className="text-slate-600 leading-relaxed">
                Radicado 200478261 de la Comisión Intersectorial del Talento Humano en Salud del Ministerio de Salud y Protección Social y MEN.
              </p>
            </div>

          </div>

          <div className="p-6 rounded-2xl bg-red-50/60 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">¿Deseas conocer más sobre nuestras admisiones?</h4>
              <p className="text-xs text-slate-600">Nuestro equipo docente y administrativo te acompaña en todo el proceso.</p>
            </div>
            <Link
              href="/inscripciones"
              className="px-6 py-3 rounded-xl bg-[#D51C28] text-white font-bold text-xs hover:bg-red-700 transition-colors shrink-0"
            >
              Iniciar Inscripción
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
