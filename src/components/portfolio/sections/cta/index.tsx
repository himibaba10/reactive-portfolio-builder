import type { SectionProps } from '../shared';
import { CtaCenteredManifesto } from './centered-manifesto';
import { CtaCinematicBleed } from './cinematic-bleed';
import { CtaDockedAction } from './docked-action';
import { CtaPrimaryBanner } from './primary-banner';
import { CtaMedia, readCta } from './shared';
import { CtaSoftStage } from './soft-stage';
import { CtaSplitAction } from './split-action';

export function CtaSection({ section }: SectionProps) {
  const cta = readCta(section.data);
  const variant = section.variant;
  const media = <CtaMedia cta={cta} />;

  if (variant === 1) {
    return <CtaSoftStage cta={cta} media={media} />;
  }

  if (variant === 2) {
    return <CtaSplitAction cta={cta} media={media} />;
  }

  if (variant === 3) {
    return <CtaPrimaryBanner cta={cta} />;
  }

  if (variant === 4) {
    return <CtaCenteredManifesto cta={cta} media={media} />;
  }

  if (variant === 5) {
    return <CtaDockedAction cta={cta} media={media} />;
  }

  return <CtaCinematicBleed cta={cta} />;
}
