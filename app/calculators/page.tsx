import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CalculatorHeroBanner } from "@/components/calculators/calculator-hero-banner";
import { LoanCalculatorTool } from "@/components/calculators/loan-calculator-tool";
import { ConsultationSection } from "@/components/home/consultation-section";

export const metadata: Metadata = {
  title: "Australian Loan & Mortgage Calculators | Talukdar Finance",
  description:
    "Calculate repayments for Australian home mortgages and car loans. Modeled after Moneysmart.gov.au and Westpac benchmark standards. Test extra repayments, interest-only terms, and residual balloons.",
};

export default function CalculatorsPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-clip">
      <Header />
      <main className="flex-1 flex flex-col">
        {/* LMG-Style Billboard Hero */}
        <CalculatorHeroBanner />

        {/* Interactive Moneysmart & Westpac Inspired Calculators */}
        <LoanCalculatorTool />

        {/* Direct Broker Consultation */}
        <div id="consultation">
          <ConsultationSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

