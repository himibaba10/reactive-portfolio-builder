import { SchoolMark, type EduLayoutProps } from "./shared";

export function EducationAccentRail({
  edu,
  items,
  empty,
  header,
}: EduLayoutProps) {
  return (
    <section id="education" className="relative space-y-6 pl-6 md:pl-8">
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-(--p-accent)"
      />
      {header}
      {empty || (
        <div className="space-y-5">
          {items.map((item, i) => (
            <article key={i} className="flex items-start gap-3">
              <SchoolMark
                url={item.imageUrl}
                alt={String(item.school || "")}
                enabled={edu.showImages}
              />
              <div>
                <h3 className="font-display text-xl tracking-[-0.03em]">
                  {String(item.school || "")}
                </h3>
                {edu.showDegree && item.degree ? (
                  <p className="mt-1 text-sm text-white/70">
                    {String(item.degree)}
                  </p>
                ) : null}
                {edu.showPeriod && item.period ? (
                  <p className="text-sm text-white/45">{String(item.period)}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
