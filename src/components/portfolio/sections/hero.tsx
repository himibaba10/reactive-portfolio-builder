import { PaletteCta, type SectionProps } from "./shared";
import { PortfolioImage } from "./portfolio-image";

type HeroFlags = {
  name: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
  showName: boolean;
  showTagline: boolean;
  showDescription: boolean;
  showImage: boolean;
  showCtaLabel: boolean;
  showCtaHref: boolean;
};

function readHero(data: Record<string, unknown>): HeroFlags {
  return {
    name: String(data.name || ""),
    tagline: String(data.tagline || ""),
    description: String(data.description || ""),
    ctaLabel: String(data.ctaLabel || ""),
    ctaHref: String(data.ctaHref || "#"),
    imageUrl: String(data.imageUrl || ""),
    imageAlt: String(data.imageAlt || data.name || "Portrait"),
    showName: data.showName !== false,
    showTagline: data.showTagline !== false,
    showDescription: data.showDescription !== false,
    showImage: data.showImage !== false,
    showCtaLabel: data.showCtaLabel !== false,
    showCtaHref: data.showCtaHref !== false,
  };
}

function HeroPhoto({
  url,
  alt,
  className,
  sizes,
}: {
  url: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <PortfolioImage
      src={url}
      alt={alt}
      className={className || "h-full w-full object-cover"}
      sizes={sizes || "(max-width: 768px) 100vw, 520px"}
      priority
    />
  );
}

function HeroCta({
  hero,
  className = "",
}: {
  hero: HeroFlags;
  className?: string;
}) {
  if (!hero.showCtaLabel || !hero.ctaLabel) return null;
  return (
    <PaletteCta
      href={hero.ctaHref}
      label={hero.ctaLabel}
      linked={hero.showCtaHref}
      className={className}
    />
  );
}

function HeroDescription({
  hero,
  className = "max-w-xl text-sm leading-relaxed text-white/55 md:text-base",
  align = "left",
}: {
  hero: HeroFlags;
  className?: string;
  align?: "left" | "center";
}) {
  if (!hero.showDescription || !hero.description) return null;
  return (
    <p
      className={`${className} whitespace-pre-wrap ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {hero.description}
    </p>
  );
}

export function HeroSection({ section }: SectionProps) {
  const hero = readHero(section.data);
  const variant = section.variant;
  const photo =
    hero.showImage && hero.imageUrl ? (
      <HeroPhoto url={hero.imageUrl} alt={hero.imageAlt} />
    ) : null;

  // 1 — Monument: oversized type, cinematic image band
  if (variant === 1) {
    return (
      <section id="hero" className="space-y-8 md:space-y-10">
        <div className="max-w-5xl space-y-5">
          {hero.showName && hero.name ? (
            <h2 className="font-display text-[clamp(3.2rem,12vw,7.5rem)] leading-[0.86] tracking-[-0.055em]">
              {hero.name}
            </h2>
          ) : null}
          {hero.showTagline && hero.tagline ? (
            <p className="max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">
              {hero.tagline}
            </p>
          ) : null}
          <HeroDescription hero={hero} />
          <HeroCta hero={hero} />
        </div>
        {photo ? (
          <div className="aspect-21/9 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/25 md:rounded-[2rem]">
            {photo}
          </div>
        ) : null}
      </section>
    );
  }

  // 2 — Split frame: type left, tall portrait right
  if (variant === 2) {
    return (
      <section
        id="hero"
        className="grid items-end gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12"
      >
        <div className="space-y-6 pb-1">
          {hero.showName && hero.name ? (
            <h2 className="font-display text-[clamp(2.8rem,9vw,5.4rem)] leading-[0.88] tracking-[-0.05em]">
              {hero.name}
            </h2>
          ) : null}
          {hero.showTagline && hero.tagline ? (
            <p className="max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              {hero.tagline}
            </p>
          ) : null}
          <HeroDescription
            hero={hero}
            className="max-w-md text-sm leading-relaxed text-white/55 md:text-base"
          />
          <HeroCta hero={hero} />
        </div>
        {photo ? (
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] border border-(--p-accent)/35 md:-inset-4"
            />
            <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
              {photo}
            </div>
          </div>
        ) : hero.showDescription && hero.description ? (
          <div className="border-t border-white/15 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <HeroDescription
              hero={hero}
              className="text-base leading-relaxed text-white/60 md:text-lg"
            />
          </div>
        ) : hero.showTagline && hero.tagline ? (
          <div className="border-t border-white/15 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <p className="text-base leading-relaxed text-white/60 md:text-lg">
              {hero.tagline}
            </p>
          </div>
        ) : null}
      </section>
    );
  }

  // 3 — Cinematic bleed: photo stage with overlaid copy
  if (variant === 3) {
    return (
      <section id="hero" className="relative min-h-[min(72vh,640px)] overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 md:rounded-[2.5rem]">
        {photo ? (
          <div className="absolute inset-0">{photo}</div>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--p-accent)_45%,transparent),transparent_55%),linear-gradient(160deg,color-mix(in_oklab,var(--p-primary)_35%,transparent),transparent_60%)]"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10"
        />
        <div className="relative z-10 flex min-h-[min(72vh,640px)] flex-col justify-end gap-5 p-7 md:p-12">
          {hero.showName && hero.name ? (
            <h2 className="max-w-3xl font-display text-[clamp(2.6rem,8vw,5rem)] leading-[0.9] tracking-[-0.05em]">
              {hero.name}
            </h2>
          ) : null}
          {hero.showTagline && hero.tagline ? (
            <p className="max-w-lg text-base text-white/75 md:text-lg">
              {hero.tagline}
            </p>
          ) : null}
          <HeroDescription
            hero={hero}
            className="max-w-lg text-sm leading-relaxed text-white/60 md:text-base"
          />
          <HeroCta hero={hero} />
        </div>
      </section>
    );
  }

  // 4 — Orbital center: circular portrait + centered manifesto
  if (variant === 4) {
    return (
      <section id="hero" className="flex flex-col items-center gap-7 py-6 text-center md:gap-8 md:py-10">
        {photo ? (
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-2 rounded-full border border-(--p-accent)/40"
            />
            <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/15 md:h-40 md:w-40">
              <HeroPhoto
                url={hero.imageUrl}
                alt={hero.imageAlt}
                sizes="160px"
              />
            </div>
          </div>
        ) : (
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-(--p-accent)"
          />
        )}
        {hero.showName && hero.name ? (
          <h2 className="max-w-4xl font-display text-[clamp(2.8rem,10vw,5.8rem)] leading-[0.88] tracking-[-0.055em]">
            {hero.name}
          </h2>
        ) : null}
        <div
          aria-hidden
          className="h-px w-16 bg-(--p-accent)/70"
        />
        {hero.showTagline && hero.tagline ? (
          <p className="max-w-xl text-lg leading-relaxed text-white/65">
            {hero.tagline}
          </p>
        ) : null}
        <HeroDescription
          hero={hero}
          align="center"
          className="max-w-xl text-sm leading-relaxed text-white/55 md:text-base"
        />
        <HeroCta hero={hero} />
      </section>
    );
  }

  // 5 — Editorial spread: magazine grid
  if (variant === 5) {
    return (
      <section
        id="hero"
        className="grid gap-8 border-y border-white/10 py-10 md:grid-cols-12 md:gap-6 md:py-14"
      >
        <div className="space-y-5 md:col-span-7 md:space-y-6">
          <p className="text-xs tracking-[0.28em] text-(--p-accent) uppercase">
            Portfolio
          </p>
          {hero.showName && hero.name ? (
            <h2 className="font-display text-[clamp(2.6rem,7vw,4.8rem)] leading-[0.9] tracking-[-0.05em]">
              {hero.name}
            </h2>
          ) : null}
          {hero.showTagline && hero.tagline ? (
            <p className="max-w-md text-base leading-relaxed text-white/65 md:text-lg">
              {hero.tagline}
            </p>
          ) : null}
          <HeroDescription
            hero={hero}
            className="max-w-md text-sm leading-relaxed text-white/55 md:text-base"
          />
          <HeroCta hero={hero} />
        </div>
        {photo ? (
          <div className="md:col-span-5 md:pt-8">
            <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/20 md:rounded-3xl">
              {photo}
            </div>
          </div>
        ) : null}
      </section>
    );
  }

  // 6 — Asymmetric dock: huge type + bottom meta bar + floating portrait
  return (
    <section id="hero" className="relative space-y-10 md:space-y-14">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
        <div className="min-w-0 space-y-4">
          {hero.showName && hero.name ? (
            <h2 className="font-display text-[clamp(3rem,11vw,6.8rem)] leading-[0.84] tracking-[-0.055em]">
              {hero.name.split(/\s+/).map((word, i) => (
                <span key={`${word}-${i}`}>
                  {i > 0 ? " " : null}
                  <span className={i === 0 ? "text-(--p-accent)" : undefined}>
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          ) : null}
          <HeroDescription
            hero={hero}
            className="max-w-lg text-sm leading-relaxed text-white/55 md:text-base"
          />
        </div>
        {photo ? (
          <div className="w-full max-w-56 justify-self-end overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 md:w-48 md:max-w-none lg:w-56">
            <div className="aspect-3/4">{photo}</div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        {hero.showTagline && hero.tagline ? (
          <p className="max-w-md text-base text-white/65 md:text-lg">
            {hero.tagline}
          </p>
        ) : (
          <span />
        )}
        <HeroCta hero={hero} className="shrink-0 self-start sm:self-auto" />
      </div>
    </section>
  );
}
