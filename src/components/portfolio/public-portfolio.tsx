import { getPalette } from "@/lib/palette";
import type { PublicPortfolio } from "@/lib/server/public-portfolio";
import { RenderPortfolioSection } from "./section-registry";

export function PublicPortfolioView({
  portfolio,
}: {
  portfolio: PublicPortfolio;
}) {
  const palette = getPalette(portfolio.paletteId);
  const style = {
    ["--p-primary" as string]: palette.tokens.primary,
    ["--p-secondary" as string]: palette.tokens.secondary,
    ["--p-accent" as string]: palette.tokens.accent,
    ["--p-text-dark" as string]: palette.tokens.textDark,
    ["--p-text-light" as string]: palette.tokens.textLight,
  };

  const meta = { title: portfolio.title, slug: portfolio.slug };
  const header = portfolio.sections.find((s) => s.type === "Header");
  const footer = portfolio.sections.find((s) => s.type === "Footer");
  const body = portfolio.sections
    .filter((s) => s.type !== "Header" && s.type !== "Footer")
    .sort((a, b) => a.order - b.order);

  const hasContent = Boolean(header || footer || body.length);

  return (
    <main
      style={style}
      className="relative min-h-svh overflow-hidden bg-(--p-secondary) text-(--p-text-light)"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_oklab,var(--p-primary)_35%,transparent),transparent_50%),radial-gradient(ellipse_at_90%_10%,color-mix(in_oklab,var(--p-accent)_28%,transparent),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-20 px-5 py-16 md:px-8 md:py-24">
        {!hasContent ? (
          <p className="text-white/60">No visible sections yet.</p>
        ) : (
          <>
            {header ? (
              <RenderPortfolioSection section={header} portfolio={meta} />
            ) : null}
            {body.map((section) => (
              <RenderPortfolioSection
                key={section.id}
                section={section}
                portfolio={meta}
              />
            ))}
            {footer ? (
              <RenderPortfolioSection section={footer} portfolio={meta} />
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
