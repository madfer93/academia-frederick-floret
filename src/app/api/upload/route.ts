import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'programas';
    const slug = (formData.get('slug') as string) || 'imagen';
    const programId = formData.get('programId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No se recibió ningún archivo de imagen.' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'webp';
    const filePath = `${slug}-${Date.now()}.${fileExt}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Subir usando cliente con service role key para evitar problemas de RLS
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, fileBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true
      });

    if (uploadError) {
      console.error('Error subiendo al storage de Supabase:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Si viene programId y el bucket es programas, actualizar la BD directamente
    if (programId && bucket === 'programas') {
      const { error: dbError } = await supabaseAdmin
        .from('programas')
        .update({ imagen_url: publicUrl })
        .eq('id', programId);

      if (dbError) {
        console.error('Error actualizando programa en BD:', dbError);
      }
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filePath
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error en /api/upload:', error);
    return NextResponse.json({ error: error.message || 'Error interno al procesar la subida.' }, { status: 500 });
  }
}
