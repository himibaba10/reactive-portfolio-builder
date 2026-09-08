import { PortfolioImage } from "./portfolio-image";
import { SectionEyebrow, asRecordArray, type SectionProps } from "./shared";

type ExpFlags = {
  eyebrow: string;
  headline: string;
  items: Array<Record<string, unknown>>;
  showEyebrow: boolean;
  showHeadline: boolean;
  showImages: boolean;
  showPeriod: boolean;
  showDescription: boolean;
};

function readExp(data: Record<string, unknown>): ExpFlags {
  return {
    eyebrow: String(data.eyebrow || "Experience"),
    headline: String(data.headline || ""),
    items: asRecordArray(data.items),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showImages: data.showImages !== false,
    showPeriod: data.showPeriod !== false,
    showDescription: data.showDescription !== false,
  };
}

function ExpHeader({ exp }: { exp: ExpFlags }) {
  return (
    <div className="space-y-3">
      {exp.showEyebrow && exp.eyebrow ? (
        <SectionEyebrow>{exp.eyebrow}</SectionEyebrow>
      ) : null}
      {exp.showHeadline && exp.headline ? (
        <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[0.95] tracking-[-0.04em]">
          {exp.headline}
        </h3>
      ) : null}
    </div>
  );
}

function Mark({
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

export function ExperienceSection({ section }: SectionProps) {
  const exp = readExp(section.data);
  const variant = section.variant;
  const items = exp.items;
  const empty = !items.length ? (
    <p className="text-sm text-white/50">No experience listed.</p>
  ) : null;

  // 1 — Timeline rail
  if (variant === 1) {
    return (
      <section id="experience" className="space-y-6">
        <ExpHeader exp={exp} />
        {empty || (
          <div className="space-y-6 border-l border-white/15 pl-5">
            {items.map((item, i) => (
              <article key={i} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 left-[-1.4rem] h-2.5 w-2.5 rounded-full bg-(--p-accent)"
                />
                <div className="flex items-start gap-3">
                  <Mark
                    url={item.imageUrl}
                    alt={String(item.company || item.role || "")}
                    enabled={exp.showImages}
                  />
                  <div>
                    <h3 className="text-lg font-medium">
                      {String(item.role || "")}
                      {item.company ? ` · ${String(item.company)}` : ""}
                    </h3>
                    {exp.showPeriod && item.period ? (
                      <p className="text-sm text-white/45">
                        {String(item.period)}
                      </p>
                    ) : null}
                    {exp.showDescription && item.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-white/75">
                        {String(item.description)}
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

  // 2 — Card stack
  if (variant === 2) {
    return (
      <section id="experience" className="space-y-6">
        <ExpHeader exp={exp} />
        {empty || (
          <div className="grid gap-3">
            {items.map((item, i) => (
              <article
                key={i}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div className="flex items-start gap-3">
                  <Mark
                    url={item.imageUrl}
                    alt={String(item.company || item.role || "")}
                    enabled={exp.showImages}
                    className="h-12 w-12"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl tracking-[-0.03em]">
                        {String(item.role || "")}
                      </h3>
                      {exp.showPeriod && item.period ? (
                        <span className="text-xs tracking-[0.14em] text-white/45 uppercase">
                          {String(item.period)}
                        </span>
                      ) : null}
                    </div>
                    {item.company ? (
                      <p className="mt-1 text-sm text-(--p-accent)">
                        {String(item.company)}
                      </p>
                    ) : null}
                    {exp.showDescription && item.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        {String(item.description)}
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

  // 3 — Split role / meta
  if (variant === 3) {
    return (
      <section id="experience" className="space-y-6">
        <ExpHeader exp={exp} />
        {empty || (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {items.map((item, i) => (
              <article
                key={i}
                className="grid gap-3 py-5 md:grid-cols-[1.2fr_0.8fr] md:gap-8"
              >
                <div className="flex items-start gap-3">
                  <Mark
                    url={item.imageUrl}
                    alt={String(item.company || item.role || "")}
                    enabled={exp.showImages}
                  />
                  <div>
                    <h3 className="font-display text-2xl tracking-[-0.03em]">
                      {String(item.role || "")}
                    </h3>
                    {item.company ? (
                      <p className="mt-1 text-sm text-white/65">
                        {String(item.company)}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="md:text-right">
                  {exp.showPeriod && item.period ? (
                    <p className="text-sm text-white/45">{String(item.period)}</p>
                  ) : null}
                  {exp.showDescription && item.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {String(item.description)}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  // 4 — Compact rows
  if (variant === 4) {
    return (
      <section id="experience" className="space-y-6">
        <ExpHeader exp={exp} />
        {empty || (
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3"
              >
                <div className="flex items-center gap-3">
                  <Mark
                    url={item.imageUrl}
                    alt={String(item.company || item.role || "")}
                    enabled={exp.showImages}
                    className="h-8 w-8"
                  />
                  <span className="text-base text-white/90">
                    {String(item.role || "")}
                    {item.company ? (
                      <span className="text-white/50">
                        {" "}
                        · {String(item.company)}
                      </span>
                    ) : null}
                  </span>
                </div>
                {exp.showPeriod && item.period ? (
                  <span className="text-xs text-white/45">
                    {String(item.period)}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  // 5 — Numbered index
  if (variant === 5) {
    return (
      <section id="experience" className="space-y-6">
        <ExpHeader exp={exp} />
        {empty || (
          <ol className="space-y-5">
            {items.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-8 shrink-0 font-display text-sm text-(--p-accent)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-3">
                    <Mark
                      url={item.imageUrl}
                      alt={String(item.company || item.role || "")}
                      enabled={exp.showImages}
                    />
                    <div>
                      <h3 className="text-lg font-medium">
                        {String(item.role || "")}
                      </h3>
                      {item.company ? (
                        <p className="text-sm text-white/60">
                          {String(item.company)}
                        </p>
                      ) : null}
                      {exp.showPeriod && item.period ? (
                        <p className="text-sm text-white/45">
                          {String(item.period)}
                        </p>
                      ) : null}
                      {exp.showDescription && item.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-white/75">
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

  // 6 — Accent rail cards
  return (
    <section id="experience" className="space-y-6">
      <ExpHeader exp={exp} />
      {empty || (
        <div className="space-y-4">
          {items.map((item, i) => (
            <article
              key={i}
              className="relative rounded-2xl border border-white/10 bg-black/15 py-5 pr-5 pl-6"
            >
              <span
                aria-hidden
                className="absolute top-5 bottom-5 left-0 w-1 rounded-full bg-(--p-accent)"
              />
              <div className="flex items-start gap-3">
                <Mark
                  url={item.imageUrl}
                  alt={String(item.company || item.role || "")}
                  enabled={exp.showImages}
                />
                <div>
                  <h3 className="font-display text-xl tracking-[-0.03em]">
                    {String(item.role || "")}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">
                    {[item.company, exp.showPeriod ? item.period : null]
                      .filter(Boolean)
                      .map(String)
                      .join(" · ")}
                  </p>
                  {exp.showDescription && item.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      {String(item.description)}
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
