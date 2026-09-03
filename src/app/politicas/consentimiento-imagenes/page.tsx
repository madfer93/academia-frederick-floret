import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Camera, 
  ChevronRight, 
  ShieldCheck, 
  Video, 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  Mail,
  MapPin,
  HelpCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Tratamiento y Consentimiento de Uso de Imagen y Voz | Academia Frederick Floret',
  description: 'Lineamientos institucionales y autorización informada para la captación y publicación de fotografías y videos de prácticas académicas, simuladores clínicos y ceremonias.',
};

export default function ConsentimientoImagenesPage() {
  const PHOTO_USES = [
    {
      title: 'Talleres Prácticos y Simulación Clínica',
      icon: Camera,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      desc: 'Fotografías y clips de video que ilustran el entrenamiento de estudiantes en el laboratorio de simulación de enfermería, clínicas de salud oral y prácticas en aulas taller.'
    },
    {
      title: 'Ceremonias de Grado y Actos Solemnes',
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      desc: 'Registro fotográfico oficial de la imposición de cofias, juramento ético y entrega de títulos técnicos laborales a los egresados de la academia.'
    },
    {
      title: 'Divulgación Institucional y Académica',
      icon: Video,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      desc: 'Publicación en el portal web oficial, redes sociales institucionales (Instagram, Facebook, TikTok) y folletos informativos dirigidos a nuevos aspirantes.'
    },
    {
      title: 'Testimonios Vocacionales y de Éxito',
      icon: HeartHandshake,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      desc: 'Entrevistas voluntarias y testimonios en video de egresados que ya se encuentran laborando en clínicas y hospitales de la región de Córdoba.'
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
            <span className="text-amber-400 font-bold">Consentimiento de Imagen y Voz</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase">
            <Camera className="w-3.5 h-3.5" /> Ley 23 de 1982 y Ley 1581 de 2012
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Política de Tratamiento y Consentimiento de Uso de Imagen y Voz
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-light">
            Reglamento institucional sobre la captación, tratamiento y difusión de material audiovisual en las instalaciones y actividades de la Academia Frederick Floret.
          </p>
        </div>
      </section>

      {/* Contenido Jurídico */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full text-slate-800 text-sm leading-relaxed space-y-8">
        
        {/* Marco y Objeto */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span>1. Objeto y Alcance de la Autorización de Imagen</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            La <strong>Academia Frederick Floret S.A.S.</strong> informa que, en desarrollo de sus labores pedagógicas, celebraciones institucionales y campañas de divulgación comunitaria, realiza capturas fotográficas, grabaciones sonoras y audiovisuales de sus instalaciones y de las actividades desarrolladas por la comunidad académica.
          </p>
          <p className="text-slate-600 text-xs sm:text-sm">
            En acatamiento de la <strong>Ley 23 de 1982 (Derechos de Autor)</strong>, la <strong>Ley 1581 de 2012</strong> y la jurisprudencia constitucional colombiana sobre el derecho a la propia imagen, la captación y publicación de este material se realiza bajo estrictos principios de dignidad, respeto e interés pedagógico.
          </p>
        </div>

        {/* Finalidades Específicas */}
        <div className="space-y-4">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-amber-600" />
            <span>2. Finalidades Legítimas de Uso Audiovisual</span>
          </h2>
          <p className="text-xs text-slate-600">
            El material multimedia en el que aparezcan estudiantes, docentes o visitantes se destinará única y exclusivamente a:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PHOTO_USES.map((u, idx) => {
              const Icon = u.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-amber-300 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl border ${u.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{u.title}</h3>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {u.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Protección Especial de Menores de Edad */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>3. Protección Especial de Menores de Edad (Adolescentes entre 16 y 17 años)</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            En cumplimiento del <strong>Código de la Infancia y la Adolescencia (Ley 1098 de 2006)</strong> y el artículo 7 de la Ley 1581 de 2012:
          </p>
          <ul className="space-y-2 text-xs text-amber-900">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Para los estudiantes menores de edad matriculados en programas técnicos laborales, se exige la <strong>firma expresa y por escrito de la autorización de uso de imagen por parte de sus padres o acudientes legales</strong> en el formulario de matrícula física.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Bajo ninguna circunstancia se difundirán imágenes que menoscaben la honra, intimidad o desarrollo armónico integral del menor.
              </span>
            </li>
          </ul>
        </div>

        {/* Carácter No Oneroso y Procedimiento de Retiro */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-700" />
            <span>4. Carácter Gratuito y Procedimiento para Solicitar el Retiro de Fotografías</span>
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            La autorización otorgada por el titular no confiere derecho a contraprestación económica alguna ni genera relación laboral o societaria con Frederick Floret S.A.S.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Si un estudiante, egresado o acudiente desea que una fotografía o video en el que aparece su imagen sea <strong>retirado o despublicado</strong> del portal web o de las redes sociales institucionales, podrá solicitarlo en cualquier momento sin necesidad de justificación especial:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Mail className="w-4 h-4 text-[#D51C28]" />
              <span>Canal de Solicitud de Despublicación:</span>
            </div>
            <p>
              Envía un correo a <a href="mailto:academiafrederickfloret@gmail.com" className="text-[#D51C28] font-bold hover:underline">academiafrederickfloret@gmail.com</a> con el asunto <strong>&quot;Solicitud de Retiro de Imagen Digital&quot;</strong>, adjuntando el enlace o captura de la publicación. Nuestro equipo digital procesará el retiro en un plazo máximo de cinco (5) días hábiles.
            </p>
          </div>
        </div>

        {/* Botones de Navegación */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-200 text-xs">
          <Link 
            href="/politicas/uso-ia-iso-42001" 
            className="text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1.5"
          >
            ← Anterior: Gobernanza de IA (ISO 42001)
          </Link>
          <Link 
            href="/politicas" 
            className="text-[#D51C28] hover:underline font-bold inline-flex items-center gap-1.5"
          >
            Volver al Centro de Políticas →
          </Link>
        </div>

      </section>

      <Footer />
    </main>
  );
}
