# Portfolio — Baptiste Poulain

## About

Personal portfolio website for **Baptiste Poulain**, Frontend Engineer at SFEIR (currently working on L'Oréal GPT). The site itself is a showcase of animation skills — every effect is hand-crafted to demonstrate expertise in UI/UX, motion design, and micro-interactions.

Baptiste also runs his own company, available for website projects for small businesses and startups.

**Status:** Work in progress. The home page, contact page, and legal pages are functional. Projects section is under construction.

## Quick Reference

| | |
|---|---|
| **Dev server** | `npm run dev` (Vite) |
| **Build** | `npm run build` (tsc + Vite) |
| **Lint** | `npm run lint` |
| **Preview prod** | `npm run preview` |
| **Deploy** | Vercel (static SPA) |
| **Package manager** | npm (bun.lock also present) |

## Tech Stack

- **Framework:** React 19 + TypeScript 5.8 (strict mode)
- **Build:** Vite 6
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 4 (OKLCH design tokens via CSS custom properties)
- **UI base:** shadcn/ui (new-york style) + Radix UI primitives
- **Animations:** Framer Motion 12 (primary), OGL for WebGL effects
- **Icons:** Lucide React
- **i18n:** i18next (English, French, German)
- **Fonts:** Nunito Sans (body), Space Grotesk (headings), Sentient (display, custom woff2)

## Project Structure

```
src/
├── assets/fonts/            # Custom Sentient font files
├── components/
│   ├── ui/                  # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── fragments/           # Page sections (navbar, footer, hero, experience)
│   ├── dynamic-island/      # Apple-style Dynamic Island navbar
│   ├── wave/                # Custom SVG wave animations (3 variants)
│   ├── theme/               # ThemeProvider + ThemeSwitcher (light/dark)
│   ├── language/            # LanguageToggle component
│   ├── FlutedGlass.tsx      # 3D fluted glass effect (canvas + perspective)
│   ├── Grainient.tsx        # WebGL procedural gradient (OGL + fragment shader)
│   ├── text-reveal.tsx      # Character-by-character scroll reveal
│   └── background-pattern.tsx
├── pages/
│   ├── Home.tsx             # Landing: hero, portrait wave, experience, under-construction
│   ├── Contact.tsx          # Contact form + methods grid
│   ├── LegalMentions.tsx    # Legal page (placeholder)
│   ├── PrivacyPolicy.tsx    # Privacy page (placeholder)
│   ├── Test.tsx             # Dev sandbox ("The Lab")
│   └── ImageGenerator.tsx   # Experimental canvas page
├── locales/{en,fr,de}/      # Translation JSON files
├── lib/
│   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   └── i18n.ts              # i18next config (detection: localStorage → navigator)
├── index.css                # Global styles, Tailwind imports, design tokens
├── App.tsx                  # Router + ThemeProvider + layout logic
└── main.tsx                 # React entry point
```

## Key Conventions

- **Components:** PascalCase filenames and exports, functional components with hooks
- **Utilities:** camelCase, kept in `src/lib/`
- **Styling:** Tailwind utility classes in JSX, no CSS modules. CVA for component variants. Design tokens as CSS custom properties in `index.css`
- **Animations:** Framer Motion `motion.*` components, `whileInView` for scroll reveals, spring physics for interactive states
- **State:** React Context (theme), component-level useState, no global store
- **Translations:** `useTranslation()` hook, keys organized by section in JSON files
- **Path alias:** `@/` → `./src/` (configured in Vite + tsconfig)
- **Theme:** `.dark` class on `<html>`, persisted in localStorage (`vite-ui-theme`)
- **Default theme:** dark

## Animation Inventory

| Component | Technique | Description |
|---|---|---|
| `WaveAnimation` / `WaveAnimation2` | Framer Motion `useTime` + SVG | Real-time sine/cosine wave with stroke masking |
| `PortraitWave` | SVG + image composition | Portrait photo over animated wave (amber/orange) |
| `TextReveal` | Framer Motion `whileInView` | Per-character staggered entrance on scroll |
| `Dynamic Island` | Framer Motion layout animations | Spring-based navbar state transitions |
| `FlutedGlass` | Canvas + CSS 3D transforms | Perspective rotateY panes with blur |
| `Grainient` | OGL WebGL + GLSL shader | Procedural animated gradient with grain |
| Experience cards | Framer Motion scroll | Slide-in from sides, icon scale-in |
| Under Construction | Framer Motion | Floating/oscillating particle icons |
| Theme switcher | Framer Motion | Rotation on toggle |

## Design Tokens (index.css)

Colors use **OKLCH** color space. Key custom properties:

```
--background, --foreground, --primary, --secondary, --accent, --destructive
--card, --popover, --muted, --border, --input, --ring, --chart-1..5
```

Accent palette (orb graphics): `--orb-100` through `--orb-400` (#FAECDB → #CB3600)

Fonts: `--font-sans` (Nunito Sans), `--font-display` (Sentient), `--font-heading` (Space Grotesk)

Border radius base: `0.625rem` with calculated scale (sm → 4xl)

## Routes

| Path | Page | Navbar | Footer |
|---|---|---|---|
| `/` | Home | Hidden (has Dynamic Island) | Yes |
| `/contact` | Contact | Yes | Yes |
| `/legal-mentions` | Legal Mentions | Yes | Yes |
| `/privacy-policy` | Privacy Policy | Yes | Yes |
| `/test` | Dev sandbox | Hidden | Hidden |
| `/image` | Image experiment | Hidden | Hidden |

## Professional Background (for content context)

- **Current:** Frontend Engineer at L'Oréal × SFEIR (May 2025–present) — L'Oréal GPT AI tool
- **Previous:** Fullstack Developer at Decathlon & Adeo via SFEIR (2023–2025) — Bruno open-source, customs management, Beauty Tech
- **Previous:** Apprentice at WeLoveDevs (2021–2023) — 2-year Master's apprenticeship
- **Previous:** Apprentice at Willemse France (2020–2021)
- **Specialties:** TypeScript, React, React Native & Expo, animations, UX
- **Contact:** bpoulainpro@gmail.com
- **Side:** Runs own company for freelance web projects

## What's Missing / TODO

- Projects showcase page (currently "Under Construction")
- Contact form submission handler (no backend/API wired)
- Legal/Privacy pages use placeholder text
- No testing setup (no unit/integration/e2e tests)
- No CI/CD config (deployed manually or via Vercel auto-deploy)
- No .env or backend configuration
