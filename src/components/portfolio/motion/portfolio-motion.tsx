"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function revealTargets(block: HTMLElement): HTMLElement[] {
  const section =
    block.matches("section, header, footer")
      ? block
      : (block.querySelector("section") ?? block);

  const direct = gsap.utils.toArray<HTMLElement>(":scope > *", section);
  if (!direct.length) return [section as HTMLElement];

  const expanded: HTMLElement[] = [];
  for (const node of direct) {
    const display = getComputedStyle(node).display;
    const kids = gsap.utils.toArray<HTMLElement>(":scope > *", node);
    const isCluster =
      (display.includes("grid") || display.includes("flex")) && kids.length > 1;
    if (isCluster) {
      expanded.push(...kids);
    } else {
      expanded.push(node);
    }
  }
  return expanded;
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
      gsap.set(targets, { opacity: 0, y: 36 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
        overwrite: "auto",
        scrollTrigger: {
          trigger: block,
          start: "top 88%",
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
  }, []);

  return null;
}
