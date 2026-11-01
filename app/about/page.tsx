import type { Metadata } from "next";
import { AboutHeroBanner } from "@/components/about/about-hero-banner";
import { AboutBrokerSection, TestimonialsSection, ConsultationSection } from "@/components/home";

export const metadata: Metadata = {
  title: "About Your Broker | Talukdar Finance",
  description:
    "Meet your FBAA accredited mortgage and finance specialist. Real conversations, personal guidance, and high-integrity credit strategy.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroBanner />
      <AboutBrokerSection />
      <TestimonialsSection />
      <ConsultationSection />
    </>
  );
}
