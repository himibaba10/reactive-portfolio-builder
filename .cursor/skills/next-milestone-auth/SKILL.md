---
name: next-milestone-auth
description: How to implement the auth milestone for Reactive Portfolio Builder without violating MVP constraints.
---

# Skill: Auth milestone

Only use when the user asks to implement authentication.

## Scope

Email/password signup + login + logout + verify email + forgot/reset password + soft-delete account.

## Steps

1. Add Mongoose `User` model in `web/` (server-only module)
2. Wire Next.js Route Handlers (or Server Actions) + httpOnly cookie session/JWT
3. Add Next.js pages: `/signup`, `/login`, `/forgot-password`, `/reset-password`, `/verify`
4. Protect future `/dashboard` and `/editor` behind auth
5. Soft-delete sets `deletedAt` and blocks login; free portfolio slug

## Do not include

OAuth, magic link, billing gates, multi-tenant orgs, a separate Express API.
