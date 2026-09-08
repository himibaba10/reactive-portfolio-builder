"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site } from "@/lib/landing-content";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const id = window.setTimeout(() => {
        setProgress(100);
        onComplete();
      }, 0);
      return () => window.clearTimeout(id);
    }

    const state = { value: 0 };
    const tween = gsap.to(state, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(state.value)),
      onComplete: () => {
        const tl = gsap.timeline({
          onComplete,
        });
        tl.to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        });
      },
    });

    return () => {
      tween.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-60 flex flex-col justify-between bg-ink px-5 py-8 text-foam md:px-8"
      aria-hidden={progress >= 100}
    >
      <div className="flex items-center justify-between text-xs tracking-[0.24em] uppercase">
        <span>{site.shortName}</span>
        <span>Booting builder</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <p className="max-w-sm font-display text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
          Compose. Palette. Publish.
        </p>
        <p className="font-display text-6xl tracking-[-0.05em] tabular-nums md:text-8xl">
          {String(progress).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
