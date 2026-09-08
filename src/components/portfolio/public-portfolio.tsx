import { getPalette } from "@/lib/palette";
import type { PublicPortfolio } from "@/lib/server/public-portfolio";
import {
  buildNavItems,
  RenderPortfolioSection,
} from "./section-registry";
import { FooterSection } from "./sections/footer";
import { PortfolioMotion } from "./motion/portfolio-motion";

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
  const header = portfolio.sections.find(
    (s) => s.type === "Header" && s.visible,
  );
  const footer = portfolio.sections.find((s) => s.type === "Footer");
  const body = portfolio.sections
    .filter((s) => s.visible && s.type !== "Header" && s.type !== "Footer")
    .sort((a, b) => a.order - b.order);
  const navItems = buildNavItems(body);

  const hasContent = Boolean(header || body.length);

  return (
    <main
      style={style}
      data-portfolio-root
      className="relative flex min-h-svh flex-col overflow-x-clip bg-(--p-secondary) text-(--p-text-light)"
    >
      <PortfolioMotion />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_oklab,var(--p-primary)_35%,transparent),transparent_50%),radial-gradient(ellipse_at_90%_10%,color-mix(in_oklab,var(--p-accent)_28%,transparent),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative z-10 flex min-h-svh w-full flex-col">
        {!hasContent ? (
          <p className="px-5 py-10 text-white/60 md:px-8">No visible sections yet.</p>
        ) : (
          <>
            {header ? (
              <RenderPortfolioSection
                section={header}
                portfolio={meta}
                navItems={navItems}
              />
            ) : null}
            <div
              data-portfolio-body
              className="mx-auto flex w-full max-w-317.5 flex-1 flex-col gap-20 px-5 py-20 md:gap-28 md:px-8 md:py-28"
            >
              {body.map((section, index) => (
                <div
                  key={section.id}
                  data-reveal
                      className={
                    index > 0
                      ? "border-t border-white/10 pt-20 md:pt-28"
                      : undefined
                  }
                >
                  <RenderPortfolioSection
                    section={section}
                    portfolio={meta}
                  />
                </div>
              ))}
            </div>
            {footer?.visible !== false ? (
              <FooterSection
                section={
                  footer ?? {
                    id: "footer",
                    type: "Footer",
                    order: 999,
                    visible: true,
                    variant: 1,
                    data: {},
                  }
                }
                portfolio={meta}
              />
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
