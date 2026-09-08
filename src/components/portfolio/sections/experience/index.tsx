import type { SectionProps } from "../shared";
import { ExperienceAccentRail } from "./accent-rail";
import { ExperienceCompact } from "./compact";
import { ExperienceHorizontal } from "./horizontal";
import { ExperienceIndexed } from "./indexed";
import { ExpEmpty, ExpHeader, readExp } from "./shared";
import { ExperienceSplit } from "./split";
import { ExperienceTimeline } from "./timeline";

export function ExperienceSection({ section }: SectionProps) {
  const exp = readExp(section.data);
  const variant = section.variant;
  const items = exp.items;
  const empty = items.length ? null : <ExpEmpty items={items} />;
  const header = <ExpHeader exp={exp} />;
  const props = { exp, items, empty, header };

  if (variant === 1) return <ExperienceTimeline {...props} />;
  if (variant === 2) return <ExperienceHorizontal {...props} />;
  if (variant === 3) return <ExperienceSplit {...props} />;
  if (variant === 4) return <ExperienceCompact {...props} />;
  if (variant === 5) return <ExperienceIndexed {...props} />;
  return <ExperienceAccentRail {...props} />;
}
