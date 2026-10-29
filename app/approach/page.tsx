import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommitmentSection, TestimonialsSection, ConsultationSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Our Approach & Commitment | Talukdar Finance",
  description:
    "A more personal approach to finance. Understand our client-first philosophy, transparent options, and continuous support across Australia.",
};

export default function ApproachPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-clip">
      <Header />
      <main className="flex-1 flex flex-col pt-4">
        <CommitmentSection />
        <TestimonialsSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}

