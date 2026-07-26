# 🔗 CONEXIÓN SUPABASE - Paso a Paso

## PASO 1: Crear Proyecto Supabase

1. Ve a https://supabase.com
2. Click en **"Sign In"** (arriba derecha)
3. Si no tienes cuenta:
   - Click **"Create account"**
   - Usa Google, GitHub o email
4. Luego que inicides sesión, click en **"New project"**

### Al crear proyecto:

- **Project name**: `gianenails`
- **Database Password**: Crea una contraseña (ej: `Giane2024!Nails`)
- **Region**: Elige la más cercana a ti (ej: `South America - São Paulo`)
- Click **"Create new project"**

⏳ Espera 2-3 minutos a que se cree...

---

## PASO 2: Obtener Credenciales

Una vez que tu proyecto esté listo:

1. En el menú izquierdo, ve a **Settings**
2. Click en **API** (en la izquierda)

### Copia estos valores:

```
Project URL:      https://xxxxxxxxx.supabase.co
Anon Public Key:  eyJhbGciOiJIUzI1NiIsInR...
```

**Guarda estos valores en un notepad**, los necesitarás en Paso 4.

---

## PASO 3: Crear Tablas en la Base de Datos

1. En el menú izquierdo, ve a **SQL Editor**
2. Click en **"New query"**
3. Copia TODO este código y pégalo:

```sql
-- Crear tabla de turnos
CREATE TABLE IF NOT EXISTS turnos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora VARCHAR(5) NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    estado VARCHAR(50) DEFAULT 'confirmado',
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(fecha, hora)
);

-- Crear tabla de imágenes
CREATE TABLE IF NOT EXISTS imagenes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT now()
);

-- Habilitar seguridad
ALTER TABLE turnos ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagenes ENABLE ROW LEVEL SECURITY;

-- Políticas para turnos
CREATE POLICY "Usuarios pueden ver sus turnos"
ON turnos FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden crear turnos"
ON turnos FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden cancelar turnos"
ON turnos FOR UPDATE
USING (auth.uid() = user_id);

-- Políticas para imágenes
CREATE POLICY "Usuarios pueden ver sus imágenes"
ON imagenes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden subir imágenes"
ON imagenes FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

4. Click en el botón **"Run"** (▶️)
5. Si aparece "Success", ¡perfecto! Si hay error, avísame

---

## PASO 4: Crear Bucket de Storage

1. En el menú izquierdo, ve a **Storage**
2. Click en **"Create a new bucket"**
3. Completa:
   - **Name**: `diseños`
   - Marca la opción **"Public bucket"**
4. Click **"Create bucket"**

---

## PASO 5: Actualizar tu archivo `supabase-config.js`

Abre el archivo `supabase-config.js` en tu proyecto y reemplaza:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxx.supabase.co';  // TU_PROJECT_URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR...';  // TU_ANON_KEY
```

Con los valores que copiaste en **PASO 2**

**Ejemplo real:**

```javascript
const SUPABASE_URL = 'https://abcd1234.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## PASO 6: Probar la Conexión

1. Abre tu sitio web en el navegador
2. Abre la consola: **F12**
3. Intenta registrarte con un email de prueba
4. En la consola deberías ver si hay errores

Si ves en consola algo como:
```
"Funciones de autenticación cargadas"
```
✅ ¡Está funcionando!

Si hay errores rojo, cópiame el mensaje exacto.

---

## 🎯 Resumen de lo que acabamos de hacer:

| Paso | Qué se hizo |
|------|------------|
| 1 | Crear proyecto en Supabase |
| 2 | Obtener URL y clave de API |
| 3 | Crear tablas para turnos e imágenes |
| 4 | Crear carpeta de almacenamiento (Storage) |
| 5 | Actualizar credenciales en tu código |
| 6 | Probar que funciona |

---

## ⚙️ Configuración Supabase (OPCIONAL - para después)

Si quieres habilitar Google y Facebook login:

1. Ve a **Authentication** (izquierda)
2. Click en **"Providers"**
3. Activa Google y Facebook
4. Llena client_id y client_secret cuando los tengas

Por ahora prueba con email, eso es lo más importante.

---

## ¿Necesitas ayuda?

Cuando termines los pasos:
1. Dame tu **Project URL** (ej: `https://abc123.supabase.co`)
2. Dame tu **Anon Key** (los primeros 20 caracteres)
3. Dime si hay errores en la consola

¡Avísame cuando llegues al PASO 3! 👇
