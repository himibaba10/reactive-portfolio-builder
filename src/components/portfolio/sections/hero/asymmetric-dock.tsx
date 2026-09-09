import {
  HeroActions,
  HeroDescription,
  type HeroFlags,
} from './shared';

export function HeroAsymmetricDock({
  hero,
  photo,
}: {
  hero: HeroFlags;
  photo: React.ReactNode;
}) {
  return (
    <section id='hero' className='relative space-y-10 md:space-y-14'>
      <div className='grid gap-8 md:grid-cols-[1fr_auto] md:items-start'>
        <div className='min-w-0 space-y-4'>
          {hero.showName && hero.name ? (
            <h2 className='font-display text-[clamp(3rem,11vw,6.8rem)] leading-[0.84] tracking-[-0.055em]'>
              {hero.name.split(/\s+/).map((word, i) => (
                <span key={`${word}-${i}`}>
                  {i > 0 ? ' ' : null}
                  <span className={i === 0 ? 'text-(--p-accent)' : undefined}>
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          ) : null}
          <HeroDescription
            hero={hero}
            className='max-w-lg text-sm leading-relaxed text-white/55 md:text-base'
          />
        </div>
        {photo ? (
          <div className='w-full max-w-56 justify-self-end overflow-hidden rounded-3xl border border-white/10 bg-black/20 md:w-48 md:max-w-none lg:w-56'>
            <div className='aspect-3/4'>{photo}</div>
          </div>
        ) : null}
      </div>
      <div className='flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between'>
        {hero.showTagline && hero.tagline ? (
          <p className='max-w-md text-base text-white/65 md:text-lg'>
            {hero.tagline}
          </p>
        ) : (
          <span />
        )}
        <HeroActions hero={hero} className='shrink-0 self-start sm:self-auto' />
      </div>
    </section>
  );
}
