-- =======================================================
-- ESQUEMA OFICIAL SUPABASE - ACADEMIA FREDERICK FLORET
-- Ejecutar en el SQL Editor de Supabase (Proyecto thkbobesewltcsgnzpay)
-- =======================================================

-- 1. Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabla de Programas Académicos
CREATE TABLE IF NOT EXISTS public.programas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('salud', 'administrativo', 'educacion')),
    descripcion_corta TEXT NOT NULL,
    duracion VARCHAR(100) NOT NULL,
    modalidad VARCHAR(100) DEFAULT 'Presencial (50% Teórico - 50% Práctico)',
    jornadas TEXT[] DEFAULT ARRAY['Diurna (Mañana)', 'Diurna (Tarde)', 'Nocturna', 'Sabatina'],
    requisitos TEXT[] DEFAULT ARRAY['9º Grado aprobado o Bachiller', 'Documento de identidad vigente', 'Edad mínima: 16 años'],
    salidas_laborales TEXT[],
    resolucion VARCHAR(255),
    icono VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Prospectos e Inscripciones (Leads)
CREATE TABLE IF NOT EXISTS public.inscripciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombres VARCHAR(150) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    tipo_documento VARCHAR(20) DEFAULT 'CC',
    documento VARCHAR(50) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    programa_interes VARCHAR(255) NOT NULL,
    jornada_interes VARCHAR(100),
    nivel_educativo VARCHAR(100),
    mensaje TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'contactado', 'matriculado', 'descartado')),
    origen VARCHAR(50) DEFAULT 'web_portal',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Activar Row Level Security (RLS)
ALTER TABLE public.programas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscripciones ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Seguridad (RLS)
-- Permitir lectura pública de programas activos
CREATE POLICY "Programas visibles para todos" 
ON public.programas FOR SELECT 
USING (activo = true);

-- Permitir a los aspirantes enviar su formulario de inscripción
CREATE POLICY "Permitir inscripcion publica" 
ON public.inscripciones FOR INSERT 
WITH CHECK (true);

-- Solo usuarios autenticados (administradores) pueden leer las inscripciones
CREATE POLICY "Solo administradores ven inscripciones" 
ON public.inscripciones FOR SELECT 
TO authenticated 
USING (true);

-- 6. Insertar los 6 Programas Oficiales de la Academia Frederick Floret
INSERT INTO public.programas (titulo, slug, categoria, descripcion_corta, duracion, resolucion, icono, salidas_laborales)
VALUES
(
    'Técnico Laboral en Auxiliar en Enfermería',
    'auxiliar-en-enfermeria',
    'salud',
    'Fórmate para brindar cuidados integrales de salud a personas y comunidades, con un sólido enfoque humano, ético y asistencial en clínicas, hospitales y centros de atención.',
    '3 Semestres',
    'Radicado MinSalud/MEN 200478261 · Licencia 001514',
    'HeartPulse',
    ARRAY['Auxiliar en clínicas y hospitales', 'Atención domiciliaria integral', 'Centros de salud y EPS', 'Hogares de paso y cuidado del adulto mayor']
),
(
    'Técnico Laboral en Auxiliar en Salud Oral',
    'auxiliar-en-salud-oral',
    'salud',
    'Capacítate en asistencia odontológica clínica, prevención en salud bucal, esterilización de instrumental y preparación de materiales dentales junto a odontólogos especialistas.',
    '3 Semestres',
    'Aprobado por Sec. de Educación Montería · Res. 0990',
    'Smile',
    ARRAY['Consultorios y clínicas odontológicas', 'Asistencia en cirugías orales', 'Campañas de prevención y salud bucal', 'IPS públicas y privadas']
),
(
    'Técnico Laboral en Auxiliar en Servicios Farmacéuticos',
    'servicios-farmaceuticos',
    'salud',
    'Domina la dispensación responsable de medicamentos, control de inventarios farmacéuticos, almacenamiento bajo normatividad Invima y servicio calificado al usuario.',
    '3 Semestres',
    'Licencia Sec. de Educación Córdoba · Res. 0005315',
    'Pill',
    ARRAY['Droguerías comerciales y de cadena', 'Servicios farmacéuticos hospitalarios', 'Distribuidoras mayoristas de medicamentos', 'Gestión de bodega farmacéutica']
),
(
    'Técnico Laboral en Auxiliar Administrativo en Salud',
    'administrativo-en-salud',
    'salud',
    'Conviértete en el enlace clave entre pacientes y entidades de salud. Facturación hospitalaria, admisión de usuarios, autorizaciones con EPS y archivo de historias clínicas.',
    '3 Semestres',
    'Aprobación Sec. Educación Montería · Res. 0990',
    'FileSpreadsheet',
    ARRAY['Facturación en EPS e IPS', 'Admisión y atención al usuario', 'Auditoría médica básica y glosas', 'Gestión documental y cuentas médicas']
),
(
    'Técnico Laboral en Auxiliar en Salud Pública',
    'salud-publica',
    'salud',
    'Promueve el bienestar comunitario participando en programas de vigilancia epidemiológica, inmunización, saneamiento ambiental y promoción de la salud en Montería y Córdoba.',
    '3 Semestres',
    'Comisión Intersectorial MinSalud/MEN',
    'ShieldPlus',
    ARRAY['Secretarías de Salud municipal y departamental', 'Brigadas comunitarias y vacunación', 'Programas de vigilancia en salud pública', 'Promoción y prevención en EPS']
),
(
    'Técnico Laboral en Auxiliar Administrativo Organizacional',
    'auxiliar-administrativo-organizacional',
    'administrativo',
    'Adquiere competencias en administración integral, apoyo contable y financiero, talento humano, servicio al cliente y sistemas de información para empresas privadas y públicas.',
    '3 Semestres (660 Horas)',
    'Alineado a CNO (1341) y CUOC-2023 · Res. 0990',
    'Briefcase',
    ARRAY['Auxiliar administrativo y de oficina', 'Asistente contable y financiero', 'Coordinador de servicio al cliente', 'Auxiliar de talento humano y nómina']
)
ON CONFLICT (slug) DO NOTHING;
