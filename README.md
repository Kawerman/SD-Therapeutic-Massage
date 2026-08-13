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

## Where the placeholders live

All human-editable values use greppable `{{TOKENS}}`. Search the repo for `{{`
to find them. Primary locations:

| Token | Files | Notes |
|---|---|---|
| `{{BUSINESS_NAME}}` | `index.html`, `assets/og-image.svg` | Brand name (also in `<title>`, JSON-LD, footer) |
| `{{THERAPIST_NAME}}` | `index.html` | Therapist name / About section |
| `{{TAGLINE}}` | `index.html` | Hero one-liner |
| `{{ABOUT_BIO}}` | `index.html` | About paragraph |
| `{{ADDRESS}}`, `{{CITY_STATE_ZIP}}` | `index.html` | Address (also JSON-LD + map link) |
| `{{GEO_LAT}}`, `{{GEO_LNG}}` | `index.html` | Coordinates in JSON-LD |
| `{{PHONE}}`, `{{EMAIL}}` | `index.html` | `tel:` / `mailto:` links + JSON-LD |
| `{{HOURS}}` | `index.html` | Human-readable hours (also update `openingHoursSpecification` in the JSON-LD) |
| `{{DOMAIN_URL}}` | `index.html`, `robots.txt`, `sitemap.xml` | Canonical URL, e.g. `https://massagebysd.com` |
| Services | `index.html` (`.services-grid`) | Edit the `<li class="service">` cards directly |

**After filling placeholders,** double-check the JSON-LD block in
`index.html` (name, address, geo, phone, hours) and the OG/Twitter meta tags.

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
- `assets/therapist.jpg` — About photo (currently a placeholder; also, the file
  is PNG data with a `.jpg` name — export a real JPG when replacing).
- `assets/og-image.png` — 1200×630 social share image.
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
