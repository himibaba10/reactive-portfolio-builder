import { connectDb } from "@/lib/db/connect";
import { Portfolio } from "@/lib/db/models/portfolio";
import { normalizeSlug } from "@/lib/slug";
import type { PortfolioSection } from "@/lib/api-client";
import { sanitizePaletteTokens, type PaletteTokens } from "@/lib/palette";
import { clampSectionVariant, type SectionType } from "@/lib/sections";

export type PublicPortfolio = {
  title: string;
  slug: string;
  paletteId: string;
  customPalette: PaletteTokens | null;
  sections: PortfolioSection[];
  publishedAt: Date | string | null;
};

export async function getPublishedPortfolio(
  rawSlug: string,
): Promise<PublicPortfolio | null> {
  const slug = normalizeSlug(rawSlug);
  if (!slug) return null;

  await connectDb();
  const portfolio = await Portfolio.findOne({
    slug,
    status: "published",
  }).lean();

  if (!portfolio) return null;

  const sections = [...(portfolio.sections || [])]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order)
    .map((s) => ({
      id: s.id,
      type: s.type as SectionType,
      order: s.order,
      visible: s.visible,
      variant: clampSectionVariant(
        s.type as SectionType,
        (s as { variant?: number }).variant,
      ),
      data: (s.data || {}) as Record<string, unknown>,
    })) satisfies PortfolioSection[];

  const customPalette = portfolio.customPalette
    ? sanitizePaletteTokens(portfolio.customPalette)
    : null;

  return {
    title: portfolio.title,
    slug: portfolio.slug,
    paletteId: portfolio.paletteId,
    customPalette,
    sections,
    publishedAt: portfolio.publishedAt ?? null,
  };
}
