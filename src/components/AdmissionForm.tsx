'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle2, AlertCircle, MessageSquare, PhoneCall } from 'lucide-react';

const PROGRAMAS_OPTIONS = [
  'Técnico Laboral en Auxiliar en Enfermería',
  'Técnico Laboral en Auxiliar en Salud Oral',
  'Técnico Laboral en Auxiliar en Servicios Farmacéuticos',
  'Técnico Laboral en Auxiliar Administrativo en Salud',
  'Técnico Laboral en Auxiliar en Salud Pública',
  'Técnico Laboral en Auxiliar de Educación para la Primera Infancia',
  'Técnico Laboral en Auxiliar Contable y Financiero',
  'Técnico Laboral en Asistentes de Marketing y Comunicación',
  'Técnico Laboral en Auxiliar en Deporte y Recreación',
  'Técnico Laboral en Auxiliar Administrativo Organizacional'
];

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipo_documento: 'CC',
    documento: '',
    telefono: '',
    email: '',
    programa_interes: PROGRAMAS_OPTIONS[0],
    jornada_interes: 'Diurna (Mañana)',
    nivel_educativo: 'Bachiller Completo',
    mensaje: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.from('inscripciones').insert([
        {
          nombres: formData.nombres.trim(),
          apellidos: formData.apellidos.trim(),
          tipo_documento: formData.tipo_documento,
          documento: formData.documento.trim(),
          telefono: formData.telefono.trim(),
          email: formData.email.trim() || null,
          programa_interes: formData.programa_interes,
          jornada_interes: formData.jornada_interes,
          nivel_educativo: formData.nivel_educativo,
          mensaje: formData.mensaje.trim() || null
        }
      ]);

      if (error) {
        console.error('Error insertando en Supabase:', error);
        throw new Error('No se pudo guardar la inscripción. Por favor inténtalo de nuevo o contáctanos por WhatsApp.');
      }

      setSuccess(true);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inscripciones" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Información y Beneficios de Inscripción */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#D51C28] text-xs font-bold uppercase tracking-wider">
              Admisiones 2026
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Inicia tu Formación Técnica Laboral en Montería
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Diligencia el siguiente formulario oficial para reservar tu cupo en la <strong>Academia Frederick Floret</strong>. Nuestro equipo de coordinación se comunicará contigo para validar requisitos, asesorarte con las opciones de financiación y agendar tu entrevista.
            </p>

            {/* Requisitos y Beneficios */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D51C28]" />
                Requisitos Básicos de Ingreso:
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Haber aprobado mínimo 9º grado o ser bachiller graduado.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Documento de identidad vigente (TI, CC o PPT).
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Edad mínima requerida: 16 años cumplidos.
                </li>
              </ul>
            </div>

            {/* Ayuda Financiera */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 space-y-2 text-xs">
              <h4 className="font-bold text-emerald-900">
                🎁 Facilidades de Pago y Crédito Directo:
              </h4>
              <p className="text-emerald-800 leading-relaxed">
                Cancela tu semestre en 4 cuotas directas con la institución sin intereses bancarios. Más del 70% de nuestros estudiantes aplican a descuentos institucionales.
              </p>
            </div>

            {/* Contacto Directo */}
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#D51C28]" />
                <span>320 520 6613</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">•</span>
                <span>Calle 27 #10-21, Montería</span>
              </div>
            </div>

          </div>

          {/* Formulario de Captura de Leads (Supabase) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              
              {success ? (
                <div className="text-center py-10 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    ¡Preinscripción Registrada Exitosamente!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Gracias <strong>{formData.nombres}</strong>. Tus datos han sido guardados en nuestro sistema de admisiones para el programa <strong>{formData.programa_interes}</strong>.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={`https://wa.me/573205206613?text=Hola,%20acabo%20de%20diligenciar%20mi%20preinscripci%C3%B3n%20en%20la%20web%20para%20${encodeURIComponent(formData.programa_interes)}.%20Mi%20nombre%20es%20${encodeURIComponent(formData.nombres + ' ' + formData.apellidos)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirmar mi cupo por WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setFormData({
                          nombres: '',
                          apellidos: '',
                          tipo_documento: 'CC',
                          documento: '',
                          telefono: '',
                          email: '',
                          programa_interes: PROGRAMAS_OPTIONS[0],
                          jornada_interes: 'Diurna (Mañana)',
                          nivel_educativo: 'Bachiller Completo',
                          mensaje: ''
                        });
                      }}
                      className="px-6 py-3.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      Registrar otra inscripción
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h3 className="text-lg font-black text-slate-900">
                      Formulario de Admisión y Reserva de Cupo
                    </h3>
                    <p className="text-xs text-slate-500">
                      Diligencia tus datos personales. Todos los campos con (*) son requeridos.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Nombres y Apellidos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nombres *
                      </label>
                      <input
                        type="text"
                        name="nombres"
                        required
                        value={formData.nombres}
                        onChange={handleChange}
                        placeholder="Ej. Carlos Alberto"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden transition-all bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Apellidos *
                      </label>
                      <input
                        type="text"
                        name="apellidos"
                        required
                        value={formData.apellidos}
                        onChange={handleChange}
                        placeholder="Ej. Gómez Petro"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden transition-all bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Documento */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tipo Doc. *
                      </label>
                      <select
                        name="tipo_documento"
                        value={formData.tipo_documento}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden bg-slate-50/50"
                      >
                        <option value="CC">C.C.</option>
                        <option value="TI">T.I.</option>
                        <option value="PPT">PPT (Permiso Protección)</option>
                        <option value="CE">C.E.</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Número de Documento *
                      </label>
                      <input
                        type="text"
                        name="documento"
                        required
                        value={formData.documento}
                        onChange={handleChange}
                        placeholder="Número de identificación"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Celular WhatsApp y Correo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Celular / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Ej. 320 000 0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@correo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Programa de Interés */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Programa Técnico de tu Interés *
                    </label>
                    <select
                      name="programa_interes"
                      value={formData.programa_interes}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden bg-slate-50/50"
                    >
                      {PROGRAMAS_OPTIONS.map((prog, i) => (
                        <option key={i} value={prog}>
                          {prog}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Jornada y Nivel Educativo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Jornada Preferida *
                      </label>
                      <select
                        name="jornada_interes"
                        value={formData.jornada_interes}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden bg-slate-50/50"
                      >
                        <option value="Diurna (Mañana 8:00 - 11:00 am)">Diurna (Mañana 8:00 - 11:00 am)</option>
                        <option value="Diurna (Tarde 2:00 - 5:00 pm)">Diurna (Tarde 2:00 - 5:00 pm)</option>
                        <option value="Nocturna (6:30 - 9:00 pm)">Nocturna (6:30 - 9:00 pm)</option>
                        <option value="Sabatina (7:00 am - 5:00 pm)">Sabatina (7:00 am - 5:00 pm)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Último Nivel Cursado *
                      </label>
                      <select
                        name="nivel_educativo"
                        value={formData.nivel_educativo}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden bg-slate-50/50"
                      >
                        <option value="Bachiller Completo">Bachiller Completo (11º)</option>
                        <option value="Noveno Grado Aprobado">Noveno Grado (9º) Aprobado</option>
                        <option value="Décimo Grado Aprobado">Décimo Grado (10º) Aprobado</option>
                        <option value="Estudios Superiores">Estudios Técnicos o Universitarios</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensaje / Inquietudes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Comentario o Pregunta (Opcional)
                    </label>
                    <textarea
                      name="mensaje"
                      rows={2}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="¿Tienes preguntas sobre financiación, horarios o requisitos?"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D51C28] focus:border-[#D51C28] outline-hidden bg-slate-50/50"
                    ></textarea>
                  </div>

                  {/* Botón Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <span>Registrando tu cupo...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Preinscripción Oficial</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center pt-1">
                    🔒 Tus datos están protegidos bajo la Ley 1581 de 2012 de Protección de Datos Personales.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
