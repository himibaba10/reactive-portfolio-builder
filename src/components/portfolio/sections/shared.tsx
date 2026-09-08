import { Calendar } from "lucide-react";
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
    <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] text-(--p-accent) uppercase">
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-(--p-accent) shadow-[0_0_0_4px_color-mix(in_oklab,var(--p-accent)_22%,transparent)]"
      />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  headline,
  showEyebrow = true,
  showHeadline = true,
  className = "",
}: {
  eyebrow?: string;
  headline?: string;
  showEyebrow?: boolean;
  showHeadline?: boolean;
  className?: string;
}) {
  const hasEyebrow = showEyebrow && Boolean(eyebrow);
  const hasHeadline = showHeadline && Boolean(headline);
  if (!hasEyebrow && !hasHeadline) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {hasEyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
      {hasHeadline ? (
        <h3 className="max-w-3xl font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[0.95] tracking-[-0.04em]">
          {headline}
        </h3>
      ) : null}
    </div>
  );
}

export function PeriodBadge({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] tracking-[0.12em] text-white/55 uppercase">
      <Calendar className="size-3 opacity-70" aria-hidden />
      {children}
    </span>
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
