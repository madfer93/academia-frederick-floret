'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Barra superior de acreditación institucional */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Licencia de Funcionamiento No. 001514
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">Resolución SEM 0990 de 2022 · MinSalud Rad. 200478261</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="font-semibold text-amber-400">✨ 34 Años Educando a Córdoba</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a 
              href="https://wa.me/573205206613?text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20las%20inscripciones%20en%20Academia%20Frederick%20Floret" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-red-500" /> (+57) 320 520 6613
            </a>
          </div>
        </div>
      </div>

      {/* Barra de navegación principal */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logotipo Oficial */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Isotipo 'F' Oficial en SVG con gradiente corporativo */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D51C28] to-[#FF8C01] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D51C28]/10 to-transparent"></div>
              <span className="text-[#D51C28] font-black text-2xl tracking-tighter">F</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                FREDERICK <span className="text-[#D51C28]">FLORET</span>
              </span>
              <span className="text-[10px] font-bold bg-red-100 text-[#D51C28] px-1.5 py-0.5 rounded-full">
                34 AÑOS
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-1">
              Educación para el Trabajo y el Desarrollo Humano
            </p>
          </div>
        </Link>

        {/* Enlaces Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="#inicio" className="text-sm font-semibold text-slate-700 hover:text-[#D51C28] transition-colors">
            Inicio
          </Link>
          <Link href="#programas" className="text-sm font-semibold text-slate-700 hover:text-[#D51C28] transition-colors">
            Programas Técnicos
          </Link>
          <Link href="#nosotros" className="text-sm font-semibold text-slate-700 hover:text-[#D51C28] transition-colors">
            Nuestra Institución
          </Link>
          <Link href="#sede" className="text-sm font-semibold text-slate-700 hover:text-[#D51C28] transition-colors">
            Sede Montería
          </Link>
        </div>

        {/* Botones de Acción */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Acceso a Q10 */}
          <a
            href="https://q10academico.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:border-[#D51C28] hover:text-[#D51C28] transition-all bg-slate-50/50"
            title="Portal de Estudiantes y Docentes Q10"
          >
            <GraduationCap className="w-4 h-4 text-[#D51C28]" />
            <span>Portal Q10</span>
          </a>

          {/* Botón de Inscripción */}
          <Link
            href="#inscripciones"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white text-xs font-bold shadow-md shadow-red-500/20 hover:shadow-lg hover:brightness-105 transition-all"
          >
            <span>Inscripciones 2026</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Botón Móvil */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="#inscripciones"
            className="px-3.5 py-2 rounded-lg bg-[#D51C28] text-white text-xs font-bold"
          >
            Inscribirme
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Link
            href="#inicio"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-red-50 hover:text-[#D51C28]"
          >
            Inicio
          </Link>
          <Link
            href="#programas"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-red-50 hover:text-[#D51C28]"
          >
            Programas Técnicos
          </Link>
          <Link
            href="#nosotros"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-red-50 hover:text-[#D51C28]"
          >
            Nuestra Institución
          </Link>
          <Link
            href="#sede"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-red-50 hover:text-[#D51C28]"
          >
            Sede Montería
          </Link>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://q10academico.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm bg-slate-50"
            >
              <GraduationCap className="w-4 h-4 text-[#D51C28]" />
              Ingresar al Portal Q10
            </a>
            <Link
              href="#inscripciones"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white font-bold text-sm"
            >
              Iniciar Preinscripción Online
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
