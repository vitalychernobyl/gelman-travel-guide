# Gelman Travel Deployment Proof

Last verified: 2026-07-03

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
App feature commit: 9ef075f Add Uber deep links to travel cards
Cache version: service-worker.js?v=52
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://73f5c4ea.gelman-travel-guide.pages.dev
Public URL: https://antonreport.com/gelmantravel/
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=52

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=52

curl -s 'https://antonreport.com/gelmantravel/app-version.json' | tr -d '\n '
{"version":"52","publishedAt":"2026-07-03T00:00:00-04:00"}

curl -s 'https://antonreport.com/gelmantravel/manifest.webmanifest?v=52' | rg 'start_url|name|display'
  "name": "Gelman Travel Guide",
  "short_name": "Gelman Guide",
  "start_url": "./?v=52",
  "display": "standalone",

curl -s 'https://antonreport.com/gelmantravel/?city=amsterdam&page=plans' | rg -o 'uber-button|PLAN_FALLBACK_DESTINATIONS|service-worker.js\?v=52' | sort -u
PLAN_FALLBACK_DESTINATIONS
service-worker.js?v=52
uber-button

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
- Production render check had no console warnings or errors.
- v52 local attraction audit checked Vienna, Amsterdam, London, Washington, and Sarasota: 84/84 rendered attraction cards had Uber links with `pickup=my_location` and non-empty `dropoff[formatted_address]`.
- v52 production attraction audit checked Amsterdam: 56/56 attraction cards had Uber links with `pickup=my_location` and non-empty `dropoff[formatted_address]`.
- Visible attraction action rows keep Uber rightmost, right-aligned, and wider than the map button.

Previous local forced-update simulation:

- A local test server intentionally returned `app-version.json` version `50` while the app bundle was `49`.
- The app forced a refresh to a cache-busted URL ending in `appv=50&fresh=...`.
- The service-worker `controllerchange` race was verified fixed: the URL stayed on the newer detected version instead of being overwritten back to bundled v49.

URL: https://antonreport.com/gelmantravel/?city=amsterdam&page=plans

- Install banner text: Gelman Travel app / Add this guide to your Home Screen. / Add app
- Old install popup is absent.
- Van Gogh Museum timed admission plan is present before the BA8454 flight card.
- Van Gogh plan appears above BA8454, expands, and shows Jul 4, 10:30 AM, 4 adult audio-guide tickets, confirmation number, PIN, total €123, Museumplein 6 address, voucher instructions, leave-by 10:05 AM, arrive-by 10:15 AM, and an 8-10 minute hotel walk estimate.
- Van Gogh plan actions: Museum Directions and Museum Info.
- Van Gogh Museum Directions uses Google Maps directions with `dir_action=navigate`.
- Booking email and phone number are not present in the rendered app.
- Amsterdam hotel id: hotel-amsterdam-avani-museum-quarter-amsterdam-hotel
- Amsterdam hotel has overlay share button.
- Hotel action order: Directions, Hotel Site, Uber.
- Google Maps action uses SVG navigation icon.
- Uber is last and expands to the remaining row width.
- Collapsed hotel preview shows only: Hobbemakade 50, 1071 XL Amsterdam
- v52 production plans audit: 5/5 ticket cards, 5/5 hotel cards, and 5/5 lounge cards had Uber links with `pickup=my_location` and non-empty `dropoff[formatted_address]`.
- BA8454 Uber dropoff is Amsterdam Airport Schiphol; Avani hotel Uber dropoff is Avani Museum Quarter Amsterdam Hotel, Hobbemakade 50, 1071 XL Amsterdam.
- Visible ticket and hotel action rows keep Uber rightmost, right-aligned, and wider than the map button.
```

## Notes

- The app is a static HTML/CSS/JS PWA with no build step.
- The repo root is the Pages deploy directory.
- The Cloudflare Pages project is not Git-connected, so future merges will not auto-deploy unless Git integration is configured.
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for the v52 deploy.
- iOS does not allow a website to silently install itself to the Home Screen. The banner uses the browser install prompt where supported and otherwise shows the Safari path: Share -> Add to Home Screen.
- Top Share now uses the default browser/Apple share sheet through `navigator.share`; it no longer attempts to open a Messages recipient group.
- The PWA now checks `app-version.json` on load, pageshow, visibility return, online, and every 5 minutes. If the published version is newer than the currently loaded bundle, it clears Gelman app caches, unregisters stale service workers, and reloads once with `appv=<version>&fresh=<timestamp>`.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

Important: code is already pushed to main at 9ef075f or later. The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v52 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=52
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=52
- https://antonreport.com/gelmantravel/app-version.json returns {"version":"52",...}
- https://antonreport.com/gelmantravel/manifest.webmanifest?v=52 has start_url ./?v=52
- https://antonreport.com/gelmantravel/?city=amsterdam&page=plans contains runtime Uber support code and public production browser QA found 15/15 plan cards with destination-filled Uber links
- https://antonreport.com/gelmantravel/attractions/amsterdam-loetje-cafe.jpg?v=1 returns HTTP 200 image/jpeg

v52 changes:
- Added direct Uber deep links to plan ticket cards, hotel cards, lounge cards, and attraction cards.
- Uber links use `https://m.uber.com/ul/` with `pickup=my_location` and a populated `dropoff[formatted_address]`.
- Ticket and location action rows now keep Uber as the rightmost button and let it expand into the remaining row width.
- Bumped service worker, manifest, and app-version to v52 so installed devices force-refresh from v51.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
