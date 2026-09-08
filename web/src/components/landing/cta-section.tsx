import { ButtonLink } from "@/components/ui/button-link";

export function CtaSection() {
  return (
    <section
      data-cta
      className="relative overflow-hidden px-5 py-28 md:px-8 md:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,255,63,0.16),transparent_55%),linear-gradient(180deg,#0a0b0d_0%,#10131a_100%)]"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-site flex-col items-start gap-10 md:items-center md:text-center">
        <p
          data-cta-eyebrow
          className="text-xs tracking-[0.28em] text-signal uppercase opacity-0"
        >
          Free for now
        </p>
        <h2 className="max-w-5xl font-display text-[clamp(2.8rem,9vw,7rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-foam">
          <span data-cta-line className="block overflow-hidden">
            <span className="inline-block translate-y-[110%]">Claim your slug.</span>
          </span>
          <span data-cta-line className="block overflow-hidden text-signal">
            <span className="inline-block translate-y-[110%]">Ship the page.</span>
          </span>
        </h2>
        <p
          data-cta-copy
          className="max-w-lg text-base leading-relaxed text-muted opacity-0"
        >
          One portfolio per account. Prebuilt sections. Strict palettes. Publish on
          your path — no billing in the MVP.
        </p>
        <div data-cta-actions className="opacity-0">
          <ButtonLink href="/signup" className="px-8 py-4 text-base" data-magnetic>
            Create your portfolio
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
