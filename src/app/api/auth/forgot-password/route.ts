import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDb } from "@/lib/db/connect";
import { User } from "@/lib/db/models/user";
import { serverConfig } from "@/lib/server/config";
import { sendPasswordResetEmail } from "@/lib/server/email";
import {
  createOpaqueToken,
  hashOpaqueToken,
} from "@/lib/server/tokens";
import { emailSchema } from "@/lib/sections";
import { clientIp, handleRouteError, rateLimit } from "@/lib/server/http";

export async function POST(request: Request) {
  try {
    const limited = await rateLimit(
      `forgot:${clientIp(request)}`,
      20,
      15 * 60 * 1000,
    );
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = z.object({ email: emailSchema }).parse(await request.json());
    await connectDb();

    const user = await User.findOne({
      email: body.email.toLowerCase(),
      deletedAt: null,
    });

    if (!user) {
      return NextResponse.json({ ok: true });
    }

    const resetToken = createOpaqueToken();
    user.passwordResetTokenHash = hashOpaqueToken(resetToken);
    user.passwordResetExpiresAt = new Date(Date.now() + 1000 * 60 * 60);
    await user.save();

    const resetUrl = `${serverConfig.appUrl}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    return NextResponse.json({
      ok: true,
      ...(!serverConfig.isProd || !serverConfig.resendApiKey
        ? { resetUrl }
        : {}),
    });
  } catch (err) {
    return handleRouteError(err);
  }
}
