import { CtaButton, type CtaFlags } from './shared';

export function CtaSoftStage({
  cta,
  media,
}: {
  cta: CtaFlags;
  media: React.ReactNode;
}) {
  return (
    <section
      id='cta'
      className='space-y-5 rounded-3xl bg-black/30 px-6 py-10 ring-1 ring-white/10 md:px-8'
    >
      {media}
      {cta.showHeadline && cta.headline ? (
        <h2 className='font-display text-[clamp(2rem,5vw,3rem)] leading-[0.95] tracking-[-0.04em]'>
          {cta.headline}
        </h2>
      ) : null}
      {cta.showBody && cta.body ? (
        <p className='max-w-xl text-base text-white/70 whitespace-pre-wrap'>
          {cta.body}
        </p>
      ) : null}
      <CtaButton cta={cta} />
    </section>
  );
}
