# Gelman Travel — Agent Handoff

This file is the working handoff between the repo-side agent (Claude Code, works on GitHub
`vitalychernobyl/gelman-travel-guide`) and the locally-authenticated agent (deploys to
Cloudflare from the owner's machine). Update the "Current state" section whenever either
side finishes a step. `DEPLOYMENT_PROOF.md` remains the source of truth for the *last
verified deploy*; this file tracks *what needs to happen next*.

## Current state (update me)

```text
main:            v66 deployed; app deploy commit is in DEPLOYMENT_PROOF.md
live:            v66 (antonreport.com/gelmantravel + gelman-travel-guide.pages.dev)
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

## What v66 changed (context for reviewers)

- Added a visible, copyable `Address` row inside every attraction detail card.
- Attraction cards and attraction map popups now share one destination helper, so the
  visible address, Google Maps app link, Google web fallback, and Uber link remain in
  sync.
- Google Maps app links use `saddr=Current Location`; web fallbacks include
  `origin=Current Location`; Uber links use `pickup=my_location` and the same visible
  destination as `dropoff[formatted_address]`.
- Local source audit checked 87 attraction cards across all five cities with zero
  origin/destination mismatches.
- Local mobile browser QA verified visible copyable address rows, matching Google/Uber
  destinations, and a working `Copied` toast.
- Cafe Luce remains a formatted Amsterdam destination search because no reliable
  Amsterdam coordinate/listing was found; it is intentionally not pinned to an unrelated
  coordinate.
- Bumped service worker, manifest, and app-version to v66.

## What v65 changed (context for reviewers)

- Added city-level plan expiry timestamps so hotel and lounge passes can age out when a
  city stay ends.
- Expired hotel cards and lounge passes now fade, show a `Past stay` badge, and sort
  below active plan cards.
- Vienna's NH Danube City hotel pass and Priority Pass SKY Lounge pass now appear as
  expired after the Jul 3 Vienna city leg.
- Amsterdam hotel and lounge cards remain active on Jul 5; older Amsterdam activity
  tickets remain expired and sorted behind active plans.
- Bumped service worker, manifest, and app-version to v65.

## What v64 changed (context for reviewers)

- Fixed attraction map popups.
- Popup location/title opens the matching attraction details card, switches back to list
  view, opens the card, and updates the URL hash.
- Popup `Directions` uses the same Google Maps app deep link plus web fallback pattern
  as the rest of the app.
- Popup `Uber` uses the same Uber destination deep link pattern as attraction cards.
- Bumped service worker, manifest, and app-version to v64.

## What v63 changed (context for reviewers)

- Fixed the attractions `All` filter.
- Root cause: `All` was rendered as a filter chip but was not included in the valid
  filter set, so Amsterdam replaced it with the default `Top10` filter.
- Amsterdam Attractions now starts at `Top10` with 10 cards; clicking `All` selects
  the `All` chip and shows 59 cards.
- Bumped service worker, manifest, and app-version to v63.

## What v62 changed (context for reviewers)

- Added Frens Haringhandel as the top Amsterdam Fish recommendation.
- Frens appears first when filtering Amsterdam attractions by `Fish`.
- Card includes official site link, Google Maps app directions, Uber destination
  coordinates, daily 11:00 AM-5:00 PM hours, and local image
  `attractions/amsterdam-frens-haringhandel.jpg`.
- Bumped service worker, manifest, and app-version to v62.

## What v61 changed (context for reviewers)

- Added an Amsterdam `Top 10` attractions filter and made it the default Amsterdam
  attractions landing state.
- Top 10 order is Rijksmuseum, Van Gogh Museum, Anne Frank House, Royal Palace Amsterdam,
  Stedelijk Museum, Rembrandt House Museum, NEMO Science Museum, National Maritime
  Museum, Oude Kerk, and Moco Museum.
- Added Royal Palace Amsterdam and Oude Kerk cards with local JPEG images, official
  links, map links, Uber support, and coordinates.
- Top 10 cards are marked `Recommended` while still preserving normal Museum/Landmark
  categories for the other filters.
- Bumped service worker, manifest, and app-version to v61.

## What v60 changed (context for reviewers)

- Added expiry timestamps to all plan tickets.
- Expired tickets fade out, show `Past trip`, and move below hotel/lounge/active plan
  cards within the same city.
- Expiry refreshes on load and on the existing minute-based countdown interval.
- Bumped service worker, manifest, and app-version to v60.

## What v59 changed (context for reviewers)

- Added the Amsterdam Rijksmuseum Guided Tour as a plan ticket between Van Gogh and BA.
- Ticket includes booking reference/voucher barcode `1391714033`, EuroQuest Travel,
  4 adults, English guide, and the "not your entry ticket" warning.
- Cobra Café is the meeting point, with leave-by 12:30 PM, meet-guide 12:45 PM,
  1:00 PM start, 120 minute duration, and orange-umbrella guide note.
- Directions open Google Maps to Cobra Café; Uber deep link pins Cobra Café coordinates.
- Bumped service worker, manifest, and app-version to v59.

## What v58 changed (context for reviewers)

- Weather chip is now a tappable link to fast text forecast pages on `wttr.in`.
- Tomorrow weather now has its own condition icon.
- Weather chip remains compact: today on the first weather row, tomorrow on the second.
- Bumped service worker, manifest, and app-version to v58.

## What v57 changed (context for reviewers)

- Ticket cards are shorter in collapsed view.
- Collapsed tickets now show only essential date/time or date/departure metadata.
- Advanced ticket details moved into expandable popouts: arrivals, durations, aircraft,
  class, booking codes, seats, operators, airport arrival guidance, and plan confirmation
  details.
- Bumped service worker, manifest, and app-version to v57.

## What v56 changed (context for reviewers)

- Weather chip shows today's weather as a larger one-line icon + temperature row.
- Rain/drizzle uses a prominent umbrella icon in a blue circular treatment.
- Default app font increased to 16px.
- Font size choices remain persisted in localStorage; reset returns to 16px.
- Bumped service worker, manifest, and app-version to v56.

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
