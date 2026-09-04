'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Image as ImageIcon, Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw, UploadCloud } from 'lucide-react';

interface Foto {
  id: string;
  titulo: string;
  url: string;
  categoria: string;
  activo: boolean;
  created_at: string;
}

export default function AdminGaleriaPage() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Formulario de nueva foto
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [categoria, setCategoria] = useState('instalaciones');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchFotos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('galeria_fotos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Tabla galeria_fotos pendiente de creación en Supabase. Se mostrarán fotos locales.');
        setFotos([]);
        return;
      }
      setFotos((data as Foto[]) || []);
    } catch (err) {
      console.warn('Conexión con tabla galeria_fotos pendiente:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFotos();
  }, []);

  const handleCreateFoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const { error } = await supabase
        .from('galeria_fotos')
        .insert([
          {
            titulo: titulo.trim(),
            url: url.trim(),
            categoria,
            activo: true,
          }
        ]);

      if (error) throw error;

      setSuccessMsg('Fotografía agregada a la galería con éxito.');
      setTitulo('');
      setUrl('');
      fetchFotos();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Error guardando fotografía.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar esta fotografía?')) return;
    try {
      const { error } = await supabase.from('galeria_fotos').delete().eq('id', id);
      if (error) throw error;
      setFotos(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error('Error eliminando foto:', err);
      alert('No se pudo eliminar la imagen.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-7 h-7 text-[#D51C28]" />
            <span>Galería de Fotos &amp; Instalaciones</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Administra las imágenes de las sedes, laboratorios de enfermería, salas de sistemas y eventos.
          </p>
        </div>

        <button
          onClick={fetchFotos}
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

      {/* Formulario Agregar Foto */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#D51C28]" />
          <span>Agregar Nueva Imagen</span>
        </h3>

        <form onSubmit={handleCreateFoto} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4">
            <label className="block text-xs font-bold text-slate-700 mb-1">Título o Descripción</label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej. Sala de Informática (80 PCs)"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-slate-700 mb-1">URL de la Imagen</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://... /foto.jpg"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
            >
              <option value="instalaciones">Instalaciones / Sede</option>
              <option value="practicas">Prácticas Clínicas</option>
              <option value="eventos">Eventos / Grados</option>
            </select>
          </div>

          <div className="sm:col-span-12 flex justify-end pt-2">
            <button
              type="submit"
              disabled={uploading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{uploading ? 'Guardando...' : 'Publicar Fotografía'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Grilla de Fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {fotos.map((f) => (
          <div key={f.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs group flex flex-col justify-between">
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
              <img src={f.url} alt={f.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 left-2 text-[10px] font-bold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                {f.categoria}
              </span>
            </div>
            <div className="p-3.5 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 truncate" title={f.titulo}>
                {f.titulo}
              </span>
              <button
                onClick={() => handleDelete(f.id)}
                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                title="Eliminar foto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
