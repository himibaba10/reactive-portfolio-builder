"use client";

import { useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Preloader } from "@/components/landing/motion/preloader";
import { CursorFollower } from "@/components/motion/cursor-follower";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function LandingMotion() {
  const [ready, setReady] = useState(false);
  const onPreloaderComplete = useCallback(() => setReady(true), []);

  useGSAP(
    () => {
      if (!ready) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mm = gsap.matchMedia();

      gsap.to("[data-landing-header]", {
        opacity: 1,
        duration: reduced ? 0.2 : 0.6,
        ease: "power2.out",
      });

      if (reduced) {
        gsap.set(
          [
            "[data-hero-brand]",
            "[data-hero-copy]",
            "[data-hero-cta]",
            "[data-process-card]",
            "[data-palette-card]",
            "[data-cta-line] > span",
            "[data-cta-eyebrow]",
            "[data-cta-copy]",
            "[data-cta-actions]",
          ],
          { clearProps: "all", y: 0, opacity: 1 },
        );
        return;
      }

      gsap.set(["[data-hero-brand]", "[data-hero-copy]", "[data-hero-cta]"], {
        y: 28,
      });
      gsap.set(["[data-cta-eyebrow]", "[data-cta-copy]", "[data-cta-actions]"], {
        y: 28,
      });

      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      heroTl
        .to("[data-hero-brand]", {
          opacity: 1,
          y: 0,
          duration: 1.05,
        })
        .to(
          ["[data-hero-copy]", "[data-hero-cta]"],
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.35",
        );

      gsap.to("[data-hero-orb]", {
        yPercent: 18,
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to("[data-hero-grid]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const marquee = document.querySelector<HTMLElement>("[data-marquee-track]");
      if (marquee) {
        const distance = marquee.scrollWidth / 2;
        gsap.to(marquee, {
          x: -distance,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
      }

      gsap.from("[data-process-card]", {
        opacity: 0,
        y: 64,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "[data-process]",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Desktop only: pinned horizontal scrub (mobile uses native swipe)
      mm.add("(min-width: 768px)", () => {
        const sectionsPin = document.querySelector<HTMLElement>("[data-sections-pin]");
        const sectionsTrack = document.querySelector<HTMLElement>("[data-sections-track]");
        const header = document.querySelector<HTMLElement>("[data-landing-header]");
        if (!sectionsPin || !sectionsTrack) return;

        const headerOffset = () => Math.ceil(header?.getBoundingClientRect().height ?? 72) + 28;

        const getScroll = () =>
          Math.max(0, sectionsTrack.scrollWidth - window.innerWidth + 32);

        const tween = gsap.to(sectionsTrack, {
          x: () => -getScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionsPin,
            start: () => `top top+=${headerOffset()}`,
            end: () => `+=${getScroll()}`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(sectionsTrack, { clearProps: "transform" });
        };
      });

      gsap.from("[data-palette-card]", {
        opacity: 0,
        y: 40,
        duration: 0.75,
        stagger: 0.08,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "[data-palettes]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "[data-cta]",
            start: "top 70%",
          },
        })
        .to("[data-cta-line] > span", {
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
        })
        .to(
          ["[data-cta-eyebrow]", "[data-cta-copy]", "[data-cta-actions]"],
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.45",
        );

      // Magnetic only on fine pointers (skip touch)
      mm.add("(hover: hover) and (pointer: fine)", () => {
        const magnetics = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
        const cleanups = magnetics.map((el) => {
          const onMove = (event: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            gsap.to(el, {
              x: x * 0.28,
              y: y * 0.28,
              duration: 0.35,
              ease: "power3.out",
            });
          };
          const onLeave = () => {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.55,
              ease: "elastic.out(1, 0.4)",
            });
          };
          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
          };
        });

        return () => cleanups.forEach((fn) => fn());
      });

      return () => {
        mm.revert();
      };
    },
    { dependencies: [ready] },
  );

  return (
    <>
      <Preloader onComplete={onPreloaderComplete} />
      {ready ? <CursorFollower /> : null}
    </>
  );
}
