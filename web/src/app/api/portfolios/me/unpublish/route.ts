import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { Portfolio } from "@/lib/db/models/portfolio";
import { requireSessionUser } from "@/lib/server/auth";
import { serializePortfolio } from "@/lib/server/portfolio";
import { handleRouteError } from "@/lib/server/http";

export async function POST() {
  try {
    const user = await requireSessionUser();
    await connectDb();
    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    portfolio.status = "draft";
    await portfolio.save();

    return NextResponse.json({ portfolio: serializePortfolio(portfolio) });
  } catch (err) {
    return handleRouteError(err);
  }
}
