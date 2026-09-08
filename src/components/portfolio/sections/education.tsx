import { SectionEyebrow, asRecordArray, type SectionProps } from "./shared";
import { PortfolioImage } from "./portfolio-image";

export function EducationSection({ section }: SectionProps) {
  const items = asRecordArray(section.data.items);

  return (
    <section id="education" className="space-y-5">
      <SectionEyebrow>Education</SectionEyebrow>
      <div className="space-y-5">
        {items.map((item, i) => (
          <article key={i} className="flex items-start gap-3">
            {item.imageUrl ? (
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                <PortfolioImage
                  src={String(item.imageUrl)}
                  alt={String(item.school || "")}
                  className="h-full w-full object-cover"
                  sizes="40px"
                />
              </div>
            ) : null}
            <div>
              <h3 className="text-lg font-medium">
                {String(item.school || "")}
              </h3>
              <p className="text-sm text-white/75">
                {String(item.degree || "")}
              </p>
              <p className="text-sm text-white/45">
                {String(item.period || "")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
