import { SectionHeader, asStringArray } from "../shared";

export type SkillsFlags = {
  eyebrow: string;
  headline: string;
  items: string[];
  showEyebrow: boolean;
  showHeadline: boolean;
  showItems: boolean;
};

export function readSkills(data: Record<string, unknown>): SkillsFlags {
  return {
    eyebrow: String(data.eyebrow || "Skills"),
    headline: String(data.headline || ""),
    items: asStringArray(data.items),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showItems: data.showItems !== false,
  };
}

export function SkillsEmpty() {
  return <p className="text-sm text-white/50">No skills listed.</p>;
}

export function SkillsHeader({ skills }: { skills: SkillsFlags }) {
  return (
    <SectionHeader
      eyebrow={skills.eyebrow}
      headline={skills.headline}
      showEyebrow={skills.showEyebrow}
      showHeadline={skills.showHeadline}
    />
  );
}
