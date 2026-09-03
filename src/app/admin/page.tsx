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
  RefreshCw
} from 'lucide-react';

interface Lead {
  id: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  programa_interes: string;
  jornada_interes: string;
  estado: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 0,
    pendientes: 0,
    matriculados: 0,
    totalProgramas: 6,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Obtener todas las inscripciones
      const { data: leadsData, error: leadsError } = await supabase
        .from('inscripciones')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;

      const leads = (leadsData as Lead[]) || [];
      const total = leads.length;
      const pend = leads.filter(l => l.estado === 'pendiente' || !l.estado).length;
      const matr = leads.filter(l => l.estado === 'matriculado').length;

      setStats({
        totalLeads: total,
        pendientes: pend,
        matriculados: matr,
        totalProgramas: 6,
      });

      setRecentLeads(leads.slice(0, 5));
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
            Resumen en tiempo real de inscripciones, programas académicos y actividad web.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar Datos</span>
        </button>
      </div>

      {/* Tarjetas de Métricas (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Prospectos
            </span>
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D51C28] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalLeads}</div>
          <p className="text-[11px] text-slate-500">Inscripciones registradas desde la web</p>
        </div>

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
          <p className="text-[11px] text-slate-500">Aspirantes esperando asesoría o llamada</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Matriculados
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{stats.matriculados}</div>
          <p className="text-[11px] text-slate-500">Cupos confirmados para el ciclo 2026</p>
        </div>

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

      </div>

      {/* Tabla de Últimos Prospectos Recibidos */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Últimas Preinscripciones Recibidas
            </h3>
            <p className="text-xs text-slate-500">
              Personas interesadas en estudiar en la Academia Frederick Floret.
            </p>
          </div>

          <Link
            href="/admin/inscripciones"
            className="text-xs font-bold text-[#D51C28] hover:text-red-700 flex items-center gap-1.5 transition-colors"
          >
            <span>Ver Todos y Exportar a Excel</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">No hay preinscripciones registradas todavía.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Aspirante</th>
                  <th className="py-3.5 px-6">Programa de Interés</th>
                  <th className="py-3.5 px-6">Jornada</th>
                  <th className="py-3.5 px-6">Estado</th>
                  <th className="py-3.5 px-6 text-right">Contacto Rápido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {lead.nombres} {lead.apellidos}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800">{lead.programa_interes}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {lead.jornada_interes || 'No especificada'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        lead.estado === 'matriculado' 
                          ? 'bg-emerald-100 text-emerald-700'
                          : lead.estado === 'contactado'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {lead.estado || 'Pendiente'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href={`https://wa.me/57${lead.telefono.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(lead.nombres)},%20te%20saludamos%20desde%20la%20Academia%20Frederick%20Floret%20de%20Monter%C3%ADa%20respecto%20a%20tu%20inscripci%C3%B3n%20para%20${encodeURIComponent(lead.programa_interes)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                        title="Abrir WhatsApp"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <Link
          href="/admin/contenido"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#D51C28]/40 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D51C28] flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 group-hover:text-[#D51C28] transition-colors">
            Modificar Textos de la Web
          </h4>
          <p className="text-xs text-slate-500">
            Cambia los números de WhatsApp, teléfonos, dirección y aviso de cupos en vivo.
          </p>
        </Link>

        <Link
          href="/admin/programas"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#D51C28]/40 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            Administrar Programas
          </h4>
          <p className="text-xs text-slate-500">
            Edita descripciones, salidas ocupacionales y resoluciones de los 6 programas.
          </p>
        </Link>

        <Link
          href="/admin/seguridad"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#D51C28]/40 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
            Google Authenticator (2FA)
          </h4>
          <p className="text-xs text-slate-500">
            Configura el código QR de seguridad para proteger el acceso a este panel.
          </p>
        </Link>

      </div>
    </div>
  );
}
