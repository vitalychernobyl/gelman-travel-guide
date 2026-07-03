# Gelman Travel Deployment Proof

Last verified: 2026-07-03

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
App feature commit: 930bbda Add Uber and copyable location actions
Cache version: service-worker.js?v=44
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://93e860fd.gelman-travel-guide.pages.dev
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=44

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=44

curl -s https://antonreport.com/gelmantravel/manifest.webmanifest?v=44
start_url: ./?v=44

Production browser check:
- Amsterdam hotel card has a Google Maps driving URL.
- Amsterdam hotel card has an Uber deep link.
- Clicking the Amsterdam hotel address shows Copied.
- Amsterdam Attractions page renders 50 attraction cards, 50 Uber buttons, and 50 Google Maps icon buttons.
```

## Notes

- The app is a static HTML/CSS/JS PWA with no build step.
- The repo root is the Pages deploy directory.
- The Cloudflare Pages project is not Git-connected, so future merges will not auto-deploy unless Git integration is configured.
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for the v44 deploy.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

Important: code is already merged to main at 930bbda or later. The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide. Do not change code unless explicitly asked.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v44 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=44
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=44
- https://antonreport.com/gelmantravel/manifest.webmanifest?v=44 has start_url ./?v=44
- Production browser check confirmed hotel Maps/Uber/copy behavior and attraction Maps/Uber buttons.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
