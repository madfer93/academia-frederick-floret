'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const pathname = usePathname();

  // No mostrar en panel administrativo para evitar colisiones con tablas/formularios
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <aside aria-label="Contacto por WhatsApp" className="fixed bottom-5 left-5 z-40">
      <a
        href="https://wa.me/573205206613?text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20las%20inscripciones%20en%20la%20Academia%20Frederick%20Floret"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20"
        title="Hablar con Admisiones por WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#25D366] animate-pulse"></span>
        </div>
        <span className="text-xs font-extrabold hidden sm:inline-block tracking-tight">
          Admisiones WhatsApp
        </span>
      </a>
    </aside>
  );
}
