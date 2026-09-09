import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { Portfolio } from "@/lib/db/models/portfolio";
import {
  banClerkUser,
  requireSessionUser,
} from "@/lib/server/auth";
import { handleRouteError } from "@/lib/server/http";

export async function DELETE() {
  try {
    const user = await requireSessionUser();
    const { sessionId } = await auth();
    await connectDb();

    user.deletedAt = new Date();
    await user.save();
    await Portfolio.deleteOne({ userId: user._id });

    try {
      await banClerkUser(user.clerkId);
    } catch {
      // Local soft-delete still stands if Clerk ban fails.
    }

    if (sessionId) {
      try {
        const { clerkClient } = await import("@clerk/nextjs/server");
        const client = await clerkClient();
        await client.sessions.revokeSession(sessionId);
      } catch {
        // Client will redirect home regardless.
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err);
  }
}
