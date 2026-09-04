import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, GraduationCap, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Schema JSON-LD para SEO y Autoría J&M Tech Solutions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Academia Frederick Floret",
            "alternateName": "Frederick Floret S.A.S.",
            "url": "https://academiafrederickfloret.com",
            "logo": "https://academiafrederickfloret.com/logo.png",
            "description": "Institución de Educación para el Trabajo y el Desarrollo Humano en Montería, Córdoba. Programas técnicos laborales en salud y administración.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Calle 27 No. 10 - 21 Barrio Centro",
              "addressLocality": "Montería",
              "addressRegion": "Córdoba",
              "addressCountry": "CO"
            },
            "telephone": "+573205206613",
            "email": "admisiones@academiafrederickfloret.com",
            "creator": {
              "@type": "Organization",
              "name": "J&M Tech Solutions",
              "url": "https://www.jymtechsolutions.online/es",
              "description": "Agencia de automatización con IA y desarrollo de software"
            }
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Columna 1: Marca e Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-16 flex items-center justify-center p-1 bg-white/10 rounded-xl">
                <img
                  src="/logo.png"
                  alt="Logo Oficial Academia Frederick Floret"
                  className="h-14 w-auto object-contain brightness-105"
                />
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Educación para el Trabajo y el Desarrollo Humano. Formamos con vocación, calidad y eficiencia a los técnicos laborales que transforman a Córdoba.
            </p>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p>• NIT: 901261489-5</p>
              <p>• Licencia de Funcionamiento No. 001514</p>
              <p>• Res. 0990 de 2022 (SEM Montería)</p>
            </div>

            {/* Redes Sociales Oficiales */}
            <div className="pt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
                Síguenos en Redes:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/academiafrederickfloret/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-xs border border-slate-800 hover:border-transparent"
                  title="Facebook Academia Frederick Floret"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/academia.frederick.floret/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-xs border border-slate-800 hover:border-transparent"
                  title="Instagram @academia.frederick.floret"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@academiafrederickfloret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-black text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-xs border border-slate-800 hover:border-transparent hover:shadow-[0_0_12px_rgba(255,0,80,0.5)]"
                  title="TikTok @academiafrederickfloret"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.86 1.33-.03 2.57-.86 3.12-2.07.28-.6.38-1.28.38-1.95V.02z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Columna 2: Programas de Salud */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Área de la Salud
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/programas" className="hover:text-white transition-colors">
                  Auxiliar en Enfermería
                </Link>
              </li>
              <li>
                <Link href="/programas" className="hover:text-white transition-colors">
                  Auxiliar en Salud Oral
                </Link>
              </li>
              <li>
                <Link href="/programas" className="hover:text-white transition-colors">
                  Servicios Farmacéuticos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Enlaces Rápidos y Portal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Comunidad Educativa
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://q10academico.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-400 font-semibold"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Portal de Estudiantes Q10</span>
                </a>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio Institucional
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Misión y Filosofía
                </Link>
              </li>
              <li>
                <Link href="/sede" className="hover:text-white transition-colors">
                  Sede Edificio Frederick Floret
                </Link>
              </li>
              <li>
                <Link href="/inscripciones" className="hover:text-white transition-colors">
                  Admisiones &amp; Cuotas 2026
                </Link>
              </li>
              <li>
                <Link href="/politicas" className="hover:text-white transition-colors text-slate-300 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Políticas &amp; Privacidad</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto Oficial */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Sede Principal Montería
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Calle 27 No. 10 - 21, Barrio Centro, Montería, Córdoba.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href="https://wa.me/573205206613" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  (+57) 320 520 6613
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:admisiones@academiafrederickfloret.com" className="hover:text-white">
                  admisiones@academiafrederickfloret.com
                </a>
              </p>
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold block mb-0.5">Atención Personalizada:</span>
                  Isabel Cristina Petro · Coordinación General
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Barra de Transparencia Normativa y Políticas Legales */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-slate-300">Marco Legal &amp; Transparencia:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400">
            <Link href="/politicas/tratamiento-datos" className="hover:text-white transition-colors">
              Tratamiento de Datos (Ley 1581)
            </Link>
            <span className="text-slate-700">·</span>
            <Link href="/politicas/habeas-data" className="hover:text-white transition-colors">
              Habeas Data &amp; Derechos ARCO
            </Link>
            <span className="text-slate-700">·</span>
            <Link href="/politicas/uso-ia-iso-42001" className="hover:text-white transition-colors">
              Uso Ético de IA (ISO 42001)
            </Link>
            <span className="text-slate-700">·</span>
            <Link href="/politicas/consentimiento-imagenes" className="hover:text-white transition-colors">
              Consentimiento de Imagen y Voz
            </Link>
          </div>
        </div>

        {/* Separador */}
        <hr className="border-slate-800 my-8" />

        {/* Pie de Página con Firma de Desarrollo J&M Tech Solutions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-slate-500 text-[11px]">
          <div>
            <p>&copy; {currentYear} Academia Frederick Floret S.A.S. Todos los derechos reservados.</p>
            <p className="text-[10px] text-slate-600 mt-0.5">
              Educación para el Trabajo y el Desarrollo Humano · Vigilada por la Secretaría de Educación de Montería.
            </p>
          </div>

          {/* Firma Oficial según directrices de manuel_context */}
          <div className="footer-copyright">
            <p>
              Desarrollado por{' '}
              <a
                href="https://www.jymtechsolutions.online/es"
                hrefLang="es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white font-semibold underline transition-colors"
              >
                J&M Tech Solutions
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
