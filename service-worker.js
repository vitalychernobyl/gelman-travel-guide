const CACHE = "gelman-travel-guide-v24";
const FILES = [
  "./",
  "./index.html",
  "./index.html?v=24",
  "./manifest.webmanifest",
  "./manifest.webmanifest?v=24",
  "./app-logo.png",
  "./app-logo.png?v=17",
  "./apple-touch-icon.png",
  "./apple-touch-icon.png?v=17",
  "./app-logo-circle.svg",
  "./app-logo-circle.svg?v=17",
  "./app-logo-circle.png",
  "./app-logo-circle.png?v=17",
  "./vienna-hero.png",
  "./vienna-hero.png?v=1",
  "./amsterdam-hero.png",
  "./amsterdam-hero.png?v=1",
  "./london-hero.png",
  "./london-hero.png?v=1",
  "./washington-hero.png",
  "./washington-hero.png?v=1",
  "./sarasota-hero.png",
  "./sarasota-hero.png?v=1",
  "./amsterdam-hotel-key.png",
  "./amsterdam-hotel-key.png?v=1",
  "./nh-danube-hotel.png",
  "./nh-danube-hotel.png?v=1",
  "./priority-pass-sky-lounge.png",
  "./priority-pass-sky-lounge.png?v=1",
  "./london-building-key.png",
  "./london-building-key.png?v=1",
  "./dc-building-key.png",
  "./dc-building-key.png?v=1",
  "./sarasota-home-key.png",
  "./sarasota-home-key.png?v=1"
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
