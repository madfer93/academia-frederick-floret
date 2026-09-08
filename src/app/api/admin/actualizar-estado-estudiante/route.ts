import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { documento, id, estado, notas } = body;

    if (!estado) {
      return NextResponse.json({ error: 'El estado es requerido.' }, { status: 400 });
    }

    let updated = null;

    if (id) {
      const { data, error } = await supabase
        .from('inscripciones')
        .update({
          estado,
          mensaje: notas ? `[Actualización]: ${notas}` : undefined,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      updated = data;
    } else if (documento) {
      // Buscar o insertar registro de estado para el documento de Q10
      const { data: existing } = await supabase
        .from('inscripciones')
        .select('id')
        .eq('documento', documento)
        .maybeSingle();

      if (existing) {
        const { data, error } = await supabase
          .from('inscripciones')
          .update({
            estado,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        updated = data;
      } else {
        const { data, error } = await supabase
          .from('inscripciones')
          .insert([
            {
              nombres: body.nombres || 'Estudiante Q10',
              apellidos: body.apellidos || '',
              documento,
              telefono: body.telefono || '3205206613',
              programa_interes: body.programa || 'Programa Q10',
              estado,
              mensaje: `Estado sincronizado desde panel administrativo: ${estado}`
            }
          ])
          .select()
          .single();

        if (error) throw error;
        updated = data;
      }
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: `Estado actualizado correctamente a: ${estado}`
    });
  } catch (err: any) {
    console.error('[Update Student Status Error]:', err);
    return NextResponse.json({ error: err.message || 'Error actualizando estado' }, { status: 500 });
  }
}
