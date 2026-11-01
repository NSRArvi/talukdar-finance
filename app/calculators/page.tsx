import type { Metadata } from "next";
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
    <>
      <CalculatorHeroBanner />
      <LoanCalculatorTool />
      <div id="consultation">
        <ConsultationSection />
      </div>
    </>
  );
}
