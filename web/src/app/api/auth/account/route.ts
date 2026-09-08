import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { Portfolio } from "@/lib/db/models/portfolio";
import {
  clearSessionCookie,
  requireSessionUser,
} from "@/lib/server/auth";
import { handleRouteError } from "@/lib/server/http";

export async function DELETE() {
  try {
    const user = await requireSessionUser();
    await connectDb();

    user.deletedAt = new Date();
    user.emailVerificationTokenHash = null;
    user.passwordResetTokenHash = null;
    await user.save();
    await Portfolio.deleteOne({ userId: user._id });

    const res = NextResponse.json({ ok: true });
    clearSessionCookie(res);
    return res;
  } catch (err) {
    return handleRouteError(err);
  }
}
