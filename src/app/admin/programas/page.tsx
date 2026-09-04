'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  GraduationCap, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  UploadCloud, 
  Image as ImageIcon,
  Trash2,
  ExternalLink
} from 'lucide-react';

interface ProgramDB {
  id: string;
  titulo: string;
  slug: string;
  categoria: string;
  descripcion_corta: string;
  duracion: string;
  resolucion: string | null;
  imagen_url: string | null;
  activo: boolean;
}

export default function AdminProgramasPage() {
  const [programs, setPrograms] = useState<ProgramDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  const handleChange = (id: string, field: keyof ProgramDB, val: string | boolean | null) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));
  };

  // Subir imagen desde la PC directamente al Bucket 'programas' de Supabase
  const handleFileUpload = async (id: string, slug: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecciona un archivo de imagen válido (JPG, PNG o WEBP).');
      return;
    }

    setUploadingId(id);
    setErrorMsg('');
    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'webp';
      // Nombre limpio y único
      const cleanSlug = slug || 'programa';
      const filePath = `${cleanSlug}-${Date.now()}.${fileExt}`;

      // 1. Subir al Bucket 'programas'
      const { error: uploadError } = await supabase.storage
        .from('programas')
        .upload(filePath, file, { 
          upsert: true,
          contentType: file.type 
        });

      if (uploadError) throw uploadError;

      // 2. Obtener URL Pública del archivo
      const { data: publicUrlData } = supabase.storage
        .from('programas')
        .getPublicUrl(filePath);

      const newImageUrl = publicUrlData.publicUrl;

      // 3. Guardar automáticamente en la tabla 'programas'
      const { error: dbError } = await supabase
        .from('programas')
        .update({ imagen_url: newImageUrl })
        .eq('id', id);

      if (dbError) throw dbError;

      // Actualizar estado local
      handleChange(id, 'imagen_url', newImageUrl);
      setSuccessMsg(`¡Foto para "${slug}" subida y guardada exitosamente!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Error al subir la imagen al Storage.');
    } finally {
      setUploadingId(null);
      setDragOverId(null);
    }
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
          imagen_url: prog.imagen_url,
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-8 h-8 text-[#D51C28]" />
            <span>Gestión de Programas y Fotos Oficiales</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sube las fotos de tus programas directamente desde tu PC al servidor y actualiza resoluciones y descripciones.
          </p>
        </div>

        <button
          onClick={fetchPrograms}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-2 text-xs font-bold self-start cursor-pointer"
          title="Recargar Programas"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Recargar</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading && programs.length === 0 ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-[#D51C28]" />
          <span>Cargando programas de la base de datos...</span>
        </div>
      ) : null}

      <div className="space-y-6">
        {programs.map((prog) => {
          const isUploading = uploadingId === prog.id;
          const isDragOver = dragOverId === prog.id;

          const currentImg = prog.imagen_url || `/programas/${prog.slug}.webp`;

          return (
            <div
              key={prog.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Encabezado del Programa */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                    prog.categoria === 'salud' 
                      ? 'bg-red-50 text-[#D51C28]' 
                      : 'bg-blue-50 text-blue-700'
                  }`}>
                    {prog.categoria === 'salud' ? 'Área Salud' : 'Área Comercial'}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">
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

              {/* Fila con Foto a la izquierda y Datos a la derecha */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                
                {/* Zona de Subida y Vista Previa de Imagen (PC) */}
                <div className="md:col-span-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>Foto Oficial del Programa</span>
                    </label>
                    {prog.imagen_url && (
                      <button
                        type="button"
                        onClick={() => handleChange(prog.id, 'imagen_url', null)}
                        className="text-[10px] text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                        title="Quitar foto actual"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Quitar</span>
                      </button>
                    )}
                  </div>

                  {/* Caja Drag & Drop / Click para Subir */}
                  <div
                    onClick={() => fileInputRefs.current[prog.id]?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOverId(prog.id); }}
                    onDragLeave={() => setDragOverId(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverId(null);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleFileUpload(prog.id, prog.slug, file);
                    }}
                    className={`relative w-full aspect-[16/11] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 border-dashed flex flex-col items-center justify-center ${
                      isDragOver 
                        ? 'border-[#D51C28] bg-red-50/50 scale-[1.01]' 
                        : currentImg 
                          ? 'border-slate-200 bg-slate-900 group hover:border-slate-400' 
                          : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-[#D51C28]'
                    }`}
                  >
                    {currentImg ? (
                      <>
                        <img 
                          src={currentImg} 
                          alt={prog.titulo} 
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 text-center">
                          <UploadCloud className="w-6 h-6 mb-1 text-white animate-bounce" />
                          <span className="font-bold text-xs">Clic para cambiar foto</span>
                          <span className="text-[10px] text-slate-200">o arrastra una nueva imagen desde tu PC</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4 text-slate-500 select-none">
                        <UploadCloud className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                        <span className="font-bold text-xs block text-slate-700">Subir imagen desde el PC</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Clic aquí o arrastra un archivo (.webp, .jpg, .png)</span>
                      </div>
                    )}

                    {/* Loader de Subida */}
                    {isUploading && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-white" />
                        <span className="font-bold text-xs">Subiendo al servidor...</span>
                      </div>
                    )}
                  </div>

                  {/* Input de Archivo Oculto */}
                  <input
                    ref={(el) => { fileInputRefs.current[prog.id] = el; }}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(prog.id, prog.slug, file);
                    }}
                  />

                  {/* Botón explícito para abrir selector de archivo */}
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[prog.id]?.click()}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold text-center flex items-center justify-center gap-1.5 transition-colors border border-slate-200 cursor-pointer"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-[#D51C28]" />
                    <span>Seleccionar foto desde el computador</span>
                  </button>

                  {/* Campo de URL o Ruta Manual */}
                  <input
                    type="text"
                    placeholder="/programas/nombre.webp o URL externa"
                    value={prog.imagen_url || ''}
                    onChange={(e) => handleChange(prog.id, 'imagen_url', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 text-[10px] text-slate-500 bg-slate-50 font-mono"
                    title="URL o ruta directa de la imagen"
                  />
                </div>

                {/* Campos de Texto del Programa */}
                <div className="md:col-span-8 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Título del Programa</label>
                      <input
                        type="text"
                        value={prog.titulo}
                        onChange={(e) => handleChange(prog.id, 'titulo', e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50 font-semibold"
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

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Descripción Corta / Enfoque</label>
                    <textarea
                      rows={2}
                      value={prog.descripcion_corta}
                      onChange={(e) => handleChange(prog.id, 'descripcion_corta', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Resolución Legal SEM / MinSalud</label>
                    <input
                      type="text"
                      value={prog.resolucion || ''}
                      onChange={(e) => handleChange(prog.id, 'resolucion', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] outline-hidden bg-slate-50/50"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-slate-400 font-mono">
                      Slug: {prog.slug}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSave(prog)}
                      disabled={savingId === prog.id}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#D51C28] text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                    >
                      {savingId === prog.id ? (
                        <span>Guardando cambios...</span>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Guardar Textos</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
