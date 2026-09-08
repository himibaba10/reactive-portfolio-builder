import { PortfolioImage } from '../portfolio-image';
import { CtaButton, type CtaFlags } from './shared';

export function CtaPrimaryBanner({ cta }: { cta: CtaFlags }) {
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
