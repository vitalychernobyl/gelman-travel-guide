# Gelman Travel Deployment Proof

Last verified: 2026-07-03

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
App feature commit: 023fe15 Feature Amsterdam picks and weather
Cache version: service-worker.js?v=45
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://04b3bdaa.gelman-travel-guide.pages.dev
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=45

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=45

curl -s https://antonreport.com/gelmantravel/manifest.webmanifest?v=45
start_url: ./?v=45

Production browser check:
- Top-left weather chip appears and updates from Open-Meteo when online.
- Amsterdam Attractions has a "Recommended first" featured section.
- Featured order: Café Luce, Albert Cuyp Fish Market, Van Gogh Museum, Amsterdam City Center & Centraal, Vondelpark, Blue Boat Canal Cruise, Flagship Anne Frank Canal Tour.
- Amsterdam Attractions page renders 55 attraction cards, 55 Uber buttons, and 55 Google Maps icon buttons.
```

## Notes

- The app is a static HTML/CSS/JS PWA with no build step.
- The repo root is the Pages deploy directory.
- The Cloudflare Pages project is not Git-connected, so future merges will not auto-deploy unless Git integration is configured.
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for the v45 deploy.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

Important: code is already merged to main at 023fe15 or later. The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide. Do not change code unless explicitly asked.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v45 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=45
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=45
- https://antonreport.com/gelmantravel/manifest.webmanifest?v=45 has start_url ./?v=45
- Production browser check confirmed the Amsterdam weather chip, featured recommendations, 55 attraction cards, 55 Uber buttons, and 55 Google Maps icon buttons.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
