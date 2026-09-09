"use client";

import { site } from "@/lib/landing-content";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      const id = window.setTimeout(() => {
        setDone(true);
        onComplete();
      }, 0);
      return () => window.clearTimeout(id);
    }

    const progressEl = progressRef.current;
    const state = { value: 0 };
    let exitTl: gsap.core.Timeline | null = null;

    const tween = gsap.to(state, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (progressEl) {
          progressEl.textContent = String(Math.round(state.value)).padStart(
            2,
            "0",
          );
        }
      },
      onComplete: () => {
        exitTl = gsap.timeline({
          onComplete: () => {
            setDone(true);
            onComplete();
          },
        });
        exitTl.to(rootRef.current, {
          yPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
        });
      },
    });

    return () => {
      tween.kill();
      exitTl?.kill();
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-60 flex flex-col justify-between bg-ink px-5 py-8 text-foam md:px-8"
      aria-hidden
    >
      <div className="flex items-center justify-between text-xs tracking-[0.24em] uppercase">
        <span>{site.shortName}</span>
        <span>Booting builder</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <p className="max-w-sm font-display text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
          Compose. Palette. Publish.
        </p>
        <p
          ref={progressRef}
          className="font-display text-6xl tracking-tighter tabular-nums md:text-8xl"
        >
          00
        </p>
      </div>
    </div>
  );
}
