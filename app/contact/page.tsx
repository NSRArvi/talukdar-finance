import type { Metadata } from "next";
import { ContactHeroBanner } from "@/components/contact/contact-hero-banner";
import { ConsultationSection } from "@/components/home/consultation-section";
import { Container } from "@/components/ui/container";
import { MapPin, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Talukdar Finance",
  description:
    "Get in touch with Talukdar Finance. Suite 15, 186 Queen Street, Campbelltown, NSW 2560. Direct broker consultations, loan scenario reviews, and office visits.",
};

export default function ContactPage() {
  return (
    <>
      {/* Top Hero Banner */}
      <ContactHeroBanner />

      {/* Contact Information & Office Details Cards */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
        <Container size="default">
          <div className="flex flex-col items-start max-w-xl mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-[#FBFBFA] text-xs font-semibold text-slate-800 tracking-wider mb-5">
              Our Details
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12]">
              How to Reach Us
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Connect with our accredited broker team online, by phone, or visit our Campbelltown office by appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Card 1 */}
            <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[var(--color-brand-blue)] flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Office Location
                </div>
                <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-2">
                  Campbelltown Office
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Suite 15, 186 Queen Street,
                  <br />
                  Campbelltown, NSW 2560
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80 text-xs font-semibold text-[var(--color-brand-blue)]">
                Convenient parking &amp; public transit nearby
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Email &amp; Scenarios
                </div>
                <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-2">
                  advisory@talukdarfinance.com.au
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Send through scenario notes, tax returns, or loan statements for review.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80 text-xs font-semibold text-emerald-700">
                Responds within 1 business day
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Operating Hours
                </div>
                <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-2">
                  Monday – Friday
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  9:00 AM – 6:00 PM AEST
                  <br />
                  Weekend consultations by appointment
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80 text-xs font-semibold text-purple-700">
                After-hours calls available on request
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Map */}
      <section className="py-14 lg:py-20 bg-[#FBFBFA] border-b border-slate-200">
        <Container size="default">
          <div className="flex flex-col items-start max-w-xl mb-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 tracking-wider mb-5">
              Map &amp; Directions
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12]">
              Visit Our Office
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Located in the heart of Campbelltown CBD at Suite 15, 186 Queen Street, NSW 2560.
            </p>
          </div>

          <div className="rounded-[32px] sm:rounded-[40px] border border-slate-200/90 overflow-hidden shadow-xl bg-white h-[420px] sm:h-[480px] w-full relative">
            <iframe
              title="Talukdar Finance Office Location Map"
              src="https://maps.google.com/maps?q=Suite+15,+186+Queen+Street,+Campbelltown,+NSW+2560&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </Container>
      </section>

      {/* Form */}
      <div id="contact-form">
        <ConsultationSection />
      </div>
    </>
  );
}
