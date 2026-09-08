"use client";

import type { PortfolioSection } from "@/lib/api-client";
import { getPalette } from "@/lib/palette";
import { ContactSection } from "@/components/portfolio/sections/contact";
import { SectionLayoutPickerShell } from "@/components/editor/section-layout-picker-shell";

const CONTACT_LAYOUTS = [
  { id: 1, name: "Classic", blurb: "Email + socials stack" },
  { id: 2, name: "Split", blurb: "Portrait beside details" },
  { id: 3, name: "Center", blurb: "Centered contact block" },
  { id: 4, name: "Panel", blurb: "Framed contact card" },
  { id: 5, name: "Banner", blurb: "Accent email stage" },
  { id: 6, name: "Columns", blurb: "Email left, socials right" },
] as const;

function Mini({ className = "" }: { className?: string }) {
  return <span className={`rounded-[2px] bg-current ${className}`} />;
}

function ContactSketch({ id }: { id: number }) {
  if (id === 2) {
    return (
      <div className="flex h-full items-center gap-1.5 p-2">
        <Mini className="h-8 w-8 rounded-full opacity-40" />
        <div className="flex flex-1 flex-col gap-1">
          <Mini className="h-2 w-[80%] opacity-80" />
          <Mini className="h-1 w-[60%] opacity-40" />
        </div>
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1 p-2">
        <Mini className="h-4 w-4 rounded-full opacity-40" />
        <Mini className="h-2 w-[70%] opacity-80" />
        <Mini className="h-1 w-[50%] opacity-40" />
      </div>
    );
  }
  if (id === 4) {
    return (
      <div className="flex h-full flex-col justify-center gap-1 rounded-md border border-current/25 p-2">
        <Mini className="h-0.5 w-6 opacity-50" />
        <Mini className="h-2 w-[75%] opacity-80" />
        <Mini className="h-1 w-[55%] opacity-40" />
      </div>
    );
  }
  if (id === 5) {
    return (
      <div className="flex h-full flex-col justify-end gap-1 rounded-md bg-current/15 p-2">
        <Mini className="h-2.5 w-[85%] opacity-90" />
        <Mini className="h-1 w-[40%] opacity-40" />
      </div>
    );
  }
  if (id === 6) {
    return (
      <div className="grid h-full grid-cols-2 gap-1 border-y border-current/20 p-2">
        <div className="flex flex-col justify-center gap-1">
          <Mini className="h-2 w-full opacity-80" />
          <Mini className="h-1 w-[70%] opacity-40" />
        </div>
        <div className="flex flex-col items-end justify-center gap-1">
          <Mini className="h-1 w-8 opacity-50" />
          <Mini className="h-1 w-10 opacity-40" />
          <Mini className="h-1 w-7 opacity-30" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col justify-center gap-1 p-2">
      <Mini className="h-0.5 w-6 opacity-50" />
      <Mini className="h-3 w-4 rounded-full opacity-35" />
      <Mini className="h-2 w-[80%] opacity-80" />
      <Mini className="h-1 w-[55%] opacity-40" />
    </div>
  );
}

export function ContactLayoutPicker({
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
      layouts={CONTACT_LAYOUTS}
      value={value}
      onChange={onChange}
      sketch={(id) => <ContactSketch id={id} />}
      previewStyle={style}
      previewLabel={
        CONTACT_LAYOUTS.find((l) => l.id === value)?.name ?? "Contact"
      }
      preview={
        <ContactSection
          section={{ ...section, variant: value, visible: true }}
          portfolio={{ title: portfolioTitle, slug: portfolioSlug }}
        />
      }
    />
  );
}
