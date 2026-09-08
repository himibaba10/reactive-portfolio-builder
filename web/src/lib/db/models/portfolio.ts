import "server-only";
import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { PALETTE_IDS, SECTION_TYPES } from "@/lib/sections";

const sectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, enum: SECTION_TYPES, required: true },
    order: { type: Number, required: true },
    visible: { type: Boolean, default: true },
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

export type PortfolioDocument = InferSchemaType<typeof portfolioSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Portfolio: Model<PortfolioDocument> =
  (mongoose.models.Portfolio as Model<PortfolioDocument>) ||
  mongoose.model<PortfolioDocument>("Portfolio", portfolioSchema);
