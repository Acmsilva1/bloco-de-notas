const CACHE_NAME = 'notas-v14';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  'https://cdn.tailwindcss.com'
];

// Instalando e guardando os ficheiros no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Limpando caches antigos (Gestão de Versão DevOps)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Estratégia de busca: Tenta o cache, se não tiver, vai à rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
