import {
  HeroActions,
  HeroDescription,
  HeroPhoto,
  type HeroFlags,
} from './shared';

export function HeroOrbitalCenter({ hero }: { hero: HeroFlags }) {
  const photo =
    hero.showImage && hero.imageUrl ? (
      <HeroPhoto url={hero.imageUrl} alt={hero.imageAlt} sizes='160px' />
    ) : null;

  return (
    <section
      id='hero'
      className='flex flex-col items-center gap-7 py-6 text-center md:gap-8 md:py-10'
    >
      {photo ? (
        <div className='relative'>
          <div
            aria-hidden
            className='absolute -inset-2 rounded-full border border-(--p-accent)/40'
          />
          <div className='relative h-32 w-32 overflow-hidden rounded-full border border-white/15 md:h-40 md:w-40'>
            {photo}
          </div>
        </div>
      ) : (
        <span aria-hidden className='h-2 w-2 rounded-full bg-(--p-accent)' />
      )}
      {hero.showName && hero.name ? (
        <h2 className='max-w-4xl font-display text-[clamp(2.8rem,10vw,5.8rem)] leading-[0.88] tracking-[-0.055em]'>
          {hero.name}
        </h2>
      ) : null}
      <div aria-hidden className='h-px w-16 bg-(--p-accent)/70' />
      {hero.showTagline && hero.tagline ? (
        <p className='max-w-xl text-lg leading-relaxed text-white/65'>
          {hero.tagline}
        </p>
      ) : null}
      <HeroDescription
        hero={hero}
        align='center'
        className='max-w-xl text-sm leading-relaxed text-white/55 md:text-base'
      />
      <HeroActions hero={hero} align='center' />
    </section>
  );
}
