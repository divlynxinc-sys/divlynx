<div align="center">

# DivLynx Website (React + Vite)

A modern, responsive website for DivLynx built with React, Vite, and handcrafted CSS. It features a hero with animated testimonials, services, projects, team, contact form (EmailJS), and a continuously scrolling technology strip.

</div>

---

## Quick Start

Prerequisites
- Node.js 18+ (recommended)
- npm (or pnpm/yarn)

Install & run
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

Build & preview
```bash
npm run build
npm run preview
```

## Project Overview

- Framework: `React 19` + `Vite 7`
- Animations: `framer-motion`
- Icons: `react-icons`
- Email: `@emailjs/browser`
- Styling: plain CSS with responsive `clamp()` and media queries
- Linting: ESLint, React Refresh/Hooks configs

## Directory Structure

```
divlynx-website-rewamp/
├── public/                  # static assets (logos, background images)
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx         # hero, testimonials, trusted-by logos
│   │   ├── TechStrip.jsx    # scrolling technologies marquee
│   │   ├── Services.jsx     # services grid + journey + FAQ
│   │   ├── Projects.jsx     # portfolio cards + tech stack tiles
│   │   ├── Team.jsx         # team grid
│   │   ├── Contact.jsx      # contact form (EmailJS)
│   │   └── Footer.jsx
│   ├── css/                 # scoped CSS files per section
│   │   ├── hero.css, navbar.css, services.css, projects.css, team.css, etc.
│   ├── App.jsx              # page composition
│   └── main.jsx             # app bootstrap
└── package.json
```

## Environment Configuration (EmailJS)

The contact form uses EmailJS.

### Configure EmailJS
1. Create an account at https://www.emailjs.com/.
2. Create a Service (connect your email provider).
3. Create a Template with these variables:
   - `from_name`
   - `reply_to`
   - `message`
   - `to_email`
4. Copy your Service ID, Template ID, and Public Key.

### Add Environment Variables
Copy `.env.example` to `.env.local` and set:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_CONTACT_TO_EMAIL=divlynx.inc@gmail.com
```

Where to set these
- Sign in to EmailJS, create a service and a template.
- Copy your Service ID, Template ID, and Public Key.
- Values are read in `src/components/Contact.jsx` via `import.meta.env.*`.

Fallback behavior
- If env vars are missing, the form will fall back to a `mailto:` send and open the user’s email app with a prefilled message to `divlynx.inc@gmail.com`.

Validation & UX
- Name, email, and message are validated client-side.
- Reduced-motion users get non-animated scrolling.

## Responsive Behavior

- Desktop layout is preserved down to `760px` width.
- Below `760px`, hero stacks to a single column and the tech strip hides.
- Mobile tweaks include larger trusted-by logos and fine-tuned spacing.

Key breakpoints to adjust
- `src/css/hero.css`: media queries controlling hero column stacking and tech strip visibility.

## Scripts

From `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## Deployment

Static hosting options
- Vercel / Netlify: import the repo, framework “Vite”, build command `npm run build`, output `dist`.
- Any static server: serve the `dist/` folder after build.

Environment on deploy
- Make sure the EmailJS env vars are configured in your hosting provider.

## Troubleshooting

- Icons blocked or not loading: some devicon SVGs are fetched from a CDN and may be blocked by certain networks. Fix by downloading required icons and placing them in `/public`, then update sources in `TechStrip.jsx`.
- Email not sending: verify `VITE_EMAILJS_*` variables and EmailJS template settings. Check browser console for errors from `emailjs.send`.
- Port already in use: change the dev port via `vite.config.js` or run `vite --port 5174`.

## Contributing

1. Fork and clone the repository.
2. Create a feature branch.
3. Run `npm run dev` and `npm run lint` locally.
4. Open a pull request with a clear description and screenshots.

## Notes for Designers/Developers

- Glass/liquid card styles are reusable via the `glass-liquid` class.
- Animations use `framer-motion` with `viewport={{ once: true }}` for performance.
- Typography, spacing, and sizes rely heavily on CSS `clamp()` for fluid scaling.

## License

Add your project license here (e.g., MIT, Apache-2.0, or proprietary). If this is a private website, keep it proprietary and restrict distribution.