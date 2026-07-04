# Gelman Travel — Agent Handoff

This file is the working handoff between the repo-side agent (Claude Code, works on GitHub
`vitalychernobyl/gelman-travel-guide`) and the locally-authenticated agent (deploys to
Cloudflare from the owner's machine). Update the "Current state" section whenever either
side finishes a step. `DEPLOYMENT_PROOF.md` remains the source of truth for the *last
verified deploy*; this file tracks *what needs to happen next*.

## Current state (update me)

```text
main:            v55 deployed; app deploy commit is in DEPLOYMENT_PROOF.md
live:            v55 (antonreport.com/gelmantravel + gelman-travel-guide.pages.dev)
pending action:  none
```

## Standing facts

- Static HTML/CSS/JS PWA, **no build step**; the repo root is the deploy directory.
- Cloudflare Pages project: `gelman-travel-guide`. **Git Provider: No** — merges to main
  do NOT auto-deploy; every release is a manual `wrangler pages deploy`.
- A Cloudflare Worker proxies `antonreport.com/gelmantravel*` to the Pages origin.
  Do not touch the Worker (`wrangler.gelmantravel.jsonc`, `cloudflare/gelmantravel-worker.js`)
  unless explicitly asked.
- Version discipline: each release bumps `APP_VERSION` (index.html + service-worker.js),
  the `?v=` query strings (manifest link, SW registration, manifest start_url, SW FILES
  list), and `app-version.json`. The service worker self-updates clients on relaunch.

## Deploy task for the local agent (future release)

```text
You are working with repo vitalychernobyl/gelman-travel-guide on the owner's machine
(Cloudflare-authenticated). Use this only after a future code change has been merged.

1. git checkout main && git pull origin main
   Confirm: grep -o 'service-worker.js?v=[0-9]*' index.html prints the new release version.
2. npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
3. Verify (may take a minute):
   curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*'
   curl -s https://antonreport.com/gelmantravel/  | grep -o 'service-worker.js?v=[0-9]*'
4. Update DEPLOYMENT_PROOF.md (repository state, deployment URL, live verification
   output) and the "Current state" block in HANDOFF.md, then commit and push both
   to main with the release version in the commit message.
```

## What v55 changed (context for reviewers)

- Removed icons from all card action buttons in plans and attractions.
- Unified card actions: directions/map links are blue, Uber links are black, and
  site/menu/ticket/app/info links are grey.
- Rebased onto the attraction image, sort control, and Leaflet map-view work from PR #4,
  then redeployed v55 manually.

## What v54 changed (context for reviewers)

- **Uber buttons fixed**: Uber's `setPickup` deep link needs `dropoff[latitude]` /
  `dropoff[longitude]` — address text alone leaves the destination blank. Added a
  `DESTINATION_COORDS` table in index.html (97 destinations, all five cities, geocoded
  via OpenStreetMap, airports pinned at terminals). `uberDeepLink()` now emits
  coordinates; "Café Luce" is intentionally unpinned (location unconfirmed).
- **Google Maps fallback**: map buttons open `comgooglemaps://` (app) and, if the page
  is still visible after 1.6s, fall back to the `maps.google.com` directions web URL.

## Conventions for future handoffs

- Repo-side agent: develop on a `claude/*` branch, merge to main via PR, then update
  the "Current state" block here with the pending deploy and stop.
- Local agent: deploy, verify both origins, refresh DEPLOYMENT_PROOF.md + this file.
- Neither agent edits app code and deploys in the same step without the owner asking.
