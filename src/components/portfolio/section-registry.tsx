import type { PortfolioSection } from "@/lib/api-client";
import { clampSectionVariant, type SectionType } from "@/lib/sections";
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
import type { PortfolioMeta, SectionProps } from "./sections/shared";

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

export function RenderPortfolioSection({
  section,
  portfolio,
}: {
  section: PortfolioSection;
  portfolio: PortfolioMeta;
}) {
  const normalized: PortfolioSection = {
    ...section,
    variant: clampSectionVariant(section.type, section.variant),
  };
  const Renderer = RENDERERS[normalized.type];
  if (!Renderer) return null;
  return <Renderer section={normalized} portfolio={portfolio} />;
}
