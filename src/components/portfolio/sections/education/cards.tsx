import { SchoolMark, type EduLayoutProps } from "./shared";

export function EducationCards({ edu, items, empty, header }: EduLayoutProps) {
  return (
    <section id="education" className="space-y-6">
      {header}
      {empty || (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <SchoolMark
                url={item.imageUrl}
                alt={String(item.school || "")}
                enabled={edu.showImages}
                className="mb-3 h-12 w-12"
              />
              <h3 className="font-display text-xl tracking-[-0.03em]">
                {String(item.school || "")}
              </h3>
              {edu.showDegree && item.degree ? (
                <p className="mt-2 text-sm text-white/70">{String(item.degree)}</p>
              ) : null}
              {edu.showPeriod && item.period ? (
                <p className="mt-1 text-xs tracking-[0.14em] text-white/45 uppercase">
                  {String(item.period)}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
