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
            "email": "academiafrederickfloret@gmail.com",
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
              <li>
                <Link href="/programas" className="hover:text-white transition-colors">
                  Administrativo en Salud
                </Link>
              </li>
              <li>
                <Link href="/programas" className="hover:text-white transition-colors">
                  Auxiliar en Salud Pública
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
                <a href="mailto:academiafrederickfloret@gmail.com" className="hover:text-white">
                  academiafrederickfloret@gmail.com
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

        {/* Separador */}
        <hr className="border-slate-800 my-10" />

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
