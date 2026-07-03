# Gelman Travel Deployment Proof

Last verified: 2026-07-03

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
App feature commit: 3c3abd4 Refine Amsterdam attraction actions
Cache version: service-worker.js?v=48
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://8c76eee5.gelman-travel-guide.pages.dev
Public URL: https://antonreport.com/gelmantravel/
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=48

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=48

curl -s 'https://antonreport.com/gelmantravel/manifest.webmanifest?v=48' | rg 'start_url|name|display'
  "name": "Gelman Travel Guide",
  "short_name": "Gelman Guide",
  "start_url": "./?v=48",
  "display": "standalone",

curl -sI 'https://antonreport.com/gelmantravel/attractions/amsterdam-loetje-cafe.jpg?v=1' | rg 'HTTP/|content-type|cache-control'
HTTP/2 200
content-type: image/jpeg
cache-control: public, max-age=0, must-revalidate
```

## Production Browser Check

```text
Viewport: 396x695
URL: https://antonreport.com/gelmantravel/?city=amsterdam&page=photos

- Install banner is visible and the old install popup is absent.
- Attractions has no featured rail.
- Amsterdam Attractions renders 56 cards.
- Loetje Amsterdam Café is present near the top with a local image.
- Loetje action row is exactly: Menu, Directions, Uber.
- Loetje action colors: light green, Google Maps blue, Uber black.
- Loetje Directions uses a Google Maps directions URL with `dir_action=navigate`.
- Loetje Uber uses `https://m.uber.com/ul/` with pickup set to current location.
- Attraction action rows have no icons and no second Details button.
- First card is Café Luce and has a Recommended badge.
- Attraction category filters wrap; no horizontal overflow.
- Attraction cards have overlay share buttons.

URL: https://antonreport.com/gelmantravel/?city=amsterdam&page=plans

- Install banner text: Gelman Travel app / Add this guide to your Home Screen. / Add app
- Old install popup is absent.
- Amsterdam hotel id: hotel-amsterdam-avani-museum-quarter-amsterdam-hotel
- Amsterdam hotel has overlay share button.
- Hotel action order: Directions, Hotel Site, Uber.
- Google Maps action uses SVG navigation icon.
- Uber is last and expands to the remaining row width.
- Collapsed hotel preview shows only: Hobbemakade 50, 1071 XL Amsterdam
```

## Notes

- The app is a static HTML/CSS/JS PWA with no build step.
- The repo root is the Pages deploy directory.
- The Cloudflare Pages project is not Git-connected, so future merges will not auto-deploy unless Git integration is configured.
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for the v48 deploy.
- iOS does not allow a website to silently install itself to the Home Screen. The banner uses the browser install prompt where supported and otherwise shows the Safari path: Share -> Add to Home Screen.
- Top Share now uses the default browser/Apple share sheet through `navigator.share`; it no longer attempts to open a Messages recipient group.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

Important: code is already pushed to main at 3c3abd4 or later. The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v48 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=48
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=48
- https://antonreport.com/gelmantravel/manifest.webmanifest?v=48 has start_url ./?v=48
- https://antonreport.com/gelmantravel/attractions/amsterdam-loetje-cafe.jpg?v=1 returns HTTP 200 image/jpeg

v48 changes:
- Added Loetje Amsterdam Café near the top of Amsterdam Attractions, with local image and official listing details.
- Attraction action rows are text-only: Menu/Tickets/Website, Directions, Uber.
- Directions buttons are Google Maps blue and use `dir_action=navigate` for one-tap navigation from current location.
- Uber buttons are black and deep-link to `m.uber.com/ul/` with pickup set to current location.
- Removed the second bottom Details button from attraction cards.
- Top Share uses the default native share sheet, not an iMessage recipient group.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
