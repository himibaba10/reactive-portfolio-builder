import { Building2 } from "lucide-react";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import { PeriodBadge } from "../shared";
import { PortfolioImage } from "../portfolio-image";
import type { ExpLayoutProps } from "./shared";

export function ExperienceTimeline({ exp, items, empty, header }: ExpLayoutProps) {
  return (
    <section id="experience" className="space-y-8">
      {header}
      {empty || (
        <Timeline>
          {items.map((item, i) => {
            const label = String(item.company || item.role || "");
            return (
              <TimelineItem key={i}>
                <TimelineIndicator showConnector={i < items.length - 1}>
                  {exp.showImages && item.imageUrl ? (
                    <PortfolioImage
                      src={String(item.imageUrl)}
                      alt={label}
                      className="size-full rounded-full object-cover"
                      sizes="44px"
                    />
                  ) : (
                    <Building2 className="size-4 opacity-90" aria-hidden />
                  )}
                </TimelineIndicator>
                <TimelineContent>
                  <TimelineHeader>
                    <div>
                      <TimelineTitle>{String(item.role || "")}</TimelineTitle>
                      {item.company ? (
                        <p className="mt-1 text-sm font-medium text-(--p-accent)">
                          {String(item.company)}
                        </p>
                      ) : null}
                    </div>
                    {exp.showPeriod && item.period ? (
                      <PeriodBadge>{String(item.period)}</PeriodBadge>
                    ) : null}
                  </TimelineHeader>
                  {exp.showDescription && item.description ? (
                    <TimelineDescription>
                      {String(item.description)}
                    </TimelineDescription>
                  ) : null}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      )}
    </section>
  );
}
