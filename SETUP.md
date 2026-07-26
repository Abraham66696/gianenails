# 🚀 Setup Completo - G-line Turnos

## PASO 1: Configurar Supabase (Backend Gratis)

### 1.1 Crear cuenta en Supabase
1. Ve a https://supabase.com
2. Click en "Start your project"
3. Crea una cuenta con Google, GitHub o Email
4. Crea un nuevo proyecto (elige región cercana)

### 1.2 Obtener credenciales
1. En el proyecto de Supabase, ve a **Settings > API**
2. Copia:
   - **Project URL** → SUPABASE_URL
   - **anon public key** → SUPABASE_ANON_KEY

### 1.3 Crear tablas en Supabase

Ejecuta este SQL en **SQL Editor** de Supabase:

```sql
-- Tabla de usuarios (Supabase la crea automáticamente)
-- Tabla de turnos
CREATE TABLE turnos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora VARCHAR(5) NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    estado VARCHAR(50) DEFAULT 'confirmado',
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(fecha, hora)
);

-- Tabla de imágenes
CREATE TABLE imagenes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT now()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE turnos ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagenes ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Usuarios pueden ver sus propios turnos"
ON turnos FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden crear turnos"
ON turnos FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden cancelar sus turnos"
ON turnos FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden ver sus imágenes"
ON imagenes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden subir imágenes"
ON imagenes FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### 1.4 Crear bucket de Storage

1. En Supabase, ve a **Storage**
2. Click en "Create bucket"
3. Nombre: `diseños`
4. Marca "Public bucket"
5. Click Create

## PASO 2: Actualizar credenciales en el proyecto

### 2.1 Editar `supabase-config.js`

Reemplaza con tus valores reales:

```javascript
const SUPABASE_URL = 'https://tuproyecto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR...';
```

## PASO 3: Agregar Supabase al HTML

En `web.html`, agrega antes de cerrar `</body>`:

```html
<!-- Supabase JS Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Scripts locales -->
<script src="supabase-config.js"></script>
<script src="auth.js"></script>
<script src="appointments.js"></script>
<script src="storage.js"></script>
<script src="web.js"></script>
```

## PASO 4: Hospedar el Frontend (GRATIS)

### Opción A: Vercel (Recomendado)

1. Ve a https://vercel.com
2. Crea cuenta con GitHub
3. Click "New Project"
4. Importa tu repositorio de GitHub
5. Configura tu dominio personal
6. Click Deploy

### Opción B: Netlify

1. Ve a https://netlify.com
2. Crea cuenta
3. Drag & drop tu carpeta o conecta GitHub
4. Asigna dominio
5. Deploy

### Opción C: GitHub Pages

1. Crea repositorio en GitHub
2. Sube tus archivos
3. Settings > Pages > Source > main branch
4. Tu sitio está en `username.github.io`

## PASO 5: Conectar tu dominio

1. Compra dominio en Namecheap, GoDaddy, etc.
2. En tu proveedor de hosting (Vercel/Netlify):
   - Ve a Domains
   - Agrega tu dominio
   - Copia los nameservers
3. En tu registrador de dominio:
   - Cambia los nameservers por los del hosting
   - Espera 24-48 horas para que se propague

## PASO 6: Habilitardad OAuth (Google/Facebook)

### Para Google:

1. Ve a https://console.cloud.google.com
2. Crea un nuevo proyecto
3. Ve a "Credentials"
4. Create "OAuth 2.0 Client ID" (Web application)
5. Autorizados JavaScript origins: `https://tu-dominio.com`
6. Autorizados redirect URIs: `https://tuproyecto.supabase.co/auth/v1/callback`
7. Copia Client ID
8. En Supabase > Authentication > Providers > Google
9. Pega el Client ID y Client Secret

### Para Facebook:

1. Ve a https://developers.facebook.com
2. Crea app
3. En Settings > Basic:
   - App ID y App Secret
4. En Settings > Basic, agrega tu dominio en "App Domains"
5. En Configuración de Facebook Login > URIs de redireccionamiento autorizadas:
   - `https://tuproyecto.supabase.co/auth/v1/callback`
6. En Supabase > Authentication > Providers > Facebook
7. Pega App ID y App Secret

## ✅ Checklist Final

- [ ] Proyecto Supabase creado
- [ ] Tablas creadas en Supabase
- [ ] Bucket de storage creado
- [ ] Credenciales en `supabase-config.js`
- [ ] Frontend hosteado (Vercel/Netlify)
- [ ] Dominio conectado
- [ ] OAuth configurado (opcional)
- [ ] Pruebas de registro y login funcionan
- [ ] Subida de imágenes funciona
- [ ] Reserva de turnos funciona

¡Listo para producción! 🎉
