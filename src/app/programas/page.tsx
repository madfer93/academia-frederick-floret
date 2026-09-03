import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ProgramsSection from '@/components/ProgramsSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Programas Técnicos Laborales | Academia Frederick Floret Montería',
  description: 'Conoce nuestra oferta académica en Salud y Administración: Enfermería, Salud Oral, Farmacia, Administrativo en Salud, Salud Pública y Auxiliar Organizacional.',
};

export default function ProgramasPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Header Banner de la página */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
              <GraduationCap className="w-3.5 h-3.5" /> Programas Oficiales ETDH
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Oferta Académica y Formación Técnica Laboral
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Programas aprobados con resolución de la Secretaría de Educación de Montería y concepto de MinSalud. Diseñados con 50% de horas prácticas para inserción laboral rápida.
            </p>
          </div>

          <Link
            href="/inscripciones"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white font-bold text-xs shadow-xl shadow-red-500/25 hover:brightness-105 transition-all flex items-center gap-2 shrink-0"
          >
            <span>Reservar Cupo en Línea</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Listado Completo con Filtros */}
      <ProgramsSection />

      <Footer />
    </main>
  );
}
