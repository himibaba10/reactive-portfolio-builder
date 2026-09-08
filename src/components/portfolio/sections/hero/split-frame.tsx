import {
  HeroCta,
  HeroDescription,
  type HeroFlags,
} from './shared';

export function HeroSplitFrame({
  hero,
  photo,
}: {
  hero: HeroFlags;
  photo: React.ReactNode;
}) {
  return (
    <section
      id='hero'
      className='grid items-end gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12'
    >
      <div className='space-y-6 pb-1'>
        {hero.showName && hero.name ? (
          <h2 className='font-display text-[clamp(2.8rem,9vw,5.4rem)] leading-[0.88] tracking-tighter'>
            {hero.name}
          </h2>
        ) : null}
        {hero.showTagline && hero.tagline ? (
          <p className='max-w-md text-base leading-relaxed text-white/70 md:text-lg'>
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
        <div className='relative'>
          <div
            aria-hidden
            className='absolute -inset-3 rounded-4xl border border-(--p-accent)/35 md:-inset-4'
          />
          <div className='relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20'>
            {photo}
          </div>
        </div>
      ) : hero.showDescription && hero.description ? (
        <div className='border-t border-white/15 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8'>
          <HeroDescription
            hero={hero}
            className='text-base leading-relaxed text-white/60 md:text-lg'
          />
        </div>
      ) : hero.showTagline && hero.tagline ? (
        <div className='border-t border-white/15 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8'>
          <p className='text-base leading-relaxed text-white/60 md:text-lg'>
            {hero.tagline}
          </p>
        </div>
      ) : null}
    </section>
  );
}
