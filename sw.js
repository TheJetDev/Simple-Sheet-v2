// sw.js

const CACHE_NAME = 'simple-calc-app-v6'; // バージョンを更新

const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  // 今回のアイコンファイル名に合わせて修正
  'apple-touch-icon.png',
  'favicon-96x96.png',
  'web-app-manifest-192x192.png',
  'web-app-manifest-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});