<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Web app agent notes

Also read root `AGENTS.md` and `.cursor/rules/{product,design-system,frontend}.mdc`.

## Structure

- `src/app/` — routes (`page.tsx` stays a thin Server Component)
- `src/components/landing/` — composed landing sections (prefer RSC)
- `src/components/landing/motion/` — GSAP client islands
- `src/components/ui/` — small primitives (ButtonLink today)
- `src/lib/landing-content.ts` — marketing + palette data
- `src/lib/utils.ts` — `cn()`

## When editing UI

Follow design-system tokens. Keep brand-first heroes. Test mobile and desktop after visual changes.
