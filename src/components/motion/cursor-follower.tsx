"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { attachGsapVisibilityGuard } from "@/lib/motion/gsap-tab-visibility";

type CursorFollowerProps = {
  /** Soft parallax target (landing hero orb). Pass null to disable. */
  ambientSelector?: string | null;
  /** `brand` = landing Signal/Foam; `palette` = portfolio CSS tokens */
  theme?: "brand" | "palette";
};

function resolveThemeColors(theme: "brand" | "palette") {
  if (theme === "palette") {
    const root = document.querySelector<HTMLElement>("[data-portfolio-root]");
    const styles = root
      ? getComputedStyle(root)
      : getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--p-accent").trim() || "#d6ff3f";
    const light = styles.getPropertyValue("--p-text-light").trim() || "#f4f5f0";
    return {
      ringIdle: light,
      ringActive: accent,
      dotIdle: light,
      dotActive: accent,
    };
  }

  return {
    ringIdle: "#f4f5f0",
    ringActive: "#d6ff3f",
    dotIdle: "#f4f5f0",
    dotActive: "#d6ff3f",
  };
}

/**
 * Soft custom cursor (GSAP quickTo). Desktop / fine pointer only.
 * Blend mode is scoped to the cursor glyphs — not a full-viewport layer.
 */
export function CursorFollower({
  ambientSelector = null,
  theme = "brand",
}: CursorFollowerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(fine.matches && !reduced.matches);
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

    const xRing = gsap.quickTo(ring, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const yRing = gsap.quickTo(ring, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
    const xDot = gsap.quickTo(dot, "x", {
      duration: 0.12,
      ease: "power3.out",
    });
    const yDot = gsap.quickTo(dot, "y", {
      duration: 0.12,
      ease: "power3.out",
    });
    const scaleRing = gsap.quickTo(ring, "scale", {
      duration: 0.28,
      ease: "power3.out",
    });
    const scaleDot = gsap.quickTo(dot, "scale", {
      duration: 0.28,
      ease: "power3.out",
    });

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, force3D: true });
    gsap.set(ring, { borderColor: colors.ringIdle, opacity: 0.7 });
    gsap.set(dot, { backgroundColor: colors.dotIdle });

    let visible = false;
    let active = false;
    let pressed = false;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(root, { opacity: 1, duration: 0.25, ease: "power2.out" });
    };

    const hide = () => {
      visible = false;
      gsap.to(root, { opacity: 0, duration: 0.2, ease: "power2.out" });
    };

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          "a, button, [data-magnetic], input, textarea, select, label, [role='button']",
        ),
      );
    };

    const applyState = (nextActive: boolean, nextPressed: boolean) => {
      const ringScale = nextPressed ? 0.85 : nextActive ? 2.2 : 1;
      const dotScale = nextPressed ? 0.55 : nextActive ? 0.35 : 1;
      scaleRing(ringScale);
      scaleDot(dotScale);

      if (nextActive !== active) {
        active = nextActive;
        gsap.set(ring, {
          borderColor: nextActive ? colors.ringActive : colors.ringIdle,
          opacity: nextActive ? 0.95 : 0.7,
        });
        gsap.set(dot, {
          backgroundColor: nextActive ? colors.dotActive : colors.dotIdle,
        });
      }
    };

    const orb = ambientSelector
      ? document.querySelector<HTMLElement>(ambientSelector)
      : null;
    const xOrb = orb
      ? gsap.quickTo(orb, "x", { duration: 1, ease: "power3.out" })
      : null;
    const yOrb = orb
      ? gsap.quickTo(orb, "y", { duration: 1, ease: "power3.out" })
      : null;

    let lastHoverTarget: EventTarget | null = null;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let snapOnShow = false;

    const snapCursor = (x: number, y: number) => {
      gsap.set(ring, { x, y });
      gsap.set(dot, { x, y });
    };

    const onMove = (event: MouseEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;

      // Tab hidden: ignore moves so we don't queue a catch-up storm.
      if (document.hidden) return;

      if (snapOnShow) {
        snapOnShow = false;
        snapCursor(lastX, lastY);
      }

      show();
      xRing(lastX);
      yRing(lastY);
      xDot(lastX);
      yDot(lastY);

      // Avoid closest() thrash — only re-evaluate when the hit target changes.
      if (event.target !== lastHoverTarget || pressed) {
        lastHoverTarget = event.target;
        const nextActive = isInteractive(event.target);
        if (nextActive !== active || pressed) {
          applyState(nextActive, pressed);
        }
      }

      if (xOrb && yOrb) {
        xOrb((lastX - window.innerWidth / 2) * 0.03);
        yOrb((lastY - window.innerHeight / 2) * 0.03);
      }
    };

    const onDown = () => {
      if (document.hidden) return;
      pressed = true;
      applyState(active, true);
    };

    const onUp = (event: MouseEvent) => {
      if (document.hidden) return;
      pressed = false;
      applyState(isInteractive(event.target), false);
    };

    const detachVisibility = attachGsapVisibilityGuard({
      onHide: () => {
        visible = false;
        gsap.set(root, { opacity: 0 });
      },
      onShow: () => {
        snapOnShow = true;
        snapCursor(lastX, lastY);
      },
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      detachVisibility();
      document.documentElement.classList.remove("has-cursor-follower");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      if (orb) gsap.set(orb, { clearProps: "x,y" });
    };
  }, [enabled, theme, ambientSelector]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-100 size-0 opacity-0"
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 size-9 rounded-full border border-white/70 mix-blend-difference will-change-transform"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 size-1.5 rounded-full bg-white mix-blend-difference will-change-transform"
      />
    </div>
  );
}
