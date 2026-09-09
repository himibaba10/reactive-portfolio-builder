import { NextResponse } from "next/server";
import {
  getSessionUser,
  publicUser,
  setSessionCookie,
} from "@/lib/server/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Sliding session: refresh cookie so activity keeps you signed in.
  const res = NextResponse.json({ user: publicUser(user) });
  setSessionCookie(res, user._id.toString());
  return res;
}
