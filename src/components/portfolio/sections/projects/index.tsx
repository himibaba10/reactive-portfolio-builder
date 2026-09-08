import { FeaturedProjects } from "./featured";
import { GridProjects } from "./grid";
import { MosaicProjects } from "./mosaic";
import { PanelsProjects } from "./panels";
import { RowsProjects } from "./rows";
import { readProjects, type SectionProps } from "./shared";
import { StackProjects } from "./stack";

export function ProjectsSection({ section }: SectionProps) {
  const projects = readProjects(section.data);
  const variant = section.variant;

  if (variant === 1) return <StackProjects projects={projects} />;
  if (variant === 2) return <GridProjects projects={projects} />;
  if (variant === 3) return <RowsProjects projects={projects} />;
  if (variant === 4) return <PanelsProjects projects={projects} />;
  if (variant === 5) return <FeaturedProjects projects={projects} />;
  return <MosaicProjects projects={projects} />;
}
