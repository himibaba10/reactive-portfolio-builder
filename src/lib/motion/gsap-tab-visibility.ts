import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GuardOptions = {
  onHide?: () => void;
  onShow?: () => void;
};

const listeners = new Set<GuardOptions>();
let bound = false;

function onVisibilityChange() {
  if (document.hidden) {
    gsap.globalTimeline.pause();
    for (const listener of listeners) listener.onHide?.();
    return;
  }

  // Skip catch-up after a long background gap, then restore defaults.
  gsap.ticker.lagSmoothing(0);
  gsap.globalTimeline.resume();
  ScrollTrigger.update();
  for (const listener of listeners) listener.onShow?.();

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    gsap.ticker.lagSmoothing(500, 33);
  });
}

/**
 * Pause GSAP while the tab is hidden; on return, resume without a lag catch-up storm
 * and refresh ScrollTrigger metrics.
 */
export function attachGsapVisibilityGuard(options: GuardOptions = {}) {
  listeners.add(options);

  if (!bound) {
    bound = true;
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  return () => {
    listeners.delete(options);
    if (listeners.size === 0 && bound) {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      bound = false;
      if (gsap.globalTimeline.paused()) {
        gsap.globalTimeline.resume();
      }
      gsap.ticker.lagSmoothing(500, 33);
    }
  };
}
