import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Cpu, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  FileCheck,
  RefreshCw,
  Scale
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Gobernanza y Uso Ético de Inteligencia Artificial | ISO/IEC 42001 | Academia Frederick Floret',
  description: 'Marco institucional de gobernanza ética, transparencia y gestión de riesgos en el despliegue de Inteligencia Artificial (FloretBot) conforme a la norma ISO/IEC 42001:2023.',
};

export default function UsoIAPage() {
  const ISO_PILLARS = [
    {
      title: 'Transparencia & Divulgación Obligatoria',
      icon: Eye,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      desc: 'Todo usuario que interactúe con nuestro Asistente Virtual (FloretBot) es expresamente notificado de que conversa con un modelo de Inteligencia Artificial y no con una persona natural. Las respuestas generadas están debidamente identificadas.'
    },
    {
      title: 'Supervisión Humana Activa (Human-in-the-Loop)',
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      desc: 'La IA no adopta decisiones disciplinarias, académicas vinculantes ni aprobaciones finales de títulos de manera autónoma. Toda información crítica o registro de matrícula es revisada, validada y formalizada por la Coordinación Académica.'
    },
    {
      title: 'Equidad Algorítmica y Cero Discriminación',
      icon: Scale,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      desc: 'Nuestros modelos operan bajo estrictas restricciones de imparcialidad, garantizando un trato digno, respetuoso y equitativo sin distinción de género, raza, origen social, creencias religiosas o capacidad socioeconómica.'
    },
    {
      title: 'Veracidad y Mitigación de Alucinaciones',
      icon: FileCheck,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      desc: 'El conocimiento del asistente está anclado en datos institucionales oficiales (Resoluciones de la Secretaría de Educación de Montería, mallas curriculares de los 6 programas de salud, valores de matrícula y requisitos legales verificables).'
    },
    {
      title: 'Privacidad y Minimización de Datos',
      icon: Lock,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      desc: 'Aplicamos el principio de recolección mínima necesaria. No se suministran datos sensibles (como historias clínicas o datos biométricos) para el entrenamiento de modelos de lenguaje públicos.'
    },
    {
      title: 'Monitoreo, Auditoría y Mejora Continua',
      icon: RefreshCw,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      desc: 'Conforme a la cláusula de mejora continua de ISO 42001, las interacciones son auditadas periódicamente para evaluar la precisión del lenguaje, descartar sesgos y optimizar la experiencia de aspirantes y estudiantes.'
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
            <span className="text-purple-400 font-bold">Gobernanza Ética de IA (ISO 42001)</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold uppercase">
            <Cpu className="w-3.5 h-3.5" /> Estándar Internacional ISO/IEC 42001:2023 (AIMS)
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Política de Gobernanza y Uso Ético de Inteligencia Artificial
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-light">
            Marco normativo institucional para el desarrollo, despliegue y supervisión ética de herramientas de Inteligencia Artificial en la Academia Frederick Floret.
          </p>
        </div>
      </section>

      {/* Contenido Jurídico */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full text-slate-800 text-sm leading-relaxed space-y-8">
        
        {/* Propósito y Marco ISO 42001 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Compromiso de Innovación Responsable</span>
          </div>
          <h2 className="text-lg font-black text-slate-900">
            1. Adopción del Estándar Internacional ISO/IEC 42001:2023
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            La <strong>Academia Frederick Floret S.A.S.</strong>, como institución pionera en educación técnica laboral en el Departamento de Córdoba, integra tecnologías de Inteligencia Artificial (IA) para enriquecer la orientación al aspirante, la atención al estudiante y la automatización de procesos administrativos.
          </p>
          <p className="text-slate-600 text-xs sm:text-sm">
            Para garantizar que dicha adopción se realice bajo los más altos estándares éticos, de ciberseguridad y de respeto irrestricto a la dignidad humana, acogemos las directrices del <strong>Sistema de Gestión de Inteligencia Artificial (Artificial Intelligence Management System - AIMS) bajo la norma ISO/IEC 42001:2023</strong> y los lineamientos del Conpes 3975 de Colombia sobre Inteligencia Artificial.
          </p>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-purple-900 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <span>
              <strong>Finalidad del Sistema:</strong> Asegurar la trazabilidad algorítmica, la explicabilidad ante los usuarios, la protección de derechos fundamentales y el establecimiento de controles efectivos frente a los riesgos de sesgos o imprecisiones en los sistemas de IA institucionales.
            </span>
          </div>
        </div>

        {/* Pilares Éticos ISO 42001 */}
        <div className="space-y-4">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            <span>2. Principios Rectores y Controles Operativos</span>
          </h2>
          <p className="text-xs text-slate-600">
            El diseño y operación de nuestro asistente virtual <strong>FloretBot</strong> y demás herramientas automatizadas se rigen obligatoriamente por los siguientes principios:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ISO_PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-purple-300 transition-colors space-y-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl border ${p.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{p.title}</h3>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Límites de la IA y Derecho a Hablar con un Humano */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>3. Límites Operativos y Derecho a Escalamiento Humano</span>
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            De acuerdo con el principio de explicabilidad y control humano, el usuario tiene pleno derecho a:
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>No ser juzgado por algoritmos:</strong> La admisión, otorgamiento de becas, calificaciones y certificación académica son potestad exclusiva del personal docente y directivo de la institución.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Transferencia a un asesor humano en cualquier instante:</strong> Si el usuario tiene dudas complejas, reclamos o prefiere ser atendido por un funcionario, puede solicitarlo en el chat o comunicarse directamente al WhatsApp oficial (+57 320 520 6613).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Reportar respuestas erróneas:</strong> Cualquier inconsistencia en costos, horarios o planes curriculares generada por el bot puede ser notificada para corrección inmediata de las bases de conocimiento.</span>
            </li>
          </ul>
        </div>

        {/* Uso de IA en el Aula por Estudiantes y Docentes */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>4. Lineamientos Éticos para Estudiantes en Prácticas y Clases</span>
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            En los programas de la salud (Auxiliar en Enfermería, Salud Oral, Farmacia, Salud Pública, Administrativo en Salud), la destreza clínica y el juicio profesional son insustituibles:
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
            <p>
              • <strong>Prohibición en Prácticas Hospitalarias:</strong> Está prohibido el uso de herramientas de IA generativa para la redacción de registros clínicos o toma de signos vitales reales sin la supervisión directa del docente tutor en clínicas u hospitales conveniados.
            </p>
            <p>
              • <strong>Criterio Pedagógico y Honestidad Académica:</strong> Las herramientas de IA podrán ser utilizadas como apoyo al autoaprendizaje, siempre y cuando se declare su uso y se respete la autoría intelectual propia en talleres y exámenes.
            </p>
          </div>
        </div>

        {/* Botones de Navegación */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-200 text-xs">
          <Link 
            href="/politicas/habeas-data" 
            className="text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1.5"
          >
            ← Anterior: Habeas Data (ARCO)
          </Link>
          <Link 
            href="/politicas/consentimiento-imagenes" 
            className="text-amber-600 hover:text-amber-800 font-bold inline-flex items-center gap-1.5"
          >
            Siguiente: Consentimiento de Imágenes →
          </Link>
        </div>

      </section>

      <Footer />
    </main>
  );
}
