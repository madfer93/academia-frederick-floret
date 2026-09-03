import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import AdmissionForm from '@/components/AdmissionForm';
import Footer from '@/components/Footer';
import { CreditCard, FileCheck2, UserCheck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inscripciones y Admisiones 2026 | Academia Frederick Floret Montería',
  description: 'Diligencia tu formulario de inscripción online para programas técnicos en salud y administración en Montería. Pagos en cuotas directas sin bancos.',
};

export default function InscripcionesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
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
