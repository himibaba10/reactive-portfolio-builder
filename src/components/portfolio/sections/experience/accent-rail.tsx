import { PeriodBadge } from "../shared";
import { Mark, type ExpLayoutProps } from "./shared";

export function ExperienceAccentRail({
  exp,
  items,
  empty,
  header,
}: ExpLayoutProps) {
  return (
    <section id="experience" className="space-y-8">
      {header}
      {empty || (
        <div className="space-y-4">
          {items.map((item, i) => (
            <article
              key={i}
              data-reveal-item
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 py-6 pr-6 pl-7"
            >
              <span
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-1.5 bg-(--p-accent)"
              />
              <div className="flex items-start gap-4">
                <Mark
                  url={item.imageUrl}
                  alt={String(item.company || item.role || "")}
                  enabled={exp.showImages}
                  className="size-12"
                />
                <div className="space-y-3">
                  <h3 className="font-display text-xl tracking-[-0.03em] md:text-2xl">
                    {String(item.role || "")}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {item.company ? (
                      <span className="text-sm text-white/65">
                        {String(item.company)}
                      </span>
                    ) : null}
                    {exp.showPeriod && item.period ? (
                      <PeriodBadge>{String(item.period)}</PeriodBadge>
                    ) : null}
                  </div>
                  {exp.showDescription && item.description ? (
                    <p className="max-w-2xl text-sm leading-relaxed text-white/70">
                      {String(item.description)}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
