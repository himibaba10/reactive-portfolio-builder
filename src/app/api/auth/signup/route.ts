import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDb } from "@/lib/db/connect";
import { User } from "@/lib/db/models/user";
import {
  publicUser,
  setSessionCookie,
} from "@/lib/server/auth";
import { serverConfig } from "@/lib/server/config";
import { hashPassword } from "@/lib/server/password";
import {
  createOpaqueToken,
  hashOpaqueToken,
} from "@/lib/server/tokens";
import { emailSchema, passwordSchema } from "@/lib/sections";
import { sendVerificationEmail } from "@/lib/server/email";
import { clientIp, handleRouteError, rateLimit } from "@/lib/server/http";

export async function POST(request: Request) {
  try {
    const limited = await rateLimit(
      `signup:${clientIp(request)}`,
      20,
      15 * 60 * 1000,
    );
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = z
      .object({ email: emailSchema, password: passwordSchema })
      .parse(await request.json());

    await connectDb();

    const existing = await User.findOne({
      email: body.email.toLowerCase(),
      deletedAt: null,
    });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    const verifyToken = createOpaqueToken();
    const user = await User.create({
      email: body.email.toLowerCase(),
      passwordHash: await hashPassword(body.password),
      emailVerificationTokenHash: hashOpaqueToken(verifyToken),
      emailVerificationExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    const verifyUrl = `${serverConfig.appUrl}/verify?token=${verifyToken}`;
    await sendVerificationEmail(user.email, verifyUrl);

    const res = NextResponse.json(
      {
        user: publicUser(user),
        ...(!serverConfig.isProd || !serverConfig.resendApiKey
          ? { verifyUrl }
          : {}),
      },
      { status: 201 },
    );
    setSessionCookie(res, user._id.toString());
    return res;
  } catch (err) {
    return handleRouteError(err);
  }
}
