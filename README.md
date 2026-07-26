# G-line | Sistema de Reserva de Turnos 💅

Aplicación web para reservar turnos de uñas con Supabase como backend.

## 🚀 Características

- ✅ Registro y login con email
- ✅ Reserva de turnos con calendario
- ✅ Subida de imágenes de diseños
- ✅ Autenticación segura
- ✅ Base de datos en Supabase
- ✅ Almacenamiento en nube

## 🛠️ Tecnologías

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Supabase (PostgreSQL + Auth)
- **Storage**: Supabase Storage
- **Deploy**: Vercel / Netlify

## ⚙️ Instalación Local

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/gianenails.git
cd gianenails
```

2. **Copia el archivo de configuración**
```bash
cp .env.example .env
```

3. **Actualiza `.env` con tus credenciales de Supabase**
```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-api-key-aqui
```

4. **Abre en el navegador**
- Simplemente abre `web.html` en tu navegador
- O usa un servidor local: `python -m http.server 8000`

## 📋 Pasos de Configuración

Ver [SUPABASE_SETUP.md](SUPABASE_SETUP.md) para:
- Crear proyecto en Supabase
- Configurar base de datos
- Crear bucket de storage
- Configurar OAuth

Ver [DEPLOY_DOMINIO.md](DEPLOY_DOMINIO.md) para:
- Desplegar en Vercel / Netlify
- Conectar dominio personalizado

## 📁 Estructura del Proyecto

```
gianenails/
├── web.html                 # HTML principal
├── web.css                  # Estilos
├── web.js                   # Lógica principal
├── supabase-config.js       # Configuración de Supabase
├── auth.js                  # Funciones de autenticación
├── appointments.js          # Gestión de turnos
├── storage.js               # Manejo de imágenes
├── package.json             # Dependencias
├── .env.example             # Variables de entorno (ejemplo)
├── .gitignore               # Archivos a ignorar en git
├── SUPABASE_SETUP.md        # Guía de configuración
└── README.md                # Este archivo
```

## 🔐 Variables de Entorno

Copia `.env.example` a `.env` y completa:

```env
SUPABASE_URL=https://xozsxkskggtkrmstjncp.supabase.co
SUPABASE_ANON_KEY=sb_publishable_xMzxO3g4PuMqxtcChwKbwg_b66e8XH7
```

⚠️ **IMPORTANTE**: Nunca subas `.env` a git, ya está en `.gitignore`

## 🚀 Deploy

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
1. Ve a netlify.com
2. Arrastra tu carpeta
3. Listo

### GitHub Pages
1. Crea repo
2. Settings → Pages → main branch
3. Tu sitio estará en: `https://tu-usuario.github.io/gianenails`

## 📚 Documentación

- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Configuración detallada de Supabase
- [DEPLOY_DOMINIO.md](DEPLOY_DOMINIO.md) - Instrucciones de deploy

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 👩‍💼 Contacto

¿Preguntas? Abre un issue en GitHub.

---

**Hecho con ❤️ para G-line**
