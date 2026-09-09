import "server-only";
import type { PortfolioDocument } from "@/lib/db/models/portfolio";
import {
  clampSectionVariant,
  isAlwaysVisibleSectionType,
  type SectionType,
} from "@/lib/sections";
import { sanitizePaletteTokens, type PaletteTokens } from "@/lib/palette";

function serializeCustomPalette(
  value: PortfolioDocument["customPalette"],
): PaletteTokens | null {
  if (!value) return null;
  return sanitizePaletteTokens(value);
}

export function serializePortfolio(doc: PortfolioDocument) {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    title: doc.title,
    slug: doc.slug,
    status: doc.status,
    paletteId: doc.paletteId,
    customPalette: serializeCustomPalette(doc.customPalette),
    sections: doc.sections.map((section) => ({
      id: section.id,
      type: section.type,
      order: section.order,
      visible: isAlwaysVisibleSectionType(section.type as SectionType)
        ? true
        : section.visible,
      variant: clampSectionVariant(
        section.type as SectionType,
        section.variant,
      ),
      data: section.data || {},
    })),
    publishedAt: doc.publishedAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
