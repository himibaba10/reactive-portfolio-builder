import type { PortfolioSection } from "@/lib/api-client";

export type PortfolioMeta = {
  title: string;
  slug: string;
};

export type NavItem = {
  href: string;
  label: string;
};

export type SectionProps = {
  section: PortfolioSection;
  portfolio: PortfolioMeta;
  navItems?: NavItem[];
};

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs tracking-[0.28em] text-(--p-accent) uppercase">
      {children}
    </h2>
  );
}

export function PaletteCta({
  href,
  label,
  className = "",
  linked = true,
}: {
  href: string;
  label: string;
  className?: string;
  /** When false, render as a non-navigating pill (CTA href disabled). */
  linked?: boolean;
}) {
  if (!label) return null;
  const classes = `inline-flex items-center justify-center rounded-full bg-(--p-primary) px-6 py-3 text-sm font-semibold text-(--p-text-dark) transition hover:opacity-90 ${className}`;
  if (!linked) {
    return <span className={classes}>{label}</span>;
  }
  return (
    <a href={href || "#"} className={classes}>
      {label}
    </a>
  );
}

export function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

export function asRecordArray(value: unknown): Array<Record<string, unknown>> {
  return Array.isArray(value)
    ? (value as Array<Record<string, unknown>>)
    : [];
}
