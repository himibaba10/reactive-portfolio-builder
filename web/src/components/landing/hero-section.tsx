import { site } from "@/lib/landing-content";
import { ButtonLink } from "@/components/ui/button-link";

export function HeroSection() {
  return (
    <section
      id="top"
      data-hero
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-24 md:px-8 md:pb-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(214,255,63,0.16),transparent_42%),radial-gradient(ellipse_at_90%_20%,rgba(91,140,255,0.18),transparent_40%),linear-gradient(180deg,#07080b_0%,#0a0b0d_55%,#0d1016_100%)]"
      />
      <div
        aria-hidden
        data-hero-grid
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(244,245,240,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,245,240,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]"
      />
      <div
        aria-hidden
        data-hero-orb
        className="pointer-events-none absolute top-[18%] right-[8%] h-[42vw] max-h-[420px] w-[42vw] max-w-[420px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(214,255,63,0.55),rgba(91,140,255,0.12)_45%,transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <p
          data-hero-eyebrow
          className="mb-6 max-w-xl text-xs tracking-[0.28em] text-[var(--signal)] uppercase opacity-0"
        >
          Portfolio infrastructure for makers
        </p>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,9.5vw,7rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-[var(--foam)]">
          <span data-hero-line className="block overflow-hidden">
            <span className="inline-block translate-y-[110%]">Reactive</span>
          </span>
          <span data-hero-line className="block overflow-hidden">
            <span className="inline-block translate-y-[110%]">
              Portfolio <span className="text-[var(--signal)]">Builder</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex max-w-3xl flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-copy
            className="max-w-md text-base leading-relaxed text-[var(--muted)] opacity-0 md:text-lg"
          >
            {site.description}
          </p>
          <div data-hero-cta className="flex w-full flex-col gap-3 opacity-0 sm:w-auto sm:flex-row">
            <ButtonLink href="/signup" data-magnetic>
              Start free
            </ButtonLink>
            <ButtonLink href="#process" variant="outline" data-magnetic>
              See the process
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
