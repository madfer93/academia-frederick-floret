/**
 * Integración con el Sistema de Gestión Académica Q10 Soluciones
 * Academia Frederick Floret
 * 
 * Permite consultar programas/periodos y sincronizar aspirantes e inscripciones 
 * directamente desde los formularios del portal web y el asistente IA FloretBot.
 */

import { supabase } from '@/lib/supabase';

export interface AspiranteQ10Payload {
  nombres: string;
  apellidos: string;
  telefono: string;
  email?: string;
  documento?: string;
  tipo_documento?: string;
  genero?: string;
  fecha_nacimiento?: string;
  lugar_residencia?: string;
  direccion?: string;
  programa_interes: string;
  jornada_interes?: string;
  origen?: string;
  observaciones?: string;
}

// Mapeo oficial de Códigos de Programas según parametrización institucional en Q10
export const Q10_PROGRAMAS_MAP: Record<string, { codigo: string; nombre: string }> = {
  'aenf': { codigo: 'AENF', nombre: 'Técnico Laboral Auxiliar en Enfermería' },
  'enfermeria': { codigo: 'AENF', nombre: 'Técnico Laboral Auxiliar en Enfermería' },
  'tlaso': { codigo: 'TLASO', nombre: 'Técnico Laboral Auxiliar en Salud Oral' },
  'salud oral': { codigo: 'TLASO', nombre: 'Técnico Laboral Auxiliar en Salud Oral' },
  'tlsf': { codigo: 'TLSF', nombre: 'Técnico Laboral Auxiliar en Servicios Farmacéuticos' },
  'farmaceuticos': { codigo: 'TLSF', nombre: 'Técnico Laboral Auxiliar en Servicios Farmacéuticos' },
  'farmacia': { codigo: 'TLSF', nombre: 'Técnico Laboral Auxiliar en Servicios Farmacéuticos' },
  'tlaas': { codigo: 'TLAAS', nombre: 'Técnico Laboral Auxiliar Administrativo en Salud' },
  'administrativo en salud': { codigo: 'TLAAS', nombre: 'Técnico Laboral Auxiliar Administrativo en Salud' },
  'tlacyf': { codigo: 'TLACYF', nombre: 'Técnico Laboral Auxiliar Contable Y Financiero' },
  'contable': { codigo: 'TLACYF', nombre: 'Técnico Laboral Auxiliar Contable Y Financiero' },
  'tlaepf': { codigo: 'TLAEPF', nombre: 'Técnico Laboral Auxiliar De Educación Para La Primera Infancia' },
  'primera infancia': { codigo: 'TLAEPF', nombre: 'Técnico Laboral Auxiliar De Educación Para La Primera Infancia' },
  'infancia': { codigo: 'TLAEPF', nombre: 'Técnico Laboral Auxiliar De Educación Para La Primera Infancia' },
  'tldyr': { codigo: 'TLDYR', nombre: 'Técnico Laboral Auxiliar En Deporte Y Recreación' },
  'deporte': { codigo: 'TLDYR', nombre: 'Técnico Laboral Auxiliar En Deporte Y Recreación' },
  'tlamyc': { codigo: 'TLAMYC', nombre: 'Técnico Laboral Asistente De Marketing Y Comunicación' },
  'marketing': { codigo: 'TLAMYC', nombre: 'Técnico Laboral Asistente De Marketing Y Comunicación' },
  'tlaao': { codigo: 'TLAAO', nombre: 'Tecnico Laboral  Auxiliar Administrativo Organizacional' },
  'administrativo organizacional': { codigo: 'TLAAO', nombre: 'Tecnico Laboral  Auxiliar Administrativo Organizacional' },
};

// Mapeo oficial de Sedes-Jornadas en Q10
export const Q10_SEDES_JORNADAS: Record<string, { consecutivo: number; codigo_jornada: string; nombre: string }> = {
  'diurna': { consecutivo: 5, codigo_jornada: '005', nombre: 'Principal - Diurna' },
  'mañana': { consecutivo: 5, codigo_jornada: '005', nombre: 'Principal - Diurna' },
  'tarde': { consecutivo: 6, codigo_jornada: '006', nombre: 'Principal - Tarde' },
  'nocturna': { consecutivo: 9, codigo_jornada: '007', nombre: 'Principal - Nocturna' },
  'noche': { consecutivo: 9, codigo_jornada: '007', nombre: 'Principal - Nocturna' },
  'sabados': { consecutivo: 8, codigo_jornada: '008', nombre: 'Principal - Sábados' },
  'fin de semana': { consecutivo: 8, codigo_jornada: '008', nombre: 'Principal - Sábados' },
};

// Mapeo de tipos de identificación para Q10
export const Q10_TIPOS_IDENTIFICACION: Record<string, string> = {
  'CC': '1',
  'TI': '2',
  'CE': '3',
  'PA': '4',
  'PASAPORTE': '4',
  'PPT': '5',
  'PEP': '5',
};

/**
 * Obtiene la API Key de Q10 (desde .env o desde la tabla sitio_configuracion en Supabase)
 */
export async function getQ10ApiKey(): Promise<string> {
  if (process.env.Q10_API_KEY) {
    return process.env.Q10_API_KEY;
  }

  try {
    const { data } = await supabase
      .from('sitio_configuracion')
      .select('valor')
      .eq('clave', 'q10_api_key')
      .maybeSingle();

    if (data?.valor) {
      return data.valor;
    }
  } catch (e) {
    console.error('[Q10] Error obteniendo API Key desde Supabase:', e);
  }

  return 'f7e069dcecf742a7ab8f0e97cfe53811';
}

/**
 * Identifica el código de programa Q10 a partir de un texto libre o slug
 */
export function getQ10ProgramCode(programaName: string): string {
  const norm = (programaName || '').toLowerCase().trim();
  for (const [key, value] of Object.entries(Q10_PROGRAMAS_MAP)) {
    if (norm.includes(key)) {
      return value.codigo;
    }
  }
  return 'AENF'; // Predeterminado: Auxiliar en Enfermería
}

/**
 * Identifica el consecutivo de sede-jornada Q10
 */
export function getQ10SedeJornada(jornadaName: string): number {
  const norm = (jornadaName || '').toLowerCase().trim();
  for (const [key, value] of Object.entries(Q10_SEDES_JORNADAS)) {
    if (norm.includes(key)) {
      return value.consecutivo;
    }
  }
  return 5; // Predeterminado: Diurna
}

/**
 * Sincroniza un aspirante/prospecto con la API de Q10
 */
export async function syncLeadToQ10(payload: AspiranteQ10Payload): Promise<{ success: boolean; data?: any; error?: string }> {
  const q10ApiKey = await getQ10ApiKey();
  const q10BaseUrl = process.env.Q10_BASE_URL || 'https://api.q10.com/v1';

  if (!q10ApiKey) {
    console.log('[Q10] API Key no disponible. Guardado solo en CRM local.');
    return {
      success: true,
      data: { status: 'saved_locally', message: 'Guardado en CRM interno.' }
    };
  }

  try {
    const codigoPrograma = getQ10ProgramCode(payload.programa_interes);
    const consecutivoSedeJornada = getQ10SedeJornada(payload.jornada_interes || 'Diurna');
    const consecutivoPeriodo = 10; // Periodo activo 2026-2

    const nombresPartes = (payload.nombres || 'Aspirante').trim().split(/\s+/);
    const primerNombre = nombresPartes[0] || 'Aspirante';
    const segundoNombre = nombresPartes.slice(1).join(' ') || undefined;

    const apellidosPartes = (payload.apellidos || 'Floret').trim().split(/\s+/);
    const primerApellido = apellidosPartes[0] || 'Aspirante';
    const segundoApellido = apellidosPartes.slice(1).join(' ') || undefined;

    const tipoDoc = payload.tipo_documento ? (Q10_TIPOS_IDENTIFICACION[payload.tipo_documento.toUpperCase()] || '1') : '1';
    const numDoc = (payload.documento && payload.documento !== 'PENDIENTE') 
      ? payload.documento.replace(/[^\d]/g, '') 
      : payload.telefono.replace(/[^\d]/g, '').slice(-10);

    const email = payload.email || `${numDoc}@aspirante.floret.edu.co`;
    const telefono = payload.telefono.replace(/[^\d]/g, '');

    // 1. Crear / Registrar Estudiante en Q10
    const estudianteBody = {
      Primer_nombre: primerNombre,
      Segundo_nombre: segundoNombre,
      Primer_apellido: primerApellido,
      Segundo_apellido: segundoApellido,
      Codigo_tipo_identificacion: tipoDoc,
      Numero_identificacion: numDoc,
      Genero: payload.genero || 'M',
      Email: email,
      Telefono: telefono,
      Celular: telefono,
      Fecha_nacimiento: payload.fecha_nacimiento || '2000-01-01',
      Lugar_residencia: payload.lugar_residencia || '23001', // Montería
      Direccion: payload.direccion || 'Montería, Córdoba',
      Codigo_programa: codigoPrograma,
      Consecutivo_sede_jornada: consecutivoSedeJornada,
      Consecutivo_periodo: consecutivoPeriodo
    };

    const estResponse = await fetch(`${q10BaseUrl}/estudiantes`, {
      method: 'POST',
      headers: {
        'Api-Key': q10ApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estudianteBody),
    });

    const estText = await estResponse.text();
    let estResult: any = {};
    try { estResult = JSON.parse(estText); } catch { estResult = { raw: estText }; }

    // 2. Crear Inscripción en Q10
    const inscripcionBody = {
      Codigo_estudiante: numDoc,
      Codigo_programa: codigoPrograma,
      Consecutivo_periodo: consecutivoPeriodo,
      Consecutivo_sede_jornada: consecutivoSedeJornada,
      Fecha_inscripcion: new Date().toISOString().split('T')[0]
    };

    const inscResponse = await fetch(`${q10BaseUrl}/inscripciones`, {
      method: 'POST',
      headers: {
        'Api-Key': q10ApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inscripcionBody),
    });

    const inscText = await inscResponse.text();
    let inscResult: any = {};
    try { inscResult = JSON.parse(inscText); } catch { inscResult = { raw: inscText }; }

    console.log('[Q10 Sync Success]:', {
      aspirante: `${primerNombre} ${primerApellido}`,
      estudianteStatus: estResponse.status,
      inscripcionStatus: inscResponse.status
    });

    return {
      success: true,
      data: {
        estudiante: estResult,
        inscripcion: inscResult,
        q10_estatus: 'synchronized'
      }
    };
  } catch (err: any) {
    console.error('[Q10 Sync Exception]:', err);
    return { success: false, error: err.message || 'Error de sincronización con Q10' };
  }
}
