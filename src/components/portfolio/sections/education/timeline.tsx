import { GraduationCap } from "lucide-react";
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
import type { EduLayoutProps } from "./shared";

export function EducationTimeline({
  edu,
  items,
  empty,
  header,
}: EduLayoutProps) {
  return (
    <section id="education" className="space-y-6">
      {header}
      {empty || (
        <Timeline>
          {items.map((item, i) => {
            const school = String(item.school || "");
            return (
              <TimelineItem key={i}>
                <TimelineIndicator showConnector={i < items.length - 1}>
                  {edu.showImages && item.imageUrl ? (
                    <PortfolioImage
                      src={String(item.imageUrl)}
                      alt={school}
                      className="size-full rounded-full object-cover"
                      sizes="44px"
                    />
                  ) : (
                    <GraduationCap className="size-4 opacity-90" aria-hidden />
                  )}
                </TimelineIndicator>
                <TimelineContent>
                  <TimelineHeader>
                    <div>
                      <TimelineTitle>{school}</TimelineTitle>
                      {edu.showDegree && item.degree ? (
                        <TimelineDescription className="mt-1">
                          {String(item.degree)}
                        </TimelineDescription>
                      ) : null}
                    </div>
                    {edu.showPeriod && item.period ? (
                      <PeriodBadge>{String(item.period)}</PeriodBadge>
                    ) : null}
                  </TimelineHeader>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      )}
    </section>
  );
}
