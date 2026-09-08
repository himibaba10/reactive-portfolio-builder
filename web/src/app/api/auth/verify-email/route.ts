import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDb } from "@/lib/db/connect";
import { User } from "@/lib/db/models/user";
import { publicUser, setSessionCookie } from "@/lib/server/auth";
import { hashOpaqueToken } from "@/lib/server/tokens";
import { clientIp, handleRouteError, rateLimit } from "@/lib/server/http";

export async function POST(request: Request) {
  try {
    const limited = await rateLimit(
      `verify:${clientIp(request)}`,
      30,
      15 * 60 * 1000,
    );
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = z.object({ token: z.string().min(20) }).parse(await request.json());
    await connectDb();

    const user = await User.findOne({
      emailVerificationTokenHash: hashOpaqueToken(body.token),
      deletedAt: null,
    });

    if (
      !user ||
      !user.emailVerificationExpiresAt ||
      user.emailVerificationExpiresAt < new Date()
    ) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }

    user.isEmailVerified = true;
    user.emailVerificationTokenHash = null;
    user.emailVerificationExpiresAt = null;
    await user.save();

    const res = NextResponse.json({ user: publicUser(user) });
    setSessionCookie(res, user._id.toString());
    return res;
  } catch (err) {
    return handleRouteError(err);
  }
}
