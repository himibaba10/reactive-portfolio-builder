import { SectionHeader, asStringArray, type SectionProps } from "./shared";

type SkillsFlags = {
  eyebrow: string;
  headline: string;
  items: string[];
  showEyebrow: boolean;
  showHeadline: boolean;
  showItems: boolean;
};

function readSkills(data: Record<string, unknown>): SkillsFlags {
  return {
    eyebrow: String(data.eyebrow || "Skills"),
    headline: String(data.headline || ""),
    items: asStringArray(data.items),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showItems: data.showItems !== false,
  };
}

function SkillsEmpty() {
  return <p className="text-sm text-white/50">No skills listed.</p>;
}

export function SkillsSection({ section }: SectionProps) {
  const skills = readSkills(section.data);
  const variant = section.variant;
  const items = skills.showItems ? skills.items : [];
  const empty = items.length === 0;
  const header = (
    <SectionHeader
      eyebrow={skills.eyebrow}
      headline={skills.headline}
      showEyebrow={skills.showEyebrow}
      showHeadline={skills.showHeadline}
    />
  );

  // 1 — Soft pill cloud
  if (variant === 1) {
    return (
      <section id="skills" className="space-y-6">
        {header}
        {empty ? (
          <SkillsEmpty />
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </section>
    );
  }

  // 2 — Underline rows (2-col list)
  if (variant === 2) {
    return (
      <section id="skills" className="space-y-6">
        {header}
        {empty ? (
          <SkillsEmpty />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className="border-b border-white/10 pb-3 text-base text-white/85"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  // 3 — Solid primary chips
  if (variant === 3) {
    return (
      <section id="skills" className="space-y-6">
        {header}
        {empty ? (
          <SkillsEmpty />
        ) : (
          <div className="flex flex-wrap gap-3">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-xl bg-(--p-primary) px-4 py-2.5 text-sm font-medium text-(--p-text-dark)"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </section>
    );
  }

  // 4 — Numbered index
  if (variant === 4) {
    return (
      <section id="skills" className="space-y-6">
        {header}
        {empty ? (
          <SkillsEmpty />
        ) : (
          <ol className="space-y-3">
            {items.map((item, i) => (
              <li key={item} className="flex items-baseline gap-4">
                <span className="w-8 shrink-0 font-display text-sm text-(--p-accent)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-white/85">{item}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    );
  }

  // 5 — Bento tile panel
  if (variant === 5) {
    return (
      <section
        id="skills"
        className="rounded-[1.75rem] border border-white/10 px-5 py-7 md:px-8 md:py-9"
      >
        {header}
        {empty ? (
          <div className="mt-5">
            <SkillsEmpty />
          </div>
        ) : (
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-black/25 px-4 py-5 text-center text-sm text-white/80 ring-1 ring-white/5"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  // 6 — Marquee strip (CSS loop; static wrap when reduced motion)
  const loop = [...items, ...items];
  return (
    <section id="skills" className="space-y-6">
      {header}
      {empty ? (
        <SkillsEmpty />
      ) : (
        <div className="relative overflow-x-clip mask-[linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="portfolio-marquee-track flex w-max gap-3 py-1 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-start">
            {(items.length ? loop : items).map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm tracking-wide text-white/85"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
