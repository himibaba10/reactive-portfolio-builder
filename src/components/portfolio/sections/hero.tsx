import { PaletteCta, type SectionProps } from "./shared";
import { PortfolioImage } from "./portfolio-image";

export function HeroSection({ section }: SectionProps) {
  const data = section.data;
  const name = String(data.name || "");
  const tagline = String(data.tagline || "");
  const ctaLabel = String(data.ctaLabel || "");
  const ctaHref = String(data.ctaHref || "#");
  const imageUrl = String(data.imageUrl || "");
  const imageAlt = String(data.imageAlt || name || "Portrait");
  const variant = section.variant;

  const photo = imageUrl ? (
    <PortfolioImage
      src={imageUrl}
      alt={imageAlt}
      className="h-full w-full object-cover"
      sizes="(max-width: 768px) 100vw, 420px"
      priority
    />
  ) : null;

  if (variant === 2) {
    return (
      <section
        id="hero"
        className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end"
      >
        <div className="space-y-5">
          <h2 className="font-display text-[clamp(2.6rem,8vw,4.8rem)] leading-[0.9] tracking-[-0.045em]">
            {name}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            {tagline}
          </p>
          <PaletteCta href={ctaHref} label={ctaLabel} />
        </div>
        {photo ? (
          <div className="aspect-4/5 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            {photo}
          </div>
        ) : (
          <p className="border-t border-white/15 pt-5 text-base leading-relaxed text-white/70 md:border-t-0 md:border-l md:pt-0 md:pl-6 md:text-lg">
            {tagline}
          </p>
        )}
      </section>
    );
  }

  if (variant === 3) {
    return (
      <section
        id="hero"
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 px-6 py-12 md:px-10 md:py-16"
      >
        {photo ? (
          <div className="pointer-events-none absolute inset-0 opacity-35">
            {photo}
          </div>
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-(--p-accent) opacity-25 blur-3xl"
          />
        )}
        <div className="relative">
          <p className="text-xs tracking-[0.28em] text-(--p-accent) uppercase">
            Intro
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,7vw,4.2rem)] leading-[0.92] tracking-[-0.045em]">
            {name}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/70">{tagline}</p>
          <div className="mt-8">
            <PaletteCta href={ctaHref} label={ctaLabel} />
          </div>
        </div>
      </section>
    );
  }

  if (variant === 4) {
    return (
      <section id="hero" className="space-y-6 text-center">
        {photo ? (
          <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border border-white/15">
            {photo}
          </div>
        ) : null}
        <h2 className="mx-auto font-display text-[clamp(2.8rem,9vw,5.2rem)] leading-[0.9] tracking-[-0.05em]">
          {name}
        </h2>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/70">
          {tagline}
        </p>
        <div className="flex justify-center">
          <PaletteCta href={ctaHref} label={ctaLabel} />
        </div>
      </section>
    );
  }

  if (variant === 5) {
    return (
      <section
        id="hero"
        className="flex flex-col gap-6 border-y border-white/10 py-10 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex max-w-2xl items-center gap-5">
          {photo ? (
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10">
              {photo}
            </div>
          ) : null}
          <div className="space-y-3">
            <h2 className="font-display text-[clamp(2.2rem,6vw,3.6rem)] leading-[0.95] tracking-[-0.04em]">
              {name}
            </h2>
            <p className="text-base text-white/65 md:text-lg">{tagline}</p>
          </div>
        </div>
        <PaletteCta href={ctaHref} label={ctaLabel} className="shrink-0" />
      </section>
    );
  }

  return (
    <section id="hero" className="space-y-6">
      {photo ? (
        <div className="aspect-21/9 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
          {photo}
        </div>
      ) : null}
      <h2 className="font-display text-[clamp(2.8rem,9vw,5.5rem)] leading-[0.9] tracking-[-0.045em]">
        {name}
      </h2>
      <p className="max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
        {tagline}
      </p>
      <PaletteCta href={ctaHref} label={ctaLabel} />
    </section>
  );
}
