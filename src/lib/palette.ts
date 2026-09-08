import type { CSSProperties } from "react";
import { palettes } from "@/lib/landing-content";

export const CUSTOM_PALETTE_ID = "custom" as const;

export type PaletteTokens = {
  primary: string;
  secondary: string;
  accent: string;
  textDark: string;
  textLight: string;
};

export type PaletteTokenKey = keyof PaletteTokens;

export const PALETTE_TOKEN_KEYS = [
  "secondary",
  "primary",
  "accent",
  "textLight",
  "textDark",
] as const satisfies readonly PaletteTokenKey[];

/** Ordered for the strip UI (matches historical tokenLabels order). */
export const PALETTE_TOKEN_STRIP = [
  "primary",
  "secondary",
  "accent",
  "textDark",
  "textLight",
] as const satisfies readonly PaletteTokenKey[];

export type TokenTone = "dark" | "light" | "any";

export const PALETTE_TOKEN_GUIDE: Record<
  PaletteTokenKey,
  {
    label: string;
    role: string;
    hint: string;
    tone: TokenTone;
    sample: string;
  }
> = {
  secondary: {
    label: "Page background",
    role: "Secondary",
    hint: "The full-page canvas. Keep this dark so light body text stays readable.",
    tone: "dark",
    sample: "Used as the portfolio background.",
  },
  primary: {
    label: "Brand / buttons",
    role: "Primary",
    hint: "Buttons, banners, and tinted panels. Usually a vivid brand color.",
    tone: "any",
    sample: "CTA pills and primary surfaces.",
  },
  accent: {
    label: "Highlight",
    role: "Accent",
    hint: "Eyebrows, dots, and small emphasis. Pick something that pops on the background.",
    tone: "any",
    sample: "Section labels and timeline marks.",
  },
  textLight: {
    label: "Body text (on dark)",
    role: "Text light",
    hint: "Main copy on the dark page background. Keep this light / near-white.",
    tone: "light",
    sample: "Default text color on the page.",
  },
  textDark: {
    label: "Text on brand (on light)",
    role: "Text dark",
    hint: "Text sitting on primary buttons/banners. Keep this dark for contrast.",
    tone: "dark",
    sample: "Type on primary CTAs.",
  },
};

export const DEFAULT_CUSTOM_PALETTE: PaletteTokens = {
  primary: "#D6FF3F",
  secondary: "#12141A",
  accent: "#5B8CFF",
  textDark: "#0A0B0D",
  textLight: "#F4F5F0",
};

const HEX_RE = /^#([0-9a-fA-F]{6})$/;

export function isHexColor(value: string): boolean {
  return HEX_RE.test(value.trim());
}

export function normalizeHex(value: string): string {
  const v = value.trim();
  if (HEX_RE.test(v)) return `#${v.slice(1).toUpperCase()}`;
  return v;
}

export function sanitizePaletteTokens(
  input: Partial<PaletteTokens> | null | undefined,
  fallback: PaletteTokens = DEFAULT_CUSTOM_PALETTE,
): PaletteTokens {
  const next = { ...fallback };
  for (const key of PALETTE_TOKEN_STRIP) {
    const raw = input?.[key];
    if (typeof raw === "string" && isHexColor(raw)) {
      next[key] = normalizeHex(raw);
    }
  }
  return next;
}

function parseRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!isHexColor(hex)) return null;
  const n = Number.parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** Relative luminance 0–1 (sRGB). */
export function relativeLuminance(hex: string): number | null {
  const rgb = parseRgb(hex);
  if (!rgb) return null;
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = channel(rgb.r);
  const g = channel(rgb.g);
  const b = channel(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number | null {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  if (la == null || lb == null) return null;
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

export function toneHint(
  hex: string,
  expected: TokenTone,
): "ok" | "warn" | "invalid" {
  if (!isHexColor(hex)) return "invalid";
  if (expected === "any") return "ok";
  const lum = relativeLuminance(hex);
  if (lum == null) return "invalid";
  if (expected === "dark") return lum <= 0.35 ? "ok" : "warn";
  return lum >= 0.65 ? "ok" : "warn";
}

export type ResolvedPalette = {
  id: string;
  name: string;
  tokens: PaletteTokens;
};

export function getPalette(
  paletteId: string,
  customTokens?: Partial<PaletteTokens> | null,
): ResolvedPalette {
  if (paletteId === CUSTOM_PALETTE_ID) {
    return {
      id: CUSTOM_PALETTE_ID,
      name: "Custom",
      tokens: sanitizePaletteTokens(customTokens),
    };
  }

  const preset =
    palettes.find((p) => p.id === paletteId) ??
    palettes.find((p) => p.id === "signal")!;

  return {
    id: preset.id,
    name: preset.name,
    tokens: { ...preset.tokens },
  };
}

export function paletteCssVars(tokens: PaletteTokens): CSSProperties {
  return {
    ["--p-primary" as string]: tokens.primary,
    ["--p-secondary" as string]: tokens.secondary,
    ["--p-accent" as string]: tokens.accent,
    ["--p-text-dark" as string]: tokens.textDark,
    ["--p-text-light" as string]: tokens.textLight,
  };
}
