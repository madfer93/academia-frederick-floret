import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import ChatBubble from '@/components/ChatBubble';
import WhatsAppButton from '@/components/WhatsAppButton';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://academia-frederick-floret.vercel.app'),
  title: 'Academia Frederick Floret | Educación Técnica Montería',
  description: 'Fórmate en 3 semestres en Enfermería, Salud Oral, Farmacia y Administración en Montería. Prácticas clínicas, crédito directo y 34 años de trayectoria oficial.',
  alternates: {
    canonical: 'https://academia-frederick-floret.vercel.app',
  },
  verification: {
    google: 'R8F6UkNMybScXYaszR0NuWk1lbzGOo_vmIkOVuKzEa4',
  },
  keywords: [
    'Academia Frederick Floret',
    'Cursos tecnicos Monteria',
    'Auxiliar de enfermeria Monteria',
    'Salud oral Cordoba',
    'Servicios farmaceuticos Monteria',
    'ETDH Monteria',
    'Educacion tecnica Cordoba'
  ],
  openGraph: {
    title: 'Academia Frederick Floret | Educación Técnica Montería',
    description: 'Fórmate en 3 semestres en Enfermería, Salud Oral, Farmacia y Administración en Montería. Prácticas clínicas y 34 años de experiencia.',
    type: 'website',
    locale: 'es_CO',
    url: 'https://academia-frederick-floret.vercel.app',
    siteName: 'Academia Frederick Floret'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLMs Context" />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {children}
        <WhatsAppButton />
        <ChatBubble />
        <Analytics />
      </body>
    </html>
  );
}
