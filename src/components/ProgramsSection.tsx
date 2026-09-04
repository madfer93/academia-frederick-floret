'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  HeartPulse, 
  Smile, 
  Pill, 
  FileSpreadsheet, 
  ShieldPlus, 
  Briefcase, 
  BookOpen,
  Calculator,
  Megaphone,
  Dumbbell,
  Clock, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  Image as ImageIcon
} from 'lucide-react';

interface Program {
  id: string;
  slug: string;
  titulo: string;
  categoria: 'salud' | 'comercial';
  descripcion: string;
  duracion: string;
  modalidad: string;
  jornadas: string[];
  salidas: string[];
  resolucion: string;
  color: string;
  icon: React.ReactNode;
  imagen?: string;
}

const PROGRAMAS: Program[] = [
  {
    id: 'enfermeria',
    slug: 'auxiliar-en-enfermeria',
    titulo: 'Técnico Laboral en Auxiliar en Enfermería',
    categoria: 'salud',
    descripcion: 'Desarrolla competencias clínicas y asistenciales para el cuidado directo de pacientes, administración de medicamentos bajo normativas, toma de muestras y apoyo integral en salas de cirugía y urgencias.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana (8:00 - 11:00 am)', 'Tarde (2:00 - 5:00 pm)', 'Nocturna (6:30 - 9:00 pm)', 'Sábados (7:00 am - 5:00 pm)'],
    salidas: [
      'Clínicas y Hospitales de I, II y III nivel',
      'Centros de salud, IPS y EPS públicas y privadas',
      'Atención domiciliaria y cuidado especializado',
      'Servicios de vacunación y programas comunitarios'
    ],
    resolucion: 'Comisión Intersectorial MinSalud/MEN Rad. 200478261 · Licencia 001514',
    color: '#D51C28',
    icon: <HeartPulse className="w-6 h-6 text-white" />,
    imagen: '/programas/auxiliar-en-enfermeria.webp'
  },
  {
    id: 'salud-oral',
    slug: 'auxiliar-en-salud-oral',
    titulo: 'Técnico Laboral en Auxiliar en Salud Oral',
    categoria: 'salud',
    descripcion: 'Asiste al odontólogo en procedimientos clínicos, realiza limpiezas, fluoraciones, aplicación de sellantes, técnicas de asepsia y desinfección, y gestión del consultorio odontológico con alta calidad humana.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Clínicas y consultorios odontológicos privados',
      'Unidades de salud oral en IPS y hospitales',
      'Asistencia en ortodoncia, endodoncia y cirugía oral',
      'Campañas de prevención y salud bucal comunitaria'
    ],
    resolucion: 'Secretaría de Educación Municipal de Montería · Res. 0990 de 27 de julio de 2022',
    color: '#169CD9',
    icon: <Smile className="w-6 h-6 text-white" />,
    imagen: '/programas/auxiliar-en-salud-oral.webp'
  },
  {
    id: 'farmacia',
    slug: 'servicios-farmaceuticos',
    titulo: 'Técnico Laboral en Auxiliar en Servicios Farmacéuticos',
    categoria: 'salud',
    descripcion: 'Domina los protocolos de dispensación de medicamentos y dispositivos médicos, almacenamiento bajo condiciones técnicas del Invima, recepción técnica y control sistematizado de inventarios farmacéuticos.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Droguerías comerciales y cadenas farmacéuticas',
      'Farmacias hospitalarias en clínicas y centros de salud',
      'Depósitos y distribuidoras mayoristas de medicamentos',
      'Almacenamiento y logística técnica sanitaria'
    ],
    resolucion: 'Secretaría de Educación Municipal de Montería · Res. 0990 de 27 de julio de 2022',
    color: '#0A8640',
    icon: <Pill className="w-6 h-6 text-white" />,
    imagen: '/programas/auxiliar-en-servicios-farmaceuticos.webp'
  },
  {
    id: 'primera-infancia',
    slug: 'auxiliar-en-educacion-para-la-primera-infancia',
    titulo: 'Técnico Laboral en Auxiliar de Educación para la Primera Infancia',
    categoria: 'comercial',
    descripcion: 'Presta servicio de apoyo pedagógico en actividades educativas bajo la supervisión de un educador infantil, orientadas a promover el desarrollo integral de niños y niñas en educación inicial y preescolar.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Centros de Desarrollo Infantil (CDI), jardines y preescolares',
      'Guarderías, escuelas infantiles y centros de estimulación',
      'Salas cunas, salas maternas y hogares comunitarios',
      'Museos infantiles, bibliotecas, ludotecas y parques recreativos'
    ],
    resolucion: 'Secretaría de Educación Municipal de Montería · Res. 0037 de 15 de enero de 2026',
    color: '#8B5CF6',
    icon: <BookOpen className="w-6 h-6 text-white" />,
    imagen: 'https://thkbobesewltcsgnzpay.supabase.co/storage/v1/object/public/programas/auxiliar-en-educacion-para-la-primera-infancia-1788545898700.webp'
  },
  {
    id: 'contable-financiero',
    slug: 'auxiliar-contable-y-financiero',
    titulo: 'Técnico Laboral en Auxiliar Contable y Financiero',
    categoria: 'comercial',
    descripcion: 'Realiza la medición y reconocimiento de transacciones contables y financieras, liquidación y soporte de impuestos, conciliación bancaria, liquidación de nómina, control presupuestal e inventarios.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Departamentos contables y financieros de empresas públicas y privadas',
      'Asistente de liquidación de nómina, aportes y prestaciones sociales',
      'Auxiliar de facturación, compras, cuentas por pagar y cartera',
      'Soporte contable y tributario en firmas de asesoría empresarial'
    ],
    resolucion: 'Secretaría de Educación Municipal de Montería · Res. 0038 de 15 de enero de 2026',
    color: '#1E40AF',
    icon: <Calculator className="w-6 h-6 text-white" />,
    imagen: '/programas/auxiliar-contable-financiero.webp'
  },
  {
    id: 'marketing-comunicacion',
    slug: 'asistentes-de-marketing-y-comunicacion',
    titulo: 'Técnico Laboral en Asistentes de Marketing y Comunicación',
    categoria: 'comercial',
    descripcion: 'Apoya los procesos y estrategias comerciales en empresas públicas y privadas en áreas de mercadeo digital, publicidad, comunicación corporativa, relaciones públicas y servicio al cliente.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Departamentos de mercadeo, publicidad y ventas comerciales',
      'Agencias de publicidad y comunicación digital',
      'Empresas industriales y de servicios del sector público y privado',
      'Apoyo en eventos comerciales y atención omnicanal al cliente'
    ],
    resolucion: 'Secretaría de Educación Municipal de Montería · Res. 0040 de 15 de enero de 2026',
    color: '#15803D',
    icon: <Megaphone className="w-6 h-6 text-white" />,
    imagen: '/programas/asistentes-marketing-comunicacion.webp'
  },
  {
    id: 'deporte-recreacion',
    slug: 'auxiliar-en-deporte-y-recreacion',
    titulo: 'Técnico Laboral en Auxiliar en Deporte y Recreación',
    categoria: 'comercial',
    descripcion: 'Instruye y dirige personas o grupos en sesiones de acondicionamiento físico, prácticas deportivas y recreativas, fomento de la actividad física y estrategias de promoción de salud y bienestar integral.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Gimnasios, centros de acondicionamiento físico y fitness',
      'Clubes deportivos, escuelas formativas y equipos atléticos',
      'Cajas de compensación y centros recreacionales',
      'Programas comunitarios de promoción deportiva y hábitos saludables'
    ],
    resolucion: 'Secretaría de Educación Municipal de Montería · Res. 0039 de 15 de enero de 2026',
    color: '#D97706',
    icon: <Dumbbell className="w-6 h-6 text-white" />,
    imagen: '/programas/auxiliar-deporte-recreacion.webp'
  },
  {
    id: 'admin-organizacional',
    slug: 'auxiliar-administrativo-organizacional',
    titulo: 'Técnico Laboral en Auxiliar Administrativo Organizacional',
    categoria: 'comercial',
    descripcion: 'Programa integral enfocado en funciones de apoyo administrativo, gestión de talento humano, servicio al cliente, apoyo contable, archivo y manejo de procesos organizacionales bajo normativas vigentes.',
    duracion: '3 Semestres (660 Horas)',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Auxiliar administrativo en empresas públicas y privadas',
      'Asistente de nómina, contratación y talento humano',
      'Auxiliar de compras, inventarios y correspondencia',
      'Atención al cliente y administración de procesos empresariales'
    ],
    resolucion: 'Secretaría de Educación Municipal de Montería · Res. 0036 de 15 de enero de 2026',
    color: '#334155',
    icon: <Briefcase className="w-6 h-6 text-white" />,
    imagen: '/programas/auxiliar-administrativo-organizacional.webp'
  }
];

export default function ProgramsSection() {
  const [filter, setFilter] = useState<'todos' | 'salud' | 'comercial'>('todos');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [dbData, setDbData] = useState<Record<string, { imagen_url: string | null; activo: boolean }>>({});

  useEffect(() => {
    supabase
      .from('programas')
      .select('slug, imagen_url, activo')
      .then(({ data }) => {
        if (data) {
          const map: Record<string, { imagen_url: string | null; activo: boolean }> = {};
          data.forEach((item: { slug: string; imagen_url: string | null; activo: boolean }) => {
            if (item.slug) {
              map[item.slug] = {
                imagen_url: item.imagen_url,
                activo: item.activo
              };
            }
          });
          setDbData(map);
        }
      });
  }, []);

  const handleImageError = (programId: string) => {
    setImageErrors(prev => ({ ...prev, [programId]: true }));
  };

  const filteredPrograms = PROGRAMAS.filter(p => {
    // Si en Supabase fue ocultado, no mostrar en la web
    if (dbData[p.slug] && dbData[p.slug].activo === false) {
      return false;
    }
    if (filter === 'todos') return true;
    return p.categoria === filter;
  });

  return (
    <section id="programas" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filtros de Categoría Directos */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('todos')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              filter === 'todos'
                ? 'bg-[#D51C28] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Todos los Programas ({filteredPrograms.length})
          </button>
          <button
            onClick={() => setFilter('salud')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              filter === 'salud'
                ? 'bg-[#D51C28] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Área de la Salud (3)
          </button>
          <button
            onClick={() => setFilter('comercial')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              filter === 'comercial'
                ? 'bg-[#D51C28] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Área Comercial y Gestión (5)
          </button>
        </div>

        {/* Grilla de Programas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPrograms.map((program) => {
            const currentImage = dbData[program.slug]?.imagen_url || program.imagen;
            const hasImage = Boolean(currentImage && !imageErrors[program.id]);

            return (
              <div
                key={program.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  
                  {/* Espacio para Imagen del Programa */}
                  <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 border border-slate-200/80 flex items-center justify-center group/img shadow-inner">
                    {hasImage ? (
                      <img
                        src={currentImage}
                        alt={program.titulo}
                        onError={() => handleImageError(program.id)}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center select-none">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 shadow-sm transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${program.color}18`, color: program.color }}
                        >
                          {program.icon}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs">
                          <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Espacio para Foto</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200">
                          {program.id}.webp
                        </span>
                      </div>
                    )}

                    {/* Badge de Categoría sobre la imagen */}
                    <div className="absolute top-3 right-3 backdrop-blur-md bg-white/95 shadow-sm px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-slate-700 border border-white/60">
                      {program.categoria === 'salud' ? 'Área Salud' : 'Área Comercial'}
                    </div>
                  </div>

                  {/* Icono y Título */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5"
                      style={{ backgroundColor: program.color }}
                    >
                      {program.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-[#D51C28] transition-colors">
                      {program.titulo}
                    </h3>
                  </div>

                  {/* Descripción */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {program.descripcion}
                  </p>

                  {/* Duración y Jornada */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Duración: {program.duracion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Modalidad: {program.modalidad}</span>
                    </div>
                  </div>

                  {/* Salidas Ocupacionales */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                      Salidas Laborales Destacadas:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {program.salidas.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resolución */}
                  <div className="pt-2 text-[10px] text-slate-400 font-medium border-t border-slate-100 leading-normal">
                    {program.resolucion}
                  </div>

                </div>

                {/* Botones de Acción */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={`#inscripciones`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-[#D51C28] transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Preinscribirme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`https://wa.me/573205206613?text=Hola,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20y%20tarifas%20del%20programa%20${encodeURIComponent(program.titulo)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
                    title="Consultar por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
