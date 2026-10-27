import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  HeroSection,
  LoanSolutionsSection,
  CommitmentSection,
  ProcessJourneySection,
  AboutBrokerSection,
  TestimonialsSection,
  FAQSection,
  ConsultationSection,
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <LoanSolutionsSection />
        <CommitmentSection />
        <ProcessJourneySection />
        <AboutBrokerSection />
        <TestimonialsSection />
        <FAQSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}
