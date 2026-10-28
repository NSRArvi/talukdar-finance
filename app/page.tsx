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
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-clip">
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
