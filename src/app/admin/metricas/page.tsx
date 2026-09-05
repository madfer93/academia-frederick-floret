'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  BarChart3, 
  Clock, 
  GraduationCap, 
  Users, 
  ExternalLink, 
  RefreshCw, 
  Smartphone, 
  Monitor, 
  TrendingUp, 
  Eye, 
  ArrowUpRight,
  Globe,
  Sparkles,
  Calendar
} from 'lucide-react';

interface Visita {
  id: string;
  ruta: string;
  programa_slug: string | null;
  duracion_segundos: number;
  referrer: string;
  dispositivo: string;
  created_at: string;
}

const PROGRAM_NAMES: Record<string, string> = {
  'auxiliar-en-enfermeria': 'Auxiliar en Enfermería',
  'auxiliar-en-salud-oral': 'Auxiliar en Salud Oral',
  'auxiliar-en-servicios-farmaceuticos': 'Auxiliar en Servicios Farmacéuticos',
  'auxiliar-administrativo-en-salud': 'Auxiliar Administrativo en Salud',
  'auxiliar-en-salud-publica': 'Auxiliar en Salud Pública',
  'auxiliar-en-veterinaria': 'Auxiliar en Veterinaria',
  'seguridad-y-salud-en-el-trabajo': 'Seguridad y Salud en el Trabajo',
  'cosmetologia-y-estetica-integral': 'Cosmetología y Estética Integral',
};

export default function MetricasPage() {
  const [loading, setLoading] = useState(true);
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [timeFilter, setTimeFilter] = useState<'all' | '7d' | '30d'>('7d');

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Obtener datos de telemetría de visitas
      const { data: metricasData, error: metricasError } = await supabase
        .from('metricas_visitas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (!metricasError && metricasData) {
        setVisitas(metricasData as Visita[]);
      }

      // 2. Obtener total de leads para cálculo de conversión
      const { count } = await supabase
        .from('inscripciones')
        .select('*', { count: 'exact', head: true });

      setTotalLeads(count || 0);
    } catch (err) {
      console.error('Error cargando métricas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtrar por rango de tiempo
  const filteredVisitas = useMemo(() => {
    if (timeFilter === 'all') return visitas;
    const now = new Date().getTime();
    const days = timeFilter === '7d' ? 7 : 30;
    const cutoff = now - days * 24 * 60 * 60 * 1000;
    return visitas.filter(v => new Date(v.created_at).getTime() >= cutoff);
  }, [visitas, timeFilter]);

  // Cálculos estadísticos
  const totalVisitas = filteredVisitas.length;
  
  const totalSegundos = filteredVisitas.reduce((acc, v) => acc + (v.duracion_segundos || 0), 0);
  const duracionPromedio = totalVisitas > 0 ? Math.round(totalSegundos / totalVisitas) : 0;

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Top Programas Técnicos
  const programasStats = useMemo(() => {
    const map: Record<string, { views: number; totalSeconds: number }> = {};
    
    filteredVisitas.forEach(v => {
      if (v.programa_slug) {
        const slug = v.programa_slug;
        if (!map[slug]) map[slug] = { views: 0, totalSeconds: 0 };
        map[slug].views += 1;
        map[slug].totalSeconds += (v.duracion_segundos || 0);
      }
    });

    return Object.entries(map)
      .map(([slug, data]) => ({
        slug,
        nombre: PROGRAM_NAMES[slug] || slug.replace(/-/g, ' ').toUpperCase(),
        views: data.views,
        avgSeconds: Math.round(data.totalSeconds / data.views),
      }))
      .sort((a, b) => b.views - a.views);
  }, [filteredVisitas]);

  const totalVistasProgramas = programasStats.reduce((acc, p) => acc + p.views, 0);

  // Top Páginas Generales
  const paginasStats = useMemo(() => {
    const map: Record<string, { views: number; totalSeconds: number }> = {};
    
    filteredVisitas.forEach(v => {
      const ruta = v.ruta || '/';
      if (!map[ruta]) map[ruta] = { views: 0, totalSeconds: 0 };
      map[ruta].views += 1;
      map[ruta].totalSeconds += (v.duracion_segundos || 0);
    });

    return Object.entries(map)
      .map(([ruta, data]) => ({
        ruta,
        views: data.views,
        avgSeconds: Math.round(data.totalSeconds / data.views),
        percentage: totalVisitas > 0 ? Math.round((data.views / totalVisitas) * 100) : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);
  }, [filteredVisitas, totalVisitas]);

  // Distribución de Dispositivos
  const dispositivosStats = useMemo(() => {
    let movil = 0;
    let desktop = 0;
    filteredVisitas.forEach(v => {
      if (v.dispositivo === 'movil') movil++;
      else desktop++;
    });
    return {
      movil,
      desktop,
      movilPct: totalVisitas > 0 ? Math.round((movil / totalVisitas) * 100) : 0,
      desktopPct: totalVisitas > 0 ? Math.round((desktop / totalVisitas) * 100) : 0,
    };
  }, [filteredVisitas, totalVisitas]);

  // Tasa de conversión estimada
  const conversionRate = totalVisitas > 0 ? ((totalLeads / totalVisitas) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Telemetría Web & Analíticas en Tiempo Real</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Métricas de Tráfico y Programas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Conoce qué programas despiertan más interés, cuánto tiempo leen los aspirantes y de qué dispositivos navegan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Filtro de tiempo */}
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex items-center shadow-xs">
            <button
              onClick={() => setTimeFilter('7d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                timeFilter === '7d' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7 días
            </button>
            <button
              onClick={() => setTimeFilter('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                timeFilter === '30d' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30 días
            </button>
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                timeFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todo
            </button>
          </div>

          {/* Botón Refrescar */}
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>

          {/* Enlace Oficial a Google Analytics */}
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Google Analytics 4</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* Tarjetas KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Vistas Totales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Vistas</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {loading ? '...' : totalVisitas}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Páginas consultadas</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        {/* Tiempo Promedio de Permanencia */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Permanencia Media</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {loading ? '...' : formatDuration(duracionPromedio)}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Por página visitada</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Interés en Programas Técnicos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Vistas de Programas</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {loading ? '...' : totalVistasProgramas}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Fichas técnicas leídas</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Conversión Leads / Visitas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tasa de Conversión</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {loading ? '...' : `${conversionRate}%`}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">{totalLeads} prospectos registrados</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid Principal: Top Programas y Páginas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Programas con Mayor Interés (2 columnas) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Programas Técnicos Más Consultados
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ranking de demanda y tiempo de lectura dedicado por los aspirantes
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                {programasStats.length} programas registrados
              </span>
            </div>

            {programasStats.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">Sin datos de programas aún</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  A medida que los aspirantes ingresen a las páginas de los programas, verás aquí el ranking automático.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {programasStats.map((prog, idx) => {
                  const percentage = totalVistasProgramas > 0 ? Math.round((prog.views / totalVistasProgramas) * 100) : 0;
                  return (
                    <div key={prog.slug} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          {prog.nombre}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDuration(prog.avgSeconds)}
                          </span>
                          <span className="text-blue-600 font-extrabold">{prog.views} vistas ({percentage}%)</span>
                        </div>
                      </div>
                      {/* Barra de progreso */}
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.max(5, percentage)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>💡 Consejo: Los programas con mayor permanencia son ideales para pautas publicitarias.</span>
          </div>
        </div>

        {/* Dispositivos y Resumen de Tráfico (1 columna) */}
        <div className="space-y-6">
          {/* Dispositivos */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-600" />
              Dispositivo de Navegación
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                    Móvil / Celular
                  </span>
                  <span>{dispositivosStats.movilPct}% ({dispositivosStats.movil})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${dispositivosStats.movilPct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-slate-500" />
                    Computador / Desktop
                  </span>
                  <span>{dispositivosStats.desktopPct}% ({dispositivosStats.desktop})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${dispositivosStats.desktopPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Directa de Google Analytics */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-sm border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30">
                Google Analytics 4
              </span>
              <span className="text-xs text-slate-400">ID: G-TTPVHH5XKT</span>
            </div>
            <h4 className="font-black text-base leading-snug mb-2">
              Informes Demográficos y En Vivo
            </h4>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Accede al mapa de calor en tiempo real, ciudades de Córdoba y canales de adquisición directos.
            </p>
            <a
              href="https://analytics.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
            >
              <span>Abrir Consola GA4</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Páginas y Rutas Más Vistas */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Eye className="w-5 h-5 text-slate-700" />
          Rutas y Páginas Más Concurridas
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Distribución de tráfico en las secciones institucionales del sitio web
        </p>

        {paginasStats.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Sin visitas registradas en este período.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-100">
                <tr>
                  <th className="py-3 px-4">Página / Ruta</th>
                  <th className="py-3 px-4">Vistas</th>
                  <th className="py-3 px-4">Porcentaje de Tráfico</th>
                  <th className="py-3 px-4">Permanencia Promedio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {paginasStats.map((item) => (
                  <tr key={item.ruta} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 font-mono text-[11px]">
                      {item.ruta}
                    </td>
                    <td className="py-3 px-4 font-bold">{item.views}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${item.percentage}%` }} />
                        </div>
                        <span>{item.percentage}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {formatDuration(item.avgSeconds)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
