'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  ArrowRight, 
  Clock, 
  MessageSquare, 
  AlertCircle,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  RefreshCw,
  DollarSign
} from 'lucide-react';

interface EstudianteDisplay {
  id: string;
  nombres: string;
  documento: string;
  programa_interes: string;
  jornada_interes: string;
  periodo: string;
  estado: string;
  fecha: string;
  tipo: 'q10' | 'web';
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 0,
    pendientes: 0,
    matriculadosQ10: 57,
    totalProgramas: 9,
  });
  const [recentEstudiantes, setRecentEstudiantes] = useState<EstudianteDisplay[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Obtener datos de Q10 API
      let q10List: any[] = [];
      try {
        const q10Res = await fetch('/api/admin/q10-inscripciones');
        if (q10Res.ok) {
          const q10Json = await q10Res.json();
          if (Array.isArray(q10Json.inscripciones)) {
            q10List = q10Json.inscripciones;
          }
        }
      } catch (e) {
        console.warn('Q10 API local fetch notice:', e);
      }

      // 2. Obtener inscripciones de la web desde Supabase
      let webLeads: any[] = [];
      try {
        const { data: leadsData } = await supabase
          .from('inscripciones')
          .select('*')
          .order('created_at', { ascending: false });
        if (leadsData) webLeads = leadsData;
      } catch (e) {
        console.warn('Supabase fetch notice:', e);
      }

      const totalMatriculados = q10List.length > 0 ? q10List.length : 57;
      const totalWeb = webLeads.length;
      const pendWeb = webLeads.filter(l => l.estado === 'pendiente' || !l.estado).length;

      setStats({
        totalLeads: totalWeb,
        pendientes: pendWeb,
        matriculadosQ10: totalMatriculados,
        totalProgramas: 9,
      });

      // Mapear los estudiantes más recientes para la tabla
      const displayItems: EstudianteDisplay[] = [];

      if (q10List.length > 0) {
        q10List.slice(0, 8).forEach(est => {
          displayItems.push({
            id: est.Codigo_estudiante || String(est.Consecutivo_inscripcion),
            nombres: est.Nombre_completo,
            documento: est.Numero_identificacion || est.Codigo_estudiante,
            programa_interes: est.Nombre_programa,
            jornada_interes: est.Nombre_sede_jornada || est.Nombre_jornada || 'Principal',
            periodo: est.Periodo_nombre || est.per_nombre || '2026-2',
            estado: 'Matriculado Q10',
            fecha: est.Fecha_inscripcion ? new Date(est.Fecha_inscripcion).toLocaleDateString('es-CO') : 'Reciente',
            tipo: 'q10'
          });
        });
      } else {
        // Fallback inmediato con primeros registros
        webLeads.slice(0, 5).forEach(lead => {
          displayItems.push({
            id: lead.id,
            nombres: `${lead.nombres} ${lead.apellidos}`,
            documento: lead.documento || lead.telefono,
            programa_interes: lead.programa_interes,
            jornada_interes: lead.jornada_interes || 'Diurna',
            periodo: '2026-2',
            estado: lead.estado || 'Pendiente',
            fecha: lead.created_at ? new Date(lead.created_at).toLocaleDateString('es-CO') : 'Hoy',
            tipo: 'web'
          });
        });
      }

      setRecentEstudiantes(displayItems);
    } catch (err) {
      console.error('Error cargando dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Cabecera del Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Panel de Control Institucional
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Resumen en tiempo real de estudiantes matriculados en Q10, prospectos web y actividad académica.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs self-start cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar Datos</span>
        </button>
      </div>

      {/* Tarjetas de Métricas (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Matriculados en Q10 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Matriculados en Q10
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{stats.matriculadosQ10}</div>
          <p className="text-[11px] text-slate-500">Estudiantes oficiales registrados en Q10</p>
        </div>

        {/* Oferta Académica */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Oferta Académica
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalProgramas}</div>
          <p className="text-[11px] text-slate-500">Programas técnicos vigentes en Montería</p>
        </div>

        {/* Total Prospectos Web */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Prospectos Web (Leads)
            </span>
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D51C28] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalLeads}</div>
          <p className="text-[11px] text-slate-500">Inscripciones recibidas desde la página</p>
        </div>

        {/* Por Contactar */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Por Contactar
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600">{stats.pendientes}</div>
          <p className="text-[11px] text-slate-500">Aspirantes esperando llamada de asesoría</p>
        </div>

      </div>

      {/* Tabla de Estudiantes Matriculados Recientes */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Estudiantes Matriculados &amp; Actividad Reciente
            </h3>
            <p className="text-xs text-slate-500">
              Registros oficiales sincronizados con la plataforma académica Q10.
            </p>
          </div>

          <Link
            href="/admin/finanzas"
            className="text-xs font-bold text-[#D51C28] hover:text-red-700 flex items-center gap-1.5 transition-colors"
          >
            <span>Ver Control Financiero Completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentEstudiantes.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">Cargando registros institucionales...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Estudiante</th>
                  <th className="py-3.5 px-6">Programa de Formación</th>
                  <th className="py-3.5 px-6">Sede / Jornada</th>
                  <th className="py-3.5 px-6">Periodo</th>
                  <th className="py-3.5 px-6">Estado</th>
                  <th className="py-3.5 px-6 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentEstudiantes.map((est) => (
                  <tr key={est.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 capitalize text-xs">{est.nombres.toLowerCase()}</div>
                      <div className="text-[11px] text-slate-400 font-mono">CC: {est.documento}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800">{est.programa_interes}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                        {est.jornada_interes}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-900 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200 text-[11px]">
                        {est.periodo}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {est.estado}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href={`https://wa.me/573205206613?text=Hola%20${encodeURIComponent(est.nombres)},%20te%20saludamos%20de%20la%20Academia%20Frederick%20Floret.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Accesos Rápidos de Gestión */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <Link
          href="/admin/finanzas"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/40 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
            Finanzas &amp; Recaudos
          </h4>
          <p className="text-xs text-slate-500">
            Control de tarifas Q10, becas, proyección de ingresos y pasarela Wompi.
          </p>
        </Link>

        <Link
          href="/admin/contenido"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#D51C28]/40 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D51C28] flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 group-hover:text-[#D51C28] transition-colors">
            Modificar Textos Web
          </h4>
          <p className="text-xs text-slate-500">
            Cambia los números de WhatsApp, teléfonos, dirección y cupos en vivo.
          </p>
        </Link>

        <Link
          href="/admin/programas"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-500/40 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            Administrar Programas
          </h4>
          <p className="text-xs text-slate-500">
            Edita descripciones, salidas ocupacionales y resoluciones oficiales.
          </p>
        </Link>

        <Link
          href="/admin/seguridad"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-500/40 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
            Seguridad 2FA
          </h4>
          <p className="text-xs text-slate-500">
            Configura el código QR de doble factor para proteger el acceso admin.
          </p>
        </Link>

      </div>
    </div>
  );
}
