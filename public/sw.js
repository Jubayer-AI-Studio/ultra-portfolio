// Modern PWA Service Worker for Jubayer Ahmad Portfolio
// Designed for Zero-Freeze Instant Mobile & Standalone PWA Loading
const CACHE_NAME = 'jubayer-portfolio-v5';

// Core shell assets to pre-cache on install
const CORE_ASSETS = [
  '/',
  '/manifest.json',
  '/avatar.jpg',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('Pre-caching non-fatal warning:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Purging legacy PWA cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore non-GET and cross-origin requests (except font/image CDNs)
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. NAVIGATION REQUESTS (HTML / Root): ALWAYS NETWORK-FIRST
  // This ensures mobile PWA users always get the latest bundle hashes on app launch!
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(request).then((cached) => {
            return cached || caches.match('/');
          });
        })
    );
    return;
  }

  // 2. STATIC ASSETS (JS, CSS, Images, Fonts): Stale-While-Revalidate with network fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      // Return cached version if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});

// Listen for message from main app to purge cache immediately if requested
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'PURGE_CACHE') {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  }
});
