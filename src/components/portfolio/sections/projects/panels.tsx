import {
  ProjectCover,
  ProjectLink,
  projectsEmpty,
  projectsHeader,
  type ProjectsFlags,
} from "./shared";

/** 4 — Numbered tint panels */
export function PanelsProjects({ projects }: { projects: ProjectsFlags }) {
  const items = projects.items;
  const empty = projectsEmpty(items);
  const header = projectsHeader(projects);

  return (
    <section id="projects" className="space-y-6">
      {header}
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
