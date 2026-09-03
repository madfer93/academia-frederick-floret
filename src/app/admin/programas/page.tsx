'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { GraduationCap, Save, CheckCircle2, AlertCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface ProgramDB {
  id: string;
  titulo: string;
  slug: string;
  categoria: string;
  descripcion_corta: string;
  duracion: string;
  resolucion: string | null;
  activo: boolean;
}

export default function AdminProgramasPage() {
  const [programs, setPrograms] = useState<ProgramDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('programas')
        .select('*')
        .order('titulo', { ascending: true });

      if (error) throw error;
      setPrograms((data as ProgramDB[]) || []);
    } catch (err) {
      console.error('Error cargando programas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleChange = (id: string, field: keyof ProgramDB, val: string | boolean) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));
  };

  const handleSave = async (prog: ProgramDB) => {
    setSavingId(prog.id);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const { error } = await supabase
        .from('programas')
        .update({
          titulo: prog.titulo,
          descripcion_corta: prog.descripcion_corta,
          duracion: prog.duracion,
          resolucion: prog.resolucion,
          activo: prog.activo
        })
        .eq('id', prog.id);

      if (error) throw error;
      setSuccessMsg(`Programa "${prog.titulo}" actualizado exitosamente.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Error guardando el programa.');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-[#D51C28]" />
            <span>Gestión de Programas Técnicos</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Modifica descripciones, duraciones, resoluciones y visibilidad de los programas.
          </p>
        </div>

        <button
          onClick={fetchPrograms}
          className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs self-start"
          title="Recargar"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-6">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D51C28] bg-red-50 px-2.5 py-0.5 rounded-md">
                  {prog.categoria === 'salud' ? 'Área de la Salud' : 'Área Administrativa'}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">
                  {prog.titulo}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleChange(prog.id, 'activo', !prog.activo)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer self-start ${
                  prog.activo
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {prog.activo ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visible en Web</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Oculto</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título del Programa</label>
                <input
                  type="text"
                  value={prog.titulo}
                  onChange={(e) => handleChange(prog.id, 'titulo', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Duración</label>
                <input
                  type="text"
                  value={prog.duracion}
                  onChange={(e) => handleChange(prog.id, 'duracion', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-slate-700 mb-1">Descripción Corta / Enfoque</label>
              <textarea
                rows={2}
                value={prog.descripcion_corta}
                onChange={(e) => handleChange(prog.id, 'descripcion_corta', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
              />
            </div>

            <div className="text-xs">
              <label className="block font-bold text-slate-700 mb-1">Resolución Legal SEM / MinSalud</label>
              <input
                type="text"
                value={prog.resolucion || ''}
                onChange={(e) => handleChange(prog.id, 'resolucion', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => handleSave(prog)}
                disabled={savingId === prog.id}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#D51C28] text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {savingId === prog.id ? (
                  <span>Guardando cambios...</span>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Actualizar Programa</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
