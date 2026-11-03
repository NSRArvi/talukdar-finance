import {
  HeroSection,
  LenderPanelMarquee,
  CarLoanFeatureSection,
  GlanceSection,
  StandBySection,
  LoanSolutionsSection,
  CommitmentSection,
  ProcessJourneySection,
  AboutBrokerSection,
  TestimonialsSection,
  FAQSection,
  ConsultationSection,
} from "@/components/home";
import { getHeroSlides } from "@/lib/services";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heroSlides = await getHeroSlides();

  return (
    <>
      <HeroSection slides={heroSlides} />
      <LenderPanelMarquee />
      <CarLoanFeatureSection />
      <GlanceSection />
      <StandBySection />
      <LoanSolutionsSection />
      <CommitmentSection />
      <ProcessJourneySection />
      <AboutBrokerSection />
      <TestimonialsSection />
      <FAQSection />
      <ConsultationSection />
    </>
  );
}
