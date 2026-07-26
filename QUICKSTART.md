# 🎉 G-line - Guía Rápida de Inicio

## Archivos creados:

✅ **supabase-config.js** - Configuración de Supabase  
✅ **auth.js** - Funciones de autenticación  
✅ **appointments.js** - Manejo de turnos  
✅ **storage.js** - Subida de imágenes  
✅ **web.html** - HTML actualizado con Supabase  
✅ **web.js** - JavaScript integrado con Supabase  
✅ **package.json** - Dependencias del proyecto  
✅ **vite.config.js** - Configuración de build  
✅ **SETUP.md** - Guía completa de instalación  

---

## ⚡ PASOS RÁPIDOS (5 minutos):

### 1️⃣ Crear Proyecto Supabase

```bash
1. Ve a https://supabase.com
2. Click "Start your project"
3. Completa el registro
4. Crea nuevo proyecto (selecciona región)
```

### 2️⃣ Obtener Credenciales

```
En Supabase → Settings → API
Copia:
- Project URL → SUPABASE_URL
- anon public key → SUPABASE_ANON_KEY
```

### 3️⃣ Actualizar `supabase-config.js`

```javascript
const SUPABASE_URL = 'tu-url-aqui';
const SUPABASE_ANON_KEY = 'tu-clave-aqui';
```

### 4️⃣ Crear Tablas en Supabase

Ve a **SQL Editor** en Supabase y copia todo de [SETUP.md](SETUP.md)

### 5️⃣ Crear Bucket de Storage

- En Supabase → **Storage**
- "Create bucket" → nombre: `diseños`
- Marca "Public bucket"

### 6️⃣ Desplegar Frontend (Elige uno)

**Opción A: Vercel (Recomendado)**
```bash
npm install -g vercel
vercel
```

**Opción B: Netlify**
- Ve a netlify.com
- Drag & drop tu carpeta

**Opción C: GitHub Pages**
- Crea repo en GitHub
- Sube archivos
- Settings → Pages

### 7️⃣ Conectar tu Dominio

1. En Vercel/Netlify → **Domains**
2. Agrega dominio
3. Copia nameservers
4. En registrador (Namecheap/GoDaddy):
   - Cambia nameservers
   - Espera 24-48h

---

## 🔑 Funcionalidades Incluidas:

✅ Registro con email y contraseña  
✅ Login con Google  
✅ Login con Facebook  
✅ Reserva de turnos con calendario  
✅ Subida de imágenes de diseños  
✅ Autenticación automática  
✅ Almacenamiento en base de datos  

---

## 📚 Documentación Completa

Ver [SETUP.md](SETUP.md) para:
- Instrucciones detalladas
- SQL para crear tablas
- Configuración OAuth
- Troubleshooting

---

## 🚀 ¿Dudas?

1. Verifica que Supabase esté correctamente configurado
2. Abre consola del navegador (F12) para ver errores
3. Revisa que los scripts en HTML estén en orden
4. Confirma que SUPABASE_URL y SUPABASE_ANON_KEY sean correctos

¡Listo para despegar! 🚀
