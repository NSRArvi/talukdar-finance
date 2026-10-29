import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutBrokerSection, TestimonialsSection, ConsultationSection } from "@/components/home";

export const metadata: Metadata = {
  title: "About Your Broker | Talukdar Finance",
  description:
    "Meet your MFAA accredited mortgage and finance specialist. Real conversations, personal guidance, and high-integrity credit strategy.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-clip">
      <Header />
      <main className="flex-1 flex flex-col pt-4">
        <AboutBrokerSection />
        <TestimonialsSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}

