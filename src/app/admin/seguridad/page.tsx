'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, Smartphone, Key, CheckCircle2, AlertCircle, RefreshCw, Trash2 } from 'lucide-react';

interface TotpFactor {
  id: string;
  factor_type: string;
  status: string;
  friendly_name?: string;
}

export default function AdminSeguridadPage() {
  const [factors, setFactors] = useState<TotpFactor[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de enrolamiento nuevo factor
  const [enrolling, setEnrolling] = useState(false);
  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [newFactorId, setNewFactorId] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchFactors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;
      setFactors((data?.totp as TotpFactor[]) || []);
    } catch (err) {
      console.error('Error listando factores MFA:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFactors();
  }, []);

  // Iniciar enrolamiento de Google Authenticator (TOTP)
  const startEnrollment = async () => {
    setEnrolling(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Google Authenticator Frederick Floret',
        issuer: 'FrederickFloret',
      });

      if (error) throw error;

      setNewFactorId(data.id);
      setSecret(data.totp.secret);
      setQrCodeSvg(data.totp.qr_code);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Error iniciando configuración 2FA.');
      setEnrolling(false);
    }
  };

  // Confirmar y activar 2FA con el primer código de 6 dígitos
  const confirmEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFactorId) return;
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: newFactorId,
      });

      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: newFactorId,
        challengeId: challengeData.id,
        code: verifyCode.trim(),
      });

      if (verifyError) throw verifyError;

      setSuccessMsg('¡Google Authenticator activado con éxito en tu cuenta!');
      setEnrolling(false);
      setQrCodeSvg(null);
      setSecret(null);
      setVerifyCode('');
      fetchFactors();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Código incorrecto. Verifica la hora de tu teléfono.');
    }
  };

  // Desvincular factor 2FA
  const handleUnenroll = async (factorId: string) => {
    if (!confirm('¿Estás seguro de desactivar Google Authenticator en tu cuenta?')) return;
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      if (error) throw error;
      setSuccessMsg('Factor 2FA eliminado.');
      fetchFactors();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Error desactivando factor 2FA.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-[#D51C28]" />
          <span>Seguridad de 2 Pasos (Google Authenticator)</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Protege el panel administrativo exigiendo un código temporal de 6 dígitos desde tu app móvil.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Estado Actual del 2FA */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Factores de Autenticación Activos</h3>
            <p className="text-xs text-slate-500">Dispositivos y apps autorizadas para generar códigos TOTP.</p>
          </div>
          <button
            onClick={fetchFactors}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-50"
            title="Recargar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {factors.length === 0 ? (
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Tu cuenta aún no tiene 2FA activado</span>
            </div>
            <p className="leading-relaxed">
              Te recomendamos vincular <strong>Google Authenticator</strong> para impedir que terceros puedan acceder al panel aunque conozcan tu contraseña.
            </p>
            {!enrolling && (
              <button
                onClick={startEnrollment}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#D51C28] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Smartphone className="w-4 h-4" />
                <span>Vincular Google Authenticator Ahora</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {factors.map((f) => (
              <div key={f.id} className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-emerald-900 block text-xs">
                      {f.friendly_name || 'Google Authenticator'}
                    </strong>
                    <span className="text-[11px] text-emerald-700">Estado: Activo y Verificado (TOTP)</span>
                  </div>
                </div>

                <button
                  onClick={() => handleUnenroll(f.id)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Desactivar</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proceso de Enrolamiento y Escaneo de Código QR */}
      {enrolling && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
              Paso a Paso
            </span>
            <h3 className="text-xl font-black">Escanea el Código QR con Google Authenticator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              1. Abre Google Authenticator en tu celular.<br />
              2. Toca el botón <strong>&ldquo;+&rdquo;</strong> y selecciona <strong>&ldquo;Escanear un código QR&rdquo;</strong>.<br />
              3. Introduce el código de 6 dígitos que aparezca en tu pantalla para completar la activación.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            {qrCodeSvg && (
              <div 
                className="bg-white p-3 rounded-2xl shadow-md shrink-0"
                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
              />
            )}

            <div className="space-y-3 text-xs flex-1">
              <div>
                <span className="text-slate-400 block mb-1">¿No puedes escanear el QR? Copia la clave secreta:</span>
                <code className="px-3 py-2 rounded-xl bg-slate-950 font-mono text-amber-400 font-bold block select-all text-xs break-all">
                  {secret}
                </code>
              </div>

              <form onSubmit={confirmEnrollment} className="space-y-3 pt-2">
                <label className="block font-bold text-slate-200">
                  Código de 6 dígitos de tu app:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-40 py-2 text-center tracking-widest text-lg font-mono rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-bold outline-hidden focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    disabled={verifyCode.length !== 6}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Confirmar y Activar 2FA
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={() => {
                setEnrolling(false);
                setQrCodeSvg(null);
                setSecret(null);
              }}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              Cancelar configuración
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
