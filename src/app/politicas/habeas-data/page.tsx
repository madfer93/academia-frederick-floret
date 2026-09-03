import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Scale, 
  ChevronRight, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  FileText, 
  AlertCircle,
  HelpCircle,
  Send
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Habeas Data & Derechos ARCO | Academia Frederick Floret',
  description: 'Procedimientos y canales oficiales para ejercer tus derechos de Conocer, Actualizar, Rectificar y Suprimir tus datos personales ante Frederick Floret S.A.S.',
};

export default function HabeasDataPage() {
  const ARCO_RIGHTS = [
    {
      acronym: 'A',
      name: 'Acceso (Conocer)',
      desc: 'Derecho a solicitar de manera gratuita información sobre si tus datos personales están siendo tratados por la institución, su origen y las finalidades aplicadas.'
    },
    {
      acronym: 'R',
      name: 'Rectificación (Actualizar)',
      desc: 'Derecho a solicitar la corrección de datos inexactos, incompletos, fraccionados o que induzcan a error (como números telefónicos, direcciones o nombres erróneos).'
    },
    {
      acronym: 'C',
      name: 'Cancelación (Supresión)',
      desc: 'Derecho a solicitar la eliminación de tus datos de nuestras bases cuando consideres que no están siendo tratados conforme a la ley o hayan dejado de ser necesarios para la finalidad educativa.'
    },
    {
      acronym: 'O',
      name: 'Oposición (Revocatoria)',
      desc: 'Derecho a oponerte al tratamiento de tus datos o a revocar la autorización otorgada para finalidades secundarias (por ejemplo, recepción de promociones o campañas de marketing).'
    }
  ];

  const PROCEDURES = [
    {
      step: '1',
      title: 'Presentación de la Solicitud',
      desc: 'El titular o su apoderado debidamente acreditado debe remitir la solicitud por escrito al correo oficial o mediante radicado físico en nuestra sede central.'
    },
    {
      step: '2',
      title: 'Revisión y Requisitos',
      desc: 'La solicitud debe incluir: Nombre completo, número de documento de identidad, dirección física o electrónica para notificación, descripción clara de los hechos y la pretensión concreta.'
    },
    {
      step: '3',
      title: 'Términos Legales de Respuesta',
      desc: 'Consultas: Plazo máximo de diez (10) días hábiles. Reclamos (actualización, supresión o revocatoria): Plazo máximo de quince (15) días hábiles (Ley 1581 de 2012, Art. 14 y 15).'
    }
  ];

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
            <span className="text-emerald-400 font-bold">Habeas Data &amp; Derechos ARCO</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase">
            <Scale className="w-3.5 h-3.5" /> Artículo 15 de la Constitución Política
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Manual de Habeas Data &amp; Procedimiento de Derechos ARCO
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-light">
            Garantías y conductos oficiales para la protección efectiva de la autodeterminación informativa de aspirantes, alumnos, egresados y colaboradores de Frederick Floret S.A.S.
          </p>
        </div>
      </section>

      {/* Contenido Jurídico */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full text-slate-800 text-sm leading-relaxed space-y-8">
        
        {/* Introducción */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            <span>1. Fundamento Constitucional del Derecho al Habeas Data</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            En concordancia con el <strong>Artículo 15 de la Constitución Política de Colombia</strong> y las leyes estatutarias <strong>1266 de 2008 y 1581 de 2012</strong>, todas las personas tienen derecho a su intimidad personal y familiar, a su buen nombre, y a <strong>conocer, actualizar y rectificar</strong> las informaciones que se hayan recogido sobre ellas en bancos de datos y en archivos de entidades públicas y privadas.
          </p>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Frederick Floret S.A.S.</strong> reconoce este derecho como un pilar inquebrantable de transparencia institucional, garantizando un conducto ágil, gratuito y seguro para el trámite de peticiones, quejas y reclamos de datos personales.
            </span>
          </div>
        </div>

        {/* Derechos ARCO Desglosados */}
        <div className="space-y-4">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>2. Catálogo de Derechos ARCO Exigibles por el Titular</span>
          </h2>
          <p className="text-xs text-slate-600">
            Como titular de datos personales registrados en nuestros sistemas académicos (incluyendo Q10 Académico y bases de contacto del Asistente IA), puedes ejercer en cualquier momento:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARCO_RIGHTS.map((item) => (
              <div 
                key={item.acronym}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    {item.acronym}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Procedimiento y Plazos de Respuesta */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>3. Procedimiento para Radicar Consultas y Reclamos</span>
          </h2>
          
          <div className="space-y-4">
            {PROCEDURES.map((p) => (
              <div key={p.step} className="flex gap-3.5 items-start">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {p.step}
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{p.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Importante sobre la Supresión de Datos Académicos</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              La solicitud de supresión de la información no procederá cuando el titular tenga un deber legal o contractual de permanecer en la base de datos institucional (por ejemplo, historial de calificaciones oficiales, actas de grado y registros que deban reportarse obligatoriamente ante la Secretaría de Educación de Montería o el Ministerio de Educación Nacional según Decreto 1075 de 2015).
            </p>
          </div>
        </div>

        {/* Canales Oficiales de Recepción */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <Send className="w-5 h-5" />
            <span>4. Canales Exclusivos para Radicación de Peticiones Habeas Data</span>
          </h2>
          <p className="text-xs text-slate-300">
            Para que tu solicitud sea válida, debe ser remitida a través de uno de los siguientes medios institucionales:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <Mail className="w-4 h-4 text-emerald-400" />
              <strong className="block text-white">Correo Oficial</strong>
              <a href="mailto:academiafrederickfloret@gmail.com" className="text-emerald-300 hover:underline break-all">
                academiafrederickfloret@gmail.com
              </a>
              <span className="text-[10px] text-slate-400 block">(Asunto: Petición Habeas Data - ARCO)</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              <strong className="block text-white">Línea Telefónica</strong>
              <span className="text-slate-200 block">(+57) 320 520 6613</span>
              <span className="text-[10px] text-slate-400 block">Lunes a Viernes 8:00 AM - 5:00 PM</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <strong className="block text-white">Radicación Física</strong>
              <span className="text-slate-200 block">Calle 27 #10-21, Centro</span>
              <span className="text-[10px] text-slate-400 block">Montería, Córdoba, Colombia</span>
            </div>
          </div>
        </div>

        {/* Botón de Retorno */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-200 text-xs">
          <Link 
            href="/politicas" 
            className="text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1.5"
          >
            ← Volver al Centro de Políticas
          </Link>
          <Link 
            href="/politicas/uso-ia-iso-42001" 
            className="text-purple-600 hover:text-purple-800 font-bold inline-flex items-center gap-1.5"
          >
            Siguiente: Gobernanza de IA (ISO 42001) →
          </Link>
        </div>

      </section>

      <Footer />
    </main>
  );
}
