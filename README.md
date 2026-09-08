# Reactive Portfolio Builder

Free MVP portfolio builder: one portfolio per user, prebuilt sections, strict five-token palettes, public slug URLs.

## Stack

- **web** — Next.js (App Router), Tailwind CSS, GSAP, shadcn-ready primitives
- **api** — Express + Mongoose (stub health route for now)
- **db** — MongoDB Atlas (wired in a later milestone)

## Apps

```bash
pnpm install
pnpm dev:web   # http://localhost:3000
pnpm dev:api   # http://localhost:4000/health
```

## Current milestone

Landing page only:

- Server-composed sections
- Client GSAP islands (preloader, hero reveal, marquee, horizontal section gallery, palette stagger, CTA, magnetic buttons)
- Placeholder `/signup` route

## Product rules (locked)

- Email/password auth (later)
- Soft-delete accounts
- Exactly one portfolio per user
- Prebuilt sections only
- Public URL: `/{slug}`
