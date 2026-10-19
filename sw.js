// Service worker del lanzador: cachea el armazón para que abra sin conexión.
// Los accesos a iCloud.com siguen necesitando red (se abren en pestaña nueva).
const CACHE = 'iclonud-web-v2';
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-64.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-icon-512.png',
  'icons/atajo-correo.png',
  'icons/atajo-fotos.png',
  'icons/atajo-drive.png',
  'icons/atajo-calendario.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Solo servimos desde caché los recursos propios (mismo origen).
  if (url.origin !== location.origin) return;
  // Las páginas (incluidos los atajos ./?abrir=…) prueban la red y caen al armazón sin conexión.
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request))
  );
});
