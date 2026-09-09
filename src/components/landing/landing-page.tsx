import { SiteHeader } from "@/components/landing/site-header";
import { HeroSection } from "@/components/landing/hero-section";
import { MarqueeSection } from "@/components/landing/marquee-section";
import { ProcessSection } from "@/components/landing/process-section";
import { SectionsGallery } from "@/components/landing/sections-gallery";
import { PalettesSection } from "@/components/landing/palettes-section";
import { CtaSection } from "@/components/landing/cta-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { LandingMotion } from "@/components/landing/motion/landing-motion";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export function LandingPage() {
  return (
    <main className="relative bg-ink text-foam">
      <LandingMotion />
      <SiteHeader />
      <HeroSection />
      <MarqueeSection />
      <ProcessSection />
      <SectionsGallery />
      <PalettesSection />
      <CtaSection />
      <SiteFooter />
      <ScrollToTop theme="brand" />
    </main>
  );
}
