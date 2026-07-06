# Gelman Travel Deployment Proof

Last verified: 2026-07-05

## Repository State

```text
Repository: vitalychernobyl/gelman-travel-guide
Branch: main
Latest app commit at deploy: d5b1df8 Fade completed Amsterdam trip
Cache version: service-worker.js?v=71
```

## Cloudflare Pages

```text
Project: gelman-travel-guide
Production origin: https://gelman-travel-guide.pages.dev/
Git Provider: No
Manual deploy command used:
npx wrangler pages deploy . --project-name gelman-travel-guide
Deployment URL: https://6cec37c6.gelman-travel-guide.pages.dev
Public URL: https://antonreport.com/gelmantravel/
Wrangler: 4.107.0
```

## Live Verification

```text
curl -s https://gelman-travel-guide.pages.dev/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=71

curl -s https://antonreport.com/gelmantravel/ | grep -o 'service-worker.js?v=[0-9]*' | head -1
service-worker.js?v=71

curl -s 'https://antonreport.com/gelmantravel/app-version.json' | tr -d '\n '
{"version":"71","publishedAt":"2026-07-06T10:26:45-04:00"}

curl -s 'https://antonreport.com/gelmantravel/?city=amsterdam&page=plans&today=2026-07-06&qa=v71-live' | rg 'APP_VERSION = "71"|manifest.webmanifest\?v=71|service-worker.js\?v=71|data-city="amsterdam" data-city-expires-at="2026-07-06T00:00:00\+02:00" data-city-completed="true"|COMPLETED_CITIES = new Set\(\["amsterdam"\]\)|statusLabel: "Done"'
  <link rel="manifest" href="manifest.webmanifest?v=71">
      <section class="city-plan" data-city="amsterdam" data-city-expires-at="2026-07-06T00:00:00+02:00" data-city-completed="true">
      const APP_VERSION = "71";
        amsterdam: { stayLabel: "Jul 3-6", statusLabel: "Done", flightDate: "2026-07-06", leaveAt: "2026-07-06T11:05:00" },
      const COMPLETED_CITIES = new Set(["amsterdam"]);
        navigator.serviceWorker.register("service-worker.js?v=71", { updateViaCache: "none" }).then(registration => {

curl -sI 'https://antonreport.com/gelmantravel/' | sed -n '1,12p'
HTTP/2 200
content-type: text/html; charset=utf-8
cache-control: public, max-age=0, must-revalidate
x-robots-tag: noindex, nofollow, noarchive, noimageindex

curl -s 'https://antonreport.com/gelmantravel/manifest.webmanifest?v=71' | rg 'start_url|name|display'
  "name": "Gelman Travel Guide",
  "short_name": "Gelman Guide",
  "start_url": "./?v=71",
  "display": "standalone",

curl -sI 'https://antonreport.com/gelmantravel/service-worker.js?v=71' | sed -n '1,4p'
HTTP/2 200
content-type: application/javascript

curl -sI 'https://antonreport.com/gelmantravel/manifest.webmanifest?v=71' | sed -n '1,4p'
HTTP/2 200
content-type: application/manifest+json

Local rendered fallback QA:
npx playwright screenshot --viewport-size=396,695 'http://127.0.0.1:4173/?city=amsterdam&page=plans&today=2026-07-06&qa=v71b' /tmp/gelman-amsterdam-plans-v71b.png
npx playwright screenshot --viewport-size=396,695 'http://127.0.0.1:4173/?city=amsterdam&page=photos&today=2026-07-06&qa=v71b' /tmp/gelman-amsterdam-attractions-v71b.png
Fallback Playwright assertions: 2 passed.
Plans assertion: 3 Amsterdam tickets expired, 1 hotel expired, 1 lounge expired.
Attractions assertion: 10 visible Amsterdam attraction cards, all `is-done`, all done buttons disabled.

Live link audit:
{"liveUrl":"https://antonreport.com/gelmantravel/","attractionCards":87,"destinationProblems":0,"currentLocationOccurrences":0}

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

curl -sI 'https://antonreport.com/gelmantravel/attractions/amsterdam-frens-haringhandel.jpg?v=1' | sed -n '1,4p'
HTTP/2 200
content-type: image/jpeg

curl -sI 'https://antonreport.com/gelmantravel/attractions/amsterdam-royal-palace.jpg?v=1' | sed -n '1,4p'
HTTP/2 200
content-type: image/jpeg

curl -sI 'https://antonreport.com/gelmantravel/attractions/amsterdam-oude-kerk.jpg?v=1' | sed -n '1,4p'
HTTP/2 200
content-type: image/jpeg

curl -sI 'https://antonreport.com/gelmantravel/london-stay-house.webp' | sed -n '1,4p'
HTTP/2 200
content-type: image/webp

curl -sI 'https://antonreport.com/gelmantravel/nh-danube-hotel.png?v=1' | sed -n '1,4p'
HTTP/2 200
content-type: image/png

curl -sI 'https://antonreport.com/gelmantravel/priority-pass-sky-lounge.png?v=1' | sed -n '1,4p'
HTTP/2 200
content-type: image/png
```

## v71 Change

- Marked Amsterdam as completed.
- Amsterdam plan cards expire immediately and render faded with past-trip/past-stay
  styling.
- Amsterdam attractions default to `Done`, render faded, and show disabled `Done`
  buttons unless a user has explicitly removed a card locally.
- Amsterdam hero status reads `AMS · Done Jul 3-6`.
- Local mobile screenshot checks verified plans and attractions at 396×695.
- Fallback Playwright assertions verified 3 expired Amsterdam tickets, 1 expired hotel,
  1 expired lounge, and 10 visible Amsterdam attraction cards all in the done state.

## v70 Change

- Added a safe boarding-pass selector to the British Airways BA8454 Amsterdam to London
  flight details.
- Passenger selectors show Alex 13D, Anton 13C, Ellaine 13B, and Slava 13A with Group 5
  in the expanded ticket card.
- No scannable QR code, PDF boarding pass, booking reference, ticket number, or sequence
  number is stored in the public app.
- The preview panel explicitly tells users to use the British Airways app or a private
  file link for the real boarding pass at the airport.
- Live mobile browser QA verified the ticket opens, selecting Ellaine updates the pass
  preview, no PDF/QR references are present, and no console errors or warnings appeared.

## v69 Change

- Attraction cards now render collapsed by default.
- Removed the previous `index === 0 ? " open" : ""` behavior that opened the first
  rendered attraction automatically.
- Intentional opens still work: tapping a card opens it, hash links can open a specific
  shared card, and map popup detail links still call the explicit open path.
- Local mobile browser QA at 396x695 verified Amsterdam attractions load with 10 cards
  and `openCount: 0`, tapping Rijksmuseum opens only that card, and reloading returns
  to `openCount: 0`.
- Bumped service worker, manifest, and app-version to v69.

## v68 Change

- Added per-device attraction state saved in `localStorage.gelmanAttractionStates`.
- Every attraction card now has `Seen` and `X` controls.
- Marking an attraction seen fades it out, adds a `Seen` tag, changes the control to
  `Undo`, and sorts the card below active attractions.
- Removing an attraction hides it from the default visible list, adds a removed state,
  and makes it available in the `Removed` filter with a `Restore` control.
- Added attraction status filters: `Visible`, `To do`, `Done`, `Removed`, and `All`.
- Browser QA at 396x695 verified Amsterdam attraction interactions: Rijksmuseum moved
  to the bottom and faded after `Seen`, the `Done` filter showed only that card, Van
  Gogh hid from `Visible` after `X`, the `Removed` filter showed it with `Restore`, and
  `All` showed active plus done cards.
- Browser console QA showed no errors or warnings. The browser runtime's accessibility
  snapshot API failed internally, so verification used DOM evaluation plus screenshots.
- Bumped service worker, manifest, and app-version to v68.

## v67 Change

- Fixed Google Maps directions origin handling.
- Root cause: v66 passed literal `Current Location` as `origin`/`saddr`, which Google Maps
  can geocode as a place instead of using the device's current GPS location.
- Google Maps web fallback URLs now omit the `origin` parameter, following Google's
  guidance for directions from the user's current location.
- Google Maps iOS app URLs now use blank `saddr=` instead of `saddr=Current Location`,
  following Google's iOS URL scheme guidance that a blank starting address uses the
  user's current location.
- Local rendered QA at 396x695 verified 23 plan-page Google Maps buttons: all app links
  had `saddr=""`, all web fallbacks had no `origin`, and all destinations still matched.
- Local interaction QA opened the Amsterdam hotel card and verified its displayed
  Directions link uses blank `saddr` and no web `origin`.
- Live audit checked 87 attraction cards with zero destination mismatches and zero
  remaining `Current Location` string occurrences.

## v66 Change

- Added a visible `Address` row to every attraction detail card.
- The visible attraction address is copyable via the existing tap/click copy interaction
  and shows the `Copied` toast.
- Attraction list cards and attraction map popups now use the same destination helper,
  so Google Maps, Google web fallback, Uber, and the visible address stay aligned.
- Google Maps app links use `saddr=Current Location`; Google web fallbacks include
  `origin=Current Location`; Uber links use `pickup=my_location` and pass the same
  visible destination as `dropoff[formatted_address]`.
- Local source audit checked 87 attraction cards across Vienna, Amsterdam, London,
  Washington, and Sarasota with zero origin/destination mismatches.
- Local mobile browser QA verified all rendered attraction cards expose a visible
  copyable address, matching Google/Uber destinations, no console errors, and a working
  copy interaction.
- Caveat: Cafe Luce remains a formatted Amsterdam destination search because no reliable
  Amsterdam coordinate/listing was found; it is intentionally not pinned to an unrelated
  or fake coordinate.

## v65 Change

- Added city-level plan expiry timestamps.
- Expired hotel cards and lounge passes now receive the same past-plan treatment as
  expired tickets: they fade, get a `Past stay` badge, and sort below active plan cards.
- Vienna's NH Danube City hotel pass and Priority Pass SKY Lounge pass now expire after
  the Vienna stay/city leg ends on Jul 3, 2026.
- Amsterdam hotel and lounge cards remain active on Jul 5 while older Amsterdam activity
  tickets stay faded and sorted behind active plans.
- Local browser QA at 396x695 verified Vienna hotel/lounge cards have `plan-expired`,
  `data-expired="true"`, opacity `.48`, and no console warnings/errors; clicking Amsterdam
  confirmed current hotel/lounge cards remain active.

## v64 Change

- Fixed attraction map popups.
- Popup location/title is now clickable and opens the matching attraction details card
  in the app, switches back to list view, opens the card, and updates the URL hash.
- Popup `Directions` now uses the same Google Maps app deep link path as the rest of
  the app, with a web Maps fallback stored in `data-web-map-url`.
- Popup `Uber` uses the same Uber destination deep link pattern as attraction cards.
- Local and production browser QA: Amsterdam Fish Map showed 13 markers; clicking an
  attraction marker opened a popup with direct `comgooglemaps://` and Uber links; clicking
  the popup title opened the matching detail card with no broken images, no horizontal
  overflow, and no console warnings or errors.

## v63 Change

- Fixed the attractions `All` filter.
- Root cause: the UI rendered `All` as a chip, but active-filter validation only accepted
  values from the city-specific `filters` list. For Amsterdam, clicking `All` was rejected
  and replaced by the default `Top10` filter.
- `All` is now treated as a valid filter value alongside the city filters.
- Service worker, manifest, and app-version are bumped to v63 so installed Home Screen
  apps refresh.
- Local and production browser QA: Amsterdam Attractions starts at `Top10` with 10 cards;
  clicking `All` selects the `All` chip and shows 59 cards, with no broken attraction
  images, no horizontal overflow, and no console warnings or errors.

## v62 Change

- Added Frens Haringhandel as the top Amsterdam Fish recommendation.
- Frens appears first when filtering Amsterdam attractions by `Fish`.
- Card includes official site link, Google Maps app directions, Uber destination
  coordinates, daily 11:00 AM-5:00 PM hours, and local image
  `attractions/amsterdam-frens-haringhandel.jpg`.
- Service worker, manifest, and app-version are bumped to v62 so installed Home Screen
  apps refresh.

## v61 Change

- Added an Amsterdam `Top 10` attractions filter and made it the default Amsterdam
  attractions landing state.
- Top 10 order: Rijksmuseum, Van Gogh Museum, Anne Frank House, Royal Palace Amsterdam,
  Stedelijk Museum, Rembrandt House Museum, NEMO Science Museum, National Maritime
  Museum, Oude Kerk, and Moco Museum.
- Added Royal Palace Amsterdam and Oude Kerk cards with descriptions, prices, locations,
  official links, map links, Uber support, and local JPEG images.
- Top 10 cards are marked `Recommended` while retaining their real Museum/Landmark
  categories for normal filtering.
- Service worker, manifest, and app-version are bumped to v61 so installed Home Screen
  apps refresh.

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
v62 Frens Haringhandel QA:
- Local mobile viewport: 396x695, in-app Browser.
- Amsterdam attractions Fish filter shows Frens Haringhandel first, followed by
  Albert Cuyp Fish Market, John Dory, Stubbe's Haring, and Vishuisje Herengracht.
- Frens local image loads at 400x400 with no broken thumbnails.
- Frens Directions link uses `comgooglemaps://` and the Uber link includes destination
  coordinates 52.367292, 4.889438.
- Public antonreport.com mobile viewport: 396x695.
- Live `https://antonreport.com/gelmantravel/?city=amsterdam&page=photos&appv=62`
  serves `manifest.webmanifest?v=62`, Frens is first in Fish, has no broken thumbnails,
  no horizontal overflow, and no console warnings or errors.

v61 Amsterdam Top 10 QA:
- Local mobile viewport: 396x695, in-app Browser.
- Amsterdam attractions default filter is `Top 10`.
- Card count is 10 and order is: Rijksmuseum, Van Gogh Museum, Anne Frank House,
  Royal Palace Amsterdam, Stedelijk Museum, Rembrandt House Museum, NEMO Science Museum,
  National Maritime Museum, Oude Kerk, Moco Museum.
- All 10 attraction thumbnails have nonzero natural image dimensions.
- Landmark filter interaction shows Amsterdam City Center & Centraal, Royal Palace
  Amsterdam, and Oude Kerk; switching back to Top 10 restores the 10-card list.
- Public antonreport.com mobile viewport: 396x695.
- Live `https://antonreport.com/gelmantravel/?city=amsterdam&page=photos&appv=61`
  serves `manifest.webmanifest?v=61`, shows Top 10 active, has no broken thumbnails,
  no horizontal overflow, and no console warnings or errors.

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
- The Worker that fronts `https://antonreport.com/gelmantravel*` was not changed for v62.

## Handoff Prompt

```text
You are working with repo vitalychernobyl/gelman-travel-guide.

The app is a static no-build PWA deployed from the repo root to Cloudflare Pages project gelman-travel-guide.

Current deployment proof is in DEPLOYMENT_PROOF.md. It shows that v63 is live:
- https://gelman-travel-guide.pages.dev/ serves service-worker.js?v=63
- https://antonreport.com/gelmantravel/ serves service-worker.js?v=63
- https://antonreport.com/gelmantravel/app-version.json returns {"version":"63",...}
- Amsterdam Attractions `All` filter works: default `Top10` shows 10 cards, clicking
  `All` selects the All chip and shows 59 cards.

Cloudflare Pages project gelman-travel-guide has Git Provider: No, so auto-deploy after GitHub merges is not configured. If asked to deploy future changes, use:
npx wrangler pages deploy . --project-name gelman-travel-guide --branch main

Do not touch the Worker unless specifically asked. The Worker only proxies antonreport.com/gelmantravel* to the Pages origin.
```
