import { SectionEyebrow, asRecordArray, type SectionProps } from "./shared";
import { PortfolioImage } from "./portfolio-image";

type EduFlags = {
  eyebrow: string;
  headline: string;
  items: Array<Record<string, unknown>>;
  showEyebrow: boolean;
  showHeadline: boolean;
  showImages: boolean;
  showDegree: boolean;
  showPeriod: boolean;
};

function readEdu(data: Record<string, unknown>): EduFlags {
  return {
    eyebrow: String(data.eyebrow || "Education"),
    headline: String(data.headline || ""),
    items: asRecordArray(data.items),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showImages: data.showImages !== false,
    showDegree: data.showDegree !== false,
    showPeriod: data.showPeriod !== false,
  };
}

function EduHeader({ edu }: { edu: EduFlags }) {
  return (
    <div className="space-y-3">
      {edu.showEyebrow && edu.eyebrow ? (
        <SectionEyebrow>{edu.eyebrow}</SectionEyebrow>
      ) : null}
      {edu.showHeadline && edu.headline ? (
        <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[0.95] tracking-[-0.04em]">
          {edu.headline}
        </h3>
      ) : null}
    </div>
  );
}

function SchoolMark({
  url,
  alt,
  enabled,
  className = "h-10 w-10",
}: {
  url: unknown;
  alt: string;
  enabled: boolean;
  className?: string;
}) {
  if (!enabled || !url) return null;
  return (
    <div
      className={`${className} shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20`}
    >
      <PortfolioImage
        src={String(url)}
        alt={alt}
        className="h-full w-full object-cover"
        sizes="48px"
      />
    </div>
  );
}

export function EducationSection({ section }: SectionProps) {
  const edu = readEdu(section.data);
  const variant = section.variant;
  const items = edu.items;
  const empty = !items.length ? (
    <p className="text-sm text-white/50">No education listed.</p>
  ) : null;

  // 1 — Simple stack
  if (variant === 1) {
    return (
      <section id="education" className="space-y-6">
        <EduHeader edu={edu} />
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

  // 2 — Cards
  if (variant === 2) {
    return (
      <section id="education" className="space-y-6">
        <EduHeader edu={edu} />
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

  // 3 — Timeline
  if (variant === 3) {
    return (
      <section id="education" className="space-y-6">
        <EduHeader edu={edu} />
        {empty || (
          <div className="space-y-6 border-l border-white/15 pl-5">
            {items.map((item, i) => (
              <article key={i} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 left-[-1.4rem] h-2.5 w-2.5 rounded-full bg-(--p-accent)"
                />
                <div className="flex items-start gap-3">
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
                      <p className="text-sm text-white/75">
                        {String(item.degree)}
                      </p>
                    ) : null}
                    {edu.showPeriod && item.period ? (
                      <p className="text-sm text-white/45">
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

  // 4 — Editorial rows
  if (variant === 4) {
    return (
      <section id="education" className="space-y-6">
        <EduHeader edu={edu} />
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

  // 5 — Accent rail
  if (variant === 5) {
    return (
      <section id="education" className="relative space-y-6 pl-6 md:pl-8">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-(--p-accent)"
        />
        <EduHeader edu={edu} />
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

  // 6 — Diploma panels
  return (
    <section id="education" className="space-y-6">
      <EduHeader edu={edu} />
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
