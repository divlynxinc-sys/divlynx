# Divlynx website

Production website for Divlynx, a software studio delivering digital products, AI automation, voice agents, workflow engineering, mobile applications, and growth systems.

The application uses React and Vite, server-side rendering and route prerendering for search visibility, and Vercel for hosting. Styling is maintained as section-level CSS without a UI framework.

## Technology

- React 19 and React Router
- Vite 7
- Framer Motion and React Icons
- Vercel serverless functions
- Resend for contact-form delivery
- Sharp for build-time image handling
- ESLint

## Getting started

Use Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:5173` by default.

## Commands

```bash
npm run dev          # Start the Vite development server
npm run lint         # Run ESLint
npm run build        # Build client and SSR bundles, then prerender routes
npm run build:client # Build the browser application only
npm run build:server # Build the SSR entry only
npm run prerender    # Generate route HTML, sitemap.xml, and robots.txt
npm run preview      # Preview the production client build
```

## Repository structure

```text
.
|-- api/
|   `-- contact.js              # Vercel contact-form endpoint
|-- docs/
|   |-- Divlynx-Pitch-Deck.pdf  # Client-facing pitch deck
|   `-- divlynx-pitch-deck.html # Editable deck source
|-- public/
|   |-- assets/
|   |   |-- brand/              # Primary logo and touch icon
|   |   |-- clients/            # Trusted-client marks used on the site
|   |   `-- hero/               # Hero illustration
|   |-- 404.html                # Static-host fallback
|   `-- favicon.svg
|-- scripts/
|   `-- prerender.mjs           # Static route and SEO artifact generation
|-- src/
|   |-- blog/                   # Journal content and post renderer
|   |-- components/             # Reusable and home-page sections
|   |-- css/                    # Component and route styles
|   |-- hooks/                  # Shared React hooks
|   |-- routes/                 # Route-level page components
|   |-- App.jsx                 # Router and application shell
|   |-- entry-server.jsx        # SSR entry
|   |-- index.css               # Tokens, resets, and global utilities
|   |-- main.jsx                # Browser entry
|   |-- seo.js                  # Route metadata
|   `-- site.js                 # Company details, navigation, and contact constants
|-- index.html                  # Vite document template
|-- vercel.json                 # Hosting, caching, and build configuration
`-- vite.config.js
```

## Static assets

Only files used by the website or editable pitch-deck source belong in `public/assets`.

- `brand/`: approved Divlynx brand files
- `clients/`: one production logo per displayed client
- `hero/`: large hero artwork

Use lowercase kebab-case filenames. Avoid spaces, duplicate export variants, and temporary generated files. Search both `src` and `docs` before moving or deleting an asset because the deck HTML shares website assets.

Assets under `/assets/*` receive immutable one-year caching through `vercel.json`. When replacing a production asset, change its filename so clients do not retain an older cached version.

## Configuration

Create `.env.local` for local values. Never commit secrets.

```env
VITE_CONTACT_TO_EMAIL=divlynx.inc@gmail.com
VITE_CALENDLY_URL=https://calendly.com/divlynx-inc/book-a-call-30-mins
VITE_DEFAULT_WEBMAIL=gmail
RESEND_API_KEY=re_xxxxxxxxx
```

### Contact form

The browser submits project enquiries to `/api/contact`. The Vercel function in `api/contact.js` validates the request and sends it with Resend from the verified `divlynx.com` domain. If server delivery is unavailable, the interface provides an email-compose fallback addressed to `divlynx.inc@gmail.com`.

## Routes and SEO

The build prerenders `/`, `/case-studies`, `/blog`, and every journal post declared in `src/blog/posts.js`. `scripts/prerender.mjs` also writes `sitemap.xml` and `robots.txt`. Route metadata lives in `src/seo.js`.

When adding a journal post, update `src/blog/posts.js`; the post route and sitemap entry are generated from that source.

## Content ownership

- Company details, social links, Calendly URL, and navigation: `src/site.js`
- Services: `src/components/Services.jsx`
- Delivery process: `src/components/Process.jsx`
- Selected work: `src/components/Work.jsx`
- Testimonials: `src/components/Testimonials.jsx`
- Case studies: `src/routes/CaseStudies.jsx`
- Journal content: `src/blog/posts.js`

Keep project claims qualitative unless a client has approved publishing exact commercial metrics.

## Pitch deck

The editable deck is `docs/divlynx-pitch-deck.html`. It uses the approved logo and hero artwork from `public/assets`.

To regenerate the PDF with Chrome on Windows:

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' `
  --headless=new `
  --disable-gpu `
  --no-pdf-header-footer `
  --print-to-pdf="$PWD\docs\Divlynx-Pitch-Deck.pdf" `
  "file:///$($PWD.Path.Replace('\','/'))/docs/divlynx-pitch-deck.html"
```

Review the PDF after changing copy, fonts, or shared assets.

## Deployment

Vercel uses `npm run build` and serves `dist`. Configure production environment variables in the Vercel project before deployment. Static files under `/assets` are cached immutably; HTML, sitemap, and serverless responses are not.

## Quality checklist

Before merging or deploying:

```bash
npm run lint
npm run build
```

Also verify:

- Home, case studies, journal index, and one journal article
- Navigation and in-page anchors
- Contact submission and email fallback
- Hero and carousel layouts at desktop and mobile widths
- Reduced-motion behavior
- External project links
- No unreferenced files in `public/assets`

## License

Proprietary. All code, brand assets, case-study content, and client materials are owned by Divlynx or used with permission.
