import { NextResponse } from "next/server";
import { requireSessionUser } from "@/lib/server/auth";
import { serverConfig } from "@/lib/server/config";
import {
  createOpaqueToken,
  hashOpaqueToken,
} from "@/lib/server/tokens";
import { clientIp, handleRouteError, rateLimit } from "@/lib/server/http";

export async function POST(request: Request) {
  try {
    const limited = rateLimit(
      `resend-verify:${clientIp(request)}`,
      10,
      15 * 60 * 1000,
    );
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const user = await requireSessionUser();
    if (user.isEmailVerified) {
      return NextResponse.json({ ok: true, alreadyVerified: true });
    }

    const verifyToken = createOpaqueToken();
    user.emailVerificationTokenHash = hashOpaqueToken(verifyToken);
    user.emailVerificationExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
    await user.save();

    const verifyUrl = `${serverConfig.appUrl}/verify?token=${verifyToken}`;
    console.log(`[verify-email] ${verifyUrl}`);

    return NextResponse.json({
      ok: true,
      ...(serverConfig.isProd ? {} : { verifyUrl }),
    });
  } catch (err) {
    return handleRouteError(err);
  }
}
