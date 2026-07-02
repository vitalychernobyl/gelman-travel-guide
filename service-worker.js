const CACHE = "gelman-travel-guide-v18";
const FILES = [
  "./",
  "./index.html",
  "./index.html?v=18",
  "./manifest.webmanifest",
  "./manifest.webmanifest?v=18",
  "./app-logo.png",
  "./app-logo.png?v=17",
  "./apple-touch-icon.png",
  "./apple-touch-icon.png?v=17",
  "./app-logo-circle.svg",
  "./app-logo-circle.svg?v=17",
  "./app-logo-circle.png",
  "./app-logo-circle.png?v=17"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then(hit => hit || caches.match("./index.html")))
  );
});
