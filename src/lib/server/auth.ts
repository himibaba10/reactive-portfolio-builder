import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { User, type UserDocument } from "@/lib/db/models/user";
import { serverConfig } from "@/lib/server/config";
import { signSession, verifySession } from "@/lib/server/tokens";

export function publicUser(user: UserDocument) {
  return {
    id: user._id.toString(),
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
}

function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: serverConfig.cookieSecure,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
  };
}

export function setSessionCookie(res: NextResponse, userId: string) {
  const token = signSession(userId);
  res.cookies.set(
    serverConfig.cookieName,
    token,
    sessionCookieOptions(serverConfig.sessionMaxAgeSec),
  );
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(serverConfig.cookieName, "", {
    ...sessionCookieOptions(0),
    expires: new Date(0),
  });
}

export async function getSessionUser(): Promise<UserDocument | null> {
  const jar = await cookies();
  const token = jar.get(serverConfig.cookieName)?.value;
  if (!token) return null;

  try {
    const payload = verifySession(token);
    await connectDb();
    const user = await User.findById(payload.sub);
    if (!user || user.deletedAt) return null;
    return user;
  } catch {
    return null;
  }
}

export async function requireSessionUser(): Promise<UserDocument> {
  const user = await getSessionUser();
  if (!user) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }
  return user;
}

export function jsonError(message: string, status: number, extra?: object) {
  return NextResponse.json({ error: message, ...extra }, { status });
}
