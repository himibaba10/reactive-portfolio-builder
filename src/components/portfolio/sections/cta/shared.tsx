import { PortfolioImage } from '../portfolio-image';
import { PaletteCta } from '../shared';

export type CtaFlags = {
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

export function readCta(data: Record<string, unknown>): CtaFlags {
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

export function CtaMedia({
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

export function CtaButton({
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
