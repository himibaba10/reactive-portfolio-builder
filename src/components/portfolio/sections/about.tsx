import { SectionEyebrow, type SectionProps } from "./shared";
import { PortfolioImage } from "./portfolio-image";

type AboutFlags = {
  eyebrow: string;
  headline: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  showEyebrow: boolean;
  showHeadline: boolean;
  showBody: boolean;
  showImage: boolean;
};

function readAbout(data: Record<string, unknown>): AboutFlags {
  return {
    eyebrow: String(data.eyebrow || "About"),
    headline: String(data.headline || ""),
    body: String(data.body || ""),
    imageUrl: String(data.imageUrl || ""),
    imageAlt: String(data.imageAlt || "About"),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showBody: data.showBody !== false,
    showImage: data.showImage !== false,
  };
}

function AboutPhoto({
  url,
  alt,
  className = "aspect-4/5 h-full w-full object-cover",
  sizes = "(max-width: 768px) 100vw, 360px",
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
      className={className}
      sizes={sizes}
    />
  );
}

function AboutEyebrow({ about }: { about: AboutFlags }) {
  if (!about.showEyebrow || !about.eyebrow) return null;
  return <SectionEyebrow>{about.eyebrow}</SectionEyebrow>;
}

function AboutHeadline({
  about,
  className = "font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[0.95] tracking-[-0.04em]",
}: {
  about: AboutFlags;
  className?: string;
}) {
  if (!about.showHeadline || !about.headline) return null;
  return <h3 className={className}>{about.headline}</h3>;
}

function AboutBody({
  about,
  className = "text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg",
}: {
  about: AboutFlags;
  className?: string;
}) {
  if (!about.showBody || !about.body) return null;
  return <p className={className}>{about.body}</p>;
}

export function AboutSection({ section }: SectionProps) {
  const about = readAbout(section.data);
  const variant = section.variant;
  const hasPhoto = about.showImage && Boolean(about.imageUrl);

  // 1 — Portrait lead (editorial: photo first, narrative rail)
  if (variant === 1) {
    return (
      <section
        id="about"
        className="grid items-start gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12"
      >
        {hasPhoto ? (
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-x-2 -inset-y-3 rounded-[2rem] border border-(--p-accent)/25 md:-inset-x-3"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
              <AboutPhoto url={about.imageUrl} alt={about.imageAlt} />
            </div>
          </div>
        ) : null}
        <div className={`space-y-5 ${hasPhoto ? "" : "md:col-span-2"}`}>
          <AboutEyebrow about={about} />
          <AboutHeadline about={about} />
          <div
            aria-hidden
            className="h-px w-14 bg-(--p-accent)/70"
          />
          <AboutBody about={about} className="max-w-xl text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg" />
        </div>
      </section>
    );
  }

  // 2 — Copy lead (narrative first, framed portrait)
  if (variant === 2) {
    return (
      <section
        id="about"
        className="grid items-end gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12"
      >
        <div className="space-y-5">
          <AboutEyebrow about={about} />
          <AboutHeadline about={about} />
          <AboutBody about={about} className="max-w-lg text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg" />
        </div>
        {hasPhoto ? (
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 shadow-[0_0_0_1px_color-mix(in_oklab,var(--p-primary)_25%,transparent)]">
            <AboutPhoto url={about.imageUrl} alt={about.imageAlt} />
          </div>
        ) : null}
      </section>
    );
  }

  // 3 — Soft panel (tinted stage card)
  if (variant === 3) {
    return (
      <section
        id="about"
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-(--p-primary)/12 px-6 py-8 md:px-10 md:py-12"
      >
        <div
          className={`grid items-center gap-8 ${hasPhoto ? "md:grid-cols-[220px_minmax(0,1fr)]" : ""}`}
        >
          {hasPhoto ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <AboutPhoto
                url={about.imageUrl}
                alt={about.imageAlt}
                className="aspect-square h-full w-full object-cover"
                sizes="220px"
              />
            </div>
          ) : null}
          <div className="space-y-4">
            <AboutEyebrow about={about} />
            <AboutHeadline about={about} />
            <AboutBody about={about} className="max-w-2xl text-base leading-relaxed text-white/80 whitespace-pre-wrap md:text-lg" />
          </div>
        </div>
      </section>
    );
  }

  // 4 — Display quote (oversized type manifesto)
  if (variant === 4) {
    return (
      <section id="about" className="space-y-8 border-y border-white/10 py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <AboutEyebrow about={about} />
            <AboutHeadline
              about={about}
              className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[0.92] tracking-[-0.045em]"
            />
          </div>
          {hasPhoto ? (
            <div className="h-24 w-24 overflow-hidden rounded-full border border-white/15 md:h-28 md:w-28">
              <AboutPhoto
                url={about.imageUrl}
                alt={about.imageAlt}
                className="h-full w-full object-cover"
                sizes="112px"
              />
            </div>
          ) : null}
        </div>
        <AboutBody
          about={about}
          className="max-w-4xl font-display text-[clamp(1.35rem,3.2vw,2.15rem)] leading-snug tracking-[-0.025em] text-white/88 whitespace-pre-wrap"
        />
      </section>
    );
  }

  // 5 — Magazine crossover (photo plate + overlapping copy)
  if (variant === 5) {
    return (
      <section
        id="about"
        className="relative grid gap-6 md:grid-cols-12 md:gap-0 md:py-4"
      >
        {hasPhoto ? (
          <div className="relative md:col-span-7 md:col-start-6 md:row-start-1">
            <div className="aspect-4/5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/25 md:aspect-5/4">
              <AboutPhoto
                url={about.imageUrl}
                alt={about.imageAlt}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
        ) : null}
        <div
          className={`relative z-10 space-y-5 md:col-span-6 md:col-start-1 md:row-start-1 md:self-center ${
            hasPhoto ? "md:pr-8" : "md:col-span-10"
          }`}
        >
          <div className="rounded-2xl border border-white/10 bg-(--p-secondary)/90 p-5 backdrop-blur-sm md:p-7">
            <AboutEyebrow about={about} />
            <div className="mt-3 space-y-4">
              <AboutHeadline about={about} />
              <AboutBody about={about} className="text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 6 — Accent rail (side rule + stacked stack)
  return (
    <section id="about" className="relative pl-6 md:pl-8">
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-(--p-accent)"
      />
      <div className="space-y-5">
        <AboutEyebrow about={about} />
        <AboutHeadline about={about} />
        {hasPhoto ? (
          <div className="max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <AboutPhoto
              url={about.imageUrl}
              alt={about.imageAlt}
              className="aspect-5/4 h-full w-full object-cover"
            />
          </div>
        ) : null}
        <AboutBody about={about} className="max-w-2xl text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg" />
      </div>
    </section>
  );
}
