import "server-only";
import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isEmailVerified: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

userSchema.index({ deletedAt: 1 });

export type UserDocument = HydratedDocument<{
  clerkId: string;
  email: string;
  isEmailVerified: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export const User: Model<UserDocument> =
  (mongoose.models.User as Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", userSchema);
