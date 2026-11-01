import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FAQSection, ConsultationSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Talukdar Finance",
  description:
    "Find answers to common questions about mortgage broking, loan application processes, fees, and credit requirements.",
};

export default function FAQsPage() {
  return (
    <>
      <FAQSection />
      <ConsultationSection />
    </>
  );
}
