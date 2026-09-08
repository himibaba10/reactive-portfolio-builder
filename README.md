# Reactive Portfolio Builder

Free MVP portfolio builder: one portfolio per user, prebuilt sections, strict five-token palettes, public slug URLs.

## Agent context (important)

This repo is set up for Cursor agents. After `git pull`, open the project in Cursor — new chats should load:

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Product + architecture brief |
| `.cursor/rules/*.mdc` | Scoped rules (product, design, frontend, api) |
| `.cursor/agents/*.md` | Specialist subagents (`/landing-motion`, `/frontend-qa`, `/mvp-planner`) |

## Stack

- **web** — Next.js (App Router) for UI + server (Route Handlers / Server Actions)
- **db** — MongoDB Atlas (wired in a later milestone)

## Apps

```bash
pnpm install
pnpm dev   # http://localhost:3000
```

## Current milestone

MVP app surface on Next.js only:

- Landing + GSAP motion
- Auth (signup/login/verify/reset/soft-delete)
- One portfolio · editor · publish
- Public `/{slug}`
- Copy `web/.env.example` → `web/.env` and set MongoDB + JWT

## Product rules (locked)

- Email/password auth (later)
- Soft-delete accounts
- Exactly one portfolio per user
- Prebuilt sections only
- Public URL: `/{slug}`
- Palette presets with 5 tokens only
