# Reactive Portfolio Builder — Agent Brief

Read this file first in every new chat. It is the source of truth for product, architecture, and working conventions.

## Product

**Name:** Reactive Portfolio Builder (`Reactive` short)  
**Tagline:** One page. Your slug. Strictly beautiful.  
**Repo:** https://github.com/himibaba10/reactive-portfolio-builder  
**Pricing:** Free MVP only (no billing yet)

### Locked MVP rules

1. Auth: email + password only; email verification before publish; password reset; account soft-delete
2. Exactly **one portfolio** per user (second create → 409)
3. Sections: **prebuilt only** (Hero, About, Skills, Projects, Experience, Education, Contact) — no custom section types; each type at most once; reorder + hide allowed
4. Public URL: `/{slug}` on the same Next.js host (e.g. `…/daniel-portfolio`)
5. One-page public portfolios only
6. Themes: **strict presets** with exactly 5 tokens — `primary`, `secondary`, `accent`, `textDark`, `textLight` (no custom hex in MVP)
7. Out of scope for now: OAuth, billing, custom domains, custom sections, multi-page, admin panel, analytics, contact-form backend, PDF export

### User journey (target)

Sign up → verify email → create portfolio (title + slug + palette) → compose sections → publish → live at `/{slug}` → edit / change slug / unpublish / delete portfolio · soft-delete account

## Repo layout

```text
/
  AGENTS.md                 ← you are here
  .cursor/rules/            ← scoped Cursor rules (.mdc)
  .cursor/agents/           ← specialist subagents
  src/                      ← Next.js 16 App Router (UI + server)
  package.json              ← app + scripts
```

## Stack

| Layer | Choice |
| --- | --- |
| App | Next.js (App Router) — UI + Route Handlers / Server Actions |
| UI | React 19, Tailwind CSS 4, GSAP + `@gsap/react`, shadcn-ready primitives |
| DB | MongoDB Atlas |
| Email | Resend (console fallback locally) |
| Rate limit | Upstash Redis (in-memory fallback locally) |
| Hosting (planned) | Vercel · DB → Atlas |

## Current shipped milestone

**App MVP surface:**

- Landing page with GSAP motion
- Auth (email/password, verify, reset, soft-delete) via Route Handlers
- One portfolio per user · sections editor · publish/unpublish
- Public SSR page at `/{slug}`
- Requires MongoDB (`MONGODB_URI`) + `JWT_SECRET` in `.env`

## Commands

```bash
pnpm install
cp .env.example .env   # then edit secrets
pnpm dev               # http://localhost:3000
pnpm build
```

## Agent priorities

1. Prefer **Server Components**; client components only for interactivity / GSAP
2. Keep components **composed** (small section files, thin motion islands)
3. Follow the design system in `.cursor/rules/design-system.mdc`
4. Do not invent product features that violate Locked MVP rules
5. Server logic lives in Next.js (`src/app/api`, Server Actions) — **no separate Express app**
6. When adding auth/portfolio later, keep one-portfolio + prebuilt sections + 5-token presets

## Where details live

| Topic | File |
| --- | --- |
| Design tokens / landing UI rules | `.cursor/rules/design-system.mdc` |
| Frontend patterns | `.cursor/rules/frontend.mdc` + `AGENTS.md` (Next block may live in repo root) |
| Server / data model | `.cursor/rules/api.mdc` |
| Product always-on | `.cursor/rules/product.mdc` |
| Landing motion specialist | `.cursor/agents/landing-motion.md` |
| Frontend QA specialist | `.cursor/agents/frontend-qa.md` |
| Landing content/data | `src/lib/landing-content.ts` |
| Landing composition | `src/components/landing/` |
