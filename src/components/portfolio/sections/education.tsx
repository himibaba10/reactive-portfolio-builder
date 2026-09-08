import { SectionEyebrow, asRecordArray, type SectionProps } from "./shared";

export function EducationSection({ section }: SectionProps) {
  const items = asRecordArray(section.data.items);

  return (
    <section id="education" className="space-y-5">
      <SectionEyebrow>Education</SectionEyebrow>
      <div className="space-y-5">
        {items.map((item, i) => (
          <article key={i}>
            <h3 className="text-lg font-medium">{String(item.school || "")}</h3>
            <p className="text-sm text-white/75">{String(item.degree || "")}</p>
            <p className="text-sm text-white/45">{String(item.period || "")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
