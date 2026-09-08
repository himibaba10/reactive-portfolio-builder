import { PortfolioImage } from "../portfolio-image";
import {
  ProjectLink,
  projectsEmpty,
  projectsHeader,
  type ProjectsFlags,
} from "./shared";

/** 6 — Image mosaic with overlay titles */
export function MosaicProjects({ projects }: { projects: ProjectsFlags }) {
  const items = projects.items;
  const empty = projectsEmpty(items);
  const header = projectsHeader(projects);

  return (
    <section id="projects" className="space-y-6">
      {header}
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
