import { SchoolMark, type EduLayoutProps } from "./shared";

export function EducationStack({ edu, items, empty, header }: EduLayoutProps) {
  return (
    <section id="education" className="space-y-6">
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
                <h3 className="text-lg font-medium">
                  {String(item.school || "")}
                </h3>
                {edu.showDegree && item.degree ? (
                  <p className="text-sm text-white/75">{String(item.degree)}</p>
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
