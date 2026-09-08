"use client";

import type { PortfolioSection } from "@/lib/api-client";
import { getPalette } from "@/lib/palette";
import { ProjectsSection } from "@/components/portfolio/sections/projects";
import { SectionLayoutPickerShell } from "@/components/editor/section-layout-picker-shell";

const PROJECTS_LAYOUTS = [
  { id: 1, name: "Stack", blurb: "Full-width project cards" },
  { id: 2, name: "Grid", blurb: "Two-column card grid" },
  { id: 3, name: "Rows", blurb: "Editorial list with thumbs" },
  { id: 4, name: "Panels", blurb: "Numbered tint panels" },
  { id: 5, name: "Featured", blurb: "Hero project + supporting" },
  { id: 6, name: "Mosaic", blurb: "Image overlay gallery" },
] as const;

function Mini({ className = "" }: { className?: string }) {
  return <span className={`rounded-[2px] bg-current ${className}`} />;
}

function ProjectsSketch({ id }: { id: number }) {
  if (id === 2) {
    return (
      <div className="grid h-full grid-cols-2 gap-1 p-2">
        <Mini className="rounded-sm opacity-40" />
        <Mini className="rounded-sm opacity-50" />
        <Mini className="rounded-sm opacity-35" />
        <Mini className="rounded-sm opacity-45" />
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className="flex h-full flex-col justify-center gap-1.5 border-y border-current/20 p-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-1">
            <Mini className="h-3 w-4 rounded-sm opacity-40" />
            <Mini className="h-1.5 flex-1 opacity-70" />
          </div>
        ))}
      </div>
    );
  }
  if (id === 4) {
    return (
      <div className="flex h-full flex-col gap-1 p-2">
        <Mini className="flex-1 rounded-md opacity-45" />
        <Mini className="flex-1 rounded-md opacity-35" />
      </div>
    );
  }
  if (id === 5) {
    return (
      <div className="flex h-full flex-col gap-1 p-2">
        <Mini className="h-[55%] rounded-md opacity-50" />
        <div className="grid flex-1 grid-cols-2 gap-1">
          <Mini className="rounded-sm opacity-35" />
          <Mini className="rounded-sm opacity-40" />
        </div>
      </div>
    );
  }
  if (id === 6) {
    return (
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-1 p-2">
        <Mini className="col-span-2 row-span-2 rounded-md opacity-50" />
        <Mini className="rounded-sm opacity-35" />
        <Mini className="rounded-sm opacity-40" />
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-1 p-2">
      <Mini className="flex-1 rounded-md opacity-45" />
      <Mini className="flex-1 rounded-md opacity-35" />
    </div>
  );
}

export function ProjectsLayoutPicker({
  section,
  paletteId,
  portfolioTitle,
  portfolioSlug,
  value,
  onChange,
}: {
  section: PortfolioSection;
  paletteId: string;
  portfolioTitle: string;
  portfolioSlug: string;
  value: number;
  onChange: (variant: number) => void;
}) {
  const palette = getPalette(paletteId);
  const style = {
    ["--p-primary" as string]: palette.tokens.primary,
    ["--p-secondary" as string]: palette.tokens.secondary,
    ["--p-accent" as string]: palette.tokens.accent,
    ["--p-text-dark" as string]: palette.tokens.textDark,
    ["--p-text-light" as string]: palette.tokens.textLight,
  };

  return (
    <SectionLayoutPickerShell
      layouts={PROJECTS_LAYOUTS}
      value={value}
      onChange={onChange}
      sketch={(id) => <ProjectsSketch id={id} />}
      previewStyle={style}
      previewLabel={
        PROJECTS_LAYOUTS.find((l) => l.id === value)?.name ?? "Portfolio"
      }
      preview={
        <ProjectsSection
          section={{ ...section, variant: value, visible: true }}
          portfolio={{ title: portfolioTitle, slug: portfolioSlug }}
        />
      }
    />
  );
}
