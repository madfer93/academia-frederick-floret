import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
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
  description: 'Fórmate en 3 semestres en Enfermería, Salud Oral, Farmacia y Administración en Montería. Prácticas clínicas, crédito directo y 35 años de trayectoria oficial.',
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Academia Frederick Floret | Educación Técnica Montería',
    description: 'Fórmate en 3 semestres en Enfermería, Salud Oral, Farmacia y Administración en Montería. Prácticas clínicas y 35 años de experiencia.',
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
        {/* Google tag (gtag.js) GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TTPVHH5XKT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TTPVHH5XKT', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <WhatsAppButton />
        <ChatBubble />
        <Analytics />
      </body>
    </html>
  );
}
