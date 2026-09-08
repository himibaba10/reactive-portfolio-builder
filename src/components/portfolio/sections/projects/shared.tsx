import { SectionHeader, asRecordArray, type SectionProps } from "../shared";
import { PortfolioImage } from "../portfolio-image";

export type { SectionProps };

export type ProjectsFlags = {
  eyebrow: string;
  headline: string;
  items: Array<Record<string, unknown>>;
  showEyebrow: boolean;
  showHeadline: boolean;
  showImages: boolean;
  showDescriptions: boolean;
  showLinks: boolean;
};

export function readProjects(data: Record<string, unknown>): ProjectsFlags {
  return {
    eyebrow: String(data.eyebrow || "Portfolio"),
    headline: String(data.headline || ""),
    items: asRecordArray(data.items),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showImages: data.showImages !== false,
    showDescriptions: data.showDescriptions !== false,
    showLinks: data.showLinks !== false,
  };
}

export function ProjectCover({
  url,
  title,
  enabled,
  className = "aspect-video",
}: {
  url: unknown;
  title: unknown;
  enabled: boolean;
  className?: string;
}) {
  const src = String(url || "");
  if (!enabled || !src) return null;
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-black/20 ${className}`}
    >
      <PortfolioImage
        src={src}
        alt={String(title || "Project")}
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 420px"
      />
    </div>
  );
}

export function ProjectLink({
  url,
  enabled,
  className = "mt-4 inline-block text-sm text-(--p-accent) hover:underline",
  children = "Visit →",
}: {
  url: unknown;
  enabled: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  if (!enabled || !url) return null;
  return (
    <a
      href={String(url)}
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export function projectsHeader(projects: ProjectsFlags) {
  return (
    <SectionHeader
      eyebrow={projects.eyebrow}
      headline={projects.headline}
      showEyebrow={projects.showEyebrow}
      showHeadline={projects.showHeadline}
    />
  );
}

export function projectsEmpty(items: Array<Record<string, unknown>>) {
  return items.length === 0 ? (
    <p className="text-sm text-white/50">No projects yet.</p>
  ) : null;
}
