import type { SectionProps } from "./shared";

function HeaderShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header id="header" className={`w-full ${className}`}>
      {children}
    </header>
  );
}

export function HeaderSection({ section, portfolio }: SectionProps) {
  const data = section.data;
  const showSlug = Boolean(data.showSlug);
  const tagline = String(data.tagline || "");
  const variant = section.variant;

  if (variant === 2) {
    return (
      <HeaderShell className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-none tracking-[-0.04em]">
            {portfolio.title}
          </h1>
          {tagline ? (
            <p className="mt-2 max-w-md text-sm text-white/55">{tagline}</p>
          ) : null}
        </div>
        {showSlug ? (
          <p className="text-xs tracking-[0.24em] text-(--p-accent) uppercase">
            /{portfolio.slug}
          </p>
        ) : null}
      </HeaderShell>
    );
  }

  if (variant === 3) {
    return (
      <HeaderShell className="grid gap-3 border-l-2 border-(--p-accent) pl-5">
        {showSlug ? (
          <p className="text-xs tracking-[0.28em] text-(--p-accent) uppercase">
            /{portfolio.slug}
          </p>
        ) : null}
        <h1 className="font-display text-[clamp(2rem,6vw,3.2rem)] leading-[0.95] tracking-[-0.045em]">
          {portfolio.title}
        </h1>
        {tagline ? (
          <p className="max-w-lg text-sm leading-relaxed text-white/60">
            {tagline}
          </p>
        ) : null}
      </HeaderShell>
    );
  }

  if (variant === 4) {
    return (
      <HeaderShell className="rounded-2xl border border-white/10 bg-black/20 px-5 py-6 backdrop-blur-sm md:px-7">
        <div className="flex flex-wrap items-center gap-3">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full bg-(--p-primary)"
          />
          <h1 className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
            {portfolio.title}
          </h1>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/55">
          {showSlug ? <span>/{portfolio.slug}</span> : null}
          {tagline ? <span>{tagline}</span> : null}
        </div>
      </HeaderShell>
    );
  }

  if (variant === 5) {
    return (
      <HeaderShell className="relative overflow-hidden rounded-3xl bg-(--p-primary) px-6 py-8 text-(--p-text-dark) md:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_90%_10%,var(--p-accent),transparent_45%)]"
        />
        <div className="relative">
          {showSlug ? (
            <p className="text-xs tracking-[0.28em] uppercase opacity-70">
              /{portfolio.slug}
            </p>
          ) : null}
          <h1 className="mt-2 font-display text-[clamp(2.2rem,7vw,3.6rem)] leading-[0.92] tracking-[-0.045em]">
            {portfolio.title}
          </h1>
          {tagline ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-80">
              {tagline}
            </p>
          ) : null}
        </div>
      </HeaderShell>
    );
  }

  return (
    <HeaderShell className="space-y-4 border-b border-white/10 pb-8">
      {showSlug ? (
        <p className="text-xs tracking-[0.28em] text-(--p-accent) uppercase">
          /{portfolio.slug}
        </p>
      ) : null}
      <h1 className="font-display text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.92] tracking-[-0.045em]">
        {portfolio.title}
      </h1>
      {tagline ? (
        <p className="max-w-xl text-base text-white/60">{tagline}</p>
      ) : null}
    </HeaderShell>
  );
}
