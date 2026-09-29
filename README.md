# EV Grid Energy — Website

Public marketing and lead-generation site for EV Grid Energy.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, sitemap and Open Graph. |
| `LEAD_WEBHOOK_URL` | Where site-assessment and contact submissions are POSTed as JSON. **If unset, leads are only logged on the server — nothing is delivered.** |

## Structure

```
src/
  app/                  routes (one folder per public page, /api/leads)
  components/
    layout/             header, footer, logo
    navigation/         desktop dropdowns, mobile menu, search dialog
    home/               homepage sections
    equipment/ industries/ services/ management/
    forms/              site assessment + contact forms, shared fields
    templates/          PageHero and reusable content blocks
    ui/                 Button, Container, SectionHeading, Reveal, CroppedImage…
  data/                 all repeated content (solutions, equipment, services,
                        management capabilities, navigation, image registry)
  lib/
    leads/              shared validation schema + delivery (webhook)
    metadata.ts         per-page SEO helper
```

Content changes (copy, new solutions, equipment categories, services) are made in `src/data/*`; pages and navigation are generated from it.

## Imagery

All images live in `public/` exactly as supplied and are registered in `src/data/images.ts`.

- The equipment lineup (`public/images/equipment/level-2-charger.png`) contains all five equipment categories. Individual category visuals are CSS crops of that one file (`crop` in `src/data/equipment.ts`).
- The dashboard image (`public/images/services/monitoring.png`) has a checkerboard baked into its background. `DashboardVisual` clips it to the monitor and phone shapes with CSS `clip-path` (`dashboardClips` in `images.ts`). A true transparent export would allow removing the clipping.
- The logo has one (dark) version, so it is only placed on light surfaces.

## Platform & integrations

- **EV Grid Management** capabilities live in `src/data/management.ts`. Each has an optional `status` (`available` / `coming-soon` / `planned`); a badge appears only when a status is set.
- Equipment is modelled by category with an optional `partnerIds` field, so manufacturers can be attached later without tying the site to one supplier.
- Leads carry `stage: "lead"` and site assessments carry an `attachments` array, ready for a CRM / EV Grid Operations system and future document uploads.
- `/login` is a placeholder; no authentication exists yet.
