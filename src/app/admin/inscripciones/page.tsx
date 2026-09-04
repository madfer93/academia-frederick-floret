'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MessageSquare, 
  Trash2, 
  AlertCircle,
  RefreshCw,
  Phone,
  Mail,
  FileText
} from 'lucide-react';

interface Lead {
  id: string;
  nombres: string;
  apellidos: string;
  tipo_documento: string;
  documento: string;
  telefono: string;
  email: string | null;
  programa_interes: string;
  jornada_interes: string | null;
  nivel_educativo: string | null;
  mensaje: string | null;
  estado: string;
  created_at: string;
  acudiente_nombre?: string | null;
  acudiente_documento?: string | null;
  acudiente_telefono?: string | null;
  acudiente_parentesco?: string | null;
}

export default function AdminInscripcionesPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [programFilter, setProgramFilter] = useState('todos');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inscripciones')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads((data as Lead[]) || []);
    } catch (err) {
      console.error('Error obteniendo inscripciones:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Actualizar estado del lead en tiempo real
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('inscripciones')
        .update({ estado: newStatus })
        .eq('id', id);

      if (error) throw error;

      setLeads(prev => prev.map(l => l.id === id ? { ...l, estado: newStatus } : l));
    } catch (err) {
      console.error('Error actualizando estado:', err);
      alert('No se pudo actualizar el estado.');
    }
  };

  // Eliminar lead
  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar el registro de ${nombre}?`)) return;

    try {
      const { error } = await supabase
        .from('inscripciones')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLeads(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error('Error eliminando inscripción:', err);
      alert('No se pudo eliminar el registro.');
    }
  };

  // Exportar a Excel / CSV (estilo Fundetec exportar_leads.php)
  const exportToCSV = () => {
    if (leads.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const headers = [
      'ID',
      'Fecha Registro',
      'Nombres',
      'Apellidos',
      'Tipo Doc',
      'Documento',
      'Teléfono',
      'Correo',
      'Programa de Interés',
      'Jornada',
      'Nivel Educativo',
      'Acudiente Nombre',
      'Acudiente Documento',
      'Acudiente Teléfono',
      'Acudiente Parentesco',
      'Estado',
      'Mensaje'
    ];

    const rows = filteredLeads.map(l => [
      l.id,
      new Date(l.created_at).toLocaleString('es-CO'),
      `"${l.nombres.replace(/"/g, '""')}"`,
      `"${l.apellidos.replace(/"/g, '""')}"`,
      l.tipo_documento,
      l.documento,
      l.telefono,
      l.email || '',
      `"${l.programa_interes.replace(/"/g, '""')}"`,
      `"${(l.jornada_interes || '').replace(/"/g, '""')}"`,
      `"${(l.nivel_educativo || '').replace(/"/g, '""')}"`,
      `"${(l.acudiente_nombre || '').replace(/"/g, '""')}"`,
      `"${(l.acudiente_documento || '').replace(/"/g, '""')}"`,
      `"${(l.acudiente_telefono || '').replace(/"/g, '""')}"`,
      `"${(l.acudiente_parentesco || '').replace(/"/g, '""')}"`,
      l.estado || 'pendiente',
      `"${(l.mensaje || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Inscripciones_Frederick_Floret_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrado reactivo
  const filteredLeads = leads.filter(lead => {
    const matchSearch = 
      lead.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.documento.includes(searchTerm) ||
      lead.telefono.includes(searchTerm);

    const matchStatus = statusFilter === 'todos' || (lead.estado || 'pendiente') === statusFilter;
    const matchProgram = programFilter === 'todos' || lead.programa_interes === programFilter;

    return matchSearch && matchStatus && matchProgram;
  });

  return (
    <div className="space-y-6">
      {/* Cabecera y Exportador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-[#D51C28]" />
            <span>Gestión de Preinscripciones (Leads)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Base de datos de aspirantes registrados en línea para seguimiento y matrícula.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={fetchLeads}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            title="Recargar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exportar a Excel / CSV</span>
          </button>
        </div>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, documento o celular..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50"
          >
            <option value="todos">Todos los Estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="contactado">Contactados</option>
            <option value="matriculado">Matriculados</option>
            <option value="descartado">Descartados</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50"
          >
            <option value="todos">Todos los Programas</option>
            <option value="Auxiliar en Enfermería">Auxiliar en Enfermería</option>
            <option value="Auxiliar en Salud Oral">Auxiliar en Salud Oral</option>
            <option value="Auxiliar en Servicios Farmacéuticos">Servicios Farmacéuticos</option>
            <option value="Auxiliar de Educación para la Primera Infancia">Educación Primera Infancia</option>
            <option value="Auxiliar Contable y Financiero">Contable y Financiero</option>
            <option value="Asistentes de Marketing y Comunicación">Marketing y Comunicación</option>
            <option value="Auxiliar en Deporte y Recreación">Deporte y Recreación</option>
            <option value="Auxiliar Administrativo Organizacional">Auxiliar Organizacional</option>
          </select>
        </div>
      </div>

      {/* Tabla de Inscripciones */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <AlertCircle className="w-10 h-10 mx-auto text-slate-300" />
            <h3 className="font-bold text-slate-700 text-sm">No se encontraron prospectos</h3>
            <p className="text-xs text-slate-400">Intenta cambiar los filtros de búsqueda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-5">Fecha</th>
                  <th className="py-3.5 px-5">Aspirante</th>
                  <th className="py-3.5 px-5">Documento</th>
                  <th className="py-3.5 px-5">Programa y Jornada</th>
                  <th className="py-3.5 px-5">Estado</th>
                  <th className="py-3.5 px-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 text-slate-400 text-[11px] whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString('es-CO')}
                    </td>
                    <td className="py-4 px-5 font-bold text-slate-900">
                      <div>{lead.nombres} {lead.apellidos}</div>
                      <div className="text-[11px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{lead.telefono}</span>
                      </div>
                      {lead.email && (
                        <div className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{lead.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-5 align-top">
                      <div className="font-mono text-[11px] font-semibold text-slate-800">
                        {lead.tipo_documento} {lead.documento}
                      </div>

                      {/* Tag Menor de Edad y Datos del Acudiente */}
                      {(lead.tipo_documento === 'TI' || lead.acudiente_nombre) && (
                        <div className="mt-2 p-2 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-[11px] space-y-1">
                          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-200/80 text-amber-900 font-black text-[9px] uppercase tracking-wider">
                            🛡️ Acudiente ({lead.acudiente_parentesco || 'Tutor'})
                          </div>
                          <div className="font-bold text-slate-900">
                            {lead.acudiente_nombre || 'Registrado en observaciones'}
                          </div>
                          {lead.acudiente_documento && (
                            <div className="text-[10px] text-slate-600">
                              C.C. {lead.acudiente_documento}
                            </div>
                          )}
                          {lead.acudiente_telefono && (
                            <div className="pt-0.5">
                              <a
                                href={`https://wa.me/57${lead.acudiente_telefono.replace(/\D/g, '')}?text=Hola,%20te%20saludamos%20desde%20la%20Academia%20Frederick%20Floret%20respecto%20a%20la%20inscripci%C3%B3n%20de%20tu%20acudido%20${encodeURIComponent(lead.nombres)}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-800 underline"
                              >
                                <Phone className="w-2.5 h-2.5" />
                                <span>{lead.acudiente_telefono} (WhatsApp)</span>
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-slate-800">{lead.programa_interes}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{lead.jornada_interes || 'Sin jornada'}</div>
                      {lead.mensaje && (
                        <div className="text-[10px] text-slate-500 italic mt-1 bg-slate-50 p-1.5 rounded-lg border border-slate-100 max-w-xs whitespace-pre-wrap">
                          &ldquo;{lead.mensaje}&rdquo;
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <select
                        value={lead.estado || 'pendiente'}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-hidden transition-colors ${
                          lead.estado === 'matriculado'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : lead.estado === 'contactado'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : lead.estado === 'descartado'
                            ? 'bg-slate-100 text-slate-500 border-slate-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="contactado">Contactado</option>
                        <option value="matriculado">Matriculado</option>
                        <option value="descartado">Descartado</option>
                      </select>
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/57${lead.telefono.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(lead.nombres)},%20te%20saludamos%20desde%20la%20Academia%20Frederick%20Floret%20de%20Monter%C3%ADa%20respecto%20a%20tu%20inscripci%C3%B3n%20para%20${encodeURIComponent(lead.programa_interes)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                          title="Escribir por WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleDelete(lead.id, `${lead.nombres} ${lead.apellidos}`)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                          title="Eliminar registro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
