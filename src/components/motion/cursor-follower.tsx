"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorFollowerProps = {
  /** Soft parallax target (landing hero orb). Pass null to disable. */
  ambientSelector?: string | null;
  /** `brand` = landing Signal/Foam; `palette` = portfolio CSS tokens */
  theme?: "brand" | "palette";
};

function resolveThemeColors(theme: "brand" | "palette") {
  if (theme === "palette") {
    const root = document.querySelector<HTMLElement>("[data-portfolio-root]");
    const styles = root ? getComputedStyle(root) : getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--p-accent").trim() || "#d6ff3f";
    const light = styles.getPropertyValue("--p-text-light").trim() || "#f4f5f0";
    return {
      ringIdle: `color-mix(in oklab, ${light} 55%, transparent)`,
      ringActive: accent,
      dotIdle: light,
      dotActive: accent,
    };
  }

  return {
    ringIdle: "rgba(244, 245, 240, 0.55)",
    ringActive: "rgba(214, 255, 63, 0.85)",
    dotIdle: "#f4f5f0",
    dotActive: "#d6ff3f",
  };
}

/**
 * Soft custom cursor that eases toward the pointer (GSAP quickTo).
 * Desktop / fine pointer only — skipped for touch and reduced motion.
 */
export function CursorFollower({
  ambientSelector = "[data-hero-orb]",
  theme = "brand",
}: CursorFollowerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(fine.matches && !reduced.matches);
    };
    sync();

    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const root = rootRef.current;
    if (!ring || !dot || !root) return;

    const colors = resolveThemeColors(theme);
    document.documentElement.classList.add("has-cursor-follower");

    const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" });

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { borderColor: colors.ringIdle });
    gsap.set(dot, { backgroundColor: colors.dotIdle });

    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(root, { opacity: 1, duration: 0.35, ease: "power2.out" });
    };

    const hide = () => {
      visible = false;
      gsap.to(root, { opacity: 0, duration: 0.25, ease: "power2.out" });
    };

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          "a, button, [data-magnetic], input, textarea, select, label, [role='button']",
        ),
      );
    };

    const onMove = (event: MouseEvent) => {
      show();
      xRing(event.clientX);
      yRing(event.clientY);
      xDot(event.clientX);
      yDot(event.clientY);

      const active = isInteractive(event.target);
      gsap.to(ring, {
        scale: active ? 2.4 : 1,
        borderColor: active ? colors.ringActive : colors.ringIdle,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: active ? 0.35 : 1,
        backgroundColor: active ? colors.dotActive : colors.dotIdle,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.15, ease: "power2.out" });
      gsap.to(dot, { scale: 0.6, duration: 0.15, ease: "power2.out" });
    };

    const onUp = (event: MouseEvent) => {
      const active = isInteractive(event.target);
      gsap.to(ring, {
        scale: active ? 2.4 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, {
        scale: active ? 0.35 : 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      document.documentElement.classList.remove("has-cursor-follower");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, [enabled, theme]);

  useEffect(() => {
    if (!enabled || !ambientSelector) return;
    const orb = document.querySelector<HTMLElement>(ambientSelector);
    if (!orb) return;

    const xTo = gsap.quickTo(orb, "x", { duration: 1.1, ease: "power3.out" });
    const yTo = gsap.quickTo(orb, "y", { duration: 1.1, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      xTo((event.clientX - cx) * 0.045);
      yTo((event.clientY - cy) * 0.045);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.set(orb, { clearProps: "x,y" });
    };
  }, [enabled, ambientSelector]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-100 opacity-0 mix-blend-difference"
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 size-10 rounded-full border border-white/55"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 size-1.5 rounded-full bg-white"
      />
    </div>
  );
}
