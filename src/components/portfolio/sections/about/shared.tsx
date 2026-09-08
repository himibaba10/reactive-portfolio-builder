import { PortfolioImage } from '../portfolio-image';
import { SectionEyebrow } from '../shared';

export type AboutFlags = {
  eyebrow: string;
  headline: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  showEyebrow: boolean;
  showHeadline: boolean;
  showBody: boolean;
  showImage: boolean;
};

export function readAbout(data: Record<string, unknown>): AboutFlags {
  return {
    eyebrow: String(data.eyebrow || 'About'),
    headline: String(data.headline || ''),
    body: String(data.body || ''),
    imageUrl: String(data.imageUrl || ''),
    imageAlt: String(data.imageAlt || 'About'),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showBody: data.showBody !== false,
    showImage: data.showImage !== false,
  };
}

export function AboutPhoto({
  url,
  alt,
  className = 'aspect-4/5 h-full w-full object-cover',
  sizes = '(max-width: 768px) 100vw, 360px',
}: {
  url: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <PortfolioImage src={url} alt={alt} className={className} sizes={sizes} />
  );
}

export function AboutEyebrow({ about }: { about: AboutFlags }) {
  if (!about.showEyebrow || !about.eyebrow) return null;
  return <SectionEyebrow>{about.eyebrow}</SectionEyebrow>;
}

export function AboutHeadline({
  about,
  className = 'font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[0.95] tracking-[-0.04em]',
}: {
  about: AboutFlags;
  className?: string;
}) {
  if (!about.showHeadline || !about.headline) return null;
  return <h3 className={className}>{about.headline}</h3>;
}

export function AboutBody({
  about,
  className = 'text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg',
}: {
  about: AboutFlags;
  className?: string;
}) {
  if (!about.showBody || !about.body) return null;
  return <p className={className}>{about.body}</p>;
}
