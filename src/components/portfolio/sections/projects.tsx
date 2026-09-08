import { SectionEyebrow, asRecordArray, type SectionProps } from "./shared";
import { PortfolioImage } from "./portfolio-image";

function ProjectCover({
  url,
  title,
  className = "aspect-video",
}: {
  url: unknown;
  title: unknown;
  className?: string;
}) {
  const src = String(url || "");
  if (!src) return null;
  return (
    <div
      className={`mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/20 ${className}`}
    >
      <PortfolioImage
        src={src}
        alt={String(title || "Project")}
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 420px"
      />
    </div>
  );
}

export function ProjectsSection({ section }: SectionProps) {
  const items = asRecordArray(section.data.items);
  const variant = section.variant;

  const empty =
    items.length === 0 ? (
      <p className="text-sm text-white/50">No projects yet.</p>
    ) : null;

  if (variant === 2) {
    return (
      <section id="projects" className="space-y-5">
        <SectionEyebrow>Portfolio</SectionEyebrow>
        {empty || (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item, i) => (
              <article
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div>
                  <ProjectCover url={item.imageUrl} title={item.title} />
                  <h3 className="font-display text-xl tracking-[-0.03em]">
                    {String(item.title || "")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {String(item.description || "")}
                  </p>
                </div>
                {item.url ? (
                  <a
                    href={String(item.url)}
                    className="mt-4 text-sm text-(--p-accent) hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit →
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  if (variant === 3) {
    return (
      <section id="projects" className="space-y-5">
        <SectionEyebrow>Portfolio</SectionEyebrow>
        {empty || (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {items.map((item, i) => (
              <article
                key={i}
                className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-8"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  {item.imageUrl ? (
                    <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
                      <PortfolioImage
                        src={String(item.imageUrl)}
                        alt={String(item.title || "")}
                        className="h-full w-full object-cover"
                        sizes="96px"
                      />
                    </div>
                  ) : null}
                  <h3 className="font-display text-2xl tracking-[-0.03em]">
                    {String(item.title || "")}
                  </h3>
                </div>
                <div className="max-w-md md:text-right">
                  <p className="text-sm text-white/70">
                    {String(item.description || "")}
                  </p>
                  {item.url ? (
                    <a
                      href={String(item.url)}
                      className="mt-2 inline-block text-sm text-(--p-accent) hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit →
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  if (variant === 4) {
    return (
      <section id="projects" className="space-y-5">
        <SectionEyebrow>Portfolio</SectionEyebrow>
        {empty || (
          <div className="space-y-4">
            {items.map((item, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl bg-(--p-primary)/20 p-6 ring-1 ring-white/10"
              >
                <ProjectCover url={item.imageUrl} title={item.title} />
                <span className="text-xs tracking-[0.2em] text-(--p-accent) uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-2xl tracking-[-0.03em]">
                  {String(item.title || "")}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                  {String(item.description || "")}
                </p>
                {item.url ? (
                  <a
                    href={String(item.url)}
                    className="mt-4 inline-block text-sm font-medium text-(--p-text-light) underline decoration-(--p-accent) underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open project
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  if (variant === 5) {
    const [featured, ...rest] = items;
    return (
      <section id="projects" className="space-y-5">
        <SectionEyebrow>Portfolio</SectionEyebrow>
        {empty || (
          <div className="space-y-4">
            {featured ? (
              <article className="rounded-3xl border border-white/15 bg-black/30 p-6 md:p-8">
                <ProjectCover
                  url={featured.imageUrl}
                  title={featured.title}
                  className="aspect-21/9"
                />
                <p className="text-xs tracking-[0.24em] text-(--p-accent) uppercase">
                  Featured
                </p>
                <h3 className="mt-3 font-display text-3xl tracking-[-0.04em]">
                  {String(featured.title || "")}
                </h3>
                <p className="mt-3 max-w-2xl text-base text-white/70">
                  {String(featured.description || "")}
                </p>
                {featured.url ? (
                  <a
                    href={String(featured.url)}
                    className="mt-5 inline-flex rounded-full bg-(--p-primary) px-5 py-2.5 text-sm font-semibold text-(--p-text-dark)"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit →
                  </a>
                ) : null}
              </article>
            ) : null}
            {rest.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {rest.map((item, i) => (
                  <article
                    key={i}
                    className="rounded-2xl border border-white/10 p-4"
                  >
                    <ProjectCover url={item.imageUrl} title={item.title} />
                    <h3 className="font-display text-lg">
                      {String(item.title || "")}
                    </h3>
                    <p className="mt-1 text-sm text-white/65">
                      {String(item.description || "")}
                    </p>
                    {item.url ? (
                      <a
                        href={String(item.url)}
                        className="mt-3 inline-block text-sm text-(--p-accent) hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit →
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </section>
    );
  }

  return (
    <section id="projects" className="space-y-5">
      <SectionEyebrow>Portfolio</SectionEyebrow>
      {empty || (
        <div className="grid gap-4">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur-sm transition hover:border-white/20"
            >
              <ProjectCover url={item.imageUrl} title={item.title} />
              <h3 className="font-display text-2xl tracking-[-0.03em]">
                {String(item.title || "")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {String(item.description || "")}
              </p>
              {item.url ? (
                <a
                  href={String(item.url)}
                  className="mt-4 inline-block text-sm text-(--p-accent) hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit →
                </a>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
