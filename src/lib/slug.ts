export const RESERVED_SLUGS = [
  "login",
  "signup",
  "dashboard",
  "editor",
  "api",
  "forgot-password",
  "reset-password",
  "verify",
  "health",
  "public",
  "settings",
  "account",
  "admin",
  "www",
  "static",
  "_next",
  "favicon",
  "brand",
  "auth",
  "portfolios",
] as const;

export function normalizeSlug(input: string) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function isValidSlug(slug: string) {
  if (!slug || slug.length < 2 || slug.length > 48) return false;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return false;
  if ((RESERVED_SLUGS as readonly string[]).includes(slug)) return false;
  return true;
}
