import type { Metadata } from "next";
import { AboutHeroBanner } from "@/components/about/about-hero-banner";
import { LicensingCredentialsSection } from "@/components/about/licensing-credentials-section";
import { AboutBrokerSection, TestimonialsSection, ConsultationSection } from "@/components/home";

export const metadata: Metadata = {
  title: "About Your Broker | Talukdar Finance",
  description:
    "Meet your FBAA accredited mortgage and finance specialist. MMA GLOBAL PTY LIMITED trading as Talukder Finance since 2021. Australian Credit Representative (ACR) 567708 under Australian Credit Licence (ACL) 577112.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroBanner />
      <AboutBrokerSection />
      <LicensingCredentialsSection />
      <TestimonialsSection />
      <ConsultationSection />
    </>
  );
}
