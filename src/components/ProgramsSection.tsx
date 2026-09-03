'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  Smile, 
  Pill, 
  FileSpreadsheet, 
  ShieldPlus, 
  Briefcase, 
  Clock, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';

interface Program {
  id: string;
  titulo: string;
  categoria: 'salud' | 'administrativo';
  descripcion: string;
  duracion: string;
  modalidad: string;
  jornadas: string[];
  salidas: string[];
  resolucion: string;
  color: string;
  icon: React.ReactNode;
}

const PROGRAMAS: Program[] = [
  {
    id: 'enfermeria',
    titulo: 'Técnico Laboral en Auxiliar en Enfermería',
    categoria: 'salud',
    descripcion: 'Desarrolla competencias clínicas y asistenciales para el cuidado directo de pacientes, administración de medicamentos bajo prescripción médica, toma de muestras y apoyo integral en salas de cirugía y urgencias.',
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
    icon: <HeartPulse className="w-6 h-6 text-white" />
  },
  {
    id: 'salud-oral',
    titulo: 'Técnico Laboral en Auxiliar en Salud Oral',
    categoria: 'salud',
    descripcion: 'Fórmate en asistencia clínica odontológica, preparación de materiales dentales, desinfección y esterilización de instrumental, y pedagogía preventiva en higiene bucodental con especialistas.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Clínicas y consultorios odontológicos privados',
      'Unidades de salud oral en IPS y hospitales',
      'Asistencia en ortodoncia, endodoncia y cirugía oral',
      'Campañas de prevención y salud comunitaria'
    ],
    resolucion: 'Secretaría de Educación Municipal de Montería · Res. 0990 de 2022',
    color: '#169CD9',
    icon: <Smile className="w-6 h-6 text-white" />
  },
  {
    id: 'farmacia',
    titulo: 'Técnico Laboral en Auxiliar en Servicios Farmacéuticos',
    categoria: 'salud',
    descripcion: 'Aprende los protocolos rigurosos de dispensación de medicamentos y dispositivos médicos, almacenamiento bajo condiciones técnicas del Invima, recepción técnica y control de inventarios.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Droguerías comerciales y cadenas farmacéuticas',
      'Farmacias hospitalarias en clínicas de Córdoba',
      'Depósitos y distribuidoras mayoristas de medicamentos',
      'Almacenamiento y logística técnica sanitaria'
    ],
    resolucion: 'Secretaría de Educación Departamental de Córdoba · Res. 0005315',
    color: '#0A8640',
    icon: <Pill className="w-6 h-6 text-white" />
  },
  {
    id: 'admin-salud',
    titulo: 'Técnico Laboral en Auxiliar Administrativo en Salud',
    categoria: 'salud',
    descripcion: 'Domina los procesos de admisión de pacientes, verificación de derechos y autorizaciones ante EPS, facturación de servicios de salud bajo normativa colombiana y manejo de historias clínicas.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Áreas de facturación y cuentas médicas en EPS/IPS',
      'Admisiones, recepción y orientación al usuario',
      'Auditoría médica básica y trámite de glosas',
      'Gestión documental y archivo en salud'
    ],
    resolucion: 'Secretaría de Educación Municipal de Montería · Res. 0990 de 2022',
    color: '#E3087E',
    icon: <FileSpreadsheet className="w-6 h-6 text-white" />
  },
  {
    id: 'salud-publica',
    titulo: 'Técnico Laboral en Auxiliar en Salud Pública',
    categoria: 'salud',
    descripcion: 'Prepárate para ser el motor de las brigadas de salud comunitaria, planes de inmunización, vigilancia epidemiológica y campañas de promoción de la salud en veredas y municipios del Caribe.',
    duracion: '3 Semestres',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Secretarías de Salud municipal y departamental',
      'Equipos de vigilancia epidemiológica comunitaria',
      'Programas gubernamentales de promoción y prevención (PyP)',
      'Organizaciones no gubernamentales (ONG) en salud'
    ],
    resolucion: 'Comisión Intersectorial MinSalud / MEN Rad. 200478261',
    color: '#FF8C01',
    icon: <ShieldPlus className="w-6 h-6 text-white" />
  },
  {
    id: 'admin-organizacional',
    titulo: 'Técnico Laboral en Auxiliar Administrativo Organizacional',
    categoria: 'administrativo',
    descripcion: 'Programa integral enfocado en administración empresarial, gestión de talento humano, servicio al cliente, apoyo contable y manejo de software ofimático con 660 horas certificadas.',
    duracion: '3 Semestres (660 Horas)',
    modalidad: 'Presencial (50% Teórico · 50% Práctico)',
    jornadas: ['Mañana', 'Tarde', 'Nocturna', 'Sábados'],
    salidas: [
      'Auxiliar administrativo en empresas públicas y privadas',
      'Asistente de nómina, contratación y talento humano',
      'Auxiliar de compras, inventarios y facturación',
      'Atención al cliente y administración de correspondencia'
    ],
    resolucion: 'Alineado a CNO (1341) y CUOC-2023 · Secretaría de Educación Montería',
    color: '#334155',
    icon: <Briefcase className="w-6 h-6 text-white" />
  }
];

export default function ProgramsSection() {
  const [filter, setFilter] = useState<'todos' | 'salud' | 'administrativo'>('todos');

  const filteredPrograms = PROGRAMAS.filter(p => {
    if (filter === 'todos') return true;
    return p.categoria === filter;
  });

  return (
    <section id="programas" className="py-12 bg-slate-50 border-b border-slate-200">
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
              Todos los Programas (6)
            </button>
            <button
              onClick={() => setFilter('salud')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                filter === 'salud'
                  ? 'bg-[#D51C28] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Área de la Salud (5)
            </button>
            <button
              onClick={() => setFilter('administrativo')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                filter === 'administrativo'
                  ? 'bg-[#D51C28] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Área Administrativa (1)
            </button>
          </div>

        {/* Grilla de Programas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div className="space-y-4">
                
                {/* Icono y Categoría */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: program.color }}
                  >
                    {program.icon}
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {program.categoria === 'salud' ? 'Área Salud' : 'Área Empresarial'}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#D51C28] transition-colors">
                  {program.titulo}
                </h3>

                {/* Descripción */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {program.descripcion}
                </p>

                {/* Duración y Jornada */}
                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
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
                <div className="pt-2 text-[10px] text-slate-400 font-medium border-t border-slate-100">
                  {program.resolucion}
                </div>

              </div>

              {/* Botones de Acción */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
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
          ))}
        </div>

      </div>
    </section>
  );
}
