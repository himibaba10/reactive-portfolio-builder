import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { Portfolio } from "@/lib/db/models/portfolio";
import { isValidSlug, normalizeSlug } from "@/lib/slug";
import { clientIp, handleRouteError, rateLimit } from "@/lib/server/http";

export async function GET(request: Request) {
  try {
    const limited = await rateLimit(
      `slug:${clientIp(request)}`,
      60,
      15 * 60 * 1000,
    );
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { searchParams } = new URL(request.url);
    const slug = normalizeSlug(searchParams.get("slug") || "");

    if (!isValidSlug(slug)) {
      return NextResponse.json({ slug, available: false, reason: "invalid" });
    }

    await connectDb();
    const taken = await Portfolio.exists({ slug });
    return NextResponse.json({ slug, available: !taken });
  } catch (err) {
    return handleRouteError(err);
  }
}
