/**
 * Service Worker for Golden Sungava PWA
 * Caches static assets and ISR pages for offline access.
 * Shows branded offline page for uncached dynamic content.
 */

const CACHE_NAME = 'golden-sungava-v1';
const OFFLINE_URL = '/offline';

// Static assets to pre-cache on install
const PRE_CACHE_URLS = [
  '/',
  '/offline',
  '/images/logo.png',
  '/images/placeholder.svg',
];

// Install: pre-cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRE_CACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for pages, cache-first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip API calls and Next.js internals
  if (request.url.includes('/api/') || request.url.includes('/_next/')) return;

  // For navigation requests (HTML pages): network-first
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful page responses
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          // Offline: try cache, then fallback to offline page
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // For assets: cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Cache static assets (images, fonts, CSS, JS)
        if (response.ok && (request.url.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff2?)$/))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
