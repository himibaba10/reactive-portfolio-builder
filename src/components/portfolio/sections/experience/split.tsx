import { PeriodBadge } from "../shared";
import { Mark, type ExpLayoutProps } from "./shared";

export function ExperienceSplit({ exp, items, empty, header }: ExpLayoutProps) {
  return (
    <section id="experience" className="space-y-8">
      {header}
      {empty || (
        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((item, i) => (
            <article
              key={i}
              data-reveal-item
              className="grid gap-4 py-7 md:grid-cols-[1.2fr_0.8fr] md:gap-10"
            >
              <div className="flex items-start gap-4">
                <Mark
                  url={item.imageUrl}
                  alt={String(item.company || item.role || "")}
                  enabled={exp.showImages}
                  className="size-12"
                />
                <div>
                  <h3 className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
                    {String(item.role || "")}
                  </h3>
                  {item.company ? (
                    <p className="mt-2 text-sm text-white/65">
                      {String(item.company)}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="space-y-3 md:pt-1 md:text-right">
                {exp.showPeriod && item.period ? (
                  <div className="md:flex md:justify-end">
                    <PeriodBadge>{String(item.period)}</PeriodBadge>
                  </div>
                ) : null}
                {exp.showDescription && item.description ? (
                  <p className="text-sm leading-relaxed text-white/70">
                    {String(item.description)}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
