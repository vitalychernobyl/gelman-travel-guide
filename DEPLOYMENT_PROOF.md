# Gelman Travel Deployment Proof

Last verified: 2026-07-04

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
Latest app commit at deploy: 52e9e5f Fade and move expired tickets
Cache version: service-worker.js?v=60
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main
Deployment URL: https://723ac89b.gelman-travel-guide.pages.dev
Public URL: https://antonreport.com/gelmantravel/
Wrangler: 4.107.0
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=60

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=60

curl -s 'https://antonreport.com/gelmantravel/app-version.json' | tr -d '\n '
{"version":"60","publishedAt":"2026-07-04T07:42:00-04:00"}

curl -s 'https://antonreport.com/gelmantravel/manifest.webmanifest?v=60' | rg 'start_url|name|display'
  "name": "Gelman Travel Guide",
  "short_name": "Gelman Guide",
  "start_url": "./?v=60",
  "display": "standalone",

curl -sI 'https://wttr.in/Amsterdam?u' | sed -n '1,8p'
HTTP/2 200
cache-control: public, max-age=600
content-type: text/plain; charset=utf-8

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

## v60 Change

- Added expiry timestamps to all plan ticket cards.
- Expired tickets are visually faded, marked with `Past trip`, and moved below the
  other plan cards in that city.
- Expiry checks run on load and with the existing once-per-minute ticket countdown loop.
- Service worker, manifest, and app-version are bumped to v60 so installed Home Screen
  apps refresh.

## v59 Change

- Added an Amsterdam Rijksmuseum Guided Tour ticket to the Amsterdam plans page.
- Ticket details include booking reference/voucher barcode `1391714033`, provider
  EuroQuest Travel, Alex Gelman plus 4 adults, and English guide.
- Meeting point is Cobra Café, Hobbemastraat 18, 1071 ZB Amsterdam, Netherlands.
- Timing shows leave hotel at 12:30 PM, meet guide at 12:45 PM, tour start at 1:00 PM,
  120 minute duration, and return to the meeting point.
- Details include the "not your entry ticket" warning and orange-umbrella guide note.
- Directions open the Google Maps app to Cobra Café; Uber deep link pins Cobra Café
  coordinates, and the address is copyable.
- Service worker, manifest, and app-version are bumped to v59 so installed Home Screen
  apps refresh.

## v58 Change

- Weather chip is now a tappable link to a fast text weather page: `https://wttr.in/<city>?u`.
- Tomorrow weather now has its own icon, using the same condition mapping as today's weather.
- The weather chip remains compact with today's temperature on one row and tomorrow's day/temperature on the second row.
- Added explicit weather link queries for Vienna, Amsterdam, London, Washington DC, and Sarasota Florida.
- Service worker, manifest, and app-version are bumped to v58 so installed Home Screen apps refresh.

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
v60 expired-ticket QA:
- Local mobile viewport: 396x695, in-app Browser.
- Amsterdam current-date state: Van Gogh Museum is expired, opacity is 0.46, and it
  renders after Rijksmuseum Guided Tour, British Airways, hotel, and lounge cards.
- Vienna current-date state: Austrian Airlines OS315 is expired, faded, marked as
  `Past trip`, and renders after NH Danube City and SKY Lounge.
- Public antonreport.com mobile viewport: 396x695.
- Live Vienna plans order: NH Danube City, Priority Pass: SKY Lounge,
  Austrian Airlines [expired].
- No horizontal overflow.
- No console warnings or errors.

v59 Rijksmuseum ticket QA:
- Local mobile viewport: 396x695, in-app Browser.
- Amsterdam plans page shows 3 ticket cards: Van Gogh Museum, Rijksmuseum Guided Tour,
  and British Airways BA8454.
- Rijksmuseum ticket is collapsed by default and appears between Van Gogh and BA.
- Collapsed summary shows Jul 5, 1:00 PM, leave by 12:30 PM, and meet guide 12:45 PM.
- Expanded details show booking ref/voucher barcode 1391714033, EuroQuest Travel,
  English guide, Cobra Café meeting point, orange umbrella note, 120 minute duration,
  and end point back at the meeting point.
- Directions link is `comgooglemaps://` with Cobra Café as destination.
- Uber link uses Cobra Café coordinates 52.3589397, 4.8842999.
- Address row has copy-to-clipboard behavior.
- Public antonreport.com mobile viewport: 396x695.
- Live card found, no horizontal overflow, no console warnings or errors.

v58 weather QA:
- Local mobile viewport: 396x695, in-app Browser.
- Amsterdam weather chip renders as an `<a>` tag.
- Weather chip href: https://wttr.in/Amsterdam?u
- Weather chip has 2 icons: today's icon and tomorrow's icon.
- Tomorrow rain/drizzle icon uses the prominent blue rain treatment.
- Local click on the weather chip navigates to https://wttr.in/Amsterdam?u.
- Public antonreport.com mobile viewport: 396x695.
- Live weather chip text: "AMS · Stay Jul 3-6 ☁71/61° ☔Sun 68/64°".
- Live weather chip has no logo overlap and no horizontal overflow.
- No console warnings or errors.

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
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for v60.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v60 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=60
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=60
- https://antonreport.com/gelmantravel/app-version.json returns {"version":"60",...}
- Expired plan tickets fade out, show `Past trip`, and move below the active plan cards.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
