import { PortfolioImage } from '../portfolio-image';
import { CtaButton, type CtaFlags } from './shared';

export function CtaCinematicBleed({ cta }: { cta: CtaFlags }) {
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
