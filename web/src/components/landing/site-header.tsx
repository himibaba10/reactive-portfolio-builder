import { site, navLinks } from "@/lib/landing-content";
import { ButtonLink } from "@/components/ui/button-link";

export function SiteHeader() {
  return (
    <header
      data-landing-header
      className="pointer-events-none fixed inset-x-0 top-0 z-40 opacity-0"
    >
      <div className="border-b border-[color:var(--line)] bg-[color-mix(in_oklab,var(--ink)_82%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-5 py-3 md:px-8 md:py-5">
          <div className="flex items-center justify-between gap-3">
            <a
              href="#top"
              className="pointer-events-auto shrink-0 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-[var(--foam)] uppercase"
            >
              {site.shortName}
            </a>
            <nav className="pointer-events-auto hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-[0.16em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--foam)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pointer-events-auto">
              <ButtonLink
                href="/signup"
                variant="outline"
                className="px-3 py-2 text-xs sm:px-4"
                data-magnetic
              >
                Start free
              </ButtonLink>
            </div>
          </div>
          <nav className="pointer-events-auto flex items-center justify-between gap-3 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] tracking-[0.16em] text-[var(--muted)] uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
