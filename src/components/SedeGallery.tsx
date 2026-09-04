'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  HeartPulse, 
  BookOpen, 
  Users, 
  Maximize2, 
  X, 
  MapPin, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface GalleryItem {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: 'laboratorios' | 'aulas' | 'edificio';
  imagen: string;
  descripcion: string;
}

const FOTOS_SEDE: GalleryItem[] = [
  {
    id: 'fachada',
    titulo: 'Fachada Principal Edificio Frederick Floret',
    subtitulo: 'Calle 27 #10-21 · Centro de Montería',
    categoria: 'edificio',
    imagen: '/sede/fachada-edificio-frederick-floret.webp',
    descripcion: 'Edificio propio de tres plantas con ventanales panorámicos, acceso en vidrio templado y aviso oficial iluminado en el centro neurálgico de Montería.'
  },
  {
    id: 'lab-enfermeria',
    titulo: 'Laboratorio Clínico de Enfermería',
    subtitulo: 'Prácticas asistenciales simuladas',
    categoria: 'laboratorios',
    imagen: '/sede/laboratorio-clinico-enfermeria.webp',
    descripcion: 'Equipado con camillas hospitalarias clínicas, torso anatómico con órganos internos, brazo simulador para venopunción y mural temático institucional.'
  },
  {
    id: 'farmacia-didactica',
    titulo: 'Simulador de Farmacia Didáctica',
    subtitulo: 'Dispensación y control Invima',
    categoria: 'laboratorios',
    imagen: '/sede/simulador-farmacia-didactica.webp',
    descripcion: 'Estanterías técnicas clasificadas con medicamentos reales, terminal informática POS de facturación y silletería para talleres prácticos.'
  },
  {
    id: 'recepcion',
    titulo: 'Recepción y Secretaría Académica',
    subtitulo: 'Atención presencial y admisiones',
    categoria: 'edificio',
    imagen: '/sede/recepcion-secretaria-academica.webp',
    descripcion: 'Zona de bienvenida con asesores en vivo, silletería Chesterfield en cuero, señalética oficial y atención personalizada a cargo de la coordinación.'
  },
  {
    id: 'sala-informatica',
    titulo: 'Acceso a Sala de Informática & Consejo',
    subtitulo: '80 computadores e internet de alta velocidad',
    categoria: 'laboratorios',
    imagen: '/sede/sala-informatica-reuniones.webp',
    descripcion: 'Mural en alto relieve con el isotipo de la academia, mesa de planeación docente y acceso directo a los laboratorios de computación con plataforma Q10.'
  },
  {
    id: 'aula-1',
    titulo: 'Aula Teórica Principal (Salón 201)',
    subtitulo: 'Capacidad para 35+ estudiantes',
    categoria: 'aulas',
    imagen: '/sede/aula-teorica-principal-1.webp',
    descripcion: 'Silletería universitaria ergonómica en madera, escritorio docente, ventilación integral y murales motivacionales institucionales.'
  },
  {
    id: 'aula-2',
    titulo: 'Aula Climatizada con Tablero Acrílico',
    subtitulo: 'Ambiente de aprendizaje moderno',
    categoria: 'aulas',
    imagen: '/sede/aula-teorica-principal-2.webp',
    descripcion: 'Aula con aire acondicionado mini-split de alta eficiencia, tablero panorámico de borrado en seco e iluminación LED empotrada.'
  },
  {
    id: 'sala-espera',
    titulo: 'Sala de Espera y Centro de Copiado',
    subtitulo: 'Comodidad para estudiantes y padres',
    categoria: 'edificio',
    imagen: '/sede/sala-espera-atencion.webp',
    descripcion: 'Estación de reprografía multifuncional para guías de estudio, silletería de espera, sofá de descanso y cartelera informativa general.'
  },
  {
    id: 'aula-seminarios',
    titulo: 'Aula de Seminarios y Talleres',
    subtitulo: 'Espacio para formación directiva',
    categoria: 'aulas',
    imagen: '/sede/aula-seminarios-talleres.webp',
    descripcion: 'Mesa ejecutiva blanca, silletería ergonómica, pizarra blanca, climatización y espacio para defensas de grado y talleres ocupacionales.'
  },
  {
    id: 'acceso-cartelera',
    titulo: 'Hall de Entrada y Acreditaciones',
    subtitulo: 'Transparencia institucional',
    categoria: 'edificio',
    imagen: '/sede/acceso-principal-cartelera.webp',
    descripcion: 'Acceso acristalado con señalética de seguridad, cartelera de licencias ministeriales y resoluciones de Secretaría de Educación.'
  },
  {
    id: 'aula-secundaria',
    titulo: 'Aula de Clases Secundaria',
    subtitulo: 'Luz natural y ventilación cruzada',
    categoria: 'aulas',
    imagen: '/sede/aula-clases-secundaria.webp',
    descripcion: 'Salón dotado con ventanales de ventilación natural, escritorio de cátedra con cajoneras y mobiliario individual estudiantil.'
  },
  {
    id: 'pasillo-banos',
    titulo: 'Pasillo de Salones y Batería Sanitaria',
    subtitulo: 'Salón 203 y servicios higiénicos',
    categoria: 'edificio',
    imagen: '/sede/pasillo-bateria-sanitaria.webp',
    descripcion: 'Pasillos de tránsito amplio con batería de baños independientes para damas y caballeros bajo normas de bioseguridad.'
  },
];

export default function SedeGallery() {
  const [activeCategory, setActiveCategory] = useState<'todas' | 'laboratorios' | 'aulas' | 'edificio'>('todas');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = FOTOS_SEDE.filter(photo => {
    if (activeCategory === 'todas') return true;
    return photo.categoria === activeCategory;
  });

  const selectedPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(selectedPhotoIndex === 0 ? filteredPhotos.length - 1 : selectedPhotoIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  return (
    <section id="galeria-sede" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Encabezado de la Galería */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#D51C28] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D51C28]" />
              Instalaciones Reales en Montería
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Recorrido Fotográfico por Nuestra Sede
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
              Conoce los 353 m² del Edificio Frederick Floret: laboratorios clínicos con camillas y simuladores anatómicos, farmacia didáctica, sala de 80 computadores y aulas climatizadas.
            </p>
          </div>

          {/* Filtros de Categoría */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveCategory('todas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                activeCategory === 'todas'
                  ? 'bg-[#D51C28] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todas las Fotos ({FOTOS_SEDE.length})
            </button>
            <button
              onClick={() => setActiveCategory('laboratorios')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                activeCategory === 'laboratorios'
                  ? 'bg-[#D51C28] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Laboratorios Prácticos</span>
            </button>
            <button
              onClick={() => setActiveCategory('aulas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                activeCategory === 'aulas'
                  ? 'bg-[#D51C28] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Aulas Climatizadas</span>
            </button>
            <button
              onClick={() => setActiveCategory('edificio')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                activeCategory === 'edificio'
                  ? 'bg-[#D51C28] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Fachada &amp; Recepción</span>
            </button>
          </div>
        </div>

        {/* Grilla de Fotos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={photo.imagen}
                  alt={photo.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 text-slate-900 text-[11px] font-bold backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5 text-[#D51C28]" />
                    Ampliar foto
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D51C28]">
                    {photo.categoria === 'laboratorios' ? 'Prácticas Clínicas' : photo.categoria === 'aulas' ? 'Aulas Teóricas' : 'Infraestructura'}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug group-hover:text-[#D51C28] transition-colors">
                  {photo.titulo}
                </h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                  {photo.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox de Foto en Pantalla Completa */}
        {selectedPhoto && selectedPhotoIndex !== null && (
          <div 
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col text-white"
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Botones de Navegación */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Foto siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Contenedor de Imagen */}
              <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.imagen}
                  alt={selectedPhoto.titulo}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Información de la Foto */}
              <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#D51C28] text-white text-[10px] font-black uppercase">
                      {selectedPhoto.categoria}
                    </span>
                    <span className="text-xs text-slate-400">
                      Foto {selectedPhotoIndex + 1} de {filteredPhotos.length}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white">
                    {selectedPhoto.titulo}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    {selectedPhoto.descripcion}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20">
                    <MapPin className="w-3.5 h-3.5" />
                    Calle 27 #10-21 · Montería
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
