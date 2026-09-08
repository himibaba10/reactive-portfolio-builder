import { palettes, tokenLabels } from "@/lib/landing-content";

export function PalettesSection() {
  return (
    <section
      id="palettes"
      data-palettes
      className="relative bg-[var(--ink)] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs tracking-[0.28em] text-[var(--signal)] uppercase">
            Palettes
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5.5vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-[var(--foam)]">
            Five tokens. Eight presets. No hex spaghetti.
          </h2>
          <p className="mt-5 max-w-xl text-base text-[var(--muted)]">
            Every portfolio locks to primary, secondary, accent, dark text, and light
            text — chosen from strict presets.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {palettes.map((palette) => (
            <li
              key={palette.id}
              data-palette-card
              className="overflow-hidden rounded-[1.25rem] border border-[color:var(--line)] bg-[var(--panel)]"
            >
              <div className="flex h-28">
                {tokenLabels.map((token) => (
                  <div
                    key={token}
                    className="h-full flex-1"
                    style={{ backgroundColor: palette.tokens[token] }}
                    title={token}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <h3 className="font-[family-name:var(--font-display)] text-xl tracking-[-0.03em] text-[var(--foam)]">
                  {palette.name}
                </h3>
                <span className="text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">
                  5 tokens
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
