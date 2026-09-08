import "server-only";
import type { PortfolioDocument } from "@/lib/db/models/portfolio";
import {
  clampSectionVariant,
  type SectionType,
} from "@/lib/sections";

export function serializePortfolio(doc: PortfolioDocument) {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    title: doc.title,
    slug: doc.slug,
    status: doc.status,
    paletteId: doc.paletteId,
    sections: doc.sections.map((section) => ({
      id: section.id,
      type: section.type,
      order: section.order,
      visible: section.visible,
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
