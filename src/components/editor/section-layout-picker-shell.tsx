"use client";

import type { CSSProperties, ReactNode } from "react";

type LayoutMeta = {
  id: number;
  name: string;
  blurb: string;
};

export function SectionLayoutPickerShell({
  layouts,
  value,
  onChange,
  sketch,
  preview,
  previewStyle,
  previewLabel,
}: {
  layouts: readonly LayoutMeta[];
  value: number;
  onChange: (variant: number) => void;
  sketch: (id: number) => ReactNode;
  preview: ReactNode;
  previewStyle: CSSProperties;
  previewLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs tracking-[0.18em] text-muted uppercase">
          Layout
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {layouts.map((layout) => {
            const selected = value === layout.id;
            return (
              <button
                key={layout.id}
                type="button"
                onClick={() => onChange(layout.id)}
                className={`overflow-hidden rounded-xl border text-left transition ${
                  selected
                    ? "border-signal bg-ink text-foam"
                    : "border-line text-muted hover:border-foam/40"
                }`}
                aria-pressed={selected}
                aria-label={`${layout.name}: ${layout.blurb}`}
              >
                <div
                  className={`h-24 border-b ${
                    selected
                      ? "border-signal/30 text-foam"
                      : "border-line text-muted"
                  }`}
                >
                  {sketch(layout.id)}
                </div>
                <div className="space-y-0.5 px-2.5 py-2">
                  <p className="text-xs font-medium text-foam">
                    {layout.id}. {layout.name}
                  </p>
                  <p className="text-[11px] leading-snug text-muted">
                    {layout.blurb}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs tracking-[0.18em] text-muted uppercase">
          Live preview
        </p>
        <div
          style={previewStyle}
          className="overflow-hidden rounded-2xl border border-line bg-(--p-secondary) text-(--p-text-light)"
        >
          <div className="border-b border-white/10 px-4 py-2 text-[10px] tracking-[0.18em] text-white/40 uppercase">
            {previewLabel} · as on your public page
          </div>
          <div className="p-5 md:p-7">{preview}</div>
        </div>
      </div>
    </div>
  );
}
