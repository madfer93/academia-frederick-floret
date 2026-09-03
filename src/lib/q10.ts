/**
 * Integración con el Sistema de Gestión Académica Q10 Soluciones
 * Permite registrar aspirantes/prospectos directamente desde la web o el Chatbot de IA.
 */

export interface AspiranteQ10Payload {
  nombres: string;
  apellidos: string;
  telefono: string;
  email?: string;
  documento?: string;
  tipo_documento?: string;
  programa_interes: string;
  jornada_interes?: string;
  origen?: string;
}

export async function syncLeadToQ10(payload: AspiranteQ10Payload): Promise<{ success: boolean; data?: any; error?: string }> {
  const q10ApiKey = process.env.Q10_API_KEY;
  const q10BaseUrl = process.env.Q10_BASE_URL || 'https://api.q10.com/v1';

  // Si aún no se ha configurado la API Key de Q10, se deja registrado el log para auditoría
  if (!q10ApiKey) {
    console.log('[Q10 Integration - Mock/Pending]: Aspirante listo para enviar a Q10 una vez se ingrese el API Token:', {
      aspirante: `${payload.nombres} ${payload.apellidos}`,
      programa: payload.programa_interes,
      telefono: payload.telefono,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      data: {
        status: 'pending_configuration',
        message: 'Lead almacenado en CRM Supabase. Sincronización Q10 en espera de API Token.'
      }
    };
  }

  try {
    // Estructura oficial de creación de aspirantes en Q10 REST API
    const response = await fetch(`${q10BaseUrl}/inscripciones/aspirantes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': q10ApiKey,
      },
      body: JSON.stringify({
        PrimerNombre: payload.nombres.split(' ')[0] || payload.nombres,
        SegundoNombre: payload.nombres.split(' ').slice(1).join(' ') || '',
        PrimerApellido: payload.apellidos.split(' ')[0] || payload.apellidos,
        SegundoApellido: payload.apellidos.split(' ').slice(1).join(' ') || '',
        NumeroIdentificacion: payload.documento || '',
        TipoIdentificacion: payload.tipo_documento || 'CC',
        TelefonoCelular: payload.telefono,
        CorreoElectronico: payload.email || '',
        NombrePrograma: payload.programa_interes,
        Jornada: payload.jornada_interes || 'Diurna',
        MedioEntero: payload.origen || 'Portal Web / Asistente IA'
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Q10 API Error]:', response.status, errorText);
      return { success: false, error: `Error ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err: any) {
    console.error('[Q10 Fetch Exception]:', err);
    return { success: false, error: err.message || 'Error de conexión con Q10' };
  }
}
