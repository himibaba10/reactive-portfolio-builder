"use client";

import { useEffect, useRef } from "react";
import { SkillsEmpty, SkillsHeader, type SkillsFlags } from "./shared";

export function SkillsMarqueeStrip({
  skills,
  items,
  empty,
}: {
  skills: SkillsFlags;
  items: string[];
  empty: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loop = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || empty) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const root = track.parentElement;
    if (!root) return;

    const syncPlayState = () => {
      const inView = track.dataset.inView === "1";
      track.style.animationPlayState =
        !document.hidden && inView ? "running" : "paused";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        track.dataset.inView = entry?.isIntersecting ? "1" : "0";
        syncPlayState();
      },
      { rootMargin: "10% 0px" },
    );

    const onVisibility = () => syncPlayState();
    document.addEventListener("visibilitychange", onVisibility);

    io.observe(root);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [empty]);

  return (
    <section id="skills" className="space-y-6">
      <SkillsHeader skills={skills} />
      {empty ? (
        <SkillsEmpty />
      ) : (
        <div className="relative overflow-x-clip mask-[linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div
            ref={trackRef}
            className="portfolio-marquee-track flex w-max gap-3 py-1 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-start"
          >
            {(items.length ? loop : items).map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm tracking-wide text-white/85"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
