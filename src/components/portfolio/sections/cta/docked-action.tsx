import { type CtaFlags } from './shared';

export function CtaDockedAction({
  cta,
  media,
}: {
  cta: CtaFlags;
  media: React.ReactNode;
}) {
  return (
    <section
      id='cta'
      className='grid gap-4 md:grid-cols-[1fr_auto] md:items-stretch'
    >
      <div className='rounded-3xl border border-white/10 bg-black/25 px-6 py-8'>
        {media ? <div className='mb-4'>{media}</div> : null}
        {cta.showHeadline && cta.headline ? (
          <h2 className='font-display text-3xl tracking-[-0.04em]'>
            {cta.headline}
          </h2>
        ) : null}
        {cta.showBody && cta.body ? (
          <p className='mt-3 max-w-xl text-sm leading-relaxed text-white/65 whitespace-pre-wrap'>
            {cta.body}
          </p>
        ) : null}
      </div>
      {cta.showCtaLabel && cta.ctaLabel ? (
        cta.showCtaHref ? (
          <a
            href={cta.ctaHref || '#'}
            className='flex items-center justify-center rounded-3xl bg-(--p-accent) px-8 py-6 text-center text-sm font-semibold text-(--p-text-dark) transition hover:opacity-90 md:min-w-40'
          >
            {cta.ctaLabel}
          </a>
        ) : (
          <span className='flex items-center justify-center rounded-3xl bg-(--p-accent) px-8 py-6 text-center text-sm font-semibold text-(--p-text-dark) md:min-w-40'>
            {cta.ctaLabel}
          </span>
        )
      ) : null}
    </section>
  );
}
