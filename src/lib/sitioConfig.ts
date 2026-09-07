import { supabase } from '@/lib/supabase';

export interface SitioConfig {
  q10_url_portal: string;
  q10_url_preinscripcion: string;
  q10_url_solicitudes: string;
  q10_subdominio: string;
  facebook_url: string;
  whatsapp_numero: string;
  telefono_sede: string;
  email_contacto: string;
  direccion_sede: string;
  [key: string]: string;
}

export const DEFAULT_SITIO_CONFIG: SitioConfig = {
  q10_url_portal: 'https://afrederickf.q10.com',
  q10_url_preinscripcion: 'https://afrederickf.q10.com/Preinscripcion',
  q10_url_solicitudes: 'https://afrederickf.q10.com/SolicitudesInstitucionales/NuevaSolicitud',
  q10_subdominio: 'afrederickf',
  facebook_url: 'https://www.facebook.com/academiafrederickfloret',
  whatsapp_numero: '573205206613',
  telefono_sede: '+57 (320) 520-6613',
  email_contacto: 'info@academiafrederickfloret.com',
  direccion_sede: 'Calle 27 #10-21, Barrio Centro, Montería - Córdoba',
};

/**
 * Obtener la configuración completa desde Supabase (sitio_configuracion)
 */
export async function getSitioConfig(): Promise<SitioConfig> {
  try {
    const { data, error } = await supabase
      .from('sitio_configuracion')
      .select('clave, valor');

    if (error || !data || data.length === 0) {
      return DEFAULT_SITIO_CONFIG;
    }

    const configMap: Record<string, string> = { ...DEFAULT_SITIO_CONFIG };
    data.forEach((item: { clave: string; valor: string }) => {
      if (item.clave && item.valor) {
        configMap[item.clave] = item.valor;
      }
    });

    return configMap as SitioConfig;
  } catch (err) {
    console.error('[getSitioConfig error]:', err);
    return DEFAULT_SITIO_CONFIG;
  }
}
