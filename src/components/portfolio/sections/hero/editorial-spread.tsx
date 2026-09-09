import {
  HeroCta,
  HeroDescription,
  type HeroFlags,
} from './shared';

export function HeroEditorialSpread({
  hero,
  photo,
}: {
  hero: HeroFlags;
  photo: React.ReactNode;
}) {
  return (
    <section
      id='hero'
      className='grid gap-8 py-2 md:grid-cols-12 md:gap-6 md:py-4'
    >
      <div className='space-y-5 md:col-span-7 md:space-y-6'>
        <p className='text-xs tracking-[0.28em] text-(--p-accent) uppercase'>
          Portfolio
        </p>
        {hero.showName && hero.name ? (
          <h2 className='font-display text-[clamp(2.6rem,7vw,4.8rem)] leading-[0.9] tracking-tighter'>
            {hero.name}
          </h2>
        ) : null}
        {hero.showTagline && hero.tagline ? (
          <p className='max-w-md text-base leading-relaxed text-white/65 md:text-lg'>
            {hero.tagline}
          </p>
        ) : null}
        <HeroDescription
          hero={hero}
          className='max-w-md text-sm leading-relaxed text-white/55 md:text-base'
        />
        <HeroCta hero={hero} />
      </div>
      {photo ? (
        <div className='md:col-span-5 md:pt-8'>
          <div className='aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/20 md:rounded-3xl'>
            {photo}
          </div>
        </div>
      ) : null}
    </section>
  );
}
