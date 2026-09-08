import { SectionEyebrow, asRecordArray, type SectionProps } from "./shared";
import { PortfolioImage } from "./portfolio-image";

type ProjectsFlags = {
  eyebrow: string;
  headline: string;
  items: Array<Record<string, unknown>>;
  showEyebrow: boolean;
  showHeadline: boolean;
  showImages: boolean;
  showDescriptions: boolean;
  showLinks: boolean;
};

function readProjects(data: Record<string, unknown>): ProjectsFlags {
  return {
    eyebrow: String(data.eyebrow || "Portfolio"),
    headline: String(data.headline || ""),
    items: asRecordArray(data.items),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showImages: data.showImages !== false,
    showDescriptions: data.showDescriptions !== false,
    showLinks: data.showLinks !== false,
  };
}

function ProjectsHeader({ projects }: { projects: ProjectsFlags }) {
  return (
    <div className="space-y-3">
      {projects.showEyebrow && projects.eyebrow ? (
        <SectionEyebrow>{projects.eyebrow}</SectionEyebrow>
      ) : null}
      {projects.showHeadline && projects.headline ? (
        <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[0.95] tracking-[-0.04em]">
          {projects.headline}
        </h3>
      ) : null}
    </div>
  );
}

function ProjectCover({
  url,
  title,
  enabled,
  className = "aspect-video",
}: {
  url: unknown;
  title: unknown;
  enabled: boolean;
  className?: string;
}) {
  const src = String(url || "");
  if (!enabled || !src) return null;
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-black/20 ${className}`}
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

function ProjectLink({
  url,
  enabled,
  className = "mt-4 inline-block text-sm text-(--p-accent) hover:underline",
  children = "Visit →",
}: {
  url: unknown;
  enabled: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  if (!enabled || !url) return null;
  return (
    <a
      href={String(url)}
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export function ProjectsSection({ section }: SectionProps) {
  const projects = readProjects(section.data);
  const variant = section.variant;
  const items = projects.items;
  const empty =
    items.length === 0 ? (
      <p className="text-sm text-white/50">No projects yet.</p>
    ) : null;

  // 1 — Stack cards
  if (variant === 1) {
    return (
      <section id="projects" className="space-y-6">
        <ProjectsHeader projects={projects} />
        {empty || (
          <div className="grid gap-4">
            {items.map((item, i) => (
              <article
                key={i}
                className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur-sm transition hover:border-white/20"
              >
                <div className="mb-4">
                  <ProjectCover
                    url={item.imageUrl}
                    title={item.title}
                    enabled={projects.showImages}
                  />
                </div>
                <h3 className="font-display text-2xl tracking-[-0.03em]">
                  {String(item.title || "")}
                </h3>
                {projects.showDescriptions && item.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {String(item.description)}
                  </p>
                ) : null}
                <ProjectLink url={item.url} enabled={projects.showLinks} />
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  // 2 — Two-column cards
  if (variant === 2) {
    return (
      <section id="projects" className="space-y-6">
        <ProjectsHeader projects={projects} />
        {empty || (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item, i) => (
              <article
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div>
                  <div className="mb-4">
                    <ProjectCover
                      url={item.imageUrl}
                      title={item.title}
                      enabled={projects.showImages}
                    />
                  </div>
                  <h3 className="font-display text-xl tracking-[-0.03em]">
                    {String(item.title || "")}
                  </h3>
                  {projects.showDescriptions && item.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {String(item.description)}
                    </p>
                  ) : null}
                </div>
                <ProjectLink url={item.url} enabled={projects.showLinks} />
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  // 3 — Editorial list rows
  if (variant === 3) {
    return (
      <section id="projects" className="space-y-6">
        <ProjectsHeader projects={projects} />
        {empty || (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {items.map((item, i) => (
              <article
                key={i}
                className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-8"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  {projects.showImages && item.imageUrl ? (
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
                  {projects.showDescriptions && item.description ? (
                    <p className="text-sm text-white/70">
                      {String(item.description)}
                    </p>
                  ) : null}
                  <ProjectLink
                    url={item.url}
                    enabled={projects.showLinks}
                    className="mt-2 inline-block text-sm text-(--p-accent) hover:underline"
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  // 4 — Numbered tint panels
  if (variant === 4) {
    return (
      <section id="projects" className="space-y-6">
        <ProjectsHeader projects={projects} />
        {empty || (
          <div className="space-y-4">
            {items.map((item, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl bg-(--p-primary)/20 p-6 ring-1 ring-white/10"
              >
                <div className="mb-4">
                  <ProjectCover
                    url={item.imageUrl}
                    title={item.title}
                    enabled={projects.showImages}
                  />
                </div>
                <span className="text-xs tracking-[0.2em] text-(--p-accent) uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-2xl tracking-[-0.03em]">
                  {String(item.title || "")}
                </h3>
                {projects.showDescriptions && item.description ? (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                    {String(item.description)}
                  </p>
                ) : null}
                <ProjectLink
                  url={item.url}
                  enabled={projects.showLinks}
                  className="mt-4 inline-block text-sm font-medium text-(--p-text-light) underline decoration-(--p-accent) underline-offset-4"
                >
                  Open project
                </ProjectLink>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  // 5 — Featured + supporting grid
  if (variant === 5) {
    const [featured, ...rest] = items;
    return (
      <section id="projects" className="space-y-6">
        <ProjectsHeader projects={projects} />
        {empty || (
          <div className="space-y-4">
            {featured ? (
              <article className="rounded-3xl border border-white/15 bg-black/30 p-6 md:p-8">
                <div className="mb-4">
                  <ProjectCover
                    url={featured.imageUrl}
                    title={featured.title}
                    enabled={projects.showImages}
                    className="aspect-21/9"
                  />
                </div>
                <p className="text-xs tracking-[0.24em] text-(--p-accent) uppercase">
                  Featured
                </p>
                <h3 className="mt-3 font-display text-3xl tracking-[-0.04em]">
                  {String(featured.title || "")}
                </h3>
                {projects.showDescriptions && featured.description ? (
                  <p className="mt-3 max-w-2xl text-base text-white/70">
                    {String(featured.description)}
                  </p>
                ) : null}
                <ProjectLink
                  url={featured.url}
                  enabled={projects.showLinks}
                  className="mt-5 inline-flex rounded-full bg-(--p-primary) px-5 py-2.5 text-sm font-semibold text-(--p-text-dark)"
                />
              </article>
            ) : null}
            {rest.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {rest.map((item, i) => (
                  <article
                    key={i}
                    className="rounded-2xl border border-white/10 p-4"
                  >
                    <div className="mb-3">
                      <ProjectCover
                        url={item.imageUrl}
                        title={item.title}
                        enabled={projects.showImages}
                      />
                    </div>
                    <h3 className="font-display text-lg">
                      {String(item.title || "")}
                    </h3>
                    {projects.showDescriptions && item.description ? (
                      <p className="mt-1 text-sm text-white/65">
                        {String(item.description)}
                      </p>
                    ) : null}
                    <ProjectLink url={item.url} enabled={projects.showLinks} />
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </section>
    );
  }

  // 6 — Image mosaic with overlay titles
  return (
    <section id="projects" className="space-y-6">
      <ProjectsHeader projects={projects} />
      {empty || (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <article
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 ${
                i === 0 ? "sm:col-span-2 sm:aspect-21/9" : "aspect-4/3"
              }`}
            >
              {projects.showImages && item.imageUrl ? (
                <PortfolioImage
                  src={String(item.imageUrl)}
                  alt={String(item.title || "")}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--p-primary)_40%,transparent),transparent_55%)]"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
              <div className="relative z-10 flex h-full min-h-44 flex-col justify-end p-5">
                <h3 className="font-display text-xl tracking-[-0.03em] md:text-2xl">
                  {String(item.title || "")}
                </h3>
                {projects.showDescriptions && item.description ? (
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">
                    {String(item.description)}
                  </p>
                ) : null}
                <ProjectLink
                  url={item.url}
                  enabled={projects.showLinks}
                  className="mt-3 inline-block text-sm text-(--p-accent) hover:underline"
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
