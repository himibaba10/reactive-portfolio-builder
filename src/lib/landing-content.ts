export const site = {
  name: "Reactive Portfolio Builder",
  shortName: "Reactive",
  tagline: "One page. Your slug. Strictly beautiful.",
  description:
    "Compose a one-page portfolio from prebuilt sections, lock a five-token palette, and publish at your own directory URL — free.",
} as const;

export const navLinks = [
  { href: "#process", label: "Process" },
  { href: "#sections", label: "Sections" },
  { href: "#palettes", label: "Palettes" },
] as const;

export const marqueeItems = [
  "Prebuilt sections",
  "Strict palettes",
  "One-page sites",
  "Custom slugs",
  "Free forever MVP",
  "Publish in minutes",
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Sign up",
    body: "Email and password. Verify once. Your account holds a single portfolio — focused by design.",
  },
  {
    index: "02",
    title: "Compose",
    body: "Pick layouts for Hero, About, Skills, Portfolio, and CTA — plus fixed Header/Footer and Experience, Education, Contact. Reorder. Hide. No custom section sprawl.",
  },
  {
    index: "03",
    title: "Publish",
    body: "Claim a unique slug and go live at /your-name. Change it later if the path is free.",
  },
] as const;

export const sectionTypes = [
  {
    type: "Header",
    hint: "Fixed · logo left, section nav right",
  },
  {
    type: "Hero",
    hint: "Six layouts · name, tagline, photo, optional CTA",
  },
  {
    type: "About",
    hint: "Five layouts · short bio",
  },
  {
    type: "Skills",
    hint: "Five layouts · craft tags",
  },
  {
    type: "Portfolio",
    hint: "Five layouts · projects with links",
  },
  {
    type: "CTA",
    hint: "Five layouts · headline + action",
  },
  {
    type: "Experience",
    hint: "Role timeline that actually reads",
  },
  {
    type: "Education",
    hint: "Schools and credentials, clean",
  },
  {
    type: "Contact",
    hint: "Mailto plus fixed social set",
  },
  {
    type: "Footer",
    hint: "Fixed · centered copyright",
  },
] as const;

export const palettes = [
  {
    id: "ocean",
    name: "Ocean",
    tokens: {
      primary: "#1B6CA8",
      secondary: "#0E2A47",
      accent: "#3DE0C5",
      textDark: "#0B1220",
      textLight: "#F3F7FB",
    },
  },
  {
    id: "forest",
    name: "Forest",
    tokens: {
      primary: "#1F6F4A",
      secondary: "#123528",
      accent: "#A7E067",
      textDark: "#0C1611",
      textLight: "#F2F7F3",
    },
  },
  {
    id: "ember",
    name: "Ember",
    tokens: {
      primary: "#C2410C",
      secondary: "#3B1A0F",
      accent: "#FBBF24",
      textDark: "#1A0F0A",
      textLight: "#FFF7ED",
    },
  },
  {
    id: "slate",
    name: "Slate",
    tokens: {
      primary: "#475569",
      secondary: "#1E293B",
      accent: "#38BDF8",
      textDark: "#0F172A",
      textLight: "#F8FAFC",
    },
  },
  {
    id: "rose",
    name: "Rose",
    tokens: {
      primary: "#BE123C",
      secondary: "#4C0519",
      accent: "#FB7185",
      textDark: "#1C0A10",
      textLight: "#FFF1F2",
    },
  },
  {
    id: "mono",
    name: "Mono",
    tokens: {
      primary: "#111111",
      secondary: "#2A2A2A",
      accent: "#E8E8E8",
      textDark: "#0A0A0A",
      textLight: "#FAFAFA",
    },
  },
  {
    id: "signal",
    name: "Signal",
    tokens: {
      primary: "#D6FF3F",
      secondary: "#12141A",
      accent: "#5B8CFF",
      textDark: "#0A0B0D",
      textLight: "#F4F5F0",
    },
  },
  {
    id: "ink",
    name: "Ink",
    tokens: {
      primary: "#0B3D91",
      secondary: "#061428",
      accent: "#FF6B4A",
      textDark: "#05080F",
      textLight: "#F5F7FA",
    },
  },
] as const;

export const tokenLabels = [
  "primary",
  "secondary",
  "accent",
  "textDark",
  "textLight",
] as const;
