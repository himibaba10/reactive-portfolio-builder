import type { SectionProps } from "../shared";
import { SkillsBentoPanel } from "./bento-panel";
import { SkillsMarqueeStrip } from "./marquee-strip";
import { SkillsNumberedIndex } from "./numbered-index";
import { SkillsPillCloud } from "./pill-cloud";
import { readSkills } from "./shared";
import { SkillsSolidChips } from "./solid-chips";
import { SkillsUnderlineRows } from "./underline-rows";

export function SkillsSection({ section }: SectionProps) {
  const skills = readSkills(section.data);
  const variant = section.variant;
  const items = skills.showItems ? skills.items : [];
  const empty = items.length === 0;
  const props = { skills, items, empty };

  if (variant === 1) {
    return <SkillsPillCloud {...props} />;
  }

  if (variant === 2) {
    return <SkillsUnderlineRows {...props} />;
  }

  if (variant === 3) {
    return <SkillsSolidChips {...props} />;
  }

  if (variant === 4) {
    return <SkillsNumberedIndex {...props} />;
  }

  if (variant === 5) {
    return <SkillsBentoPanel {...props} />;
  }

  return <SkillsMarqueeStrip {...props} />;
}
