const CACHE_NAME = 'cannabis-master-v1';

// El service worker vive en la misma carpeta que el resto del sitio publicado
// (ej: /cannabis-master-app/sw.js), así que calculamos el prefijo dinámicamente
// a partir de su propia ubicación. Esto evita tener que hardcodear el nombre
// del repositorio acá, y sigue funcionando si renombrás el repo en el futuro.
const BASE_PATH = self.location.pathname.replace(/sw\.js$/, '');

const APP_SHELL = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}icons/icon-192.png`,
  `${BASE_PATH}icons/icon-512.png`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

// Estrategia: network-first para navegación (HTML), cache-first para assets estáticos.
// Esto evita servir una versión vieja del app shell mientras hay conexión,
// pero permite que el app abra offline si no hay red.
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match(`${BASE_PATH}index.html`)))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.status === 200 && request.url.startsWith(self.location.origin)) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
