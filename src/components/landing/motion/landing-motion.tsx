"use client";

import { Preloader } from "@/components/landing/motion/preloader";
import { CursorFollower } from "@/components/motion/cursor-follower";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function LandingMotion() {
  const [ready, setReady] = useState(false);
  const onPreloaderComplete = useCallback(() => setReady(true), []);

  useGSAP(
    () => {
      if (!ready) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
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
        return () => {
          mm.revert();
        };
      }

      gsap.set(["[data-hero-brand]", "[data-hero-copy]", "[data-hero-cta]"], {
        y: 28,
      });
      gsap.set(
        ["[data-cta-eyebrow]", "[data-cta-copy]", "[data-cta-actions]"],
        {
          y: 28,
        },
      );

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

      // Single scrub on orb only — grid stays static (cheaper paint).
      gsap.to("[data-hero-orb]", {
        yPercent: 14,
        xPercent: -6,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const marquee = document.querySelector<HTMLElement>(
        "[data-marquee-track]",
      );
      if (marquee) {
        const distance = marquee.scrollWidth / 2;
        const marqueeTween = gsap.to(marquee, {
          x: -distance,
          duration: 28,
          ease: "none",
          repeat: -1,
          force3D: true,
        });

        ScrollTrigger.create({
          trigger: "[data-marquee]",
          start: "top bottom",
          end: "bottom top",
          onEnter: () => marqueeTween.play(),
          onEnterBack: () => marqueeTween.play(),
          onLeave: () => marqueeTween.pause(),
          onLeaveBack: () => marqueeTween.pause(),
        });
      }

      gsap.from("[data-process-card]", {
        opacity: 0,
        y: 48,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "[data-process]",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      mm.add("(min-width: 768px)", () => {
        const sectionsPin = document.querySelector<HTMLElement>(
          "[data-sections-pin]",
        );
        const sectionsTrack = document.querySelector<HTMLElement>(
          "[data-sections-track]",
        );
        const header = document.querySelector<HTMLElement>(
          "[data-landing-header]",
        );
        if (!sectionsPin || !sectionsTrack) return;

        let cachedHeader = Math.ceil(header?.offsetHeight ?? 72) + 28;
        let cachedScroll = Math.max(
          0,
          sectionsTrack.scrollWidth - window.innerWidth + 32,
        );

        const refreshMetrics = () => {
          cachedHeader = Math.ceil(header?.offsetHeight ?? 72) + 28;
          cachedScroll = Math.max(
            0,
            sectionsTrack.scrollWidth - window.innerWidth + 32,
          );
        };

        sectionsTrack.classList.add("will-change-transform");

        const tween = gsap.to(sectionsTrack, {
          x: () => -cachedScroll,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionsPin,
            start: () => `top top+=${cachedHeader}`,
            end: () => `+=${cachedScroll}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: refreshMetrics,
          },
        });

        return () => {
          sectionsTrack.classList.remove("will-change-transform");
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(sectionsTrack, { clearProps: "transform" });
        };
      });

      gsap.from("[data-palette-card]", {
        opacity: 0,
        y: 32,
        duration: 0.65,
        stagger: 0.06,
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
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
        })
        .to(
          ["[data-cta-eyebrow]", "[data-cta-copy]", "[data-cta-actions]"],
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.4",
        );

      mm.add("(hover: hover) and (pointer: fine)", () => {
        const magnetics = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
        const cleanups = magnetics.map((el) => {
          let rect = el.getBoundingClientRect();
          const xTo = gsap.quickTo(el, "x", {
            duration: 0.28,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(el, "y", {
            duration: 0.28,
            ease: "power3.out",
          });

          const onEnter = () => {
            rect = el.getBoundingClientRect();
          };
          const onMove = (event: MouseEvent) => {
            xTo((event.clientX - rect.left - rect.width / 2) * 0.22);
            yTo((event.clientY - rect.top - rect.height / 2) * 0.22);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };

          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mousemove", onMove, { passive: true });
          el.addEventListener("mouseleave", onLeave);
          return () => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
            gsap.set(el, { clearProps: "x,y" });
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
