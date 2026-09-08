import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicPortfolioView } from "@/components/portfolio/public-portfolio";
import { RESERVED_SLUGS } from "@/lib/slug";
import { getPublishedPortfolio } from "@/lib/server/public-portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if ((RESERVED_SLUGS as readonly string[]).includes(slug)) {
    return { title: "Not found" };
  }
  const portfolio = await getPublishedPortfolio(slug);
  if (!portfolio) return { title: "Not found" };
  return {
    title: portfolio.title,
    description: `${portfolio.title} — portfolio on Reactive`,
  };
}

export default async function PublicSlugPage({ params }: PageProps) {
  const { slug } = await params;

  if ((RESERVED_SLUGS as readonly string[]).includes(slug)) {
    notFound();
  }

  const portfolio = await getPublishedPortfolio(slug);
  if (!portfolio) notFound();

  return <PublicPortfolioView portfolio={portfolio} />;
}
