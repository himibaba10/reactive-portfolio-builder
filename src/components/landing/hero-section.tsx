import { AuthCtaLink } from "@/components/landing/auth-cta-link";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/lib/landing-content";

export function HeroSection() {
  return (
    <section
      id="top"
      data-hero
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-10 pt-24 md:px-8 md:pb-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(214,255,63,0.16),transparent_42%),radial-gradient(ellipse_at_90%_20%,rgba(91,140,255,0.18),transparent_40%),linear-gradient(180deg,#07080b_0%,#0a0b0d_55%,#0d1016_100%)]"
      />
      <div
        aria-hidden
        data-hero-grid
        className="pointer-events-none absolute inset-0 opacity-[0.22] bg-[linear-gradient(rgba(244,245,240,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,245,240,0.08)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(ellipse_at_center,black_35%,transparent_78%)]"
      />
      <div
        aria-hidden
        data-hero-orb
        className="pointer-events-none absolute top-[18%] right-[8%] h-[36vw] max-h-90 w-[36vw] max-w-90 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(214,255,63,0.45),rgba(91,140,255,0.1)_45%,transparent_70%)] blur-xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-site">
        <div data-hero-brand className="max-w-4xl opacity-0">
          <p className="mb-4 font-display text-sm font-semibold tracking-[0.28em] text-signal uppercase md:text-base">
            {site.shortName}
          </p>
          <h1 className="font-display text-[clamp(2.4rem,7vw,5.4rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-foam">
            {site.heroHeadline}
          </h1>
        </div>

        <div className="mt-8 flex max-w-4xl flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-copy
            className="max-w-md text-base leading-relaxed text-muted opacity-0 md:text-lg"
          >
            {site.heroSupport}
          </p>
          <div
            data-hero-cta
            className="flex w-full flex-col gap-3 opacity-0 sm:w-auto sm:flex-row"
          >
            <AuthCtaLink data-magnetic />
            <ButtonLink href="#process" variant="outline" data-magnetic>
              See the process
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
