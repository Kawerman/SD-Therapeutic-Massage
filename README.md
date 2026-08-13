# SD Therapeutic Massage — Marketing Site

A small, fast, **static** marketing site for a solo massage therapist. Online
booking is handled entirely by an embedded **Square Appointments** widget
(booking calendar only — payment is cash, in person). No backend, no database,
no server-side code, no health/intake forms.

- **Stack:** plain HTML5 + vanilla CSS + minimal vanilla JS. Alpine.js (CDN) is
  used only for the mobile nav toggle.
- **Hosting:** Cloudflare Pages, custom domain `massagebysd.com`.
- **Booking:** Square Appointments embed (already wired into the `#booking`
  section).

## Run / preview locally

It's pure static files — no build step. Serve the folder with any static server:

```bash
# Python 3
python3 -m http.server 8080

# or Node
npx serve .
```

Then open http://localhost:8080. The Square widget loads from Square's CDN, so
booking works locally too.

## Business details (live content)

Real details are filled in — there are no `{{TOKENS}}` left. Current content:

- **Business:** SD Therapeutic Massage
- **Area:** San Diego, CA — **mobile only, no storefront**
- **Phone:** 619-693-6959 · **Email:** silas@massagebysd.com
- **Services:** Chair Massage (30 min), Table Massage (60 min)
- **Hours:** by appointment
- **Rates:** intentionally not hardcoded — the Square booking calendar is the
  single source of truth for pricing.

Because this is a **service-area business**, the JSON-LD deliberately omits
`streetAddress` and `geo` and uses `areaServed` instead. If a physical location
is ever added, add those fields back.

### Still to confirm

These were left out on purpose rather than guessed:

- **Therapist name(s)** — the About section is written about the business, not a
  named person.
- **Credentials** — "licensed & insured" / CMT license number is *not* claimed
  anywhere. Add it only once verified.
- **Service area specifics** — neighborhoods covered, travel radius, travel fee.
- **Real hours** — if set hours exist, add an `openingHoursSpecification` to the
  JSON-LD.

Edit points: business copy is in `index.html`; the service cards are the
`<li class="service">` items; the structured data is the single
`application/ld+json` block in `<head>`.

## The Square booking embed

The widget is **already embedded** in the `#booking` section of `index.html`:

```html
<script src='https://app.squareup.com/appointments/buyer/widget/am84ibgenyynkd/LW0QAV0VZDXAM.js'></script>
```

A `<noscript>` fallback and a "open in new tab" link point at the hosted Square
booking page. To swap in a different Square account/service, replace that
`<script src=...>` (and the two fallback links right below it) with the new
snippet from **Square Dashboard → Appointments → Online Booking → Embed code**.

Square settings to keep aligned with this site's constraints:
- **No prepayment / no card required at booking** (cash in person).
- **No custom health/medical intake questions** (deliberate HIPAA avoidance).

## Assets to replace before launch

Placeholder art was auto-generated; swap these for real files (same paths):
- `assets/therapist.jpg` — About photo (currently a generic placeholder shape;
  also, the file is PNG data with a `.jpg` name — export a real JPG when
  replacing). A real photo of the therapist or a session setup would help
  conversion a lot.
- `assets/og-image.png` — 1200×630 social share image. Regenerate from
  `assets/og-image.svg` with:
  `rsvg-convert -w 1200 -h 630 assets/og-image.svg -o assets/og-image.png`
- `favicon.svg` / `favicon.ico` / `assets/apple-touch-icon.png` — brand icons.

## Deploy / redeploy

The site is deployed via **Cloudflare Pages** connected to this GitHub repo.

- **Production branch:** `main`.
- **Build command:** _(none — static)_.
- **Build output directory:** `/` (repo root).
- **Redeploy:** push to `main`. Cloudflare Pages builds and deploys
  automatically. Pushes to other branches produce preview deployments.

## Explicitly NOT in this site

No database, auth, admin, or scheduler. No server/serverless code. No payment or
e-commerce. No intake/health data collection. (Google Business Profile setup is a
separate human task.)
