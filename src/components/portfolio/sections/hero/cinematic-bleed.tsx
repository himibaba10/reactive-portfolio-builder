import {
  HeroCta,
  HeroDescription,
  type HeroFlags,
} from './shared';

export function HeroCinematicBleed({
  hero,
  photo,
}: {
  hero: HeroFlags;
  photo: React.ReactNode;
}) {
  return (
    <section
      id='hero'
      className='relative min-h-[min(72vh,640px)] overflow-hidden rounded-4xl border border-white/10 bg-black/30 md:rounded-[2.5rem]'
    >
      {photo ? (
        <div className='absolute inset-0'>{photo}</div>
      ) : (
        <div
          aria-hidden
          className='absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--p-accent)_45%,transparent),transparent_55%),linear-gradient(160deg,color-mix(in_oklab,var(--p-primary)_35%,transparent),transparent_60%)]'
        />
      )}
      <div
        aria-hidden
        className='absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10'
      />
      <div className='relative z-10 flex min-h-[min(72vh,640px)] flex-col justify-end gap-5 p-7 md:p-12'>
        {hero.showName && hero.name ? (
          <h2 className='max-w-3xl font-display text-[clamp(2.6rem,8vw,5rem)] leading-[0.9] tracking-tighter'>
            {hero.name}
          </h2>
        ) : null}
        {hero.showTagline && hero.tagline ? (
          <p className='max-w-lg text-base text-white/75 md:text-lg'>
            {hero.tagline}
          </p>
        ) : null}
        <HeroDescription
          hero={hero}
          className='max-w-lg text-sm leading-relaxed text-white/60 md:text-base'
        />
        <HeroCta hero={hero} />
      </div>
    </section>
  );
}
