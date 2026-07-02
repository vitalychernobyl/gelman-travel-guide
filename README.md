# Gelman Travel Guide

A tiny mobile-first Austria travel dictionary. The app is plain HTML/CSS with a small amount of vanilla JavaScript and no build step.

## Run Locally

Open `index.html` directly in a browser for the basic dictionary.

For installable/offline PWA behavior, serve the folder locally:

```sh
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Add To iPhone Home Screen

1. Host the folder on an HTTPS site, or serve it from a local machine reachable by the iPhone.
2. Open the page in Safari.
3. Tap the Share button.
4. Tap Add to Home Screen.
5. Save it as Gelman Travel Guide.

## Offline Note

Opening `index.html` directly works for normal use, but true offline Home Screen behavior needs `service-worker.js`. Service workers only work from `localhost` during development or from an HTTPS host in normal use.
