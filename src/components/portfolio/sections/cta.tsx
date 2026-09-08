import { PortfolioImage } from './portfolio-image';
import { PaletteCta, type SectionProps } from './shared';

type CtaFlags = {
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  showHeadline: boolean;
  showBody: boolean;
  showImage: boolean;
  showCtaLabel: boolean;
  showCtaHref: boolean;
};

function readCta(data: Record<string, unknown>): CtaFlags {
  return {
    headline: String(data.headline || ''),
    body: String(data.body || ''),
    ctaLabel: String(data.ctaLabel || ''),
    ctaHref: String(data.ctaHref || '#'),
    imageUrl: String(data.imageUrl || ''),
    showHeadline: data.showHeadline !== false,
    showBody: data.showBody !== false,
    showImage: data.showImage !== false,
    showCtaLabel: data.showCtaLabel !== false,
    showCtaHref: data.showCtaHref !== false,
  };
}

function CtaMedia({
  cta,
  className = 'aspect-video h-full w-full object-cover',
}: {
  cta: CtaFlags;
  className?: string;
}) {
  if (!cta.showImage || !cta.imageUrl) return null;
  return (
    <div className='overflow-hidden rounded-2xl border border-white/10'>
      <PortfolioImage
        src={cta.imageUrl}
        alt=''
        className={className}
        sizes='(max-width: 768px) 100vw, 480px'
      />
    </div>
  );
}

function CtaButton({
  cta,
  className = '',
  inverted = false,
}: {
  cta: CtaFlags;
  className?: string;
  inverted?: boolean;
}) {
  if (!cta.showCtaLabel || !cta.ctaLabel) return null;
  if (inverted) {
    const classes = `inline-flex rounded-full bg-(--p-text-dark) px-6 py-3 text-sm font-semibold text-(--p-text-light) transition hover:opacity-90 ${className}`;
    if (!cta.showCtaHref) {
      return <span className={classes}>{cta.ctaLabel}</span>;
    }
    return (
      <a href={cta.ctaHref || '#'} className={classes}>
        {cta.ctaLabel}
      </a>
    );
  }
  return (
    <PaletteCta
      href={cta.ctaHref}
      label={cta.ctaLabel}
      linked={cta.showCtaHref}
      className={className}
    />
  );
}

export function CtaSection({ section }: SectionProps) {
  const cta = readCta(section.data);
  const variant = section.variant;
  const media = <CtaMedia cta={cta} />;

  // 1 — Soft stage card
  if (variant === 1) {
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

  // 2 — Split with side action
  if (variant === 2) {
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

  // 3 — Solid primary banner
  if (variant === 3) {
    return (
      <section
        id='cta'
        className='relative overflow-hidden rounded-3xl bg-(--p-primary) px-6 py-10 text-(--p-text-dark) md:px-10'
      >
        {cta.showImage && cta.imageUrl ? (
          <div className='pointer-events-none absolute inset-0 opacity-25'>
            <PortfolioImage
              src={cta.imageUrl}
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
          {cta.showHeadline && cta.headline ? (
            <h2 className='font-display text-[clamp(2rem,5vw,3.2rem)] leading-[0.95] tracking-[-0.04em]'>
              {cta.headline}
            </h2>
          ) : null}
          {cta.showBody && cta.body ? (
            <p className='text-base opacity-80 whitespace-pre-wrap'>
              {cta.body}
            </p>
          ) : null}
          <CtaButton cta={cta} inverted />
        </div>
      </section>
    );
  }

  // 4 — Centered manifesto
  if (variant === 4) {
    return (
      <section
        id='cta'
        className='space-y-5 border-y border-white/15 py-10 text-center'
      >
        {media ? <div className='mx-auto max-w-lg'>{media}</div> : null}
        {cta.showHeadline && cta.headline ? (
          <h2 className='font-display text-[clamp(2rem,6vw,3.4rem)] tracking-[-0.04em]'>
            {cta.headline}
          </h2>
        ) : null}
        {cta.showBody && cta.body ? (
          <p className='mx-auto max-w-lg text-base text-white/65 whitespace-pre-wrap'>
            {cta.body}
          </p>
        ) : null}
        <div className='flex justify-center'>
          <CtaButton cta={cta} />
        </div>
      </section>
    );
  }

  // 5 — Docked action tile
  if (variant === 5) {
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

  // 6 — Cinematic full-bleed ask
  return (
    <section
      id='cta'
      className='relative min-h-[min(52vh,420px)] overflow-hidden rounded-4xl border border-white/10 bg-black/35 md:rounded-[2.5rem]'
    >
      {cta.showImage && cta.imageUrl ? (
        <div className='absolute inset-0'>
          <PortfolioImage
            src={cta.imageUrl}
            alt=''
            className='h-full w-full object-cover'
            sizes='100vw'
          />
        </div>
      ) : (
        <div
          aria-hidden
          className='absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_oklab,var(--p-accent)_40%,transparent),transparent_50%),linear-gradient(140deg,color-mix(in_oklab,var(--p-primary)_30%,transparent),transparent_60%)]'
        />
      )}
      <div
        aria-hidden
        className='absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/15'
      />
      <div className='relative z-10 flex min-h-[min(52vh,420px)] flex-col justify-end gap-4 p-7 md:p-12'>
        {cta.showHeadline && cta.headline ? (
          <h2 className='max-w-3xl font-display text-[clamp(2rem,6vw,3.6rem)] leading-[0.92] tracking-[-0.045em]'>
            {cta.headline}
          </h2>
        ) : null}
        {cta.showBody && cta.body ? (
          <p className='max-w-xl text-base text-white/75 whitespace-pre-wrap md:text-lg'>
            {cta.body}
          </p>
        ) : null}
        <CtaButton cta={cta} />
      </div>
    </section>
  );
}
