import {
  ProjectCover,
  ProjectLink,
  projectsEmpty,
  projectsHeader,
  type ProjectsFlags,
} from "./shared";

/** 5 — Featured + supporting grid */
export function FeaturedProjects({ projects }: { projects: ProjectsFlags }) {
  const items = projects.items;
  const empty = projectsEmpty(items);
  const header = projectsHeader(projects);
  const [featured, ...rest] = items;

  return (
    <section id="projects" className="space-y-6">
      {header}
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
