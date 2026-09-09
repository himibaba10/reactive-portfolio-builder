"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CursorFollower } from "@/components/motion/cursor-follower";
import { attachGsapVisibilityGuard } from "@/lib/motion/gsap-tab-visibility";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function revealTargets(block: HTMLElement): HTMLElement[] {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal-item]", block);
  if (items.length) return items;

  const section =
    block.matches("section, header, footer")
      ? block
      : (block.querySelector("section") ?? block);

  // Prefer explicit children — avoid getComputedStyle thrash at init.
  const kids = gsap.utils.toArray<HTMLElement>(":scope > *", section);
  return kids.length ? kids.slice(0, 12) : [section as HTMLElement];
}

export function PortfolioMotion() {
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector<HTMLElement>("[data-portfolio-header]");
    const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const footer = document.querySelector<HTMLElement>("[data-portfolio-footer]");

    if (reduced) {
      gsap.set([header, ...blocks, footer].filter(Boolean), {
        clearProps: "all",
      });
      return;
    }

    const detachVisibility = attachGsapVisibilityGuard();

    if (header) {
      gsap.from(header, {
        y: -18,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
      });
    }

    blocks.forEach((block) => {
      const targets = revealTargets(block);
      gsap.set(targets, { opacity: 0, y: 28 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        overwrite: "auto",
        scrollTrigger: {
          trigger: block,
          start: "top 86%",
          once: true,
        },
      });
    });

    if (footer) {
      gsap.from(footer, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 96%",
          once: true,
        },
      });
    }

    return () => {
      detachVisibility();
    };
  }, []);

  return <CursorFollower theme="palette" ambientSelector={null} />;
}
