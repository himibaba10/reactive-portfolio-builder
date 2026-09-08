"use client";

import type { PortfolioSection } from "@/lib/api-client";
import { getPalette } from "@/lib/palette";
import { CtaSection } from "@/components/portfolio/sections/cta";
import { SectionLayoutPickerShell } from "@/components/editor/section-layout-picker-shell";

const CTA_LAYOUTS = [
  { id: 1, name: "Stage", blurb: "Soft card with stacked ask" },
  { id: 2, name: "Split", blurb: "Copy left, CTA right" },
  { id: 3, name: "Banner", blurb: "Solid primary panel" },
  { id: 4, name: "Center", blurb: "Centered manifesto" },
  { id: 5, name: "Dock", blurb: "Copy card + action tile" },
  { id: 6, name: "Cinematic", blurb: "Full-bleed closing ask" },
] as const;

function Mini({ className = "" }: { className?: string }) {
  return <span className={`rounded-[2px] bg-current ${className}`} />;
}

function CtaSketch({ id }: { id: number }) {
  if (id === 2) {
    return (
      <div className="flex h-full items-center gap-1.5 p-2">
        <div className="flex flex-1 flex-col gap-1">
          <Mini className="h-2 w-[85%] opacity-90" />
          <Mini className="h-1 w-full opacity-40" />
        </div>
        <Mini className="h-4 w-8 rounded-full opacity-70" />
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className="flex h-full flex-col justify-end gap-1 rounded-md bg-current/20 p-2">
        <Mini className="h-2 w-[80%] opacity-90" />
        <Mini className="h-1 w-[60%] opacity-50" />
        <Mini className="mt-0.5 h-2 w-8 rounded-full opacity-80" />
      </div>
    );
  }
  if (id === 4) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1 border-y border-current/25 p-2">
        <Mini className="h-2 w-[70%] opacity-90" />
        <Mini className="h-1 w-[50%] opacity-45" />
        <Mini className="mt-0.5 h-2 w-8 rounded-full opacity-70" />
      </div>
    );
  }
  if (id === 5) {
    return (
      <div className="flex h-full gap-1 p-2">
        <Mini className="flex-1 rounded-md opacity-40" />
        <Mini className="w-8 rounded-md opacity-70" />
      </div>
    );
  }
  if (id === 6) {
    return (
      <div className="relative flex h-full items-end overflow-hidden rounded-md bg-current/15 p-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,currentColor,transparent_55%)] opacity-25" />
        <div className="relative flex w-full flex-col gap-1">
          <Mini className="h-2 w-[75%] opacity-90" />
          <Mini className="h-1.5 w-8 rounded-full opacity-70" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col justify-end gap-1 rounded-md border border-current/20 p-2">
      <Mini className="h-2 w-[85%] opacity-90" />
      <Mini className="h-1 w-[65%] opacity-45" />
      <Mini className="mt-0.5 h-2 w-8 rounded-full opacity-70" />
    </div>
  );
}

export function CtaLayoutPicker({
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
      layouts={CTA_LAYOUTS}
      value={value}
      onChange={onChange}
      sketch={(id) => <CtaSketch id={id} />}
      previewStyle={style}
      previewLabel={CTA_LAYOUTS.find((l) => l.id === value)?.name ?? "CTA"}
      preview={
        <CtaSection
          section={{ ...section, variant: value, visible: true }}
          portfolio={{ title: portfolioTitle, slug: portfolioSlug }}
        />
      }
    />
  );
}
