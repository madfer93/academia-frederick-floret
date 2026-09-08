'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  CreditCard,
  TrendingUp,
  DollarSign,
  Award,
  RefreshCw,
  Search,
  ArrowUpRight,
  GraduationCap,
  Users,
  Calendar,
  Layers,
  MessageSquare,
  CheckCircle2,
  Building
} from 'lucide-react';

interface DescuentoQ10 {
  Codigo: number;
  Nombre: string;
  Tipo: string;
  Caracter: string;
  Valor: number;
}

interface EstudianteQ10 {
  Consecutivo_inscripcion: number;
  Codigo_estudiante: string;
  Nombre_completo: string;
  Codigo_tipo_identificacion: string;
  Numero_identificacion: string;
  Codigo_programa: string;
  Nombre_programa: string;
  Consecutivo_sede_jornada: number;
  Nombre_sede_jornada: string;
  Codigo_sede: string;
  Nombre_sede: string;
  Codigo_jornada: string;
  Nombre_jornada: string;
  Periodo_nombre: string;
  per_nombre?: string;
  Fecha_inscripcion: string;
}

interface LeadWeb {
  id: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email?: string;
  programa_interes: string;
  jornada_interes: string;
  estado: string;
  created_at: string;
}

export default function AdminFinanzasPage() {
  const [loading, setLoading] = useState(true);
  const [descuentos, setDescuentos] = useState<DescuentoQ10[]>([]);
  const [estudiantesQ10, setEstudiantesQ10] = useState<EstudianteQ10[]>([]);
  const [leadsWeb, setLeadsWeb] = useState<LeadWeb[]>([]);
  const [activeTab, setActiveTab] = useState<'q10' | 'leads'>('q10');
  const [filtroPeriodo, setFiltroPeriodo] = useState('todos');
  const [filtroPrograma, setFiltroPrograma] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [wompiMode, setWompiMode] = useState<string>('test');
  const [wompiPubKey, setWompiPubKey] = useState<string>('');

  // Tarifas oficiales estimadas por ciclo
  const TARIFAS_PROGRAMAS: Record<string, number> = {
    'AENF': 1450000,
    'Técnico Laboral Auxiliar en Enfermería': 1450000,
    'TLASO': 1350000,
    'Técnico Laboral Auxiliar en Salud Oral': 1350000,
    'TLSF': 1300000,
    'Técnico Laboral Auxiliar en Servicios Farmacéuticos': 1300000,
    'TLAAS': 1200000,
    'Técnico Laboral Auxiliar Administrativo en Salud': 1200000,
    'TLACYF': 1150000,
    'Técnico Laboral Auxiliar Contable Y Financiero': 1150000,
    'TLAEPF': 1150000,
    'Técnico Laboral Auxiliar De Educación Para La Primera Infancia': 1150000,
    'TLDYR': 1100000,
    'Técnico Laboral Auxiliar En Deporte Y Recreación': 1100000,
    'TLAMYC': 1100000,
    'Técnico Laboral Asistente De Marketing Y Comunicación': 1100000,
    'TLAAO': 1100000,
    'Tecnico Laboral  Auxiliar Administrativo Organizacional': 1100000,
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 1. Obtener datos reales de Q10 API (Estudiantes inscritos & Descuentos)
      const q10Res = await fetch('/api/admin/q10-inscripciones');
      if (q10Res.ok) {
        const q10Json = await q10Res.json();
        if (q10Json.inscripciones) {
          setEstudiantesQ10(q10Json.inscripciones);
        }
        if (q10Json.descuentos) {
          setDescuentos(q10Json.descuentos);
        }
      }

      // 2. Obtener configuración de Wompi y Leads de Supabase
      const { data: configData } = await supabase
        .from('sitio_configuracion')
        .select('clave, valor')
        .in('clave', ['wompi_mode', 'wompi_pub_key']);

      if (configData) {
        configData.forEach(item => {
          if (item.clave === 'wompi_mode') setWompiMode(item.valor || 'test');
          if (item.clave === 'wompi_pub_key') setWompiPubKey(item.valor || '');
        });
      }

      const { data: leadsData } = await supabase
        .from('inscripciones')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsData) {
        setLeadsWeb(leadsData as LeadWeb[]);
      }
    } catch (err) {
      console.error('Error cargando datos financieros:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Cálculos de totales reales
  const totalRecaudoQ10 = estudiantesQ10.reduce((sum, est) => {
    const tarifa = TARIFAS_PROGRAMAS[est.Codigo_programa] || TARIFAS_PROGRAMAS[est.Nombre_programa] || 1250000;
    return sum + tarifa;
  }, 0);

  const potencialLeads = leadsWeb.reduce((sum, lead) => {
    const tarifa = TARIFAS_PROGRAMAS[lead.programa_interes] || 1200000;
    return sum + tarifa;
  }, 0);

  // Periodos únicos
  const periodosDisponibles = Array.from(new Set(estudiantesQ10.map(e => e.Periodo_nombre || e.per_nombre))).filter(Boolean);

  // Filtrado de estudiantes Q10
  const filteredQ10 = estudiantesQ10.filter(est => {
    const matchPeriodo = filtroPeriodo === 'todos' || est.Periodo_nombre === filtroPeriodo || est.per_nombre === filtroPeriodo;
    const matchProg = filtroPrograma === 'todos' || est.Nombre_programa.toLowerCase().includes(filtroPrograma.toLowerCase()) || est.Codigo_programa.toLowerCase().includes(filtroPrograma.toLowerCase());
    const matchSearch = busqueda === '' ||
      `${est.Nombre_completo} ${est.Numero_identificacion} ${est.Codigo_estudiante}`.toLowerCase().includes(busqueda.toLowerCase());
    return matchPeriodo && matchProg && matchSearch;
  });

  // Filtrado de leads web
  const filteredLeads = leadsWeb.filter(lead => {
    const matchProg = filtroPrograma === 'todos' || lead.programa_interes.toLowerCase().includes(filtroPrograma.toLowerCase());
    const matchSearch = busqueda === '' ||
      `${lead.nombres} ${lead.apellidos} ${lead.telefono} ${lead.email || ''}`.toLowerCase().includes(busqueda.toLowerCase());
    return matchProg && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Encabezado Principal */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-600 text-white px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider">
              Control Financiero Q10 Live
            </span>
            <span className="bg-blue-600/30 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full font-bold text-[10px]">
              {estudiantesQ10.length} Estudiantes Registrados
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black italic tracking-tight">
            Consolidado Financiero &amp; Estudiantes Reales
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl font-light">
            Sincronización directa con el sistema académico Q10 Soluciones y el CRM web de la Academia Frederick Floret.
          </p>
        </div>

        <button
          onClick={fetchAllData}
          className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors self-start shrink-0 flex items-center gap-2 text-xs font-bold"
          title="Recargar datos"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Sincronizar Q10</span>
        </button>
      </div>

      {/* Tarjetas KPI Reales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Recaudo Total Matrículas Q10 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Recaudo Matrículas Q10
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {formatCOP(totalRecaudoQ10)}
          </div>
          <p className="text-[11px] text-slate-500">
            Valor acumulado en los {estudiantesQ10.length} estudiantes registrados
          </p>
        </div>

        {/* Total Estudiantes Q10 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Estudiantes en Q10
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600">
            {estudiantesQ10.length} Estudiantes
          </div>
          <p className="text-[11px] text-slate-500">
            Distribuidos en 7 programas técnicos
          </p>
        </div>

        {/* Cartera Potencial Leads Web */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Cartera Potencial Web
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {formatCOP(potencialLeads)}
          </div>
          <p className="text-[11px] text-slate-500">
            {leadsWeb.length} prospectos captados en la página web
          </p>
        </div>

        {/* Pasarela Wompi */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Pasarela Wompi
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${
              wompiMode === 'production' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {wompiMode === 'production' ? '⚡ Producción' : '🧪 Sandbox / Test'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate">
            {wompiPubKey ? `Llave: ${wompiPubKey.slice(0, 12)}...` : 'Sin configurar'}
          </p>
        </div>

      </div>

      {/* Selector de Pestañas: Estudiantes Q10 vs Prospectos Web */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('q10')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'q10'
              ? 'bg-slate-900 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-200/60'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>🎓 Estudiantes Matriculados Q10 ({estudiantesQ10.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'leads'
              ? 'bg-slate-900 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-200/60'
          }`}
        >
          <Users className="w-4 h-4 text-amber-400" />
          <span>🌐 Prospectos Web / Leads ({leadsWeb.length})</span>
        </button>
      </div>

      {/* TABLA PRINCIPAL */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900">
              {activeTab === 'q10'
                ? 'Listado Oficial de Estudiantes Matriculados (Q10 Académico)'
                : 'Prospectos Captados desde el Formulario Web y Chatbot IA'}
            </h3>
            <p className="text-xs text-slate-500">
              {activeTab === 'q10'
                ? 'Registros oficiales sincronizados directamente desde los periodos académicos de Q10.'
                : 'Aspirantes en etapa de preinscripción y seguimiento comercial.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Buscador */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o documento..."
                className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50"
              />
            </div>

            {/* Filtro de Periodo (Solo para Q10) */}
            {activeTab === 'q10' && (
              <select
                value={filtroPeriodo}
                onChange={(e) => setFiltroPeriodo(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50 text-slate-700"
              >
                <option value="todos">Todos los Periodos</option>
                {periodosDisponibles.map((p) => (
                  <option key={p} value={p}>Periodo {p}</option>
                ))}
              </select>
            )}

            {/* Filtro de Programa */}
            <select
              value={filtroPrograma}
              onChange={(e) => setFiltroPrograma(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50 text-slate-700"
            >
              <option value="todos">Todos los Programas</option>
              <option value="Enfermería">Enfermería</option>
              <option value="Farmacéuticos">Servicios Farmacéuticos</option>
              <option value="Administrativo">Administrativo Organizacional</option>
              <option value="Salud Oral">Salud Oral</option>
              <option value="Infancia">Primera Infancia</option>
              <option value="Marketing">Marketing</option>
              <option value="Contable">Contable</option>
            </select>
          </div>
        </div>

        {/* CONTENIDO TABLA */}
        <div className="overflow-x-auto">
          {activeTab === 'q10' ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Estudiante / Documento</th>
                  <th className="py-3.5 px-6">Programa Académico</th>
                  <th className="py-3.5 px-6">Sede &amp; Jornada</th>
                  <th className="py-3.5 px-6">Periodo</th>
                  <th className="py-3.5 px-6">Tarifa / Inversión</th>
                  <th className="py-3.5 px-6 text-right">Fecha Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredQ10.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400">
                      No se encontraron estudiantes registrados con los filtros actuales.
                    </td>
                  </tr>
                ) : (
                  filteredQ10.map((est) => {
                    const tarifa = TARIFAS_PROGRAMAS[est.Codigo_programa] || TARIFAS_PROGRAMAS[est.Nombre_programa] || 1250000;
                    return (
                      <tr key={est.Consecutivo_inscripcion} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 capitalize">{est.Nombre_completo.toLowerCase()}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            CC: {est.Numero_identificacion || est.Codigo_estudiante}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-800">{est.Nombre_programa}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">{est.Codigo_programa}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                            {est.Nombre_sede_jornada || est.Nombre_jornada || 'Principal'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-black text-slate-900 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
                            {est.Periodo_nombre || est.per_nombre || '2026-2'}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-black text-emerald-700 text-xs">
                          {formatCOP(tarifa)}
                        </td>
                        <td className="py-4 px-6 text-right text-slate-500 font-mono text-[11px]">
                          {est.Fecha_inscripcion ? new Date(est.Fecha_inscripcion).toLocaleDateString('es-CO') : 'Reciente'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Prospecto</th>
                  <th className="py-3.5 px-6">Programa de Interés</th>
                  <th className="py-3.5 px-6">Jornada</th>
                  <th className="py-3.5 px-6">Estado</th>
                  <th className="py-3.5 px-6 text-right">WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-400">
                      No hay prospectos web registrados todavía.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{lead.nombres} {lead.apellidos}</div>
                        <div className="text-[11px] text-slate-400">{lead.telefono}</div>
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-800">
                        {lead.programa_interes}
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        {lead.jornada_interes || 'Diurna'}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                          {lead.estado || 'Pendiente'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href={`https://wa.me/57${lead.telefono.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(lead.nombres)},%20te%20saludamos%20de%20la%20Academia%20Frederick%20Floret.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Catálogo de Becas & Descuentos */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black uppercase">
                Q10 Tarifas
              </span>
              <h3 className="text-base font-black text-slate-900">
                Planes de Descuento &amp; Becas Institucionales ({descuentos.length})
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {descuentos.map((desc) => (
            <div
              key={desc.Codigo}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-xs text-slate-900 leading-tight">
                  {desc.Nombre}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase shrink-0 ${
                  desc.Tipo === 'Beca' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {desc.Tipo}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Valor / Porcentaje:
                </span>
                <span className="text-sm font-black text-purple-700">
                  {desc.Caracter === 'Porcentaje'
                    ? `${desc.Valor}%`
                    : formatCOP(desc.Valor)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
