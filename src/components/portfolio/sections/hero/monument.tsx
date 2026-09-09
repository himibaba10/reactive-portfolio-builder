import {
  HeroActions,
  HeroDescription,
  type HeroFlags,
} from './shared';

export function HeroMonument({
  hero,
  photo,
}: {
  hero: HeroFlags;
  photo: React.ReactNode;
}) {
  return (
    <section id='hero' className='space-y-8 md:space-y-10'>
      <div className='max-w-5xl space-y-5'>
        {hero.showName && hero.name ? (
          <h2 className='font-display text-[clamp(3.2rem,12vw,7.5rem)] leading-[0.86] tracking-[-0.055em]'>
            {hero.name}
          </h2>
        ) : null}
        {hero.showTagline && hero.tagline ? (
          <p className='max-w-xl text-lg leading-relaxed text-white/65 md:text-xl'>
            {hero.tagline}
          </p>
        ) : null}
        <HeroDescription hero={hero} />
        <HeroActions hero={hero} />
      </div>
      {photo ? (
        <div className='aspect-21/9 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/25 md:rounded-4xl'>
          {photo}
        </div>
      ) : null}
    </section>
  );
}
