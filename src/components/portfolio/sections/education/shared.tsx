import type { ReactNode } from "react";
import { GraduationCap } from "lucide-react";
import { PortfolioImage } from "../portfolio-image";
import { SectionHeader, asRecordArray } from "../shared";

export type EduFlags = {
  eyebrow: string;
  headline: string;
  items: Array<Record<string, unknown>>;
  showEyebrow: boolean;
  showHeadline: boolean;
  showImages: boolean;
  showDegree: boolean;
  showPeriod: boolean;
};

export type EduLayoutProps = {
  edu: EduFlags;
  items: Array<Record<string, unknown>>;
  empty: ReactNode;
  header: ReactNode;
};

export function readEdu(data: Record<string, unknown>): EduFlags {
  return {
    eyebrow: String(data.eyebrow || "Education"),
    headline: String(data.headline || ""),
    items: asRecordArray(data.items),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showImages: data.showImages !== false,
    showDegree: data.showDegree !== false,
    showPeriod: data.showPeriod !== false,
  };
}

export function EduHeader({ edu }: { edu: EduFlags }) {
  return (
    <SectionHeader
      eyebrow={edu.eyebrow}
      headline={edu.headline}
      showEyebrow={edu.showEyebrow}
      showHeadline={edu.showHeadline}
    />
  );
}

export function EduEmpty() {
  return <p className="text-sm text-white/50">No education listed.</p>;
}

export function SchoolMark({
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
        className={`${className} shrink-0 overflow-hidden rounded-xl border border-white/12 bg-black/20`}
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
      <GraduationCap className="size-4 opacity-80" />
    </div>
  );
}
