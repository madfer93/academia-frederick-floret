import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Lock, CheckCircle2, ChevronRight, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Tratamiento y Protección de Datos Personales | Academia Frederick Floret',
  description: 'Lineamientos institucionales para la recolección, almacenamiento, uso y custodia de datos personales conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.',
};

export default function TratamientoDatosPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Header con Breadcrumbs */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/politicas" className="hover:text-white transition-colors">Políticas</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-red-400 font-bold">Tratamiento de Datos</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase">
            <Lock className="w-3.5 h-3.5" /> Ley Estatutaria 1581 de 2012
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Política de Tratamiento y Protección de Datos Personales
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-light">
            Vigente para aspirantes, estudiantes matriculados, egresados, docentes y visitantes de la Academia Frederick Floret en Montería, Córdoba.
          </p>
        </div>
      </section>

      {/* Contenido Jurídico Estructurado */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full text-slate-800 text-sm leading-relaxed space-y-8">
        
        {/* Identificación del Responsable */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D51C28]" />
            <span>1. Identificación del Responsable del Tratamiento</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <strong className="text-slate-900 block">Razón Social:</strong>
              <span>Academia Frederick Floret S.A.S.</span>
            </div>
            <div>
              <strong className="text-slate-900 block">Naturaleza:</strong>
              <span>Institución de Educación para el Trabajo y Desarrollo Humano (ETDH)</span>
            </div>
            <div>
              <strong className="text-slate-900 block">Licencia de Funcionamiento:</strong>
              <span>No. 001514 (Noviembre 1991) · Res. SEM 0990 de 2022</span>
            </div>
            <div>
              <strong className="text-slate-900 block">Domicilio Principal:</strong>
              <span>Calle 27 #10-21, Centro, Montería, Córdoba, Colombia</span>
            </div>
            <div>
              <strong className="text-slate-900 block">Correo Oficial de Protección de Datos:</strong>
              <a href="mailto:academiafrederickfloret@gmail.com" className="text-[#D51C28] hover:underline font-semibold">
                academiafrederickfloret@gmail.com
              </a>
            </div>
            <div>
              <strong className="text-slate-900 block">Línea Telefónica Oficial:</strong>
              <span>(+57) 320 520 6613</span>
            </div>
          </div>
        </div>

        {/* Marco Legal y Objeto */}
        <div className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">2. Marco Legal y Objeto</h2>
          <p className="text-slate-600">
            La presente política se formula en cumplimiento de los Artículos 15 y 20 de la Constitución Política de Colombia, la <strong>Ley Estatutaria 1581 de 2012</strong>, el <strong>Decreto Reglamentario 1377 de 2013</strong> (compilado en el Decreto Único 1074 de 2015) y demás normas concordantes expedidas por la Superintendencia de Industria y Comercio (SIC).
          </p>
          <p className="text-slate-600">
            Tiene por objeto garantizar la adecuada recolección, almacenamiento, uso, circulación, supresión y protección de los datos personales obtenidos a través de nuestros canales presenciales, portal web oficial y asistentes virtuales.
          </p>
        </div>

        {/* Finalidades del Tratamiento */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900">3. Finalidades del Tratamiento de los Datos</h2>
          <p className="text-slate-600">
            Los datos personales que nos suministra serán tratados exclusivamente para el cumplimiento de nuestra misión educativa y administrativa, incluyendo:
          </p>
          <ul className="space-y-2.5">
            {[
              'Gestionar la inscripción, admisión y matrícula en los programas técnicos laborales y cursos de extensión.',
              'Almacenar y sincronizar el historial académico en el Sistema de Información y Gestión Académica Q10 Soluciones.',
              'Coordinar el plan de pagos directos institucionales en 4 cuotas mensuales y facturación correspondiente.',
              'Gestionar la vinculación a prácticas formativas en clínicas, hospitales, farmacias y centros empresariales en convenio.',
              'Enviar notificaciones académicas, circulares, estados de cuenta y recordatorios vía WhatsApp, correo electrónico o llamadas.',
              'Alimentar el Asistente Virtual IA institucional para resolver dudas informativas en tiempo real de manera contextualizada.',
              'Reportar la información obligatoria requerida por el Ministerio de Educación Nacional, la Secretaría de Educación de Montería y el Ministerio de Salud y Protección Social.'
            ].map((fin, i) => (
              <li key={i} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/70 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{fin}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tratamiento de Datos Sensibles y Menores */}
        <div className="space-y-3 bg-amber-50/60 p-5 rounded-2xl border border-amber-200 text-amber-950">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>4. Datos Sensibles y Datos de Niños, Niñas y Adolescentes</span>
          </h3>
          <p className="text-xs leading-relaxed">
            La Academia podrá tratar datos biométricos (fotografías para carnetización) o de salud (antecedentes médicos para prácticas hospitalarias) con previa autorización explícita e informada. 
            Respecto a menores de 18 años (aspirantes de grado 9° o 16-17 años autorizados por la normatividad ETDH), la recolección se realiza con el consentimiento conjunto de sus padres o acudientes legales, velando en todo momento por su interés superior y derechos prevalentes.
          </p>
        </div>

        {/* Seguridad y Confidencialidad */}
        <div className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">5. Medidas de Seguridad de la Información</h2>
          <p className="text-slate-600">
            La Academia Frederick Floret implementa protocolos técnicos, humanos y administrativos de seguridad, tales como cifrado de conexiones SSL/TLS, autenticación de dos factores (2FA) para el personal administrativo, bases de datos blindadas en Supabase con políticas RLS (Row Level Security) y acuerdos estrictos de confidencialidad con todo el cuerpo docente y administrativo.
          </p>
        </div>

        {/* Vigencia */}
        <div className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">6. Vigencia de las Bases de Datos</h2>
          <p className="text-slate-600">
            Las bases de datos tendrán una vigencia equivalente al tiempo durante el cual subsistan las finalidades académicas y legales descritas, conservando el archivo histórico de calificaciones y certificaciones de egresados de conformidad con la reglamentación del Archivo General de la Nación y el Ministerio de Educación.
          </p>
        </div>

        {/* Canales de Consulta */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-red-400" />
            <span>¿Tienes dudas sobre esta política?</span>
          </h3>
          <p className="text-xs text-slate-300">
            Puedes radicar tus peticiones de información sobre tus datos ante nuestra Coordinación Administrativa escribiendo a <strong>academiafrederickfloret@gmail.com</strong> o visitando nuestra sede en Calle 27 #10-21, Montería.
          </p>
        </div>

      </section>

      <Footer />
    </main>
  );
}
