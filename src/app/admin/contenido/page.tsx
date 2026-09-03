'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FileEdit, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface ConfigItem {
  clave: string;
  valor: string;
  categoria: string;
  descripcion: string;
}

export default function AdminContenidoPage() {
  const [configs, setConfigs] = useState<ConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sitio_configuracion')
        .select('*')
        .order('categoria', { ascending: true });

      if (error) throw error;
      setConfigs((data as ConfigItem[]) || []);
    } catch (err) {
      console.error('Error cargando contenidos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleValueChange = (clave: string, newValue: string) => {
    setConfigs(prev => prev.map(c => c.clave === clave ? { ...c, valor: newValue } : c));
  };

  const handleSave = async (clave: string, valor: string) => {
    setSavingKey(clave);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const { error } = await supabase
        .from('sitio_configuracion')
        .upsert({ clave, valor, updated_at: new Date().toISOString() });

      if (error) throw error;
      setSuccessMsg(`Texto "${clave}" guardado correctamente.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Error guardando el contenido.');
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileEdit className="w-7 h-7 text-[#D51C28]" />
            <span>Editor de Textos y Contenidos en Vivo</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Modifica lemas, teléfonos, horarios y avisos institucionales sin tocar código.
          </p>
        </div>

        <button
          onClick={fetchConfigs}
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

      {/* Lista de Campos Editables */}
      <div className="space-y-4">
        {configs.map((item) => (
          <div
            key={item.clave}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D51C28] bg-red-50 px-2 py-0.5 rounded-md">
                  {item.categoria}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">
                  {item.descripcion || item.clave}
                </h3>
              </div>
              <span className="font-mono text-[10px] text-slate-400">clave: {item.clave}</span>
            </div>

            <div>
              {item.valor.length > 80 ? (
                <textarea
                  rows={3}
                  value={item.valor}
                  onChange={(e) => handleValueChange(item.clave, e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              ) : (
                <input
                  type="text"
                  value={item.valor}
                  onChange={(e) => handleValueChange(item.clave, e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                />
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleSave(item.clave, item.valor)}
                disabled={savingKey === item.clave}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#D51C28] text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {savingKey === item.clave ? (
                  <span>Guardando...</span>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar Cambio</span>
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
