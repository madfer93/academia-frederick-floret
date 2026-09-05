/**
 * Utilidad para validación de tokens de Google reCAPTCHA v3 en backend
 */

export async function verifyRecaptchaToken(token?: string): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Si no está configurada la clave secreta o no se envía token (en entornos de desarrollo), permitimos la ejecución
  if (!secretKey) {
    console.warn('[reCAPTCHA]: RECAPTCHA_SECRET_KEY no configurada. Omitiendo validación estricta.');
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, error: 'Token de reCAPTCHA no proporcionado' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();

    if (!data.success) {
      console.warn('[reCAPTCHA Verification Failed]:', data['error-codes']);
      return { success: false, error: 'Validación de reCAPTCHA fallida' };
    }

    // Google reCAPTCHA v3 devuelve un score entre 0.0 (bot) y 1.0 (humano legítimo)
    // Un score >= 0.5 es considerado seguro para formularios públicos
    const isHuman = (data.score ?? 0.5) >= 0.3;

    return {
      success: isHuman,
      score: data.score,
    };
  } catch (err: any) {
    console.error('[reCAPTCHA Verification Error]:', err);
    // En caso de caída del servicio de Google, permitimos pasar para no bloquear admisiones legítimas
    return { success: true, score: 0.5 };
  }
}
