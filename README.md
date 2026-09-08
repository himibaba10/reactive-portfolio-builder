# Reactive Portfolio Builder

Free MVP portfolio builder: one portfolio per user, prebuilt sections, strict five-token palettes, public slug URLs.

## Stack

- **web** — Next.js (App Router) for UI + server (Route Handlers)
- **db** — MongoDB Atlas
- **email** — Resend (optional in local; console fallback)
- **rate limit** — Upstash Redis (optional in local; memory fallback)

## Local setup

```bash
pnpm install
cp web/.env.example web/.env
# set MONGODB_URI, JWT_SECRET, NEXT_PUBLIC_APP_URL
pnpm dev   # http://localhost:3000
```

Optional in `.env`:

- `RESEND_API_KEY` + `EMAIL_FROM` — real verification/reset emails
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — serverless rate limits

Without Resend, verify/reset links are logged to the server console and returned in non-prod API responses.

## Deploy (Vercel)

1. Import the GitHub repo in Vercel
2. Set **Root Directory** to `web`
3. Add env vars:
   - `MONGODB_URI`
   - `JWT_SECRET` (long random string)
   - `NEXT_PUBLIC_APP_URL` (your production URL, e.g. `https://your-app.vercel.app`)
   - `RESEND_API_KEY` + `EMAIL_FROM` (recommended in prod)
   - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (recommended in prod)
4. Deploy, then smoke: signup → verify → create → publish → `/{slug}`

## Product rules (locked)

- Email/password auth
- Soft-delete accounts
- Exactly one portfolio per user
- Prebuilt sections only
- Public URL: `/{slug}`
- Palette presets with 5 tokens only
