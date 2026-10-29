import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoanSolutionsSection, ConsultationSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Loan Solutions & Facilities | Talukdar Finance",
  description:
    "Explore comprehensive lending facilities in Australia: First Home Buyer, Refinancing, Commercial Property, Vehicle Finance, and SMSF Lending.",
};

export default function SolutionsPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-clip">
      <Header />
      <main className="flex-1 flex flex-col pt-4">
        <LoanSolutionsSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}

