import { NextResponse } from "next/server";
import { getPublishedPortfolio } from "@/lib/server/public-portfolio";
import { handleRouteError } from "@/lib/server/http";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const portfolio = await getPublishedPortfolio(slug);
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }
    return NextResponse.json({ portfolio });
  } catch (err) {
    return handleRouteError(err);
  }
}
