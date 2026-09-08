import { SchoolMark, type EduLayoutProps } from "./shared";

export function EducationDiploma({
  edu,
  items,
  empty,
  header,
}: EduLayoutProps) {
  return (
    <section id="education" className="space-y-6">
      {header}
      {empty || (
        <div className="space-y-4">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-2xl bg-(--p-primary)/15 px-5 py-6 ring-1 ring-white/10 md:px-7"
            >
              <div className="flex items-start gap-4">
                <SchoolMark
                  url={item.imageUrl}
                  alt={String(item.school || "")}
                  enabled={edu.showImages}
                  className="h-14 w-14 rounded-xl"
                />
                <div>
                  <span className="text-xs tracking-[0.2em] text-(--p-accent) uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-2xl tracking-[-0.03em]">
                    {String(item.school || "")}
                  </h3>
                  {edu.showDegree && item.degree ? (
                    <p className="mt-2 text-base text-white/75">
                      {String(item.degree)}
                    </p>
                  ) : null}
                  {edu.showPeriod && item.period ? (
                    <p className="mt-1 text-sm text-white/45">
                      {String(item.period)}
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
