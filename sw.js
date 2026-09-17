const CACHE_NAME = "nd-college-cache-v3";

const urlsToCache = [
  "./",
  "./index.html",
  "./cover-page.html",
  "./style.css",
  "./cover-page.css",
  "./animations.js",
  "./cover-page.js",
  "./forms.js",
  "./misc.js",
  "./navigation.js",
  "./swiper-init.js",
  "./theme.js",
  "./logo.png",
  "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css",
  "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js",
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.warn("SW cache skip (fetch fail):", url, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request)
          .then((networkResponse) => {
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              event.request.url.startsWith(self.location.origin)
            ) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
          })
      );
    })
  );
});