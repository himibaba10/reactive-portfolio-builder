import { site } from "@/lib/landing-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[var(--ink)] px-5 py-10 md:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] text-[var(--foam)]">
            {site.name}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">{site.tagline}</p>
        </div>
        <p className="text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
          © {new Date().getFullYear()} · Free MVP
        </p>
      </div>
    </footer>
  );
}
