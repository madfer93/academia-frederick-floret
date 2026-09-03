'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, KeyRound, ShieldCheck, AlertCircle, ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();

  // Estados de autenticación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Estados para 2FA (Google Authenticator)
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [factorId, setFactorId] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [challengeId, setChallengeId] = useState('');

  // Paso 1: Validar Email y Password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error('No se pudo autenticar el usuario.');
      }

      // Comprobar si el usuario tiene factores MFA (Google Authenticator) configurados
      const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();

      if (factorsError) {
        console.warn('Error verificando factores MFA:', factorsError);
      }

      const totpFactor = factorsData?.totp?.find(f => f.status === 'verified');

      if (totpFactor) {
        // Iniciar desafío MFA
        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
          factorId: totpFactor.id,
        });

        if (challengeError) throw challengeError;

        setFactorId(totpFactor.id);
        setChallengeId(challengeData.id);
        setStep('mfa');
      } else {
        // Sin 2FA activo aún: permitir ingreso directo al dashboard
        router.push('/admin');
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Credenciales inválidas o acceso no autorizado.');
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: Verificar código de Google Authenticator (6 dígitos)
  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: mfaCode.trim(),
      });

      if (error) {
        throw new Error('Código de Google Authenticator incorrecto o expirado.');
      }

      router.push('/admin');
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Código de seguridad inválido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Luces de fondo */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <Link href="/" className="inline-block group">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 mx-auto shadow-xl flex items-center justify-center">
            <img src="/logo.png" alt="Logo Frederick Floret" className="w-full h-full object-contain" />
          </div>
        </Link>
        <h2 className="text-2xl font-black tracking-tight text-white">
          Panel de Administración
        </h2>
        <p className="text-xs text-slate-400">
          Academia Frederick Floret S.A.S. · Acceso Restringido y Protegido
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-800 space-y-6">
          
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 'credentials' ? (
            /* Formulario Paso 1: Email y Password */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Correo Administrativo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@academiafrederickfloret.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-transparent outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-transparent outline-hidden transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white text-xs font-bold shadow-lg shadow-red-500/20 hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <span>Verificando credenciales...</span>
                ) : (
                  <>
                    <span>Continuar al Panel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Formulario Paso 2: Desafío Google Authenticator */
            <form onSubmit={handleVerifyMfa} className="space-y-4 animate-in fade-in">
              <div className="text-center space-y-2 pb-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Verificación de 2 Pasos (2FA)
                </h3>
                <p className="text-xs text-slate-400">
                  Abre la app <strong>Google Authenticator</strong> en tu teléfono e introduce el código de 6 dígitos.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 text-center">
                  Código de Seguridad Temporal
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    autoFocus
                    className="w-full py-3 text-center tracking-[0.6em] text-2xl font-mono rounded-xl bg-slate-800/80 border border-slate-700 text-amber-400 font-bold focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-hidden transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || mfaCode.length !== 6}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Validando token TOTP...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verificar y Acceder</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-full text-center text-xs text-slate-400 hover:text-white py-1 block"
              >
                ← Volver a ingresar usuario y contraseña
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>Protegido con Cifrado SSL y Supabase Auth TOTP</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
