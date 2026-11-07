# Divlynx website

Production website for Divlynx, a software studio that finds the busywork draining a team and replaces it with AI automation, voice agents and workflow engineering, along with the web and mobile products those systems plug into.

The site is built with React and Vite, prerendered to static HTML for search engines, and hosted on Vercel. Styling is plain CSS (one global design-token file plus one stylesheet per section), with no UI framework.

---

## Contents

1. [Getting started](#getting-started)
2. [Design system](#design-system)
   - [Concept](#concept-a-black-sketchbook)
   - [Colour](#colour)
   - [Typography](#typography)
   - [Layout and spacing](#layout-and-spacing)
   - [Sketchbook elements](#sketchbook-elements)
   - [Buttons](#buttons)
   - [Motion](#motion)
   - [Icons and imagery](#icons-and-imagery)
3. [Page structure](#page-structure)
4. [Repository structure](#repository-structure)
5. [Static assets](#static-assets)
6. [Performance](#performance)
7. [Configuration](#configuration)
8. [Routes and SEO](#routes-and-seo)
9. [Security and privacy](#security-and-privacy)
10. [Content ownership](#content-ownership)
11. [Pitch deck](#pitch-deck)
12. [Deployment](#deployment)
13. [Quality checklist](#quality-checklist)

---

## Getting started

Use Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:5173`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Build client and SSR bundles, then prerender every route |
| `npm run build:client` | Build the browser bundle only |
| `npm run build:server` | Build the SSR entry only |
| `npm run prerender` | Write route HTML, `sitemap.xml` and `robots.txt` |
| `npm run preview` | Serve the production build locally (`http://localhost:4173`) |

**Stack:** React 19, React Router 7, Vite 7 (with the React Compiler), Framer Motion, React Icons (Phosphor set), Vercel serverless functions, Resend for email, Sharp for image processing, ESLint.

---

## Design system

All design tokens live in `src/index.css` under `:root`. Section styles in `src/css/` only consume tokens; if you need a new colour, size or curve, add a token first.

### Concept: a black sketchbook

The site reads as a designer's black sketchbook: a dark page with a faint dot grid, set in clean grotesque type, and annotated by hand in amber marker. The hand-drawn layer is used deliberately and sparingly:

- **Marker strokes** (underline, circle, squiggle, strike) that draw themselves under one key phrase per headline
- **Handwritten labels** for small headings, captions and notes
- **Paper objects** where the content is a "note": testimonials as pinned sticky notes, the hero to-do list and the services detail as spiral-bound notebook pages

The rule of thumb: one marker stroke per heading, handwriting for labels only (never for paragraphs), and no decoration that does not carry content.

### Colour

Black and orange. Amber comes from the logo's gradient end stop and is used as **whole fields** (the process band, the contact band) and as the signal colour for anything active, never as scattered decoration.

#### Ground and surfaces

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#0d0d0c` | Page background (with the dot grid) |
| `--paper-hi` | `#151513` | Raised panels |
| `--card` | `#181816` | Cards, inputs, popovers |
| `--paper-sink` | `#2b2a26` | Placeholders and image wells |
| `--ink` | `#0a0a09` | Darkest value; type and fills on amber |
| `--dot` | `rgba(239,236,229,.06)` | Dot-grid dots |
| `--line` / `--line-hi` | `rgba(239,236,229,.12)` / `.24` | Hairlines and borders |

#### Brand

| Token | Value | Use |
| --- | --- | --- |
| `--amber` | `#f78400` | Brand amber: fields, buttons, marker strokes |
| `--amber-hi` | `#ff9a2e` | Hover state of amber surfaces |
| `--amber-ink` | `#ff9a2e` | Amber used as **text** on the black page |
| `--amber-deep` | `#c26700` | Deep amber accents |
| `--on-amber` | `#0a0a09` | Text on amber fields |
| `--on-amber-dim` | `#3a1a00` | Secondary text on amber fields |

#### Text

| Token | Value | Use |
| --- | --- | --- |
| `--text` | `#efece5` | Primary text (warm off-white) |
| `--text-dim` | `#a6a39b` | Secondary text, ledes |
| `--muted` | `#8f8c85` | Meta text, captions, struck-out words |

#### Paper notes

Sticky notes and pinned cards use real paper colours with dark ink (`#1d150c`):

| Paper | Gradient |
| --- | --- |
| Amber | `#ffb347` → `#f9a032` |
| Cream | `#f6efdf` → `#ece2cc` |
| Peach | `#ffd3a3` → `#f8c286` |

#### Contrast (WCAG)

Every text pairing passes AA (4.5:1) for body text:

| Pairing | Ratio |
| --- | --- |
| `--text` on `--paper` | 16.5 : 1 |
| `--text-dim` on `--paper` | 7.7 : 1 |
| `--muted` on `--paper` | 5.8 : 1 |
| `--amber-ink` on `--paper` | 9.2 : 1 |
| `--ink` on `--amber` | 7.8 : 1 |
| `--on-amber-dim` on `--amber` | 6.2 : 1 |
| Note ink on cream note | 15.7 : 1 |
| Note ink on amber note | 10.1 : 1 |

Plain `--amber` (`#f78400`) is reserved for fills, strokes and large text. Use `--amber-ink` when amber sets body-size text.

#### Section bands

| Class | Effect |
| --- | --- |
| `.band` | Standard section with vertical rhythm |
| `.band--amber` | Orange field with a darker dot grid. Re-maps `--text`, `--text-dim` and `--line` so components inside switch to ink automatically, and flips button colours |

Ambient light (`.glow`) is a slow-drifting blurred amber radial placed behind a section's content.

### Typography

Fonts load from Google Fonts in `index.html` (`display=swap`, only the weights in use).

| Role | Family | Weights | Token | Used for |
| --- | --- | --- | --- | --- |
| Display | **Funnel Display** | 500, 600, 700 | `--font-display` | Headlines, card titles, buttons |
| Body | **Funnel Sans** | 400, 500, 600 | `--font-body` | Paragraphs, UI text |
| Hand | **Gochi Hand** | 400 | `--font-hand` | Handwritten labels, notes, captions |
| Mono | **Geist Mono** | 400, 500 | `--font-mono` | Timestamps, data, scope lists |
| Brand | **Space Grotesk** | 500, 700 | scoped | Navbar and logo wordmark only |

The navbar and logo keep the original brand face. `.nav`, `.drawer` and `.logo` re-scope `--font-display` to Space Grotesk, so the rest of the site is unaffected.

#### Type scale

| Class / element | Size | Line height | Tracking |
| --- | --- | --- | --- |
| Hero headline | `clamp(2.9rem, 7.2vw, 6.2rem)` | 0.98 | -0.045em |
| `.h1` | `clamp(2.6rem, 6.4vw, 5.5rem)` | 0.98 | -0.035em |
| `.h2` (section headings) | `clamp(2.1rem, 4.6vw, 3.75rem)` | 1.02 | -0.035em |
| `.h3` | `clamp(1.125rem, 1.6vw, 1.3rem)` | 1.2 | -0.02em |
| `.lede` | `clamp(1.0625rem, 1.4vw, 1.1875rem)` | 1.55 | normal |
| Body | `1.0625rem` (17px) | 1.6 | normal |

Rules:

- Display type is weight 600 with negative tracking. Headings use `text-wrap: balance`.
- Ledes cap at about 52 characters per line; long-form text at 64–72.
- Handwriting is for short labels (a few words), never paragraphs.
- Emphasis comes from a marker stroke or weight, never gradient text.

### Layout and spacing

| Token | Value |
| --- | --- |
| `--shell` | `1240px` content width (1480 / 1680 on very large screens) |
| `--gutter` | `clamp(16px, 4.5vw, 40px)` side padding |
| `--section-y` | `clamp(72px, 9vw, 132px)` vertical section padding |
| `--grid` | `26px` dot-grid pitch |
| `--radius-sm` / `--radius` / `--radius-lg` | `6px` / `10px` / `16px` |
| `--nav-h` | `68px` navbar height (used for scroll offsets) |

`.sec-head` is the standard section header: heading on the left, supporting lede on the right, stacking below 820px. Main breakpoints are 960/900px (two columns collapse to one) and 520–560px (phone).

### Sketchbook elements

| Element | Where | How |
| --- | --- | --- |
| `<Scribble variant="underline" \| "circle" \| "squiggle" \| "strike">` | `src/components/Scribble.jsx` | Wraps a phrase; the SVG stroke draws in when scrolled into view |
| Highlighter `<mark className="hl">` | Hero lede | Amber swipe that grows across the phrase |
| Dot-grid page | `body` background | `radial-gradient` dots at `--grid` pitch |
| Notebook page | Hero to-do list, services detail, nav dropdowns | Ruled lines, amber margin rule, spiral binding, offset second sheet |
| Sticky notes + pins | Testimonials, pain/value notes, cookie notice, privacy summary | Paper gradients, push pins, slight tilt, curled corner |
| Rough frame | Project screenshots | Border run through the `#rough` SVG displacement filter defined in `App.jsx` |
| Hand-drawn checkboxes | Contact topics, service checklist, hero to-do list | Sketched square plus a tick that draws in |
| Hand-drawn asterisk | Client strip, team strip | Separator glyph drawn as SVG |

Stroke animations use `pathLength="1"` plus `stroke-dasharray: 1`, so the same "draw" transition works on any path.

### Buttons

`.btn` in `src/index.css`:

- Hand-cut, slightly irregular corners (`--btn-shape`)
- An offset outline (`::after`) traced behind the button that snaps into place on hover, like a shape drawn twice
- `.btn--primary`: amber fill, ink text
- `.btn--ghost`: transparent, drawn outline
- Inside `.band--amber` and the cookie note, colours re-map through `--btn-bg`, `--btn-fg` and `--btn-line`

### Motion

| Token | Curve | Use |
| --- | --- | --- |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Arrivals, reveals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Strokes being drawn, wipes |

Signature moments:

- **Hero:** headline words rise out of masks, "by hand." is struck out and "on autopilot." is written in, then the to-do list strikes each pain and writes its fix.
- **Pain → value flow:** the pen draws each arrow as the example call moves through the agent.
- **Process:** a scroll-linked timeline fills, and each step card flips to ink as the line reaches it.
- **Testimonials:** sticky notes swing onto their pins.
- **Strips:** client stickers and the team discipline strip scroll continuously.

How reveals work:

- Elements with `.reveal` (fade/rise) and `.draw` (stroke) are observed by `src/hooks/useRevealOnScroll.js`, which adds `is-in`.
- Content is **visible by default** in the prerendered HTML. CSS only holds it back once the inline script in `index.html` sets `html.js`, and a timed CSS fallback reveals everything regardless. Do not use Framer Motion `initial={{ opacity: 0 }}` for section content: it ships invisible HTML.
- Stagger with the `--reveal-delay` custom property.
- Every animation has a `prefers-reduced-motion` path (`MotionConfig reducedMotion="user"` for Framer Motion, plus CSS overrides). Looping visuals pause when off-screen.

### Icons and imagery

- **Icons:** one family, Phosphor via `react-icons/pi`, re-exported from `src/icons.jsx` (the `Fi*` names are kept for compatibility). Do not add PNG icons.
- **Project screenshots:** WebP at 1400px and 760px served with `srcset`, with intrinsic `width`/`height` to prevent layout shift.
- **Team portraits:** 600px WebP on white backgrounds, shown grayscale until hover or tap.
- **Client logos:** 160px WebP shown as full-colour stickers.

---

## Page structure

Home (`src/routes/Home.jsx`), top to bottom:

1. **Hero:** "Stop doing it ~~by hand~~ on autopilot", value line, CTAs, and the "things eating your week" notebook
2. **Trust strip:** client stickers and headline facts
3. **Solved:** one pain point → its value, with the step-by-step agent flow
4. **Services:** Automate / Build / Grow index with a notebook detail page
5. **Process:** four steps on an amber scroll-linked timeline
6. **Work:** live projects with sketched frames
7. **Testimonials:** pinned sticky notes
8. **Team:** animated discipline strip, leadership and engineering cards
9. **Journal:** latest four posts
10. **Contact:** amber band with channels and the form

Other routes: `/case-studies`, `/about`, `/careers`, `/faq`, `/blog`, `/blog/:slug`, `/privacy` and a prerendered 404.

---

## Repository structure

```text
.
|-- api/
|   `-- contact.js              # Vercel contact-form endpoint
|-- docs/
|   |-- Divlynx-Pitch-Deck.pdf  # Client-facing pitch deck
|   `-- divlynx-pitch-deck.html # Editable deck source
|-- public/
|   |-- .well-known/security.txt
|   |-- assets/
|   |   |-- brand/              # Logo and touch icon
|   |   |-- clients/            # Client logos (160px WebP)
|   |   |-- hero/               # Social-share image
|   |   |-- projects/           # Project screenshots (WebP, 1400 + 760)
|   |   `-- team/               # Team portraits (600px WebP)
|   |-- favicon.svg
|   `-- googled90c3df1f28b3400.html   # Search Console verification
|-- scripts/
|   `-- prerender.mjs           # Static route, 404, sitemap and robots generation
|-- src/
|   |-- blog/                   # Journal content and post renderer
|   |-- components/             # Sections and shared components
|   |   |-- Scribble.jsx        # Self-drawing marker strokes
|   |   |-- PainList.jsx        # Hero notebook to-do list
|   |   |-- Solved.jsx          # Pain -> value section
|   |   `-- SketchFlow.jsx      # Hand-drawn agent flow
|   |-- css/                    # One stylesheet per section or route
|   |-- data/faqs.js
|   |-- hooks/useRevealOnScroll.js
|   |-- routes/                 # Route-level pages
|   |-- App.jsx                 # Router, shell, shared SVG filter
|   |-- entry-server.jsx        # SSR entry used by the prerenderer
|   |-- icons.jsx               # The single icon set
|   |-- index.css               # Design tokens, base styles, utilities
|   |-- main.jsx                # Browser entry (hydrates prerendered HTML)
|   |-- seo.js                  # Route metadata and JSON-LD
|   `-- site.js                 # Company details, navigation, contact constants
|-- index.html                  # Document template (fonts, inline `js` flag)
|-- vercel.json                 # Hosting, headers and caching
`-- vite.config.js              # Build config and vendor chunking
```

---

## Static assets

Only files the website (or the pitch deck in `docs/`) actually references belong in `public/assets`. Every file there is in use.

- Use lowercase kebab-case filenames, with no spaces and no duplicate export variants.
- Convert new raster images to WebP at the size they are displayed (2× for retina). Sharp is installed; for example:
  ```js
  sharp(src).resize({ width: 1400 }).webp({ quality: 76 }).toFile(dest)
  ```
- Search both `src` and `docs` before moving or deleting an asset.
- `/assets/*` is cached immutably for a year (`vercel.json`). **When you replace an image, give it a new filename**, or visitors keep the old one.

---

## Performance

- **Prerendered HTML:** every route ships as real markup and hydrates on load.
- **Images:** about 1.2 MB in total; responsive `srcset`, lazy loading off-screen, intrinsic dimensions.
- **JavaScript:** vendor code is split into long-cached chunks (`react`, `router`, `motion`, `vendor`) in `vite.config.js`. The site's own bundle is about 49 KB gzipped.
- **Fonts:** only the families and weights in use, with `preconnect` and `display=swap`.
- **Motion:** looping animations pause when off-screen; expensive effects are bounded to small regions.

---

## Configuration

Create `.env.local` for local values. Never commit secrets.

```env
VITE_CONTACT_TO_EMAIL=divlynx.inc@gmail.com
VITE_CALENDLY_URL=https://calendly.com/divlynx-inc/book-a-call-30-mins
VITE_DEFAULT_WEBMAIL=gmail
```

`VITE_*` variables are public: they are inlined into the browser bundle. `RESEND_API_KEY` is a **server** secret: set it in the Vercel project's environment variables, never in a `VITE_` variable.

### Contact form

The browser posts enquiries to `/api/contact`. `api/contact.js` validates the request and sends it through Resend from the verified `divlynx.com` domain to `divlynx.inc@gmail.com`. If the endpoint is unavailable, the form falls back to opening a pre-filled webmail compose window.

---

## Routes and SEO

The build prerenders `/`, `/about`, `/careers`, `/faq`, `/case-studies`, `/blog`, `/privacy` and every post in `src/blog/posts.js`. `scripts/prerender.mjs` also writes the 404 page, `sitemap.xml` and `robots.txt`. Titles, descriptions, canonical URLs, social metadata and Schema.org JSON-LD come from `src/seo.js` (`metaForPath()` and `jsonLdForPath()`).

To add a journal post, add it to `src/blog/posts.js`; its route and sitemap entry are generated automatically.

Every public route should have a unique title and description, one canonical URL, Open Graph and X/Twitter tags, crawlable internal links, and visible copy that matches its metadata. Validate structured data with Google's Rich Results Test before deploying.

---

## Security and privacy

**Response headers** (`vercel.json`, all routes):

- **Content-Security-Policy:** scripts from `self` plus one hash for the inline `js` flag in `index.html`; inline event handlers blocked; styles from `self` and Google Fonts; `object`, `frame`, `worker` and `media` disabled; `frame-ancestors 'none'`; `base-uri 'none'`.
- **Strict-Transport-Security:** two years, subdomains, preload.
- **Clickjacking and sniffing:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
- **Isolation:** `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy: same-origin`.
- **Privacy:** `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` that disables camera, microphone, geolocation, payment, USB, sensors and topics.
- **API:** `/api/*` is `no-store` and `noindex`.

> **If you edit the inline script in `index.html`**, recompute its SHA-256 hash and update `script-src` in `vercel.json`, or the browser will block it:
> ```bash
> node -e "console.log('sha256-'+require('crypto').createHash('sha256').update('document.documentElement.classList.add(\"js\")').digest('base64'))"
> ```

**Contact API** (`api/contact.js`):

- In production, only accepts requests whose `Origin` is `https://divlynx.com` or `https://www.divlynx.com`; requests without an Origin are refused
- Rejects cross-site browser requests through `Sec-Fetch-Site`
- Requires JSON and caps the payload at 16 KB, even when `Content-Length` is missing
- Rate-limits by the IP Vercel reports (`x-vercel-forwarded-for` / `x-real-ip`), which callers cannot spoof
- Strips control characters (header injection), validates fields, escapes HTML in the email body
- Uses a honeypot field that silently accepts bot submissions
- Keeps the Resend key server-side

**Privacy:**

- `CookieNotice.jsx` stores only `divlynx_privacy_choice` in local storage.
- No analytics or advertising cookies are used. If you add either, update `src/routes/Privacy.jsx`, the cookie notice and the CSP together.
- `public/.well-known/security.txt` gives the responsible-disclosure contact.

These are defence-in-depth controls, not a guarantee. Keep dependencies patched, rotate any exposed credential immediately, and watch function logs. If a third-party script, image or API is added, widen the CSP for that exact origin only.

---

## Content ownership

| Content | File |
| --- | --- |
| Company details, social links, Calendly, navigation | `src/site.js` |
| Hero copy and the to-do list | `src/components/Hero.jsx`, `src/components/PainList.jsx` |
| Pain → value example and agent flow | `src/components/Solved.jsx`, `src/components/SketchFlow.jsx` |
| Client strip | `src/components/TrustStrip.jsx` |
| Services | `src/components/Services.jsx` |
| Delivery process | `src/components/Process.jsx` |
| Selected work | `src/components/Work.jsx` |
| Testimonials | `src/components/Testimonials.jsx` |
| Team | `src/components/Team.jsx` |
| Careers | `src/components/Careers.jsx` |
| Case studies | `src/routes/CaseStudies.jsx` |
| Journal | `src/blog/posts.js` |
| FAQ | `src/data/faqs.js` |
| Privacy notice | `src/routes/Privacy.jsx` |
| SEO metadata and structured data | `src/seo.js` |

The hero to-do list and the pain → value flow are illustrative examples. Keep project claims qualitative unless a client has approved publishing exact numbers, and only show real client quotes as testimonials.

---

## Pitch deck

The editable deck is `docs/divlynx-pitch-deck.html`; it uses the logo and social image from `public/assets`. To regenerate the PDF with Chrome on Windows:

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="$PWD\docs\Divlynx-Pitch-Deck.pdf" `
  "file:///$($PWD.Path.Replace('\','/'))/docs/divlynx-pitch-deck.html"
```

---

## Deployment

Vercel runs `npm run build` and serves `dist`. Set production environment variables (including `RESEND_API_KEY`) in the Vercel project first. After deploying, confirm the security headers are present on the production domain and that `www` and the apex domain redirect to one canonical host.

---

## Quality checklist

```bash
npm run lint
npm run build
npm audit --omit=dev
```

Then check:

- Home, case studies, journal index and one article, at desktop and 390px mobile width
- Navbar dropdowns, in-page anchors and the mobile menu
- Hero animation, to-do list loop and the pain → value flow
- Contact submission and the webmail fallback
- Cookie notice dismissal and the privacy page
- Reduced-motion behaviour (OS setting)
- `robots.txt`, `sitemap.xml`, canonical tags and structured data
- Production security headers and `.well-known/security.txt`
- No unreferenced files in `public/assets`

---

## License

Proprietary. All code, brand assets, case-study content and client materials are owned by Divlynx or used with permission.
