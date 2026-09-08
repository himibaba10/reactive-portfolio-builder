"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Shadcn-style timeline primitives for portfolio sections.
 * Pattern adapted from community shadcn timelines (e.g. timDeHof/shadcn-timeline),
 * styled with palette CSS tokens — no Framer Motion dependency.
 */

type TimelineOrientation = "vertical" | "horizontal";

const TimelineContext = React.createContext<TimelineOrientation>("vertical");

function useTimelineOrientation() {
  return React.useContext(TimelineContext);
}

export function Timeline({
  className,
  children,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"ol"> & { orientation?: TimelineOrientation }) {
  return (
    <TimelineContext.Provider value={orientation}>
      <ol
        aria-label="Timeline"
        data-orientation={orientation}
        className={cn(
          "relative w-full",
          orientation === "horizontal" &&
            "flex snap-x snap-mandatory gap-0 overflow-x-auto pb-2 scrollbar-none",
          className,
        )}
        {...props}
      >
        {children}
      </ol>
    </TimelineContext.Provider>
  );
}

export function TimelineItem({
  className,
  children,
  ...props
}: React.ComponentProps<"li">) {
  const orientation = useTimelineOrientation();
  const horizontal = orientation === "horizontal";

  return (
    <li
      data-reveal-item
      className={cn(
        "relative",
        horizontal
          ? "flex w-[min(18rem,78vw)] shrink-0 snap-start flex-col gap-6 pr-5 md:w-72 md:gap-7 md:pr-6"
          : "grid grid-cols-[auto_1fr] gap-x-4 pb-10 last:pb-0 md:gap-x-6",
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
}

export function TimelineIndicator({
  className,
  children,
  showConnector = true,
  ...props
}: React.ComponentProps<"div"> & { showConnector?: boolean }) {
  const orientation = useTimelineOrientation();
  const horizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "relative flex",
        horizontal ? "w-full flex-row items-center" : "flex-col items-center",
      )}
      {...props}
    >
      <div
        className={cn(
          "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-(--p-accent)/40 bg-(--p-accent) text-(--p-text-dark) shadow-[0_0_0_6px_color-mix(in_oklab,var(--p-secondary)_92%,var(--p-accent))] md:size-11",
          className,
        )}
      >
        {children}
      </div>
      {showConnector ? (
        <div
          aria-hidden
          className={cn(
            horizontal
              ? "mx-2 h-0.5 min-w-0 flex-1 bg-linear-to-r from-(--p-accent)/70 via-(--p-accent)/25 to-transparent"
              : "mt-2 w-0.5 min-h-10 flex-1 bg-linear-to-b from-(--p-accent)/70 via-(--p-accent)/25 to-transparent",
          )}
        />
      ) : horizontal ? (
        <div aria-hidden className="mx-2 h-0.5 min-w-0 flex-1 opacity-0" />
      ) : null}
    </div>
  );
}

export function TimelineContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const orientation = useTimelineOrientation();

  return (
    <div
      className={cn(
        "min-w-0 rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-white/18 hover:bg-black/30 md:p-6",
        orientation === "horizontal" && "h-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TimelineHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start justify-between gap-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TimelineTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-display text-xl tracking-[-0.03em] md:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TimelineDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-[15px]",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TimelineDate({
  className,
  children,
  ...props
}: React.ComponentProps<"time">) {
  return (
    <time
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] tracking-[0.12em] text-white/55 uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </time>
  );
}
