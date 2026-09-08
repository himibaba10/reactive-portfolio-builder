import { SchoolMark, type EduLayoutProps } from "./shared";

export function EducationRows({ edu, items, empty, header }: EduLayoutProps) {
  return (
    <section id="education" className="space-y-6">
      {header}
      {empty || (
        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((item, i) => (
            <article
              key={i}
              className="flex flex-wrap items-center justify-between gap-3 py-4"
            >
              <div className="flex items-center gap-3">
                <SchoolMark
                  url={item.imageUrl}
                  alt={String(item.school || "")}
                  enabled={edu.showImages}
                  className="h-9 w-9"
                />
                <div>
                  <h3 className="font-medium">{String(item.school || "")}</h3>
                  {edu.showDegree && item.degree ? (
                    <p className="text-sm text-white/65">
                      {String(item.degree)}
                    </p>
                  ) : null}
                </div>
              </div>
              {edu.showPeriod && item.period ? (
                <span className="text-xs text-white/45">
                  {String(item.period)}
                </span>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
