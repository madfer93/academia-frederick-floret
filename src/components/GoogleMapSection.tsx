'use client';

import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';

interface GoogleMapSectionProps {
  className?: string;
}

export default function GoogleMapSection({ className = '' }: GoogleMapSectionProps) {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.3642391257417!2d-75.88491642519648!3d8.751757791298909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2fe425de0d39%3A0xaa9776a676b94588!2sAcademia%20Frederick%20Floret!5e0!3m2!1ses-419!2sco!4v1788525689959!5m2!1ses-419!2sco";
  const directMapsUrl = "https://www.google.com/maps/search/?api=1&query=Academia+Frederick+Floret+Monteria+Calle+27+10-21";

  return (
    <section className={`py-14 bg-white border-b border-slate-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Cabecera de Ubicación */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D51C28]">
              <Compass className="w-3.5 h-3.5" />
              <span>Geolocalización Oficial</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Cómo Llegar a la Academia Frederick Floret
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Estamos en el corazón financiero y comercial de Montería: <strong>Calle 27 No. 10 - 21 (Barrio Centro)</strong>. Conectados con todas las rutas de transporte público y buses intermunicipales del departamento.
            </p>
          </div>

          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-[#D51C28] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-white" />
            <span>Abrir en Google Maps / Waze</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Contenedor del Mapa Interactivo */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100 aspect-video sm:aspect-[21/9] min-h-[380px]">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Mapa interactivo Academia Frederick Floret Montería"
            className="w-full h-full"
          />

          {/* Tarjeta Flotante con Datos Clave de Ubicación */}
          <div className="absolute top-4 left-4 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-lg max-w-sm pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D51C28] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <strong className="block text-slate-900 font-bold">Edificio Frederick Floret</strong>
              <span className="text-slate-600 text-[11px] block">Calle 27 #10-21 · Barrio Centro, Montería</span>
              <span className="text-emerald-700 font-semibold text-[10px] block mt-0.5">● Abierto hoy: 8:00 am - 6:00 pm</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
