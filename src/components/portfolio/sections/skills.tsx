import { SectionEyebrow, asStringArray, type SectionProps } from "./shared";

export function SkillsSection({ section }: SectionProps) {
  const items = asStringArray(section.data.items);
  const variant = section.variant;

  const empty = items.length === 0 ? (
    <p className="text-sm text-white/50">No skills listed.</p>
  ) : null;

  if (variant === 2) {
    return (
      <section id="skills" className="space-y-5">
        <SectionEyebrow>Skills</SectionEyebrow>
        {empty || (
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

  if (variant === 3) {
    return (
      <section id="skills" className="space-y-5">
        <SectionEyebrow>Skills</SectionEyebrow>
        {empty || (
          <div className="flex flex-wrap gap-3">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-xl bg-(--p-primary) px-4 py-2 text-sm font-medium text-(--p-text-dark)"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </section>
    );
  }

  if (variant === 4) {
    return (
      <section id="skills" className="space-y-5">
        <SectionEyebrow>Skills</SectionEyebrow>
        {empty || (
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

  if (variant === 5) {
    return (
      <section
        id="skills"
        className="rounded-3xl border border-white/10 px-5 py-7 md:px-7"
      >
        <SectionEyebrow>Skills</SectionEyebrow>
        {empty || (
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {items.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-black/25 px-4 py-4 text-center text-sm text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <section id="skills" className="space-y-5">
      <SectionEyebrow>Skills</SectionEyebrow>
      {empty || (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
