# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build to dist/
npm run preview  # Serve the built bundle locally
npm run lint     # ESLint over the repo (config in eslint.config.js)
```

There is no test runner configured.

## Architecture

This is a single-page React 19 marketing site for the CubeFit fitness coaching app, built with Vite. It is intentionally a one-page long-form product narrative, not a multi-route app.

**Two files do almost all of the work:**

- `src/App.jsx` — every section, every piece of copy, and every reusable list (e.g. `navLinks`, `coachTools`, `clientTools`, `featureGrid`, `screenGallery`, `faqs`, `mealImportColumns`). Editing content means editing these arrays, not creating new components.
- `src/index.css` — the entire visual system: tokens (`:root` custom properties for `--bg`, `--accent`, `--accent-alt`, `--radius`, etc.), layout, responsive behavior, reveal animations, aurora background. There is no Tailwind or CSS-in-JS.

**Cross-file invariants to preserve when editing:**

- Sticky nav uses anchor jumps. Each entry in `navLinks` (`{ id, label }`) must correspond to a `<section id="...">` in `App.jsx`. Adding a nav item without the matching section (or vice versa) silently breaks scrolling.
- Reveal-on-scroll is driven by an `IntersectionObserver` in `App.jsx` that toggles `is-visible` on any element with `data-reveal`. Children of a reveal container that should stagger in get `data-reveal-child` — the effect computes `--reveal-delay` from the child's index. New animated elements need these attributes; do not invent new mechanisms.
- The pointer-spotlight glow on cards is also wired in `App.jsx`: a single effect attaches `pointermove` listeners to a fixed selector list (`.panel, .comparison-card, .feature-card, .screen-card, .faq-card, .video-panel, .cta, .pill-card, .glass-card`) and writes `--mx` / `--my` custom properties that the CSS reads. New card variants that should glow must either use one of those classes or be added to the selector list.
- `screenGallery[].src` entries reference files in `public/screens/` and are served from the site root (e.g. `/screens/login.png`). The directory currently exists but may be empty in some checkouts — missing files render broken images, not errors.
- The CSV import schema is duplicated in three places that must stay in sync: the `mealImportColumns` array in `App.jsx`, the actual file at `public/templates/cubefit-meal-import-template.csv`, and the schema documented in `README.md`. The download link in App.jsx (`/templates/cubefit-meal-import-template.csv`) is hard-coded.

**Lint rule worth knowing:** `no-unused-vars` ignores identifiers starting with a capital letter or underscore (`varsIgnorePattern: '^[A-Z_]'`), which is what allows component-style imports/declarations to remain even when temporarily unreferenced.

**Brand/visual direction** (from `docs/content-spec.md`): deep charcoal background, electric green + cyan accents, glassmorphism cards, cinematic motion. Keep new UI consistent with the existing token set in `:root` rather than introducing new colors or radii.
