import { site } from "@/lib/landing-content";
import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[var(--ink)] px-5 py-10 md:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <BrandLogo className="h-10 w-auto md:h-12" sizes="200px" />
          <p className="mt-3 text-sm text-[var(--muted)]">{site.tagline}</p>
        </div>
        <p className="text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
          © {new Date().getFullYear()} · Free MVP
        </p>
      </div>
    </footer>
  );
}
