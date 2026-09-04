import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ProgramsSection from '@/components/ProgramsSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Programas Técnicos Laborales en Montería | Frederick Floret',
  description: 'Estudia Enfermería, Salud Oral, Farmacia, Administrativo en Salud y Gestión en Montería. Formación práctica de 3 semestres y créditos directos.',
  alternates: {
    canonical: 'https://academia-frederick-floret.vercel.app/programas',
  },
  openGraph: {
    title: 'Programas Técnicos Laborales en Montería | Frederick Floret',
    description: 'Estudia Enfermería, Salud Oral, Farmacia, Administrativo en Salud y Gestión en Montería. Formación práctica de 3 semestres y créditos directos.',
    url: 'https://academia-frederick-floret.vercel.app/programas',
    type: 'website',
    locale: 'es_CO',
  },
};

const PROGRAMS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Programas Técnicos Laborales de Academia Frederick Floret",
  "itemListElement": [
    {
      "@type": "EducationalOccupationalProgram",
      "position": 1,
      "name": "Técnico Laboral en Auxiliar en Enfermería",
      "description": "Formación clínica y asistencial para cuidado de pacientes, administración de medicamentos y apoyo en urgencias y cirugía.",
      "educationalCredentialAwarded": "Certificado de Aptitud Ocupacional de Técnico Laboral",
      "timeToComplete": "P18M",
      "occupationalCategory": "3221 - Auxiliares de Enfermería",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Academia Frederick Floret",
        "url": "https://academia-frederick-floret.vercel.app"
      }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "position": 2,
      "name": "Técnico Laboral en Auxiliar en Salud Oral",
      "description": "Asistencia clínica odontológica, preparación de biomateriales dentales y esterilización de instrumental.",
      "educationalCredentialAwarded": "Certificado de Aptitud Ocupacional de Técnico Laboral",
      "timeToComplete": "P18M",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Academia Frederick Floret",
        "url": "https://academia-frederick-floret.vercel.app"
      }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "position": 3,
      "name": "Técnico Laboral en Auxiliar en Servicios Farmacéuticos",
      "description": "Dispensación de medicamentos, control de inventarios técnicos y normatividad sanitaria Invima.",
      "educationalCredentialAwarded": "Certificado de Aptitud Ocupacional de Técnico Laboral",
      "timeToComplete": "P18M",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Academia Frederick Floret",
        "url": "https://academia-frederick-floret.vercel.app"
      }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "position": 4,
      "name": "Técnico Laboral en Auxiliar de Educación para la Primera Infancia",
      "description": "Apoyo en actividades educativas bajo la supervisión de un educador infantil, orientadas a promover el desarrollo integral en la educación inicial y preescolar.",
      "educationalCredentialAwarded": "Certificado de Aptitud Ocupacional de Técnico Laboral",
      "timeToComplete": "P18M",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Academia Frederick Floret",
        "url": "https://academia-frederick-floret.vercel.app"
      }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "position": 5,
      "name": "Técnico Laboral en Auxiliar Contable y Financiero",
      "description": "Medición y reconocimiento de transacciones contables, conciliaciones bancarias, liquidación de nómina, impuestos y costos empresariales.",
      "educationalCredentialAwarded": "Certificado de Aptitud Ocupacional de Técnico Laboral",
      "timeToComplete": "P18M",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Academia Frederick Floret",
        "url": "https://academia-frederick-floret.vercel.app"
      }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "position": 6,
      "name": "Técnico Laboral en Asistentes de Marketing y Comunicación",
      "description": "Apoyo en departamentos de mercadeo, publicidad, diseño de campañas de comunicación corporativa y servicio al cliente.",
      "educationalCredentialAwarded": "Certificado de Aptitud Ocupacional de Técnico Laboral",
      "timeToComplete": "P18M",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Academia Frederick Floret",
        "url": "https://academia-frederick-floret.vercel.app"
      }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "position": 7,
      "name": "Técnico Laboral en Auxiliar en Deporte y Recreación",
      "description": "Entrenamiento físico, preparación deportiva, dirección de grupos recreativos y fomento de hábitos de vida saludable.",
      "educationalCredentialAwarded": "Certificado de Aptitud Ocupacional de Técnico Laboral",
      "timeToComplete": "P18M",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Academia Frederick Floret",
        "url": "https://academia-frederick-floret.vercel.app"
      }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "position": 8,
      "name": "Técnico Laboral en Auxiliar Administrativo Organizacional",
      "description": "Gestión empresarial, servicio al cliente, apoyo contable, nómina y talento humano con 660 horas certificadas.",
      "educationalCredentialAwarded": "Certificado de Aptitud Ocupacional de Técnico Laboral",
      "timeToComplete": "P18M",
      "occupationalCategory": "1341 - Asistentes y Auxiliares Administrativos",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Academia Frederick Floret",
        "url": "https://academia-frederick-floret.vercel.app"
      }
    }
  ]
};

export default function ProgramasPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      {/* Schema JSON-LD de Programas Educativos */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PROGRAMS_SCHEMA) }}
      />

      <Navbar />

      {/* Header Banner */}
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
