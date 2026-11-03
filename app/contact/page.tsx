import type { Metadata } from "next";
import {
  ContactHeroBanner,
  ContactInfoSection,
  ContactMapSection,
} from "@/components/contact";
import { ConsultationSection } from "@/components/home/consultation-section";
import { getContactInfo } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const contactInfo = await getContactInfo();
  return {
    title: "Contact Us | Talukdar Finance",
    description: `Get in touch with Talukdar Finance. ${contactInfo.address_line1}, ${contactInfo.address_line2}. Direct broker consultations, loan scenario reviews, and office visits.`,
  };
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  return (
    <>
      {/* Top Hero Banner (Dynamic Location & Phone) */}
      <ContactHeroBanner contactInfo={contactInfo} />

      {/* Consultation Form */}
      <div id="contact-form">
        <ConsultationSection />
      </div>

      {/* Dynamic Contact Information Cards */}
      <ContactInfoSection initialInfo={contactInfo} />

      {/* Dynamic Interactive Google Map */}
      <ContactMapSection mapQuery={contactInfo.map_query} />
    </>
  );
}
