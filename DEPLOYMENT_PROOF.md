# Gelman Travel Deployment Proof

Last verified: 2026-07-03

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
Latest main commit at deploy: 60ab595 Merge pull request #3 from vitalychernobyl/claude/gelman-travel-cache-refresh-ef24oa
Cache version: service-worker.js?v=54
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://0eb53d28.gelman-travel-guide.pages.dev
Public URL: https://antonreport.com/gelmantravel/
Wrangler: 4.107.0
```

## Live Verification

```text
git checkout main && git pull origin main
Already on 'main'
Already up to date.

git log --oneline -1
60ab595 Merge pull request #3 from vitalychernobyl/claude/gelman-travel-cache-refresh-ef24oa

grep -o 'service-worker.js?v=[0-9]*' index.html | head -1
service-worker.js?v=54

curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=54

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=54

curl -s 'https://antonreport.com/gelmantravel/app-version.json' | tr -d '\n '
{"version":"54","publishedAt":"2026-07-03T18:00:00-04:00"}

curl -s 'https://antonreport.com/gelmantravel/?city=amsterdam&page=plans&qa=handoff-v54' | rg -o 'service-worker.js\?v=54|comgooglemaps://|data-web-map-url|dropoff\[latitude\]' | sort -u
comgooglemaps://
data-web-map-url
dropoff[latitude]
service-worker.js?v=54
```

## v54 Change

- Uber destination deep links include coordinates through `dropoff[latitude]` and `dropoff[longitude]`, preventing blank Uber destinations.
- A `DESTINATION_COORDS` table pins known destinations across all five cities.
- Google Maps buttons open `comgooglemaps://` first, with a `maps.google.com` web fallback if the app does not open.
- Service worker, manifest, and app-version are bumped to v54 so installed Home Screen apps refresh.

## Notes

- The app is a static HTML/CSS/JS PWA with no build step.
- The repo root is the Pages deploy directory.
- The Cloudflare Pages project is not Git-connected, so future merges will not auto-deploy unless Git integration is configured.
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for v54.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v54 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=54
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=54
- https://antonreport.com/gelmantravel/app-version.json returns {"version":"54",...}
- https://antonreport.com/gelmantravel/?city=amsterdam&page=plans contains comgooglemaps://, Google Maps web fallback metadata, and Uber coordinate destination fields.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
