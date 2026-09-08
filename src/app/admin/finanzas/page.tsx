'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getQ10ApiKey } from '@/lib/q10';
import {
  CreditCard,
  TrendingUp,
  DollarSign,
  Tag,
  Percent,
  Award,
  RefreshCw,
  Search,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
  Wallet
} from 'lucide-react';

interface DescuentoQ10 {
  Codigo: number;
  Nombre: string;
  Tipo: string;
  Caracter: string;
  Valor: number;
}

interface InscripcionFinanciera {
  id: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email?: string;
  programa_interes: string;
  jornada_interes: string;
  estado: string;
  created_at: string;
  valor_estimado?: number;
  estado_pago?: string;
}

export default function AdminFinanzasPage() {
  const [loading, setLoading] = useState(true);
  const [descuentos, setDescuentos] = useState<DescuentoQ10[]>([]);
  const [inscripciones, setInscripciones] = useState<InscripcionFinanciera[]>([]);
  const [filtroPrograma, setFiltroPrograma] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [wompiMode, setWompiMode] = useState<string>('test');
  const [wompiPubKey, setWompiPubKey] = useState<string>('');

  // Tarifas estimadas por ciclo según programas oficiales
  const TARIFAS_PROGRAMAS: Record<string, number> = {
    'Auxiliar en Enfermería': 1450000,
    'Técnico Laboral Auxiliar en Enfermería': 1450000,
    'Técnico Laboral Auxiliar en Salud Oral': 1350000,
    'Auxiliar en Salud Oral': 1350000,
    'Técnico Laboral Auxiliar en Servicios Farmacéuticos': 1300000,
    'Auxiliar en Servicios Farmacéuticos': 1300000,
    'Técnico Laboral Auxiliar Administrativo en Salud': 1200000,
    'Auxiliar Administrativo en Salud': 1200000,
    'Técnico Laboral Auxiliar Contable Y Financiero': 1150000,
    'Auxiliar Contable Y Financiero': 1150000,
    'Técnico Laboral Auxiliar De Educación Para La Primera Infancia': 1150000,
    'Auxiliar De Educación Para La Primera Infancia': 1150000,
    'Técnico Laboral Auxiliar En Deporte Y Recreación': 1100000,
    'Auxiliar En Deporte Y Recreación': 1100000,
    'Técnico Laboral Asistente De Marketing Y Comunicación': 1100000,
    'Asistente De Marketing Y Comunicación': 1100000,
    'Tecnico Laboral Auxiliar Administrativo Organizacional': 1100000,
  };

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      // 1. Obtener configuración de Wompi de Supabase
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

      // 2. Obtener catálogo de Descuentos & Becas desde Q10 API
      const apiKey = await getQ10ApiKey();
      if (apiKey) {
        try {
          const res = await fetch('https://api.q10.com/v1/descuentos', {
            headers: { 'Api-Key': apiKey }
          });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              setDescuentos(data);
            }
          }
        } catch (e) {
          console.error('Error fetching Q10 descuentos:', e);
        }
      }

      // 3. Obtener inscripciones desde Supabase
      const { data: inscData, error: inscError } = await supabase
        .from('inscripciones')
        .select('*')
        .order('created_at', { ascending: false });

      if (inscError) throw inscError;

      const items = (inscData as InscripcionFinanciera[]) || [];
      setInscripciones(items);
    } catch (err) {
      console.error('Error cargando datos financieros:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  // Cálculos de resumen financiero
  const matriculadosCount = inscripciones.filter(i => i.estado === 'matriculado').length;
  const pendientesCount = inscripciones.filter(i => i.estado === 'pendiente' || !i.estado).length;

  const totalRecaudoEstimadoMatriculados = inscripciones
    .filter(i => i.estado === 'matriculado')
    .reduce((sum, item) => sum + (TARIFAS_PROGRAMAS[item.programa_interes] || 1200000), 0);

  const potencialCarteraProspectos = inscripciones
    .filter(i => i.estado !== 'matriculado' && i.estado !== 'descartado')
    .reduce((sum, item) => sum + (TARIFAS_PROGRAMAS[item.programa_interes] || 1200000), 0);

  // Filtrado de lista
  const filteredInscripciones = inscripciones.filter(item => {
    const matchProg = filtroPrograma === 'todos' || item.programa_interes.toLowerCase().includes(filtroPrograma.toLowerCase());
    const matchSearch = busqueda === '' ||
      `${item.nombres} ${item.apellidos} ${item.telefono} ${item.email || ''}`.toLowerCase().includes(busqueda.toLowerCase());
    return matchProg && matchSearch;
  });

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-slate-800">
        <div>
          <span className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider mb-2">
            Módulo Financiero &amp; Recaudos
          </span>
          <h1 className="text-2xl sm:text-3xl font-black italic tracking-tight">
            Control Financiero, Tarifas &amp; Pasarela de Pagos
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl font-light">
            Monitoreo en tiempo real del catálogo de tarifas institucionales Q10, becas, proyección de matrículas y pasarela Wompi Bancolombia.
          </p>
        </div>

        <button
          onClick={fetchFinancialData}
          className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors self-start shrink-0 flex items-center gap-2 text-xs font-bold"
          title="Recargar datos financieros"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Tarjetas KPI Financieras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Recaudo Confirmado */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Recaudo Estimado Matrículas
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {formatCOP(totalRecaudoEstimadoMatriculados)}
          </div>
          <p className="text-[11px] text-slate-500">
            {matriculadosCount} estudiantes con matrícula confirmada
          </p>
        </div>

        {/* Potencial Cartera Prospectos */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Cartera Potencial en Admisión
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {formatCOP(potencialCarteraProspectos)}
          </div>
          <p className="text-[11px] text-slate-500">
            {pendientesCount} aspirantes en proceso de matrícula
          </p>
        </div>

        {/* Pasarela Wompi */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Pasarela Wompi Bancolombia
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
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

        {/* Catálogo Tarifas Q10 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Convenios &amp; Becas Q10
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-600">
            {descuentos.length}
          </div>
          <p className="text-[11px] text-slate-500">
            Planes de descuento y becas sincronizados
          </p>
        </div>

      </div>

      {/* Sección 1: Catálogo Oficial de Becas y Descuentos Q10 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black uppercase">
                API Q10 Live
              </span>
              <h3 className="text-base font-black text-slate-900">
                Catálogo Institucional de Becas, Descuentos &amp; Tarifas Especiales
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Parametrización financiera vigente para el ciclo 2026 en la plataforma Q10 Académica.
            </p>
          </div>

          <Link
            href="/admin/apis"
            className="text-xs font-bold text-[#D51C28] hover:text-red-700 flex items-center gap-1.5 transition-colors self-start"
          >
            <span>Configurar Pasarela &amp; APIs</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {descuentos.map((desc) => (
            <div
              key={desc.Codigo}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/20 transition-all space-y-2"
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
                  Beneficio / Valor:
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

      {/* Sección 2: Matrículas y Estado de Pago por Aspirante */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Control de Aspirantes, Matrícula &amp; Proyección de Recaudo
            </h3>
            <p className="text-xs text-slate-500">
              Seguimiento del estado de matrícula y valor de inversión académica por programa.
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
                placeholder="Buscar por nombre..."
                className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50"
              />
            </div>

            {/* Filtro de Programa */}
            <select
              value={filtroPrograma}
              onChange={(e) => setFiltroPrograma(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50 text-slate-700"
            >
              <option value="todos">Todos los Programas</option>
              <option value="Enfermería">Auxiliar en Enfermería</option>
              <option value="Salud Oral">Salud Oral</option>
              <option value="Servicios Farmacéuticos">Servicios Farmacéuticos</option>
              <option value="Administrativo en Salud">Administrativo en Salud</option>
              <option value="Contable">Contable y Financiero</option>
              <option value="Primera Infancia">Primera Infancia</option>
              <option value="Deporte">Deporte y Recreación</option>
              <option value="Marketing">Marketing y Comunicación</option>
              <option value="Administrativo Organizacional">Administrativo Organizacional</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Estudiante / Aspirante</th>
                <th className="py-3.5 px-6">Programa</th>
                <th className="py-3.5 px-6">Jornada</th>
                <th className="py-3.5 px-6">Inversión Estimada</th>
                <th className="py-3.5 px-6">Estado Matrícula</th>
                <th className="py-3.5 px-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredInscripciones.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No se encontraron registros con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredInscripciones.map((item) => {
                  const tarifa = TARIFAS_PROGRAMAS[item.programa_interes] || 1200000;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{item.nombres} {item.apellidos}</div>
                        <div className="text-[11px] text-slate-400">{item.telefono}</div>
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-800">
                        {item.programa_interes}
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        {item.jornada_interes || 'Diurna'}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-black text-slate-900">
                          {formatCOP(tarifa)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          item.estado === 'matriculado'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.estado === 'contactado'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.estado === 'matriculado' ? 'Matriculado' : 'En Proceso'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href={`https://wa.me/57${item.telefono.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(item.nombres)},%20te%20saludamos%20del%20departamento%20financiero%20de%20la%20Academia%20Frederick%20Floret%20para%20asesorarte%20con%20tu%20matr%C3%ADcula%20y%20facilidades%20de%20pago%20en%20cuotas.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                        >
                          <span>Asesorar Pago</span>
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
