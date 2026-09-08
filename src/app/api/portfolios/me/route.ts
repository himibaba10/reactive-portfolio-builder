import { connectDb } from "@/lib/db/connect";
import { Portfolio, type PortfolioDocument } from "@/lib/db/models/portfolio";
import { requireSessionUser } from "@/lib/server/auth";
import { serializePortfolio } from "@/lib/server/portfolio";
import {
  clampSectionVariant,
  createDefaultSections,
  paletteIdSchema,
  sectionTypeSchema,
  sectionVariantSchema,
  type SectionType,
} from "@/lib/sections";
import { isValidSlug, normalizeSlug } from "@/lib/slug";
import { handleRouteError } from "@/lib/server/http";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().trim().min(1).max(80),
  slug: z.string().trim().min(2).max(48),
  paletteId: paletteIdSchema.optional(),
});

export async function GET() {
  try {
    const user = await requireSessionUser();
    await connectDb();
    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }
    return NextResponse.json({ portfolio: serializePortfolio(portfolio) });
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireSessionUser();
    const body = createSchema.parse(await request.json());
    const slug = normalizeSlug(body.slug);

    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { error: "Invalid or reserved slug" },
        { status: 400 },
      );
    }

    await connectDb();

    const existing = await Portfolio.findOne({ userId: user._id });
    if (existing) {
      return NextResponse.json(
        { error: "Portfolio already exists" },
        { status: 409 },
      );
    }

    const slugTaken = await Portfolio.exists({ slug });
    if (slugTaken) {
      return NextResponse.json({ error: "Slug already taken" }, { status: 409 });
    }

    const portfolio = await Portfolio.create({
      userId: user._id,
      title: body.title,
      slug,
      paletteId: body.paletteId || "signal",
      sections: createDefaultSections(),
      status: "draft",
    });

    return NextResponse.json(
      { portfolio: serializePortfolio(portfolio) },
      { status: 201 },
    );
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await requireSessionUser();
    const body = z
      .object({
        title: z.string().trim().min(1).max(80).optional(),
        slug: z.string().trim().min(2).max(48).optional(),
        paletteId: paletteIdSchema.optional(),
        sections: z
          .array(
            z.object({
              id: z.string(),
              type: sectionTypeSchema,
              order: z.number().int().min(0),
              visible: z.boolean(),
              variant: sectionVariantSchema.optional(),
              data: z.record(z.string(), z.unknown()),
            }),
          )
          .optional(),
      })
      .refine((v) => Object.keys(v).length > 0, {
        message: "No changes provided",
      })
      .parse(await request.json());

    await connectDb();
    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    if (body.title !== undefined) portfolio.title = body.title;
    if (body.paletteId !== undefined) portfolio.paletteId = body.paletteId;

    if (body.slug !== undefined) {
      const slug = normalizeSlug(body.slug);
      if (!isValidSlug(slug)) {
        return NextResponse.json(
          { error: "Invalid or reserved slug" },
          { status: 400 },
        );
      }
      if (slug !== portfolio.slug) {
        const taken = await Portfolio.exists({
          slug,
          _id: { $ne: portfolio._id },
        });
        if (taken) {
          return NextResponse.json(
            { error: "Slug already taken" },
            { status: 409 },
          );
        }
        portfolio.slug = slug;
      }
    }

    if (body.sections !== undefined) {
      const types = body.sections.map((s) => s.type);
      if (new Set(types).size !== types.length) {
        return NextResponse.json(
          { error: "Each section type may appear at most once" },
          { status: 400 },
        );
      }
      portfolio.sections = body.sections.map((section) => ({
        ...section,
        variant: clampSectionVariant(
          section.type as SectionType,
          section.variant,
        ),
      })) as PortfolioDocument["sections"];
      portfolio.markModified("sections");
    }

    await portfolio.save();
    return NextResponse.json({ portfolio: serializePortfolio(portfolio) });
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function DELETE() {
  try {
    const user = await requireSessionUser();
    await connectDb();
    const result = await Portfolio.deleteOne({ userId: user._id });
    if (!result.deletedCount) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err);
  }
}
