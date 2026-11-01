import type { Metadata } from "next";
import { SolutionsHeroBanner } from "@/components/solutions/solutions-hero-banner";
import { LoanSolutionsSection, ConsultationSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Loan Solutions & Facilities | Talukdar Finance",
  description:
    "Explore comprehensive lending facilities in Australia: First Home Buyer, Refinancing, Commercial Property, Vehicle Finance, and SMSF Lending.",
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHeroBanner />
      <LoanSolutionsSection />
      <ConsultationSection />
    </>
  );
}
