import { PortfolioImage } from "../portfolio-image";
import {
  ProjectLink,
  projectsEmpty,
  projectsHeader,
  type ProjectsFlags,
} from "./shared";

/** 3 — Editorial list rows */
export function RowsProjects({ projects }: { projects: ProjectsFlags }) {
  const items = projects.items;
  const empty = projectsEmpty(items);
  const header = projectsHeader(projects);

  return (
    <section id="projects" className="space-y-6">
      {header}
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
