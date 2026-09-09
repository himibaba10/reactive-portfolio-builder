"use client";

import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type ScrollToTopProps = {
  /** `brand` = landing Signal; `palette` = portfolio CSS tokens */
  theme?: "brand" | "palette";
  className?: string;
};

const SHOW_AFTER_PX = 480;

export function ScrollToTop({
  theme = "brand",
  className,
}: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  const scrollTop = () => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full border transition duration-300 md:right-8 md:bottom-8",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
        theme === "brand"
          ? "border-line bg-panel text-foam hover:border-signal hover:text-signal"
          : "border-white/15 bg-(--p-secondary) text-(--p-text-light) hover:border-(--p-accent) hover:text-(--p-accent)",
        className,
      )}
    >
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}
