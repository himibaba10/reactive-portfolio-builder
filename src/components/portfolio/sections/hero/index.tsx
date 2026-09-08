import type { SectionProps } from '../shared';
import { HeroAsymmetricDock } from './asymmetric-dock';
import { HeroCinematicBleed } from './cinematic-bleed';
import { HeroEditorialSpread } from './editorial-spread';
import { HeroMonument } from './monument';
import { HeroOrbitalCenter } from './orbital-center';
import { HeroPhoto, readHero } from './shared';
import { HeroSplitFrame } from './split-frame';

export function HeroSection({ section }: SectionProps) {
  const hero = readHero(section.data);
  const variant = section.variant;
  const photo =
    hero.showImage && hero.imageUrl ? (
      <HeroPhoto url={hero.imageUrl} alt={hero.imageAlt} />
    ) : null;

  if (variant === 1) {
    return <HeroMonument hero={hero} photo={photo} />;
  }

  if (variant === 2) {
    return <HeroSplitFrame hero={hero} photo={photo} />;
  }

  if (variant === 3) {
    return <HeroCinematicBleed hero={hero} photo={photo} />;
  }

  if (variant === 4) {
    return <HeroOrbitalCenter hero={hero} />;
  }

  if (variant === 5) {
    return <HeroEditorialSpread hero={hero} photo={photo} />;
  }

  return <HeroAsymmetricDock hero={hero} photo={photo} />;
}
