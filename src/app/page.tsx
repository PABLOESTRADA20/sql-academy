import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { StatsSection } from "@/components/landing/stats-section";
import { RoadmapSection } from "@/components/landing/roadmap-section";
import { TechSection } from "@/components/landing/tech-section";
import { CTASection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <RoadmapSection />
      <TechSection />
      <CTASection />
    </>
  );
}
