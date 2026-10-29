import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProcessJourneySection, FAQSection, ConsultationSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Process & Steps | Talukdar Finance",
  description:
    "Your finance journey made clear. From initial discovery and product comparison to application lodgement and settlement support.",
};

export default function StepsPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-clip">
      <Header />
      <main className="flex-1 flex flex-col pt-4">
        <ProcessJourneySection />
        <FAQSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}

