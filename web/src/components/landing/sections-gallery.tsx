import { sectionTypes } from "@/lib/landing-content";

export function SectionsGallery() {
  return (
    <section
      id="sections"
      data-sections
      className="relative overflow-hidden bg-[var(--panel)] py-24 md:py-32"
    >
      <div className="mx-auto mb-12 max-w-[1400px] px-5 md:mb-16 md:px-8">
        <p className="mb-4 text-xs tracking-[0.28em] text-[var(--signal)] uppercase">
          Sections
        </p>
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.2rem,5.5vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-[var(--foam)]">
          Prebuilt blocks. No custom section chaos.
        </h2>
        <p className="mt-5 max-w-xl text-base text-[var(--muted)]">
          Scroll sideways through the exact section types you can ship on day one.
        </p>
      </div>

      <div data-sections-pin className="relative">
        <div className="overflow-hidden">
          <ul
            data-sections-track
            className="flex w-max gap-5 px-5 will-change-transform md:gap-6 md:px-8"
          >
            {sectionTypes.map((section, index) => (
              <li
                key={section.type}
                data-section-card
                className="relative flex h-[420px] w-[78vw] max-w-[420px] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-[var(--ink)] p-7 md:h-[520px] md:w-[380px] md:p-9"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: `linear-gradient(160deg, rgba(214,255,63,${0.08 + (index % 3) * 0.04}) 0%, transparent 42%), linear-gradient(340deg, rgba(91,140,255,${0.1 + (index % 4) * 0.03}) 0%, transparent 50%)`,
                  }}
                />
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.24em] text-[var(--signal)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs tracking-[0.18em] text-[var(--muted)] uppercase">
                    Block
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-[var(--foam)] md:text-5xl">
                    {section.type}
                  </h3>
                  <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-[var(--muted)]">
                    {section.hint}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
