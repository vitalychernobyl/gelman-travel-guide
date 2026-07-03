# Gelman Travel Deployment Proof

Last verified: 2026-07-03

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
App feature commit: 465303e Improve install banner and share links
Cache version: service-worker.js?v=47
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://9f61b99c.gelman-travel-guide.pages.dev
Public URL: https://antonreport.com/gelmantravel/
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=47

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=47

curl -s 'https://antonreport.com/gelmantravel/manifest.webmanifest?v=47' | rg 'start_url|name|display'
  "name": "Gelman Travel Guide",
  "short_name": "Gelman Guide",
  "start_url": "./?v=47",
  "display": "standalone",

curl -sI https://antonreport.com/gelmantravel/london-stay-house.webp | rg 'HTTP/|content-type|cache-control'
HTTP/2 200
content-type: image/webp
cache-control: public, max-age=0, must-revalidate
```

## Production Browser Check

```text
Viewport: 396x695
URL: https://antonreport.com/gelmantravel/?city=amsterdam&page=photos

- Install banner is visible and the old install popup is absent.
- Attractions has no featured rail.
- Amsterdam Attractions renders 55 cards.
- First card is Café Luce and has a Recommended badge.
- Attraction category filters wrap; no horizontal overflow.
- Attraction cards have overlay share buttons and Google Maps SVG navigation icons.

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
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for the v47 deploy.
- iOS does not allow a website to silently install itself to the Home Screen. The banner uses the browser install prompt where supported and otherwise shows the Safari path: Share -> Add to Home Screen.
- iOS Messages sharing still requires user confirmation before sending. The app attempts to open Messages with the family recipients and the current canonical app URL.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

Important: code is already pushed to main at 465303e or later. The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v47 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=47
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=47
- https://antonreport.com/gelmantravel/manifest.webmanifest?v=47 has start_url ./?v=47
- https://antonreport.com/gelmantravel/london-stay-house.webp returns HTTP 200 image/webp

v47 changes:
- Removed the old install popup and replaced it with a top install banner.
- Added card share buttons with canonical deep links and hash targets.
- Main Share attempts to open Messages with these recipients: +12026410072, +12404470927, +12406877739, +4407875721986. iOS still requires user confirmation before sending.
- Hotel action rows use a Google Maps navigation icon; Uber is last and expands to remaining width.
- Attractions no longer has the separate recommended rail. Recommended items are tagged and sorted to the top in the normal vertical card list.
- Attraction filters wrap instead of horizontally scrolling.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
