import { Building2 } from "lucide-react";
import { PortfolioImage } from "./portfolio-image";
import {
  PeriodBadge,
  SectionHeader,
  asRecordArray,
  type SectionProps,
} from "./shared";

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

function Mark({
  url,
  alt,
  enabled,
  className = "size-11",
}: {
  url: unknown;
  alt: string;
  enabled: boolean;
  className?: string;
}) {
  if (!enabled) return null;
  if (url) {
    return (
      <div
        className={`${className} shrink-0 overflow-hidden rounded-xl border border-white/12 bg-black/25`}
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
  return (
    <div
      className={`${className} flex shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-(--p-accent)`}
      aria-hidden
    >
      <Building2 className="size-4 opacity-80" />
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

  const header = (
    <SectionHeader
      eyebrow={exp.eyebrow}
      headline={exp.headline}
      showEyebrow={exp.showEyebrow}
      showHeadline={exp.showHeadline}
    />
  );

  // 1 — Premium timeline
  if (variant === 1) {
    return (
      <section id="experience" className="space-y-8">
        {header}
        {empty || (
          <div className="relative ml-2 space-y-0 border-l border-(--p-accent)/35 pl-8 md:ml-3 md:pl-10">
            <span
              aria-hidden
              className="absolute top-0 bottom-0 left-[-1px] w-px bg-linear-to-b from-(--p-accent) via-(--p-accent)/40 to-transparent"
            />
            {items.map((item, i) => (
              <article
                key={i}
                data-reveal-item
                className="relative pb-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute top-5 left-[-2.45rem] size-3.5 rounded-full border-2 border-(--p-secondary) bg-(--p-accent) shadow-[0_0_0_4px_color-mix(in_oklab,var(--p-accent)_25%,transparent)] md:left-[-2.95rem]"
                />
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-white/18 hover:bg-black/30 md:p-6">
                  <div className="flex items-start gap-4">
                    <Mark
                      url={item.imageUrl}
                      alt={String(item.company || item.role || "")}
                      enabled={exp.showImages}
                      className="size-12"
                    />
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-xl tracking-[-0.03em] md:text-2xl">
                            {String(item.role || "")}
                          </h3>
                          {item.company ? (
                            <p className="mt-1 text-sm font-medium text-(--p-accent)">
                              {String(item.company)}
                            </p>
                          ) : null}
                        </div>
                        {exp.showPeriod && item.period ? (
                          <PeriodBadge>{String(item.period)}</PeriodBadge>
                        ) : null}
                      </div>
                      {exp.showDescription && item.description ? (
                        <p className="max-w-2xl text-sm leading-relaxed text-white/70 md:text-[15px]">
                          {String(item.description)}
                        </p>
                      ) : null}
                    </div>
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
      <section id="experience" className="space-y-8">
        {header}
        {empty || (
          <div className="grid gap-4">
            {items.map((item, i) => (
              <article
                key={i}
                data-reveal-item
                className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-(--p-accent)/35 hover:bg-black/30 md:p-6"
              >
                <div className="flex items-start gap-4">
                  <Mark
                    url={item.imageUrl}
                    alt={String(item.company || item.role || "")}
                    enabled={exp.showImages}
                    className="size-14"
                  />
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl tracking-[-0.03em]">
                        {String(item.role || "")}
                      </h3>
                      {exp.showPeriod && item.period ? (
                        <PeriodBadge>{String(item.period)}</PeriodBadge>
                      ) : null}
                    </div>
                    {item.company ? (
                      <p className="text-sm text-(--p-accent)">
                        {String(item.company)}
                      </p>
                    ) : null}
                    {exp.showDescription && item.description ? (
                      <p className="text-sm leading-relaxed text-white/70">
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
      <section id="experience" className="space-y-8">
        {header}
        {empty || (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {items.map((item, i) => (
              <article
                key={i}
                data-reveal-item
                className="grid gap-4 py-7 md:grid-cols-[1.2fr_0.8fr] md:gap-10"
              >
                <div className="flex items-start gap-4">
                  <Mark
                    url={item.imageUrl}
                    alt={String(item.company || item.role || "")}
                    enabled={exp.showImages}
                    className="size-12"
                  />
                  <div>
                    <h3 className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
                      {String(item.role || "")}
                    </h3>
                    {item.company ? (
                      <p className="mt-2 text-sm text-white/65">
                        {String(item.company)}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="space-y-3 md:pt-1 md:text-right">
                  {exp.showPeriod && item.period ? (
                    <div className="md:flex md:justify-end">
                      <PeriodBadge>{String(item.period)}</PeriodBadge>
                    </div>
                  ) : null}
                  {exp.showDescription && item.description ? (
                    <p className="text-sm leading-relaxed text-white/70">
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

  // 5 — Numbered index
  if (variant === 5) {
    return (
      <section id="experience" className="space-y-8">
        {header}
        {empty || (
          <ol className="space-y-6">
            {items.map((item, i) => (
              <li key={i} data-reveal-item className="flex gap-5">
                <span className="mt-1 w-10 shrink-0 font-display text-sm text-(--p-accent)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/15 p-5">
                  <div className="flex items-start gap-4">
                    <Mark
                      url={item.imageUrl}
                      alt={String(item.company || item.role || "")}
                      enabled={exp.showImages}
                    />
                    <div className="space-y-2">
                      <h3 className="font-display text-xl tracking-[-0.03em]">
                        {String(item.role || "")}
                      </h3>
                      {item.company ? (
                        <p className="text-sm text-white/60">
                          {String(item.company)}
                        </p>
                      ) : null}
                      {exp.showPeriod && item.period ? (
                        <PeriodBadge>{String(item.period)}</PeriodBadge>
                      ) : null}
                      {exp.showDescription && item.description ? (
                        <p className="pt-1 text-sm leading-relaxed text-white/70">
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
    <section id="experience" className="space-y-8">
      {header}
      {empty || (
        <div className="space-y-4">
          {items.map((item, i) => (
            <article
              key={i}
              data-reveal-item
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 py-6 pr-6 pl-7"
            >
              <span
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-1.5 bg-(--p-accent)"
              />
              <div className="flex items-start gap-4">
                <Mark
                  url={item.imageUrl}
                  alt={String(item.company || item.role || "")}
                  enabled={exp.showImages}
                  className="size-12"
                />
                <div className="space-y-3">
                  <h3 className="font-display text-xl tracking-[-0.03em] md:text-2xl">
                    {String(item.role || "")}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {item.company ? (
                      <span className="text-sm text-white/65">
                        {String(item.company)}
                      </span>
                    ) : null}
                    {exp.showPeriod && item.period ? (
                      <PeriodBadge>{String(item.period)}</PeriodBadge>
                    ) : null}
                  </div>
                  {exp.showDescription && item.description ? (
                    <p className="max-w-2xl text-sm leading-relaxed text-white/70">
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
