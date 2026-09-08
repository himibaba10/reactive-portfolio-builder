import { PeriodBadge } from "../shared";
import { Mark, type ExpLayoutProps } from "./shared";

export function ExperienceIndexed({
  exp,
  items,
  empty,
  header,
}: ExpLayoutProps) {
  return (
    <section id="experience" className="space-y-8">
      {header}
      {empty || (
        <ol className="space-y-6">
          {items.map((item, i) => (
            <li key={i} data-reveal-item className="flex gap-5">
              <span className="mt-1 w-10 shrink-0 font-display text-sm text-(--p-accent)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/15 p-5">
                <div className="flex items-start gap-4">
                  <Mark
                    url={item.imageUrl}
                    alt={String(item.company || item.role || "")}
                    enabled={exp.showImages}
                  />
                  <div className="space-y-2">
                    <h3 className="font-display text-xl tracking-[-0.03em]">
                      {String(item.role || "")}
                    </h3>
                    {item.company ? (
                      <p className="text-sm text-white/60">
                        {String(item.company)}
                      </p>
                    ) : null}
                    {exp.showPeriod && item.period ? (
                      <PeriodBadge>{String(item.period)}</PeriodBadge>
                    ) : null}
                    {exp.showDescription && item.description ? (
                      <p className="pt-1 text-sm leading-relaxed text-white/70">
                        {String(item.description)}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
