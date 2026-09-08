import {
  ProjectCover,
  ProjectLink,
  projectsEmpty,
  projectsHeader,
  type ProjectsFlags,
} from "./shared";

/** 1 — Stack cards */
export function StackProjects({ projects }: { projects: ProjectsFlags }) {
  const items = projects.items;
  const empty = projectsEmpty(items);
  const header = projectsHeader(projects);

  return (
    <section id="projects" className="space-y-6">
      {header}
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
