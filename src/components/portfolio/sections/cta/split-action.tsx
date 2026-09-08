import { CtaButton, type CtaFlags } from './shared';

export function CtaSplitAction({
  cta,
  media,
}: {
  cta: CtaFlags;
  media: React.ReactNode;
}) {
  return (
    <section
      id='cta'
      className='flex flex-col gap-6 rounded-3xl border border-white/10 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8'
    >
      <div className='max-w-xl space-y-4'>
        {media}
        {cta.showHeadline && cta.headline ? (
          <h2 className='font-display text-3xl tracking-[-0.04em] md:text-4xl'>
            {cta.headline}
          </h2>
        ) : null}
        {cta.showBody && cta.body ? (
          <p className='text-sm leading-relaxed text-white/65 whitespace-pre-wrap'>
            {cta.body}
          </p>
        ) : null}
      </div>
      <CtaButton cta={cta} className='shrink-0' />
    </section>
  );
}
