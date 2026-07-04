# Gelman Travel Deployment Proof

Last verified: 2026-07-04

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
Latest app commit at deploy: c6699d3 Unify card action button styles
Cache version: service-worker.js?v=55
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://43dcf39f.gelman-travel-guide.pages.dev
Public URL: https://antonreport.com/gelmantravel/
Wrangler: 4.107.0
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=55

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=55

curl -s 'https://antonreport.com/gelmantravel/app-version.json' | tr -d '\n '
{"version":"55","publishedAt":"2026-07-04T00:00:00-04:00"}

curl -s 'https://antonreport.com/gelmantravel/manifest.webmanifest?v=55' | rg 'start_url|name|display'
  "name": "Gelman Travel Guide",
  "short_name": "Gelman Guide",
  "start_url": "./?v=55",
  "display": "standalone",

curl -sI 'https://antonreport.com/gelmantravel/vendor/leaflet.css?v=1' | sed -n '1,4p'
HTTP/2 200
content-type: text/css; charset=utf-8

curl -sI 'https://antonreport.com/gelmantravel/attractions/amsterdam-loetje-cafe.jpg?v=1' | sed -n '1,4p'
HTTP/2 200
content-type: image/jpeg

curl -sI 'https://antonreport.com/gelmantravel/london-stay-house.webp' | sed -n '1,4p'
HTTP/2 200
content-type: image/webp
```

## v55 Change

- Removed icons from card action buttons in plans and attractions.
- Unified all card action buttons to the same pill style.
- Directions/map actions are blue text-only buttons.
- Uber actions are black text-only buttons.
- Site/menu/tickets/app-info actions are grey text-only buttons.
- Service worker, manifest, and app-version are bumped to v55 so installed Home Screen apps refresh.

## Browser QA

```text
Local mobile viewport: 396x695, Chrome system binary

Plans page:
- Audited plan action buttons across all five cities with all details expanded.
- Bad icon count: 0.
- Wrong color/style count: 0 after manual review of the only checker false positive
  ("Airport Lounges" is a grey generic link, as intended).
- Van Gogh expanded row:
  Museum Directions: blue, no icon.
  Museum Info: grey, no icon.
  Uber: black, no icon.
- No horizontal overflow.
- No console warnings or errors.

Attractions page:
- Audited attraction action buttons across all five cities with all details expanded.
- Bad icon count: 0.
- Bad color/style count: 0.
- First visible row:
  Menu: grey, no icon.
  Directions: blue, no icon.
  Uber: black, no icon.
- No horizontal overflow.
- No console warnings or errors.

Production mobile viewport: 396x695
URL: https://antonreport.com/gelmantravel/

- Plans action audit: Amsterdam page with all details expanded, 12 buttons, 0 bad icons, 0 wrong colors.
- Attractions action audit: 168 buttons, 0 bad icons, 0 bad colors.
- No horizontal overflow on checked pages.
- No console warnings or errors.
```

## Notes

- The app is a static HTML/CSS/JS PWA with no build step.
- The repo root is the Pages deploy directory.
- The Cloudflare Pages project is not Git-connected, so future merges will not auto-deploy unless Git integration is configured.
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for v55.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v55 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=55
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=55
- https://antonreport.com/gelmantravel/app-version.json returns {"version":"55",...}
- Card action buttons are text-only: directions blue, Uber black, and site/menu/ticket/app links grey.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
