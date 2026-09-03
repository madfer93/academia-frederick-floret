import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProgramsSection from '@/components/ProgramsSection';
import AboutSection from '@/components/AboutSection';
import AdmissionForm from '@/components/AdmissionForm';
import Footer from '@/components/Footer';
import { MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col relative">
      <Navbar />
      <Hero />
      <ProgramsSection />
      <AboutSection />
      <AdmissionForm />
      <Footer />

      {/* Botón flotante permanente de WhatsApp */}
      <aside aria-label="Contacto por WhatsApp" className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/573205206613?text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20las%20inscripciones%20en%20la%20Academia%20Frederick%20Floret"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white group"
          title="Hablar con Admisiones por WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="text-xs font-bold hidden sm:inline">
            Admisiones WhatsApp
          </span>
        </a>
      </aside>
    </main>
  );
}
