import { PortfolioImage } from './portfolio-image';
import { PaletteCta, type SectionProps } from './shared';

export function CtaSection({ section }: SectionProps) {
  const data = section.data;
  const headline = String(data.headline || '');
  const body = String(data.body || '');
  const ctaLabel = String(data.ctaLabel || '');
  const ctaHref = String(data.ctaHref || '#');
  const imageUrl = String(data.imageUrl || '');
  const variant = section.variant;

  const media = imageUrl ? (
    <div className='overflow-hidden rounded-2xl border border-white/10'>
      <PortfolioImage
        src={imageUrl}
        alt=''
        className='aspect-video h-full w-full object-cover'
        sizes='(max-width: 768px) 100vw, 480px'
      />
    </div>
  ) : null;

  if (variant === 2) {
    return (
      <section
        id='cta'
        className='flex flex-col gap-6 rounded-3xl border border-white/10 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8'
      >
        <div className='max-w-xl space-y-4'>
          {media}
          <h2 className='font-display text-3xl tracking-[-0.04em] md:text-4xl'>
            {headline}
          </h2>
          <p className='text-sm leading-relaxed text-white/65'>{body}</p>
        </div>
        <PaletteCta href={ctaHref} label={ctaLabel} className='shrink-0' />
      </section>
    );
  }

  if (variant === 3) {
    return (
      <section
        id='cta'
        className='relative overflow-hidden rounded-3xl bg-(--p-primary) px-6 py-10 text-(--p-text-dark) md:px-10'
      >
        {imageUrl ? (
          <div className='pointer-events-none absolute inset-0 opacity-25'>
            <PortfolioImage
              src={imageUrl}
              alt=''
              className='h-full w-full object-cover'
              sizes='100vw'
            />
          </div>
        ) : (
          <div
            aria-hidden
            className='pointer-events-none absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-(--p-accent) opacity-40 blur-2xl'
          />
        )}
        <div className='relative max-w-2xl space-y-4'>
          <h2 className='font-display text-[clamp(2rem,5vw,3.2rem)] leading-[0.95] tracking-[-0.04em]'>
            {headline}
          </h2>
          <p className='text-base opacity-80'>{body}</p>
          {ctaLabel ? (
            <a
              href={ctaHref || '#'}
              className='inline-flex rounded-full bg-(--p-text-dark) px-6 py-3 text-sm font-semibold text-(--p-text-light) transition hover:opacity-90'
            >
              {ctaLabel}
            </a>
          ) : null}
        </div>
      </section>
    );
  }

  if (variant === 4) {
    return (
      <section
        id='cta'
        className='space-y-5 border-y border-white/15 py-10 text-center'
      >
        {media ? <div className='mx-auto max-w-lg'>{media}</div> : null}
        <h2 className='font-display text-[clamp(2rem,6vw,3.4rem)] tracking-[-0.04em]'>
          {headline}
        </h2>
        <p className='mx-auto max-w-lg text-base text-white/65'>{body}</p>
        <div className='flex justify-center'>
          <PaletteCta href={ctaHref} label={ctaLabel} />
        </div>
      </section>
    );
  }

  if (variant === 5) {
    return (
      <section
        id='cta'
        className='grid gap-4 md:grid-cols-[1fr_auto] md:items-stretch'
      >
        <div className='rounded-3xl border border-white/10 bg-black/25 px-6 py-8'>
          {media ? <div className='mb-4'>{media}</div> : null}
          <h2 className='font-display text-3xl tracking-[-0.04em]'>
            {headline}
          </h2>
          <p className='mt-3 max-w-xl text-sm leading-relaxed text-white/65'>
            {body}
          </p>
        </div>
        <a
          href={ctaHref || '#'}
          className='flex items-center justify-center rounded-3xl bg-(--p-accent) px-8 py-6 text-center text-sm font-semibold text-(--p-text-dark) transition hover:opacity-90 md:min-w-40'
        >
          {ctaLabel || 'Go'}
        </a>
      </section>
    );
  }

  return (
    <section
      id='cta'
      className='space-y-5 rounded-3xl bg-black/30 px-6 py-10 ring-1 ring-white/10 md:px-8'
    >
      {media}
      <h2 className='font-display text-[clamp(2rem,5vw,3rem)] leading-[0.95] tracking-[-0.04em]'>
        {headline}
      </h2>
      <p className='max-w-xl text-base text-white/70'>{body}</p>
      <PaletteCta href={ctaHref} label={ctaLabel} />
    </section>
  );
}
