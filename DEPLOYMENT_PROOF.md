# Gelman Travel Deployment Proof

Last verified: 2026-07-03

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
Latest app feature commit: a5ce7d5 Use native Google Maps app links
Cache version: service-worker.js?v=53
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://8eacbc23.gelman-travel-guide.pages.dev
Public URL: https://antonreport.com/gelmantravel/
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=53

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=53

curl -s 'https://antonreport.com/gelmantravel/app-version.json' | tr -d '\n '
{"version":"53","publishedAt":"2026-07-03T00:00:00-04:00"}

curl -s 'https://antonreport.com/gelmantravel/manifest.webmanifest?v=53' | rg 'start_url|name|display'
  "name": "Gelman Travel Guide",
  "short_name": "Gelman Guide",
  "start_url": "./?v=53",
  "display": "standalone",

curl -s 'https://antonreport.com/gelmantravel/?city=amsterdam&page=plans&qa=v53-curl' | rg -o 'service-worker.js\?v=53|comgooglemaps://|data-maps-app-href|googleMapsDirections' | sort -u
comgooglemaps://
data-maps-app-href
googleMapsDirections
service-worker.js?v=53
```

## v53 Change

- Google Maps buttons now use the native Google Maps iOS URL scheme: `comgooglemaps://`.
- Map links include `saddr=Current Location`, `daddr=<destination>`, and `directionsmode=<mode>`.
- Map links no longer use `target="_blank"`, so taps do not intentionally open a browser tab.
- Each map button keeps a `data-web-map-url` as metadata/fallback reference, but the primary click target is the Google Maps app URL.
- The click handler intercepts `.map-action` taps and assigns `window.location.href` to the native app URL.
- Service worker, manifest, and app-version were bumped to v53 so installed Home Screen apps force-refresh.

## Browser QA

```text
Local mobile viewport: 396x695
URL: http://127.0.0.1:4173/?city=amsterdam&page=plans&qa=v53-local

- Plans map buttons audited: 12
- Bad plans map buttons: 0
- Every rendered plans map button had:
  - href starting with comgooglemaps://
  - data-maps-app-href starting with comgooglemaps://
  - data-web-map-url starting with https://www.google.com/maps/dir/
  - non-empty destination metadata
  - no target attribute
- No horizontal overflow.
- No console warnings or errors.

Local attractions by city:

- Vienna: 20/20 attraction map buttons passed.
- Amsterdam: 56/56 attraction map buttons passed.
- London: 4/4 attraction map buttons passed.
- Washington: 2/2 attraction map buttons passed.
- Sarasota: 2/2 attraction map buttons passed.
- No horizontal overflow in any checked city.
- No console warnings or errors.

Production mobile viewport: 396x695
URL: https://antonreport.com/gelmantravel/?city=amsterdam&page=plans&qa=v53-prod&appv=53

- Plans map buttons audited: 12
- Bad plans map buttons: 0
- Sample BA/Amsterdam airport destination:
  comgooglemaps://?saddr=Current+Location&daddr=Amsterdam+Airport+Schiphol%2C+Amsterdam%2C+Netherlands&directionsmode=driving
- Van Gogh plan preserved walking mode:
  comgooglemaps://?saddr=Current+Location&daddr=Van+Gogh+Museum%2C+Museumplein+6%2C+1071+DJ+Amsterdam&directionsmode=walking
- No horizontal overflow.
- No console warnings or errors.

Production mobile viewport: 396x695
URL: https://antonreport.com/gelmantravel/?city=amsterdam&page=photos&qa=v53-prod&appv=53

- Amsterdam attraction cards: 56
- Amsterdam attraction map buttons audited: 56
- Bad attraction map buttons: 0
- First attraction map URL:
  comgooglemaps://?saddr=Current+Location&daddr=Cafe+Luce+Amsterdam&directionsmode=driving
- No horizontal overflow.
- No console warnings or errors.
```

## Notes

- The app is a static HTML/CSS/JS PWA with no build step.
- The repo root is the Pages deploy directory.
- The Cloudflare Pages project is not Git-connected, so future merges will not auto-deploy unless Git integration is configured.
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for v53.
- Browser `domSnapshot()` still fails in this app/browser runtime with `TypeError: o.incrementalAriaSnapshot is not a function`; QA used targeted DOM evaluation, screenshots, URL checks, console-log checks, and rendered mobile viewport checks instead.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v53 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=53
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=53
- https://antonreport.com/gelmantravel/app-version.json returns {"version":"53",...}
- https://antonreport.com/gelmantravel/manifest.webmanifest?v=53 has start_url ./?v=53
- https://antonreport.com/gelmantravel/?city=amsterdam&page=plans contains native Google Maps support code and rendered production QA found 12/12 plan map buttons using comgooglemaps:// links with no _blank browser target.
- https://antonreport.com/gelmantravel/?city=amsterdam&page=photos rendered 56/56 Amsterdam attraction map buttons using comgooglemaps:// links with no _blank browser target.

v53 changes:
- Google Maps buttons now open through the native Google Maps URL scheme, not ordinary browser links.
- Map buttons use comgooglemaps:// with saddr=Current Location, daddr=<destination>, and directionsmode=<mode>.
- Each map button keeps data-web-map-url only as metadata/fallback reference.
- Bumped service worker, manifest, and app-version to v53 so installed devices force-refresh from v52.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
