import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDb } from "@/lib/db/connect";
import { User } from "@/lib/db/models/user";
import { publicUser, setSessionCookie } from "@/lib/server/auth";
import { verifyPassword } from "@/lib/server/password";
import { emailSchema, passwordSchema } from "@/lib/sections";
import { clientIp, handleRouteError, rateLimit } from "@/lib/server/http";

export async function POST(request: Request) {
  try {
    const limited = rateLimit(`login:${clientIp(request)}`, 30, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = z
      .object({ email: emailSchema, password: passwordSchema })
      .parse(await request.json());

    await connectDb();
    const user = await User.findOne({
      email: body.email.toLowerCase(),
      deletedAt: null,
    });

    if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const res = NextResponse.json({ user: publicUser(user) });
    setSessionCookie(res, user._id.toString());
    return res;
  } catch (err) {
    return handleRouteError(err);
  }
}
