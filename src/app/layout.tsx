import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Academia Frederick Floret | Educación para el Trabajo y el Desarrollo Humano · Montería',
  description: '34 años formando los mejores técnicos laborales en Montería y Córdoba: Enfermería, Salud Oral, Farmacia, Administrativo en Salud, Salud Pública y Administración. Licencia No. 001514 y Resolución SEM 0990.',
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
    title: 'Academia Frederick Floret · 34 Años de Excelencia Educativa',
    description: 'Fórmate en salud y administración en el centro de Montería con 34 años de experiencia y alta inserción laboral.',
    type: 'website',
    locale: 'es_CO'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
