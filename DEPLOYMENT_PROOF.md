# Gelman Travel Deployment Proof

Last verified: 2026-07-03

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
Latest commit: 12a7cd3 Merge pull request #1 from vitalychernobyl/claude/gelman-travel-cache-refresh-ef24oa
Cache version: service-worker.js?v=43
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://4846e138.gelman-travel-guide.pages.dev
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=43

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=43

curl -sI https://antonreport.com/gelmantravel/london-stay-house.webp
HTTP/2 200
content-type: image/webp
```

## Notes

- The app is a static HTML/CSS/JS PWA with no build step.
- The repo root is the Pages deploy directory.
- The Cloudflare Pages project is not Git-connected, so future merges will not auto-deploy unless Git integration is configured.
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for the v43 deploy.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

Important: code is already merged to main at 12a7cd3 or later. The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide. Do not change code unless explicitly asked.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v43 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=43
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=43
- https://antonreport.com/gelmantravel/london-stay-house.webp returns HTTP 200 with content-type image/webp

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
