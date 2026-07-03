const CACHE = "gelman-travel-guide-v42";
const FILES = [
  "./",
  "./index.html",
  "./?v=42",
  "./manifest.webmanifest",
  "./manifest.webmanifest?v=42",
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
  "./london-building-key.png?v=2",
  "./london-boot-house.svg",
  "./london-boot-house.svg?v=1",
  "./london-boot-house.png",
  "./london-boot-house.png?v=2",
  "./dc-taj-mahal-key.jpg",
  "./dc-taj-mahal-key.jpg?v=1",
  "./sarasota-home-key.png",
  "./sarasota-home-key.png?v=1",
  "./attractions/vienna-schonbrunn-palace.jpg",
  "./attractions/vienna-schonbrunn-palace.jpg?v=1",
  "./attractions/vienna-belvedere-museum.jpg",
  "./attractions/vienna-belvedere-museum.jpg?v=1",
  "./attractions/vienna-st-stephens-cathedral.jpg",
  "./attractions/vienna-st-stephens-cathedral.jpg?v=1",
  "./attractions/vienna-vienna-prater.jpg",
  "./attractions/vienna-vienna-prater.jpg?v=1",
  "./attractions/vienna-hofburg-palace.jpg",
  "./attractions/vienna-hofburg-palace.jpg?v=1",
  "./attractions/vienna-kunsthistorisches-museum.jpg",
  "./attractions/vienna-kunsthistorisches-museum.jpg?v=1",
  "./attractions/vienna-museumsquartier.jpg",
  "./attractions/vienna-museumsquartier.jpg?v=1",
  "./attractions/vienna-albertina.jpg",
  "./attractions/vienna-albertina.jpg?v=1",
  "./attractions/vienna-vienna-state-opera.jpg",
  "./attractions/vienna-vienna-state-opera.jpg?v=1",
  "./attractions/vienna-naschmarkt.jpg",
  "./attractions/vienna-naschmarkt.jpg?v=1",
  "./attractions/vienna-karlskirche.jpg",
  "./attractions/vienna-karlskirche.jpg?v=1",
  "./attractions/vienna-hundertwasserhaus.jpg",
  "./attractions/vienna-hundertwasserhaus.jpg?v=1",
  "./attractions/vienna-kunst-haus-wien.jpg",
  "./attractions/vienna-kunst-haus-wien.jpg?v=1",
  "./attractions/vienna-danube-tower.jpg",
  "./attractions/vienna-danube-tower.jpg?v=1",
  "./attractions/vienna-danube-island.jpg",
  "./attractions/vienna-danube-island.jpg?v=1",
  "./attractions/vienna-cafe-central.jpg",
  "./attractions/vienna-cafe-central.jpg?v=1",
  "./attractions/vienna-demel.jpg",
  "./attractions/vienna-demel.jpg?v=1",
  "./attractions/vienna-stadtpark.jpg",
  "./attractions/vienna-stadtpark.jpg?v=1",
  "./attractions/vienna-mak.jpg",
  "./attractions/vienna-mak.jpg?v=1",
  "./attractions/vienna-spanish-riding-school.jpg",
  "./attractions/vienna-spanish-riding-school.jpg?v=1",
  "./attractions/amsterdam-rijksmuseum.jpg",
  "./attractions/amsterdam-rijksmuseum.jpg?v=1",
  "./attractions/amsterdam-van-gogh-museum.jpg",
  "./attractions/amsterdam-van-gogh-museum.jpg?v=1",
  "./attractions/amsterdam-anne-frank-house.jpg",
  "./attractions/amsterdam-anne-frank-house.jpg?v=1",
  "./attractions/amsterdam-vondelpark.jpg",
  "./attractions/amsterdam-vondelpark.jpg?v=1",
  "./attractions/amsterdam-stubbes-haring.jpg",
  "./attractions/amsterdam-stubbes-haring.jpg?v=1",
  "./attractions/amsterdam-vishuisje-herengracht.jpg",
  "./attractions/amsterdam-vishuisje-herengracht.jpg?v=1",
  "./attractions/amsterdam-the-seafood-bar.jpg",
  "./attractions/amsterdam-the-seafood-bar.jpg?v=1",
  "./attractions/london-british-museum.jpg",
  "./attractions/london-british-museum.jpg?v=1",
  "./attractions/london-tower-of-london.jpg",
  "./attractions/london-tower-of-london.jpg?v=1",
  "./attractions/london-westminster-abbey.jpg",
  "./attractions/london-westminster-abbey.jpg?v=1",
  "./attractions/london-london-eye.jpg",
  "./attractions/london-london-eye.jpg?v=1",
  "./attractions/washington-smithsonian-museums.jpg",
  "./attractions/washington-smithsonian-museums.jpg?v=1",
  "./attractions/washington-lincoln-memorial.jpg",
  "./attractions/washington-lincoln-memorial.jpg?v=1",
  "./attractions/sarasota-siesta-key-beach.jpg",
  "./attractions/sarasota-siesta-key-beach.jpg?v=1",
  "./attractions/sarasota-the-ringling.jpg",
  "./attractions/sarasota-the-ringling.jpg?v=1",
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
