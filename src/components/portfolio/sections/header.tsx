import { PortfolioImage } from "./portfolio-image";
import type { SectionProps } from "./shared";

export function HeaderSection({ section, portfolio, navItems = [] }: SectionProps) {
  const logoUrl = String(section.data.logoUrl || "");

  return (
    <header
      id="header"
      data-portfolio-header
      className="sticky top-0 z-20 w-full border-b border-white/10 bg-(--p-secondary)/92 backdrop-blur-sm"
    >
      <div className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#hero" className="min-w-0 shrink-0">
          {logoUrl ? (
            <div className="h-9 w-auto max-w-40">
              <PortfolioImage
                src={logoUrl}
                alt={portfolio.title}
                className="h-9 w-auto max-w-full object-contain object-left"
                sizes="160px"
              />
            </div>
          ) : (
            <span className="font-display text-lg tracking-tight">
              {portfolio.title}
            </span>
          )}
        </a>

        {navItems.length ? (
          <nav
            aria-label="Sections"
            className="flex max-w-[65%] flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs tracking-[0.14em] text-white/55 uppercase sm:text-[11px]"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-(--p-accent)"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
