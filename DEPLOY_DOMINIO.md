# 🌐 CONECTAR DOMINIO gianenails.dpdns.org

## ¿Dónde hospedar tu sitio?

Tienes 3 opciones GRATIS:

### **OPCIÓN 1: Vercel (RECOMENDADO) ⭐**
- Mejor rendimiento
- Fácil de conectar dominio
- Gratis para proyectos estáticos

**Pasos:**
1. Ve a https://vercel.com
2. Click "Sign Up"
3. Usa GitHub o email
4. Click "New Project"
5. Sube tu carpeta web
6. En Settings → Domains → Agrega `gianenails.dpdns.org`
7. Copia los nameservers que aparecen
8. Ve a donde compraste el dominio y cambia los nameservers
9. Espera 24-48 horas

### **OPCIÓN 2: Netlify**
1. Ve a https://netlify.com
2. Sign up
3. Drag & drop tu carpeta
4. Settings → Domain Management → Add custom domain
5. Agrega `gianenails.dpdns.org`
6. Sigue igual que Vercel con nameservers

### **OPCIÓN 3: GitHub Pages (MÁS SIMPLE)**
1. Ve a https://github.com
2. Crea una nueva cuenta si no tienes
3. Crea un repositorio: `gianenails`
4. Sube tus archivos (web.html, web.css, web.js, etc)
5. Ve a Settings → Pages
6. Source: `main` branch
7. Tu sitio estará en: `https://tu-usuario.github.io/gianenails`
8. Para conectar dominio personalizado:
   - En tu registrador de dominio, agrega CNAME:
     ```
     gianenails.dpdns.org → tu-usuario.github.io
     ```
   - En GitHub Settings → Pages → Custom domain → `gianenails.dpdns.org`

---

## ¿Qué elegir?

| Feature | Vercel | Netlify | GitHub Pages |
|---------|--------|---------|--------------|
| Gratis | ✅ | ✅ | ✅ |
| Fácil | ✅ | ✅ | ✅ |
| Rápido | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Dominio custom | ✅ | ✅ | ✅ |

**Mi recomendación:** Vercel o Netlify

---

## Checklist antes de desplegar:

- [ ] Supabase cuenta creada
- [ ] Proyecto Supabase funciona
- [ ] Tablas creadas en BD
- [ ] `supabase-config.js` actualizado con credenciales
- [ ] Bucket "diseños" creado
- [ ] Prueba de login funciona

¿Quieres que hagamos Vercel, Netlify o GitHub Pages? 🚀
