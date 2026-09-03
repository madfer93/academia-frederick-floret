import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Building, Monitor, ShieldCheck, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sede e Instalaciones | Edificio Frederick Floret · Montería',
  description: 'Visita nuestra sede central en la Calle 27 #10-21 en Montería. 353 m² con 3 pisos, sala de 80 computadores, aulas y laboratorios prácticos.',
};

export default function SedePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-3 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <MapPin className="w-3.5 h-3.5" /> Barrio Centro · Montería
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Sede Central Edificio Frederick Floret
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Infraestructura académica propia de 353 m² distribuidos en tres niveles, equipada para el desarrollo integral de competencias laborales prácticas.
          </p>
        </div>
      </section>

      {/* Detalles de la Sede y Contacto */}
      <section className="py-16 bg-white border-b border-slate-200">
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
                
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <Monitor className="w-6 h-6 text-blue-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Sala de Informática (80 PCs)</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Equipos de cómputo actualizados con conexión a internet y software empresarial para las prácticas administrativas y Q10.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <Building className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Edificio de 3 Plantas</h4>
                  <p className="text-slate-600 leading-relaxed">
                    353 m² construidos con aulas dotadas con proyectores, sonido profesional y mobiliario ergonómico para 600 puestos.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <ShieldCheck className="w-6 h-6 text-red-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Laboratorios Prácticos</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Simuladores clínicos y material didáctico para los programas de Enfermería, Salud Oral y Farmacia.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <Clock className="w-6 h-6 text-amber-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Sala Magistral &amp; Eventos</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Espacios para seminarios, talleres de emprendimiento y ceremonias de graduación de nuestros técnicos.
                  </p>
                </div>

              </div>

              {/* Dirección y Mapa informativo */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
                <h4 className="text-sm font-bold text-amber-400">¿Cómo llegar a nuestra sede?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Nos encontramos en la <strong>Calle 27 No. 10 - 21 (Barrio Centro)</strong>, entre Carreras 10 y 11, a pocos pasos de la zona comercial y bancaria de Montería.
                </p>
              </div>

            </div>

            {/* Columna Derecha: Tarjeta de Atención */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-xs">
                
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
