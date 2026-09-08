import { SectionEyebrow, type SectionProps } from "./shared";

export function AboutSection({ section }: SectionProps) {
  const body = String(section.data.body || "");
  const variant = section.variant;

  if (variant === 2) {
    return (
      <section id="about" className="grid gap-6 md:grid-cols-[140px_minmax(0,1fr)]">
        <SectionEyebrow>About</SectionEyebrow>
        <p className="text-base leading-relaxed text-white/80 whitespace-pre-wrap md:text-lg">
          {body}
        </p>
      </section>
    );
  }

  if (variant === 3) {
    return (
      <section
        id="about"
        className="rounded-3xl bg-(--p-primary)/15 px-6 py-8 ring-1 ring-white/10 md:px-8"
      >
        <SectionEyebrow>About</SectionEyebrow>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 whitespace-pre-wrap md:text-lg">
          {body}
        </p>
      </section>
    );
  }

  if (variant === 4) {
    return (
      <section id="about" className="space-y-4 border-t border-white/10 pt-10">
        <div className="flex items-baseline justify-between gap-4">
          <SectionEyebrow>About</SectionEyebrow>
          <span className="text-xs tracking-[0.2em] text-white/35 uppercase">
            Bio
          </span>
        </div>
        <p className="max-w-3xl font-display text-xl leading-snug tracking-[-0.02em] text-white/90 whitespace-pre-wrap md:text-2xl">
          {body}
        </p>
      </section>
    );
  }

  if (variant === 5) {
    return (
      <section id="about" className="relative pl-6 md:pl-8">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-(--p-accent)"
        />
        <SectionEyebrow>About</SectionEyebrow>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 whitespace-pre-wrap md:text-lg">
          {body}
        </p>
      </section>
    );
  }

  return (
    <section id="about" className="space-y-4">
      <SectionEyebrow>About</SectionEyebrow>
      <p className="max-w-2xl text-base leading-relaxed text-white/80 whitespace-pre-wrap md:text-lg">
        {body}
      </p>
    </section>
  );
}
