import "server-only";
import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";
import { PALETTE_IDS, SECTION_TYPES, type SectionType, type PaletteId } from "@/lib/sections";

export type PortfolioSectionDoc = {
  id: string;
  type: SectionType;
  order: number;
  visible: boolean;
  variant: number;
  data: Record<string, unknown>;
};

const sectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, enum: SECTION_TYPES, required: true },
    order: { type: Number, required: true },
    visible: { type: Boolean, default: true },
    variant: { type: Number, default: 1, min: 1, max: 6 },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false },
);

const portfolioSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 80 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    paletteId: {
      type: String,
      enum: PALETTE_IDS,
      default: "signal",
    },
    sections: { type: [sectionSchema], default: [] },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export type PortfolioDocument = HydratedDocument<{
  userId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  status: "draft" | "published";
  paletteId: PaletteId;
  sections: PortfolioSectionDoc[];
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export const Portfolio: Model<PortfolioDocument> =
  (mongoose.models.Portfolio as Model<PortfolioDocument>) ||
  mongoose.model<PortfolioDocument>("Portfolio", portfolioSchema);
