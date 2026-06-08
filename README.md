# Poconos Mountains · July 3–5, 2026 🌲🏕️🍻

A trip planning website for a 12-person weekend in the Poconos.

## Stack
- **Next.js 14** (App Router)
- **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3** with custom design tokens
- **Framer Motion** for scroll-tied animation
- **Recharts** for cost breakdown
- **React-Leaflet** + OSM for the interactive map
- **Open-Meteo** for weather (no API key)
- `localStorage` for packing checklist + group assignments

## Run locally

```bash
npm install
npm run dev          # → http://localhost:3000
```

## Build for production

```bash
npm run build
npm start
```

## Editing trip content

All trip data lives in [`lib/trip-data.ts`](./lib/trip-data.ts) — names, costs, itinerary blocks, packing items, FAQ, etc. Edit once; the whole site updates.

## File map

```
app/
  layout.tsx            Root layout, fonts, ThemeProvider
  page.tsx              Composition of all sections
  globals.css           Tailwind base + tokens + utilities
components/
  nav/                  Navbar + theme toggle
  sections/             One file per section
  shared/               Countdown, RevealOnScroll, SectionHeading, TiltCard
  theme-provider.tsx
lib/
  trip-data.ts          Single source of truth for content
  use-countdown.ts      Live countdown hook (SSR-safe)
  use-local-storage.ts  Persistence hook (SSR-safe)
  utils.ts              cn() helper
```

## Deploy

### GitHub Pages (this repo)

Pushes to `main` trigger `.github/workflows/deploy.yml`, which:

1. Builds with `STATIC_EXPORT=true` and `NEXT_PUBLIC_BASE_PATH=/<repo-name>`
2. Exports a static site to `out/`
3. Publishes via the GitHub Pages action

**One-time GitHub setup** (already a GitHub repo at `miloopark/fourthofjuly`):

1. Visit https://github.com/miloopark/fourthofjuly/settings/pages
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main` — the workflow deploys to https://miloopark.github.io/fourthofjuly/

### Other hosts

For Vercel/Netlify/Node: drop the `STATIC_EXPORT` env var and use a normal `npm run build` + `npm start`. The site keeps full Next.js features (image optimization, security headers).
