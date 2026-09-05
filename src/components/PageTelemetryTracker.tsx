'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTelemetryTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const currentPathRef = useRef<string>(pathname);

  useEffect(() => {
    // Si la ruta cambia, enviar la duración de la página anterior
    const prevPath = currentPathRef.current;
    const now = Date.now();
    const durationSec = Math.round((now - startTimeRef.current) / 1000);

    // No trackear rutas administrativas para no sesgar las analíticas de aspirantes
    if (!prevPath.startsWith('/admin') && durationSec >= 2) {
      sendTelemetry(prevPath, durationSec);
    }

    // Reiniciar para la nueva página
    startTimeRef.current = now;
    currentPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    // Manejar cierre o salida de pestaña
    const handleBeforeUnload = () => {
      const path = currentPathRef.current;
      if (!path.startsWith('/admin')) {
        const durationSec = Math.round((Date.now() - startTimeRef.current) / 1000);
        if (durationSec >= 2) {
          sendTelemetry(path, durationSec);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const sendTelemetry = (path: string, durationSec: number) => {
    try {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const referrer = typeof document !== 'undefined' ? document.referrer || 'Directo' : 'Directo';

      // Detectar si es una página de programa técnico
      let programSlug: string | null = null;
      if (path.startsWith('/programas/')) {
        programSlug = path.replace('/programas/', '').split('/')[0];
      }

      const payload = JSON.stringify({
        ruta: path,
        programa_slug: programSlug,
        duracion_segundos: durationSec,
        referrer: referrer,
        dispositivo: isMobile ? 'movil' : 'desktop',
      });

      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/telemetry', blob);
      } else {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Silencioso para no interferir en UX
    }
  };

  return null;
}
