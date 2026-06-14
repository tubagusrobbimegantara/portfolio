# Tubagus Robbi Megantara — Academic Portfolio

Personal academic portfolio for **Tubagus Robbi Megantara**, lecturer and researcher in applied mathematics at FMIPA. Built with Astro 5 and deployed on Cloudflare Workers.

## Features

- Bilingual (Indonesian / English) with Astro built-in i18n routing
- Indonesian is the default locale (`/`, `/about`, etc.); English at `/en/`, `/en/about`, etc.
- DRY page architecture — shared page components accept a `lang` prop, thin wrappers in `src/pages/` pass locale through
- Light theme with deep navy accent (`#1e40af`), Google Fonts (Nunito, Inter, JetBrains Mono)
- Floating math-symbol canvas background animation
- Scroll-reveal via IntersectionObserver
- Mobile-responsive with hamburger nav
- Sitemap generation via `@astrojs/sitemap`
- Deployed as a Cloudflare Worker (SSR via `@astrojs/cloudflare`)

## Pages

| Route | Description |
| :---- | :---------- |
| `/` | Home — hero, stats strip, nav cards, recent updates |
| `/about` | About — bio, info card, education timeline, current roles |
| `/research` | Research — 4 research area cards, current focus section |
| `/publications` | Publications — tabbed filter (Optimization / Fuzzy / ML), 8 papers |
| `/contact` | Contact — links, collaboration card |
| `/en/*` | English versions of all pages above |

> **Projects page** (`/projects`) is stubbed and hidden from navigation — content coming soon.

## Project Structure

```
src/
  components/
    pages/          # Shared page components (accept lang prop)
      HomePage.astro
      AboutPage.astro
      ResearchPage.astro
      PublicationsPage.astro
      ContactPage.astro
      TeachingPage.astro  # stub for future Projects page
    BaseHead.astro
    Header.astro    # Nav with lang switcher (ID / EN)
    Footer.astro
  i18n/
    en.ts           # English translations (type source: Translations)
    id.ts           # Indonesian translations (typed against Translations)
    index.ts        # getTranslations(lang) helper
  layouts/
    Layout.astro    # Master layout: canvas + Header + slot + Footer + scripts
  pages/
    index.astro     # Indonesian pages (thin wrappers)
    about.astro
    research.astro
    publications.astro
    contact.astro
    en/             # English pages (thin wrappers)
      index.astro
      about.astro
      ...
  styles/
    global.css
public/
  math-bg.js        # Floating math symbols canvas animation
  site.js           # Mobile menu toggle + scroll reveal
  favicon.svg
```

## i18n

Translations live in `src/i18n/en.ts` (the type source) and `src/i18n/id.ts`. All translation keys are nested TypeScript objects. To add or update text, edit the relevant key in both files.

```ts
// src/i18n/index.ts
import { getTranslations } from './i18n';
const t = getTranslations('id'); // or 'en'
t.home.h1line1; // typed
```

## Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` (or next available port) |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run deploy` | Deploy to Cloudflare Workers |
