import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FAQSection, ConsultationSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Talukdar Finance",
  description:
    "Got questions before getting started? Explore clear answers regarding loan types, broker fees, application timelines, and required documents.",
};

export default function FAQsPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-clip">
      <Header />
      <main className="flex-1 flex flex-col pt-4">
        <FAQSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}

