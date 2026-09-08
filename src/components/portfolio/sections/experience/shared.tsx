import type { ReactNode } from "react";
import { Building2 } from "lucide-react";
import { PortfolioImage } from "../portfolio-image";
import { SectionHeader, asRecordArray } from "../shared";

export type ExpFlags = {
  eyebrow: string;
  headline: string;
  items: Array<Record<string, unknown>>;
  showEyebrow: boolean;
  showHeadline: boolean;
  showImages: boolean;
  showPeriod: boolean;
  showDescription: boolean;
};

export type ExpLayoutProps = {
  exp: ExpFlags;
  items: Array<Record<string, unknown>>;
  empty: ReactNode;
  header: ReactNode;
};

export function readExp(data: Record<string, unknown>): ExpFlags {
  return {
    eyebrow: String(data.eyebrow || "Experience"),
    headline: String(data.headline || ""),
    items: asRecordArray(data.items),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showImages: data.showImages !== false,
    showPeriod: data.showPeriod !== false,
    showDescription: data.showDescription !== false,
  };
}

export function ExpHeader({ exp }: { exp: ExpFlags }) {
  return (
    <SectionHeader
      eyebrow={exp.eyebrow}
      headline={exp.headline}
      showEyebrow={exp.showEyebrow}
      showHeadline={exp.showHeadline}
    />
  );
}

export function ExpEmpty({ items }: { items: Array<unknown> }) {
  if (items.length) return null;
  return <p className="text-sm text-white/50">No experience listed.</p>;
}

export function Mark({
  url,
  alt,
  enabled,
  className = "size-11",
}: {
  url: unknown;
  alt: string;
  enabled: boolean;
  className?: string;
}) {
  if (!enabled) return null;
  if (url) {
    return (
      <div
        className={`${className} shrink-0 overflow-hidden rounded-xl border border-white/12 bg-black/25`}
      >
        <PortfolioImage
          src={String(url)}
          alt={alt}
          className="h-full w-full object-cover"
          sizes="48px"
        />
      </div>
    );
  }
  return (
    <div
      className={`${className} flex shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-(--p-accent)`}
      aria-hidden
    >
      <Building2 className="size-4 opacity-80" />
    </div>
  );
}
