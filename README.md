# Accesos iCloud · PWA lanzador

Una app web instalable (PWA) que funciona como una pantalla de inicio con los servicios de
**iCloud.com**: Correo, Fotos, Drive, Notas, Recordatorios, Calendario, Contactos, Buscar e iWork.
Cada ícono abre el servicio en el navegador; inicias sesión con tu Apple ID la primera vez.

Es el complemento de la app nativa **iClonud** (CalDAV/CardDAV/IMAP): cubre justo lo que Apple
no expone por protocolos abiertos (Fotos, Drive, Notas, Recordatorios y Buscar), usando su web.

## Archivos

```
index.html              La interfaz (rejilla de accesos) + registro del service worker
manifest.webmanifest    Nombre, íconos y modo standalone para instalarla
sw.js                   Service worker: cachea el armazón para abrir sin conexión
icons/                  Íconos 192 / 512 / 512 maskable / 64 + atajos (96) de Correo, Fotos, Drive, Calendario
capturas/               Capturas 1080×1920 (claro/oscuro) para el diálogo de instalación de Android
```

## Qué trae para Android (v2)

- **Instalación de un toque** en Chrome/Edge: botón «Instalar en este teléfono» (evento `beforeinstallprompt`).
- **Guía según el navegador**: Chrome, Samsung Internet, Firefox, Safari (iPhone) y navegadores
  internos de WhatsApp/Instagram (pide abrir en Chrome). En el computador muestra un **QR** para abrirla en el teléfono.
- **Atajos del ícono**: mantener presionado el ícono abre directo Correo, Fotos, Drive o Calendario
  (`./?abrir=correo|fotos|drive|calendario|notas|recordatorios|contactos|buscar|iwork`).
- Diálogo de instalación enriquecido (capturas en el manifiesto), `id` estable, modo oscuro automático.
- Nada que descargar fuera del navegador: no es APK ni pide «orígenes desconocidos».

## Cómo publicarla e instalarla

Una PWA se instala solo desde una URL **HTTPS**. Opciones:

1. **Artifact de Claude:** sirve para verla, pero dentro de claude.ai el manifiesto y el service worker
   no aplican, así que no se instala como app propia. Para instalarla, usa una de las opciones de abajo.
2. **Tu propio hosting** (GitHub Pages, Netlify, Cloudflare Pages, Vercel): sube esta carpeta tal cual.
   El service worker y el manifiesto ya están configurados con rutas relativas.
3. **Prueba local:** `python3 -m http.server 8080` dentro de la carpeta y abre `http://localhost:8080`
   (en local el service worker funciona; para instalar en el móvil se necesita HTTPS).

### Instalar
- **iPhone/iPad (Safari):** Compartir → «Agregar a inicio».
- **Android (Chrome):** menú ⋮ → «Instalar app». También aparece el botón «Instalar en el dispositivo».

## Nota
Proyecto educativo, sin afiliación con Apple. «iCloud» y los nombres de sus apps son marcas de Apple Inc.
