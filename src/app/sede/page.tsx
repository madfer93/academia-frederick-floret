import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Building, Monitor, ShieldCheck, MessageCircle } from 'lucide-react';

import SedeGallery from '@/components/SedeGallery';

export const metadata: Metadata = {
  title: 'Sede e Instalaciones en Montería | Edificio Frederick Floret',
  description: 'Visita nuestra sede en Calle 27 #10-21 en Montería. 353 m² en 3 plantas, sala de 80 computadores, aulas teóricas y laboratorios prácticos.',
  alternates: {
    canonical: 'https://academia-frederick-floret.vercel.app/sede',
  },
  openGraph: {
    title: 'Sede e Instalaciones en Montería | Edificio Frederick Floret',
    description: 'Visita nuestra sede en Calle 27 #10-21 en Montería. 353 m² en 3 plantas, sala de 80 computadores, aulas teóricas y laboratorios prácticos.',
    url: 'https://academia-frederick-floret.vercel.app/sede',
    type: 'website',
    locale: 'es_CO',
  },
};

const SEDE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Academia Frederick Floret - Sede Central Montería",
  "url": "https://academia-frederick-floret.vercel.app/sede",
  "image": "https://academia-frederick-floret.vercel.app/sede/fachada-edificio-frederick-floret.webp",
  "telephone": "+573205206613",
  "email": "academiafrederickfloret@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle 27 No. 10 - 21, Barrio Centro",
    "addressLocality": "Montería",
    "addressRegion": "Córdoba",
    "postalCode": "230001",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 8.7558,
    "longitude": -75.8814
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "08:00",
      "closes": "13:00"
    }
  ]
};

export default function SedePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      {/* Schema JSON-LD de LocalBusiness / Sede */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SEDE_SCHEMA) }}
      />

      <Navbar />

      {/* Header Banner con Foto de Fachada Real */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
              <MapPin className="w-3.5 h-3.5" /> Barrio Centro · Calle 27 #10-21 · Montería
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Sede Central Edificio Frederick Floret
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Infraestructura académica propia de 353 m² distribuidos en tres plantas en pleno corazón de Montería. Equipado con laboratorios clínicos simulados de enfermería, farmacia didáctica, salas de cómputo y aulas climatizadas.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl max-w-xs group">
              <img
                src="/sede/fachada-edificio-frederick-floret.webp"
                alt="Fachada oficial Academia Frederick Floret Montería"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-black text-white bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/10">
                  📍 Calle 27 #10-21 · Centro
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recorrido Fotográfico Completo (12 Fotos Oficiales) */}
      <SedeGallery />

      {/* Detalles de la Sede y Contacto */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Columna Izquierda: Información Física */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D51C28]">
                  Instalaciones Formativas
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Espacios de Aprendizaje Teórico y Práctico
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ubicados estratégicamente en el centro de Montería, con fácil acceso desde todos los barrios, corregimientos y municipios aledaños del Sinú Medio.
                </p>
              </div>

              {/* Tarjetas de Instalaciones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <Monitor className="w-6 h-6 text-blue-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Sala de Informática (80 PCs)</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Equipos de cómputo actualizados con conexión a internet y software empresarial para las prácticas administrativas y Q10.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <Building className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Edificio de 3 Plantas</h4>
                  <p className="text-slate-600 leading-relaxed">
                    353 m² construidos con aulas dotadas con proyectores, sonido profesional y mobiliario ergonómico para 600 puestos.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-red-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Laboratorios Prácticos</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Simuladores clínicos y material didáctico para los programas de Enfermería, Salud Oral y Farmacia.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <Clock className="w-6 h-6 text-amber-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Sala Magistral &amp; Eventos</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Espacios para seminarios, talleres de emprendimiento y ceremonias de graduación de nuestros técnicos.
                  </p>
                </div>

              </div>

              {/* Dirección y Ubicación */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
                <h4 className="text-sm font-bold text-amber-400">¿Cómo llegar a nuestra sede?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Nos encontramos en la <strong>Calle 27 No. 10 - 21 (Barrio Centro)</strong>, entre Carreras 10 y 11, a pocos pasos de la zona comercial y bancaria de Montería.
                </p>
              </div>

            </div>

            {/* Columna Derecha: Tarjeta de Atención */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-xs">
                
                <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-3">
                  Líneas de Atención Institucional
                </h3>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D51C28] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-slate-900">Ubicación Física:</strong>
                      Calle 27 #10-21 Barrio Centro, Montería, Córdoba
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#D51C28] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-slate-900">Horario de Atención:</strong>
                      Lunes a Viernes: 8:00 a.m. – 12:00 m | 2:00 p.m. – 6:00 p.m.<br />
                      Sábados: 8:00 a.m. – 1:00 p.m.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#D51C28] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-slate-900">Celular / WhatsApp Admisiones:</strong>
                      <a href="https://wa.me/573205206613" target="_blank" rel="noopener noreferrer" className="text-[#D51C28] font-bold hover:underline">
                        (+57) 320 520 6613
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#D51C28] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-slate-900">Correo Electrónico:</strong>
                      <a href="mailto:academiafrederickfloret@gmail.com" className="text-blue-600 hover:underline">
                        academiafrederickfloret@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <a
                    href="https://wa.me/573205206613?text=Hola,%20deseo%20visitar%20las%20instalaciones%20de%20la%20Academia%20Frederick%20Floret"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hablar por WhatsApp con Coordinación</span>
                  </a>

                  <p className="text-[11px] text-slate-400 text-center">
                    Atención directa a cargo de Isabel Cristina Petro (Coordinadora General).
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
