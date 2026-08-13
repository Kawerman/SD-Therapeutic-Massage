# Build Spec: Massage Therapy Marketing Site

## Goal
A small, fast, statically-hosted marketing site for a solo massage therapist, with online appointment booking handled entirely by an embedded Square Appointments widget. No backend, no database, no server-side code. The site advertises services and lets clients self-book time slots. Payment is handled in person in cash, so the Square payment collection is off; the widget is used as a booking calendar only.

## Hard constraints (read first)
- **No intake forms, health questionnaires, or any collection of health information anywhere on the site.** This is a deliberate HIPAA-avoidance decision. Do not add "reason for visit," "medical conditions," "areas of concern," or similar fields. The only client data captured is what Square's default booking flow collects (name, email/phone, chosen slot).
- **No online payment.** Do not enable or embed any payment/checkout flow. Cash in person only.
- **No backend.** Pure static output (HTML/CSS/JS). No SQL, no API server, no serverless functions.
- **No secrets in the repo.** No API keys, tokens, or credentials committed. The Square booking embed is a public snippet and is fine to commit; nothing else.

## Tech stack
- Plain semantic HTML5, modern vanilla CSS, and vanilla JavaScript. No SPA framework.
- If any light interactivity helper is warranted (mobile menu toggle, modal), use **Alpine.js** via CDN. Do not pull in React, Vue, or a build framework. Do not use jQuery.
- Keep total JS to the minimum needed. The Square widget does the heavy lifting; first-party JS should be limited to things like a nav toggle and smooth scroll.
- No bundler required. If a build step is genuinely useful, keep it to something trivial that still emits plain static files. Prefer zero-build.

## Hosting & deployment
- Host on **Cloudflare Pages**. The domain is already managed in Cloudflare, and Cloudflare access is available to the agent via the configured Cloudflare MCP.
- Create/use a Git repo as the Pages source, or deploy the built static directory directly via the MCP, whichever is cleaner given the MCP tooling available.
- Configure the custom domain (or a subdomain) to point at the Pages project and confirm the DNS record resolves and serves over HTTPS.
- Do not create or request a global API key. Use only the already-configured scoped access.

## Site structure
Single-page site is acceptable and probably ideal for SEO and simplicity, with anchored sections. If multi-page is cleaner, keep it to a handful of static pages. Sections/pages needed:

1. **Hero / landing** — business name, one-line value proposition, primary "Book Now" call to action that scrolls to (or opens) the booking widget.
2. **Services** — list of services with short descriptions and duration/price. Use placeholder tokens (see below) for anything business-specific.
3. **About** — short therapist bio and credentials. Placeholder text.
4. **Booking** — the Square Appointments embed. This is the conversion point. Make the "Book Now" CTAs throughout the page target this section.
5. **Location & hours** — address, hours, map link (or embedded map only if it doesn't add tracking bloat). Phone and email as `tel:`/`mailto:` links.
6. **Footer** — copyright, minimal nav, no health/legal form collection.

## Square Appointments integration
- Integrate via Square's **embeddable booking widget** (iframe/snippet) so clients book without leaving the domain. The redirect-style hosted booking page is an acceptable fallback if the embed causes layout/CSP issues, but prefer the embed.
- Insert the embed snippet at a single clearly marked placeholder location (see placeholders). The actual snippet comes from the client's Square dashboard and will be pasted in by a human. Scaffold the slot and surrounding container/styling; do not fabricate a snippet.
- No Square API calls, no OAuth, no API key. Widget snippet only.
- Ensure the embed container is responsive and does not break mobile layout.

## SEO requirements
This is a local service business, so on-page SEO and crawlability matter more than anything fancy.
- Fully server-rendered static HTML with real content in the initial markup (this is why we're avoiding an SPA). Do not gate primary content behind JS.
- Per-page `<title>` and meta description. Semantic headings (single `<h1>`, logical `<h2>`/`<h3>`).
- Open Graph and Twitter card meta tags.
- **JSON-LD structured data** using a `LocalBusiness` type (subtype `HealthAndBeautyBusiness` or `DaySpa` as appropriate; avoid `MedicalBusiness` framing). Include name, address, geo, phone, opening hours, price range, and URL. Use placeholder tokens for values.
- `sitemap.xml` and `robots.txt`.
- Fast and lean: no heavy libraries, compressed/appropriately sized images, `loading="lazy"` on non-hero images, system or a single self-hosted/well-cached web font.
- Mobile-first responsive layout. Target Lighthouse 90+ on Performance, Accessibility, Best Practices, and SEO for the mobile profile.
- Accessible: proper alt text, sufficient color contrast, keyboard-navigable nav and CTAs, focus states.

## Content placeholders
Use obvious, greppable placeholder tokens so a human can fill them in without hunting. Centralize them (e.g. a top-of-file config object or clearly commented block) where practical:
- `{{BUSINESS_NAME}}`
- `{{THERAPIST_NAME}}`
- `{{TAGLINE}}`
- `{{SERVICES}}` (name, duration, price, description per item)
- `{{ABOUT_BIO}}`
- `{{ADDRESS}}`, `{{CITY_STATE_ZIP}}`, `{{GEO_LAT}}`, `{{GEO_LNG}}`
- `{{PHONE}}`, `{{EMAIL}}`
- `{{HOURS}}`
- `{{SQUARE_BOOKING_EMBED}}`  <!-- paste Square widget snippet here -->
- `{{DOMAIN_URL}}` (for canonical, OG, sitemap)

Provide realistic placeholder copy so the site looks complete in preview, but keep it clearly swap-able.

## Design direction
- Clean, calm, trustworthy. Whitespace, soft palette, readable type. Nothing gaudy.
- One clear primary action (Book Now) repeated at natural scroll points.
- Do not over-animate. Subtle only.

## Deliverables
- Static site source in the repo, deployable to Cloudflare Pages.
- Deployed preview on Cloudflare Pages, and the custom domain wired up and serving over HTTPS.
- `robots.txt`, `sitemap.xml`, favicon, and OG image slot (placeholder OG image acceptable).
- A short `README.md` covering: how to run/preview locally, where every placeholder lives, how to paste the Square embed, and how a redeploy is triggered.

## Acceptance checklist
- [ ] Loads as static HTML with primary content present without JS.
- [ ] No health/intake fields anywhere. No payment/checkout anywhere.
- [ ] Square booking widget embedded (or slot scaffolded) and responsive; "Book Now" CTAs reach it.
- [ ] LocalBusiness JSON-LD present and valid; title/meta/OG present per page.
- [ ] `sitemap.xml` + `robots.txt` present; canonical URLs set.
- [ ] Mobile responsive; Lighthouse mobile 90+ across the four categories.
- [ ] No secrets committed. Only the public Square snippet slot exists in-repo.
- [ ] Deployed to Cloudflare Pages on the custom domain over HTTPS.

## Explicitly out of scope (do not do)
- Any database, auth, admin panel, or custom scheduler.
- Any server-side or serverless code.
- Any payment processing or e-commerce.
- Any intake/health data collection.
- Google Business Profile setup (this is a separate human task done directly with Google; not the agent's job).
- Filling in the real Square snippet or real business details (human provides these; agent scaffolds the slots).
