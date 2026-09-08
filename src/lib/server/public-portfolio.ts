import { connectDb } from "@/lib/db/connect";
import { Portfolio } from "@/lib/db/models/portfolio";
import { normalizeSlug } from "@/lib/slug";
import type { PortfolioSection } from "@/lib/api-client";

export type PublicPortfolio = {
  title: string;
  slug: string;
  paletteId: string;
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
    .sort((a, b) => a.order - b.order) as PortfolioSection[];

  return {
    title: portfolio.title,
    slug: portfolio.slug,
    paletteId: portfolio.paletteId,
    sections,
    publishedAt: portfolio.publishedAt ?? null,
  };
}
