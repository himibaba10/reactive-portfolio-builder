import {
  ProjectCover,
  ProjectLink,
  projectsEmpty,
  projectsHeader,
  type ProjectsFlags,
} from "./shared";

/** 2 — Two-column cards */
export function GridProjects({ projects }: { projects: ProjectsFlags }) {
  const items = projects.items;
  const empty = projectsEmpty(items);
  const header = projectsHeader(projects);

  return (
    <section id="projects" className="space-y-6">
      {header}
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
