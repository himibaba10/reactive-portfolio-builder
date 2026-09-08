import { z } from "zod";

export const SECTION_TYPES = [
  "Hero",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Contact",
] as const;

export type SectionType = (typeof SECTION_TYPES)[number];

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

export function defaultSectionData(type: SectionType): Record<string, unknown> {
  switch (type) {
    case "Hero":
      return {
        name: "Your name",
        tagline: "Maker · designer · builder",
        ctaLabel: "See work",
        ctaHref: "#projects",
      };
    case "About":
      return {
        body: "A short bio about what you build and why it matters.",
      };
    case "Skills":
      return { items: ["React", "Design systems", "Product"] };
    case "Projects":
      return {
        items: [
          {
            title: "Featured project",
            description: "One-line outcome.",
            url: "",
            tags: ["Web"],
          },
        ],
      };
    case "Experience":
      return {
        items: [
          {
            role: "Role",
            company: "Company",
            period: "2024 — Present",
            description: "What you shipped.",
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
          },
        ],
      };
    case "Contact":
      return {
        email: "you@example.com",
        socials: {
          github: "",
          linkedin: "",
          twitter: "",
          website: "",
        },
      };
  }
}

export function createDefaultSections() {
  return SECTION_TYPES.map((type, order) => ({
    id: crypto.randomUUID(),
    type,
    order,
    visible: type === "Hero" || type === "About" || type === "Contact",
    data: defaultSectionData(type),
  }));
}

export const emailSchema = z.string().email().max(254);
export const passwordSchema = z.string().min(8).max(128);
export const paletteIdSchema = z.enum(PALETTE_IDS);
export const sectionTypeSchema = z.enum(SECTION_TYPES);
