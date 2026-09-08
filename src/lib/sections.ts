import { z } from "zod";

export const SECTION_TYPES = [
  "Header",
  "Hero",
  "About",
  "Skills",
  "Projects",
  "CTA",
  "Experience",
  "Education",
  "Contact",
  "Footer",
] as const;

export type SectionType = (typeof SECTION_TYPES)[number];

export const VARIANT_SECTION_TYPES = [
  "Hero",
  "About",
  "Skills",
  "Projects",
  "CTA",
] as const;

export type VariantSectionType = (typeof VARIANT_SECTION_TYPES)[number];

export const SECTION_LABELS: Record<SectionType, string> = {
  Header: "Header",
  Hero: "Hero",
  About: "About",
  Skills: "Skills",
  Projects: "Portfolio",
  CTA: "CTA",
  Experience: "Experience",
  Education: "Education",
  Contact: "Contact",
  Footer: "Footer",
};

/** In-page anchors for public nav (Header links). */
export const SECTION_ANCHORS: Partial<Record<SectionType, string>> = {
  Hero: "hero",
  About: "about",
  Skills: "skills",
  Projects: "projects",
  CTA: "cta",
  Experience: "experience",
  Education: "education",
  Contact: "contact",
};

export const PINNED_SECTION_TYPES = ["Header", "Footer"] as const;

export function isVariantSectionType(type: SectionType): type is VariantSectionType {
  return (VARIANT_SECTION_TYPES as readonly string[]).includes(type);
}

export function isPinnedSectionType(type: SectionType): boolean {
  return (PINNED_SECTION_TYPES as readonly string[]).includes(type);
}

export const PALETTE_IDS = [
  "ocean",
  "forest",
  "ember",
  "slate",
  "rose",
  "mono",
  "signal",
  "ink",
] as const;

export type PaletteId = (typeof PALETTE_IDS)[number];

export const sectionVariantSchema = z.number().int().min(1).max(6);

/** Hero, About, Skills, Projects, CTA have 6 layouts. */
export function sectionVariantCount(type: SectionType): number {
  if (
    type === "Hero" ||
    type === "About" ||
    type === "Skills" ||
    type === "Projects" ||
    type === "CTA"
  ) {
    return 6;
  }
  if (isVariantSectionType(type)) return 5;
  return 1;
}

export function clampSectionVariant(type: SectionType, variant: unknown): number {
  if (!isVariantSectionType(type)) return 1;
  const n = typeof variant === "number" ? variant : Number(variant);
  if (!Number.isFinite(n)) return 1;
  const max = sectionVariantCount(type);
  return Math.min(max, Math.max(1, Math.round(n)));
}

export function defaultSectionData(type: SectionType): Record<string, unknown> {
  switch (type) {
    case "Header":
      return {
        logoUrl: "",
        logoPublicId: "",
      };
    case "Hero":
      return {
        name: "Your name",
        tagline: "Maker · designer · builder",
        description:
          "A short line about what you build and who you build it for.",
        ctaLabel: "See work",
        ctaHref: "#projects",
        imageUrl: "",
        imagePublicId: "",
        imageAlt: "",
        showName: true,
        showTagline: true,
        showDescription: true,
        showImage: true,
        showCtaLabel: true,
        showCtaHref: true,
      };
    case "About":
      return {
        eyebrow: "About",
        headline: "A bit about me",
        body: "A short bio about what you build and why it matters.",
        imageUrl: "",
        imagePublicId: "",
        imageAlt: "",
        showEyebrow: true,
        showHeadline: true,
        showBody: true,
        showImage: true,
      };
    case "Skills":
      return {
        eyebrow: "Skills",
        headline: "What I work with",
        items: ["React", "Design systems", "Product"],
        showEyebrow: true,
        showHeadline: true,
        showItems: true,
      };
    case "Projects":
      return {
        eyebrow: "Portfolio",
        headline: "Selected work",
        showEyebrow: true,
        showHeadline: true,
        showImages: true,
        showDescriptions: true,
        showLinks: true,
        items: [
          {
            title: "Featured project",
            description: "One-line outcome.",
            url: "",
            tags: ["Web"],
            imageUrl: "",
            imagePublicId: "",
          },
        ],
      };
    case "CTA":
      return {
        headline: "Let’s build something",
        body: "Open to collaborations, product roles, and sharp briefs.",
        ctaLabel: "Get in touch",
        ctaHref: "#contact",
        imageUrl: "",
        imagePublicId: "",
      };
    case "Experience":
      return {
        items: [
          {
            role: "Role",
            company: "Company",
            period: "2024 — Present",
            description: "What you shipped.",
            imageUrl: "",
            imagePublicId: "",
          },
        ],
      };
    case "Education":
      return {
        items: [
          {
            school: "School",
            degree: "Degree",
            period: "2020 — 2024",
            imageUrl: "",
            imagePublicId: "",
          },
        ],
      };
    case "Contact":
      return {
        email: "you@example.com",
        imageUrl: "",
        imagePublicId: "",
        socials: {
          github: "",
          linkedin: "",
          twitter: "",
          website: "",
        },
      };
    case "Footer":
      return {};
  }
}

const DEFAULT_VISIBLE: SectionType[] = [
  "Header",
  "Hero",
  "About",
  "Contact",
  "Footer",
];

export function createDefaultSections() {
  return SECTION_TYPES.map((type, order) => ({
    id: crypto.randomUUID(),
    type,
    order,
    visible: DEFAULT_VISIBLE.includes(type),
    variant: 1,
    data: defaultSectionData(type),
  }));
}

export function normalizePortfolioSection<T extends {
  type: SectionType;
  variant?: unknown;
}>(section: T): T & { variant: number } {
  return {
    ...section,
    variant: clampSectionVariant(section.type, section.variant),
  };
}

export const emailSchema = z.string().email().max(254);
export const passwordSchema = z.string().min(8).max(128);
export const paletteIdSchema = z.enum(PALETTE_IDS);
export const sectionTypeSchema = z.enum(SECTION_TYPES);
