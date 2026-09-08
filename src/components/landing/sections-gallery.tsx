import { sectionTypes } from "@/lib/landing-content";

export function SectionsGallery() {
  return (
    <section
      id="sections"
      data-sections
      className="relative overflow-hidden bg-panel py-24 md:py-32"
    >
      <div className="mx-auto mb-12 max-w-site px-5 md:mb-16 md:px-8">
        <p className="mb-4 text-xs tracking-[0.28em] text-signal uppercase">
          Sections
        </p>
        <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-foam">
          Prebuilt blocks. Pick a layout. Ship.
        </h2>
        <p className="mt-5 max-w-xl text-base text-muted">
          <span className="md:hidden">Swipe through section types — Hero has six layouts; most others offer five.</span>
          <span className="hidden md:inline">
            Scroll through the section types you can ship — Hero has six layouts; most others offer five in the editor.
          </span>
        </p>
      </div>

      <div data-sections-pin className="relative md:pt-2">
        <div
          data-sections-viewport
          className="snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] scrollbar-none md:snap-none md:overflow-hidden [&::-webkit-scrollbar]:hidden"
        >
          <ul
            data-sections-track
            className="flex w-max gap-5 px-5 pb-2 will-change-transform md:gap-6 md:px-8"
          >
            {sectionTypes.map((section, index) => (
              <li
                key={section.type}
                data-section-card
                className="relative flex h-100 w-[min(78vw,320px)] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl border border-line bg-ink p-6 md:h-130 md:w-95 md:p-9"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: `linear-gradient(160deg, rgba(214,255,63,${0.08 + (index % 3) * 0.04}) 0%, transparent 42%), linear-gradient(340deg, rgba(91,140,255,${0.1 + (index % 4) * 0.03}) 0%, transparent 50%)`,
                  }}
                />
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <span className="font-display text-xs tracking-[0.24em] text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs tracking-[0.18em] text-muted uppercase">
                    Block
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-display text-3xl tracking-[-0.04em] text-foam md:text-5xl">
                    {section.type}
                  </h3>
                  <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted">
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
