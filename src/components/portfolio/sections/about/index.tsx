import type { SectionProps } from '../shared';
import { AboutAccentRail } from './accent-rail';
import { AboutCopyLead } from './copy-lead';
import { AboutDisplay } from './display';
import { AboutMagazine } from './magazine';
import { AboutPortraitLead } from './portrait-lead';
import { readAbout } from './shared';
import { AboutSoftPanel } from './soft-panel';

export function AboutSection({ section }: SectionProps) {
  const about = readAbout(section.data);
  const variant = section.variant;
  const hasPhoto = about.showImage && Boolean(about.imageUrl);

  if (variant === 1) {
    return <AboutPortraitLead about={about} hasPhoto={hasPhoto} />;
  }
  if (variant === 2) {
    return <AboutCopyLead about={about} hasPhoto={hasPhoto} />;
  }
  if (variant === 3) {
    return <AboutSoftPanel about={about} hasPhoto={hasPhoto} />;
  }
  if (variant === 4) {
    return <AboutDisplay about={about} hasPhoto={hasPhoto} />;
  }
  if (variant === 5) {
    return <AboutMagazine about={about} hasPhoto={hasPhoto} />;
  }
  return <AboutAccentRail about={about} hasPhoto={hasPhoto} />;
}
