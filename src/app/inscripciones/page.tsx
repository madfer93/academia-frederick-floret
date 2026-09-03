import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import AdmissionForm from '@/components/AdmissionForm';
import Footer from '@/components/Footer';
import { CreditCard, FileCheck2, UserCheck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inscripciones y Admisiones 2026 | Academia Frederick Floret',
  description: 'Inscríbete online a carreras técnicas laborales en Montería. Facilidades de pago en 4 cuotas sin bancos ni intereses y crédito educativo directo.',
  alternates: {
    canonical: 'https://academia-frederick-floret.vercel.app/inscripciones',
  },
  openGraph: {
    title: 'Inscripciones y Admisiones 2026 | Academia Frederick Floret',
    description: 'Inscríbete online a carreras técnicas laborales en Montería. Facilidades de pago en 4 cuotas sin bancos ni intereses y crédito educativo directo.',
    url: 'https://academia-frederick-floret.vercel.app/inscripciones',
    type: 'website',
    locale: 'es_CO',
  },
};

const INSCRIPCIONES_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "name": "Admisiones e Inscripciones Academia Frederick Floret",
      "url": "https://academia-frederick-floret.vercel.app/inscripciones",
      "description": "Formulario de reserva de cupo y preinscripción para programas técnicos laborales en Montería."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuáles son los requisitos para inscribirme en un programa técnico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Haber aprobado mínimo 9º grado o ser bachiller graduado, presentar documento de identidad vigente (TI, CC o PPT) y tener 16 años cumplidos."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo funciona la financiación y el pago en cuotas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Puedes diferir el costo del semestre en 4 cuotas mensuales directas con la Academia, sin intermediación de bancos ni cobro de intereses."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuáles son los horarios de clase disponibles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Contamos con cuatro jornadas flexibles: Diurna Mañana (8:00 - 11:00 am), Diurna Tarde (2:00 - 5:00 pm), Nocturna (6:30 - 9:00 pm) y Sabatina (7:00 am - 5:00 pm)."
          }
        }
      ]
    }
  ]
};

export default function InscripcionesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      {/* Schema JSON-LD de Admisiones y FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(INSCRIPCIONES_SCHEMA) }}
      />

      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-3 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Admisiones Oficiales 2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Proceso de Inscripción y Matrícula
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Asegura tu cupo en la institución líder de formación técnica laboral de Montería. Formulario en línea, crédito directo institucional y facilidades de pago.
          </p>
        </div>
      </section>

      {/* Paso a paso de Admisión */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#D51C28] flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">1. Diligencia el Formulario</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingresa tus datos personales y selecciona el programa técnico y la jornada de tu preferencia en el formulario inferior.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">2. Validación y Entrevista</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nuestra Coordinación General (Isabel Cristina Petro) te contacta para validar requisitos académicos y agendar tu entrevista.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">3. Matrícula y Financiación</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Elige pagar tu semestre en cuotas mensuales directas sin intereses o aprovecha los descuentos socioeconómicos institucionales.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Formulario Supabase */}
      <AdmissionForm />

      <Footer />
    </main>
  );
}
