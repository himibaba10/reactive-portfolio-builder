import "server-only";
import type { PortfolioDocument } from "@/lib/db/models/portfolio";

export function serializePortfolio(doc: PortfolioDocument) {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    title: doc.title,
    slug: doc.slug,
    status: doc.status,
    paletteId: doc.paletteId,
    sections: doc.sections,
    publishedAt: doc.publishedAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
