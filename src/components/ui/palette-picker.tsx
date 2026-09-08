"use client";

import { palettes, tokenLabels } from "@/lib/landing-content";

type PalettePickerProps = {
  value: string;
  onChange: (paletteId: string) => void;
  name?: string;
};

export function PalettePicker({ value, onChange, name }: PalettePickerProps) {
  return (
    <div>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {palettes.map((palette) => {
          const selected = palette.id === value;
          return (
            <li key={palette.id}>
              <button
                type="button"
                onClick={() => onChange(palette.id)}
                aria-pressed={selected}
                className={`w-full overflow-hidden rounded-2xl border text-left transition ${
                  selected
                    ? "border-signal ring-1 ring-signal/40"
                    : "border-line hover:border-foam/30"
                }`}
              >
                <div className="flex h-12">
                  {tokenLabels.map((token) => (
                    <span
                      key={token}
                      className="h-full flex-1"
                      style={{ backgroundColor: palette.tokens[token] }}
                      title={token}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2 bg-ink/60 px-3 py-2.5">
                  <span className="text-sm text-foam">{palette.name}</span>
                  {selected ? (
                    <span className="text-[10px] tracking-[0.16em] text-signal uppercase">
                      Selected
                    </span>
                  ) : (
                    <span className="text-[10px] tracking-[0.16em] text-muted uppercase">
                      5 tokens
                    </span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
