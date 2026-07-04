# Gelman Travel Deployment Proof

Last verified: 2026-07-04

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
Latest app commit at deploy: 9f14f5b Compact ticket cards
Cache version: service-worker.js?v=57
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://f5a45c3c.gelman-travel-guide.pages.dev
Public URL: https://antonreport.com/gelmantravel/
Wrangler: 4.107.0
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=57

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=57

curl -s 'https://antonreport.com/gelmantravel/app-version.json' | tr -d '\n '
{"version":"57","publishedAt":"2026-07-04T05:47:00-04:00"}

curl -s 'https://antonreport.com/gelmantravel/manifest.webmanifest?v=57' | rg 'start_url|name|display'
  "name": "Gelman Travel Guide",
  "short_name": "Gelman Guide",
  "start_url": "./?v=57",
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

## v57 Change

- Ticket cards are shorter in collapsed view.
- Collapsed tickets now show only the essential date/time or date/departure metadata.
- Advanced ticket details moved into each expandable popout: arrivals, durations, aircraft, class, booking codes, seats, operators, airport arrival guidance, and plan confirmation details.
- The tap-for-details indicator remains visible but uses less vertical space.
- Service worker, manifest, and app-version are bumped to v57 so installed Home Screen apps refresh.

## v56 Change

- Weather chip now shows today's weather as one larger one-line row with a visible condition icon.
- Rain and storm icons use a blue circular treatment so precipitation is obvious.
- Tomorrow weather remains as a compact secondary line.
- Default app font increased from 15px to 16px.
- Font size controls continue to persist in `localStorage`; reset returns to 16px.
- Service worker, manifest, and app-version are bumped to v56 so installed Home Screen apps refresh.

## v55 Change

- Removed icons from card action buttons in plans and attractions.
- Unified all card action buttons to the same pill style.
- Directions/map actions are blue text-only buttons.
- Uber actions are black text-only buttons.
- Site/menu/tickets/app-info actions are grey text-only buttons.
- Service worker, manifest, and app-version are bumped to v55 so installed Home Screen apps refresh.

## Browser QA

```text
v57 ticket QA:
- Local mobile viewport: 396x695, in-app Browser.
- Amsterdam plans collapsed ticket heights: 184px before deploy.
- Public antonreport.com mobile viewport: 396x695.
- Live Amsterdam plans collapsed ticket heights: 177px, 177px.
- Live ticket summaries show only two metadata fields:
  - Van Gogh: Date Jul 4; Time 10:30 AM.
  - British Airways: Date Jul 6; Depart 14:20.
- Expanded British Airways ticket shows Arrival, Duration, Aircraft, Operated, Class,
  Arrive AMS, From, To, plus Airport Directions, BA App, and Uber actions.
- No horizontal overflow.
- No console warnings or errors.

Local mobile viewport: 396x695, in-app Browser plus clean Chrome context

Weather chip:
- Amsterdam hero shows a condition icon plus today's temp on one row.
- Rain/drizzle state rendered with the obvious umbrella icon.
- Weather chip horizontal overlap with centered logo: 0px.
- Page horizontal overflow: 0px.
- No horizontal overflow.
- No console warnings or errors.

Font controls:
- Clean Chrome context default root font: 16px.
- After tapping A+, root font: 17px and `localStorage.gelmanFont` is "17".
- After reload, root font remains 17px and `localStorage.gelmanFont` remains "17".

Production mobile viewport: 396x695
URL: https://antonreport.com/gelmantravel/

- Weather chip audit: icon present, root font 16px, no logo overlap, no horizontal overflow.
- No console warnings or errors.
```

## Notes

- The app is a static HTML/CSS/JS PWA with no build step.
- The repo root is the Pages deploy directory.
- The Cloudflare Pages project is not Git-connected, so future merges will not auto-deploy unless Git integration is configured.
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for v56.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v57 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=57
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=57
- https://antonreport.com/gelmantravel/app-version.json returns {"version":"57",...}
- Ticket cards are shorter and only show essential metadata while advanced ticket details live in the expandable popout.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
