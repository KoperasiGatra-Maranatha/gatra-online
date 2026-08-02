const CACHE_NAME = 'gatra-cache-v2'; // Versi cache dinaikkan agar HP mendownload script baru
const assets = [
  './index.html',
  './manifest.json',
  'https://googleusercontent.com'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Mengatur alur lalu lintas data online & offline secara aman
self.addEventListener('fetch', e => {
  // KUNCI UTAMA: Jika aplikasi memanggil Google Script, bypass langsung lewat internet online
  if (e.request.url.includes('://google.com')) {
    return e.respondWith(fetch(e.request));
  }

  // Jika memanggil aset biasa, gunakan sistem cache
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
