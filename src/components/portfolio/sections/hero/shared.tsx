import { PortfolioImage } from '../portfolio-image';
import { PaletteCta } from '../shared';

export type HeroFlags = {
  name: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
  showName: boolean;
  showTagline: boolean;
  showDescription: boolean;
  showImage: boolean;
  showCtaLabel: boolean;
  showCtaHref: boolean;
};

export function readHero(data: Record<string, unknown>): HeroFlags {
  return {
    name: String(data.name || ''),
    tagline: String(data.tagline || ''),
    description: String(data.description || ''),
    ctaLabel: String(data.ctaLabel || ''),
    ctaHref: String(data.ctaHref || '#'),
    imageUrl: String(data.imageUrl || ''),
    imageAlt: String(data.imageAlt || data.name || 'Portrait'),
    showName: data.showName !== false,
    showTagline: data.showTagline !== false,
    showDescription: data.showDescription !== false,
    showImage: data.showImage !== false,
    showCtaLabel: data.showCtaLabel !== false,
    showCtaHref: data.showCtaHref !== false,
  };
}

export function HeroPhoto({
  url,
  alt,
  className,
  sizes,
}: {
  url: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <PortfolioImage
      src={url}
      alt={alt}
      className={className || 'h-full w-full object-cover'}
      sizes={sizes || '(max-width: 768px) 100vw, 520px'}
      priority
    />
  );
}

export function HeroCta({
  hero,
  className = '',
}: {
  hero: HeroFlags;
  className?: string;
}) {
  if (!hero.showCtaLabel || !hero.ctaLabel) return null;
  return (
    <PaletteCta
      href={hero.ctaHref}
      label={hero.ctaLabel}
      linked={hero.showCtaHref}
      className={className}
    />
  );
}

export function HeroDescription({
  hero,
  className = 'max-w-xl text-sm leading-relaxed text-white/55 md:text-base',
  align = 'left',
}: {
  hero: HeroFlags;
  className?: string;
  align?: 'left' | 'center';
}) {
  if (!hero.showDescription || !hero.description) return null;
  return (
    <p
      className={`${className} whitespace-pre-wrap ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {hero.description}
    </p>
  );
}
