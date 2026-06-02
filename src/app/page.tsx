import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { StatsSection } from "@/components/landing/stats-section";
import { RoadmapSection } from "@/components/landing/roadmap-section";
import { TechSection } from "@/components/landing/tech-section";
import { CTASection } from "@/components/landing/cta-section";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "SQL Academy - Aprende SQL y PostgreSQL",
  description: "Plataforma educativa gratuita para aprender SQL y PostgreSQL. Lecciones interactivas, ejercicios prácticos y simulador SQL en vivo.",
  provider: {
    "@type": "Organization",
    name: "SQL Academy",
    url: "https://sql-academy.com",
  },
  educationalLevel: "Beginner",
  teaches: [
    "SQL Básico",
    "SQL Intermedio",
    "SQL Avanzado",
    "PostgreSQL",
    "Bases de Datos",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <RoadmapSection />
      <TechSection />
      <CTASection />
    </>
  );
}
