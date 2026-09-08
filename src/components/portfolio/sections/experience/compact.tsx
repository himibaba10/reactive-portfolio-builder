import { PeriodBadge } from "../shared";
import { Mark, type ExpLayoutProps } from "./shared";

export function ExperienceCompact({
  exp,
  items,
  empty,
  header,
}: ExpLayoutProps) {
  return (
    <section id="experience" className="space-y-8">
      {header}
      {empty || (
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li
              key={i}
              data-reveal-item
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-4 transition hover:border-white/10 hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <Mark
                  url={item.imageUrl}
                  alt={String(item.company || item.role || "")}
                  enabled={exp.showImages}
                  className="size-9"
                />
                <span className="text-base text-white/90">
                  <span className="font-medium">{String(item.role || "")}</span>
                  {item.company ? (
                    <span className="text-white/45">
                      {" "}
                      · {String(item.company)}
                    </span>
                  ) : null}
                </span>
              </div>
              {exp.showPeriod && item.period ? (
                <PeriodBadge>{String(item.period)}</PeriodBadge>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
