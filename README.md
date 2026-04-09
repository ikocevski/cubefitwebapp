# CubeFit Premium Product Website

Premium, cinematic, conversion-focused marketing + product guide website for the CubeFit fitness coaching app.

## What this site includes

- Full long-form product narrative (not a basic landing page)
- Role-based coach/admin and client workflows
- Detailed feature sections:
  - Workouts
  - Diet plans and meal management
  - Meal CSV import workflow
  - Weight tracking and progress trends
  - Notifications/reminders
  - Subscription access logic
  - Analytics/reporting
- Screen-level gallery covering all major app screens and modals
- Sticky navigation, smooth scrolling, reveal animations, and responsive design

## Project structure

- `src/App.jsx` — full page content, section architecture, reusable data arrays
- `src/index.css` — premium visual system, layout, responsive behavior, motion
- `docs/content-spec.md` — sitemap, section plan, visual direction, content outline, asset list
- `public/templates/cubefit-meal-import-template.csv` — downloadable meal import template

## Meal import template

- Download URL in the website: `/templates/cubefit-meal-import-template.csv`
- Used by coaches/admins to bulk import meal data into CubeFit nutrition workflows
- Current CSV header schema:
  - `name,description,calories,protein,carbs,fats,ingredients,image_url,assigned_to_client_id`

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Brand system summary

- Background: deep charcoal/black with subtle cinematic gradients
- Accent: electric green + cyan
- Tone: premium, focused, elite, trustworthy
- Typography: modern sans-serif with strong headline rhythm
- Motion: subtle reveal transitions and refined hover states

## Next extension options

- Connect CTA to a real waitlist endpoint
- Replace mockup placeholders with real app screenshots
- Add analytics events for section engagement and CTA conversion
- Add dedicated `/pricing` and `/contact` pages when needed
