"use client";

import { palettes } from "@/lib/landing-content";
import {
  contrastRatio,
  CUSTOM_PALETTE_ID,
  DEFAULT_CUSTOM_PALETTE,
  getPalette,
  isHexColor,
  normalizeHex,
  PALETTE_TOKEN_GUIDE,
  PALETTE_TOKEN_KEYS,
  PALETTE_TOKEN_STRIP,
  paletteCssVars,
  sanitizePaletteTokens,
  toneHint,
  type PaletteTokenKey,
  type PaletteTokens,
} from "@/lib/palette";

type PalettePickerProps = {
  value: string;
  onChange: (paletteId: string) => void;
  customValue?: PaletteTokens | null;
  onCustomChange?: (tokens: PaletteTokens) => void;
  name?: string;
};

function ToneBadge({
  tone,
  status,
}: {
  tone: "dark" | "light" | "any";
  status: "ok" | "warn" | "invalid";
}) {
  if (tone === "any") {
    return (
      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] tracking-[0.12em] text-muted uppercase">
        Any
      </span>
    );
  }
  const label = tone === "dark" ? "Keep dark" : "Keep light";
  const color =
    status === "ok"
      ? "text-signal"
      : status === "warn"
        ? "text-amber-300"
        : "text-red-300";
  return (
    <span
      className={`rounded-full bg-white/5 px-2 py-0.5 text-[10px] tracking-[0.12em] uppercase ${color}`}
    >
      {label}
    </span>
  );
}

function CustomPaletteEditor({
  tokens,
  onChange,
}: {
  tokens: PaletteTokens;
  onChange: (tokens: PaletteTokens) => void;
}) {
  const pageContrast = contrastRatio(tokens.textLight, tokens.secondary);
  const buttonContrast = contrastRatio(tokens.textDark, tokens.primary);

  function update(key: PaletteTokenKey, raw: string) {
    const next = raw.startsWith("#") ? raw : `#${raw}`;
    onChange({ ...tokens, [key]: next });
  }

  function commit(key: PaletteTokenKey) {
    const value = tokens[key];
    if (isHexColor(value)) {
      onChange({ ...tokens, [key]: normalizeHex(value) });
    }
  }

  return (
    <div className="mt-4 space-y-5 rounded-2xl border border-line bg-ink/40 p-4 md:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-foam">Build your five tokens</p>
          <p className="mt-1 max-w-xl text-xs text-muted">
            Same structure as presets — only these five colors. Dark page + light
            body text is the safe default.
          </p>
        </div>
        <button
          type="button"
          className="text-xs text-signal hover:underline"
          onClick={() => onChange({ ...DEFAULT_CUSTOM_PALETTE })}
        >
          Reset to Signal
        </button>
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-white/10"
        style={paletteCssVars(tokens)}
      >
        <div
          className="space-y-4 p-5"
          style={{ backgroundColor: "var(--p-secondary)", color: "var(--p-text-light)" }}
        >
          <p
            className="text-[11px] tracking-[0.22em] uppercase"
            style={{ color: "var(--p-accent)" }}
          >
            Live preview
          </p>
          <p className="font-display text-2xl tracking-[-0.03em]">Your name</p>
          <p className="max-w-sm text-sm opacity-80">
            Body copy sits on the page background using text light.
          </p>
          <span
            className="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              backgroundColor: "var(--p-primary)",
              color: "var(--p-text-dark)",
            }}
          >
            Primary button
          </span>
        </div>
      </div>

      <ul className="grid gap-3">
        {PALETTE_TOKEN_KEYS.map((key) => {
          const guide = PALETTE_TOKEN_GUIDE[key];
          const status = toneHint(tokens[key], guide.tone);
          return (
            <li
              key={key}
              className="grid gap-3 rounded-xl border border-line/80 bg-panel/40 p-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-foam">{guide.label}</span>
                  <ToneBadge tone={guide.tone} status={status} />
                </div>
                <p className="text-xs text-muted">{guide.hint}</p>
                <p className="text-[11px] tracking-[0.14em] text-muted/80 uppercase">
                  {guide.role} · {guide.sample}
                </p>
                {status === "warn" ? (
                  <p className="text-xs text-amber-300/90">
                    {guide.tone === "dark"
                      ? "This looks a bit light for its role — try a darker value."
                      : "This looks a bit dark for its role — try a lighter value."}
                  </p>
                ) : null}
                {status === "invalid" ? (
                  <p className="text-xs text-red-300">Use a 6-digit hex like #12141A.</p>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <label className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-line">
                  <span className="sr-only">Pick {guide.label}</span>
                  <input
                    type="color"
                    value={isHexColor(tokens[key]) ? tokens[key] : "#000000"}
                    onChange={(e) =>
                      onChange({ ...tokens, [key]: normalizeHex(e.target.value) })
                    }
                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                  />
                  <span
                    aria-hidden
                    className="block size-full"
                    style={{ backgroundColor: tokens[key] }}
                  />
                </label>
                <input
                  value={tokens[key]}
                  onChange={(e) => update(key, e.target.value)}
                  onBlur={() => commit(key)}
                  spellCheck={false}
                  className="w-28 rounded-xl border border-line bg-ink px-3 py-2 font-mono text-xs text-foam uppercase outline-none focus:border-signal"
                  aria-label={`${guide.label} hex`}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-3 text-xs text-muted">
        <span>
          Body contrast{" "}
          <strong className="text-foam">
            {pageContrast ? `${pageContrast.toFixed(1)}:1` : "—"}
          </strong>
          {pageContrast && pageContrast < 4.5 ? (
            <span className="text-amber-300"> · aim for 4.5+</span>
          ) : null}
        </span>
        <span>
          Button contrast{" "}
          <strong className="text-foam">
            {buttonContrast ? `${buttonContrast.toFixed(1)}:1` : "—"}
          </strong>
          {buttonContrast && buttonContrast < 4.5 ? (
            <span className="text-amber-300"> · aim for 4.5+</span>
          ) : null}
        </span>
      </div>
    </div>
  );
}

export function PalettePicker({
  value,
  onChange,
  customValue,
  onCustomChange,
  name,
}: PalettePickerProps) {
  const customSelected = value === CUSTOM_PALETTE_ID;
  const customTokens = sanitizePaletteTokens(customValue);

  function selectCustom() {
    const tokens = sanitizePaletteTokens(customValue ?? DEFAULT_CUSTOM_PALETTE);
    onCustomChange?.(tokens);
    onChange(CUSTOM_PALETTE_ID);
  }

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
                  {PALETTE_TOKEN_STRIP.map((token) => (
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

        <li>
          <button
            type="button"
            onClick={selectCustom}
            aria-pressed={customSelected}
            className={`w-full overflow-hidden rounded-2xl border text-left transition ${
              customSelected
                ? "border-signal ring-1 ring-signal/40"
                : "border-line border-dashed hover:border-foam/30"
            }`}
          >
            <div className="flex h-12">
              {PALETTE_TOKEN_STRIP.map((token) => (
                <span
                  key={token}
                  className="h-full flex-1"
                  style={{ backgroundColor: customTokens[token] }}
                  title={token}
                />
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 bg-ink/60 px-3 py-2.5">
              <span className="text-sm text-foam">Custom</span>
              {customSelected ? (
                <span className="text-[10px] tracking-[0.16em] text-signal uppercase">
                  Selected
                </span>
              ) : (
                <span className="text-[10px] tracking-[0.16em] text-muted uppercase">
                  Your colors
                </span>
              )}
            </div>
          </button>
        </li>
      </ul>

      {customSelected && onCustomChange ? (
        <CustomPaletteEditor tokens={customTokens} onChange={onCustomChange} />
      ) : null}

      {!customSelected && value ? (
        <p className="mt-2 text-xs text-muted">
          Using {getPalette(value).name}. Or pick Custom to define all five tokens.
        </p>
      ) : null}
    </div>
  );
}
