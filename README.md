# Gelman Travel Guide

A tiny mobile-first Austria travel guide. The app is plain HTML/CSS with a small amount of vanilla JavaScript and no build step.

It includes three bottom-tab pages:

- Dictionary: English, pronunciation, and German travel phrases in three columns.
- Trip Plans: city-by-city plans with flights, hotel placeholders, dates, times, and attraction links.
- Photos: photo spots, message notes, and a place for an iCloud shared album link.

Logo files:

- `app-logo.png`: square app/Home Screen icon.
- `apple-touch-icon.png`: iPhone Home Screen icon.
- `app-logo-circle.svg`: circular logo version for reuse elsewhere.
- `app-logo-circle.png`: circular transparent PNG logo version for reuse elsewhere.

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

The GitHub Pages version is:

```text
https://vitalychernobyl.github.io/gelman-travel-guide/
```

The Cloudflare Pages version is:

```text
https://gelman-travel-guide.pages.dev/
```

## Add To iPhone Home Screen

1. Host the folder on an HTTPS site, or serve it from a local machine reachable by the iPhone.
2. Open the page in Safari.
3. Tap the Share button.
4. Tap Add to Home Screen.
5. Save it as Gelman Travel Guide.

## Offline Note

Opening `index.html` directly works for normal use, but true offline Home Screen behavior needs `service-worker.js`. Service workers only work from `localhost` during development or from an HTTPS host in normal use.
