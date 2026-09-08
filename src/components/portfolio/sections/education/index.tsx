import type { SectionProps } from "../shared";
import { EducationAccentRail } from "./accent-rail";
import { EducationCards } from "./cards";
import { EducationDiploma } from "./diploma";
import { EducationRows } from "./rows";
import { EduEmpty, EduHeader, readEdu } from "./shared";
import { EducationStack } from "./stack";
import { EducationTimeline } from "./timeline";

export function EducationSection({ section }: SectionProps) {
  const edu = readEdu(section.data);
  const variant = section.variant;
  const items = edu.items;
  const empty = items.length ? null : <EduEmpty />;
  const header = <EduHeader edu={edu} />;
  const props = { edu, items, empty, header };

  if (variant === 1) return <EducationStack {...props} />;
  if (variant === 2) return <EducationCards {...props} />;
  if (variant === 3) return <EducationTimeline {...props} />;
  if (variant === 4) return <EducationRows {...props} />;
  if (variant === 5) return <EducationAccentRail {...props} />;
  return <EducationDiploma {...props} />;
}
