import type { PortfolioSection } from "@/lib/api-client";
import {
  clampSectionVariant,
  SECTION_ANCHORS,
  SECTION_LABELS,
  type SectionType,
} from "@/lib/sections";
import { AboutSection } from "./sections/about";
import { ContactSection } from "./sections/contact";
import { CtaSection } from "./sections/cta";
import { EducationSection } from "./sections/education";
import { ExperienceSection } from "./sections/experience";
import { FooterSection } from "./sections/footer";
import { HeaderSection } from "./sections/header";
import { HeroSection } from "./sections/hero";
import { ProjectsSection } from "./sections/projects";
import { SkillsSection } from "./sections/skills";
import type { NavItem, PortfolioMeta, SectionProps } from "./sections/shared";

const RENDERERS: Record<
  SectionType,
  (props: SectionProps) => React.ReactNode
> = {
  Header: HeaderSection,
  Hero: HeroSection,
  About: AboutSection,
  Skills: SkillsSection,
  Projects: ProjectsSection,
  CTA: CtaSection,
  Experience: ExperienceSection,
  Education: EducationSection,
  Contact: ContactSection,
  Footer: FooterSection,
};

export function buildNavItems(sections: PortfolioSection[]): NavItem[] {
  return sections
    .filter((s) => s.type !== "Header" && s.type !== "Footer")
    .sort((a, b) => a.order - b.order)
    .flatMap((s) => {
      const anchor = SECTION_ANCHORS[s.type];
      if (!anchor) return [];
      return [{ href: `#${anchor}`, label: SECTION_LABELS[s.type] }];
    });
}

export function RenderPortfolioSection({
  section,
  portfolio,
  navItems,
}: {
  section: PortfolioSection;
  portfolio: PortfolioMeta;
  navItems?: NavItem[];
}) {
  const normalized: PortfolioSection = {
    ...section,
    variant: clampSectionVariant(section.type, section.variant),
  };
  const Renderer = RENDERERS[normalized.type];
  if (!Renderer) return null;
  return (
    <Renderer
      section={normalized}
      portfolio={portfolio}
      navItems={navItems}
    />
  );
}
