"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { MapPin, Mail, Clock, Phone } from "lucide-react";
import type { ContactInfo } from "@/types";

interface ContactInfoSectionProps {
  initialInfo: ContactInfo;
}

export function ContactInfoSection({ initialInfo }: ContactInfoSectionProps) {
  const info = initialInfo;

  if (!info) return null;

  return (
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
            Connect with our accredited broker team online, by phone, or visit our {info.office_title} by appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Card 1: Office Location */}
          <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[var(--color-brand-blue)] flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Office Location
              </div>
              <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-2">
                {info.office_title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {info.address_line1}
                <br />
                {info.address_line2}
              </p>
            </div>
            {info.address_note && (
              <div className="pt-6 mt-6 border-t border-slate-200/80 text-xs font-semibold text-[var(--color-brand-blue)]">
                {info.address_note}
              </div>
            )}
          </div>

          {/* Card 2: Email & Direct Inquiries */}
          <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Email &amp; Scenarios
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--color-brand-navy)] mb-2 break-all">
                <a href={`mailto:${info.email}`} className="hover:underline">
                  {info.email}
                </a>
              </h3>
              {info.phone && (
                <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <a href={`tel:${info.phone.replace(/\s+/g, "")}`} className="hover:underline">
                    {info.phone}
                  </a>
                </p>
              )}
              <p className="text-sm text-slate-600 leading-relaxed">
                Send through scenario notes, tax returns, or loan statements for review.
              </p>
            </div>
            {info.email_note && (
              <div className="pt-6 mt-6 border-t border-slate-200/80 text-xs font-semibold text-emerald-700">
                {info.email_note}
              </div>
            )}
          </div>

          {/* Card 3: Operating Hours */}
          <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Operating Hours
              </div>
              <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-2">
                {info.hours_weekdays}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {info.hours_weekends}
              </p>
            </div>
            {info.hours_note && (
              <div className="pt-6 mt-6 border-t border-slate-200/80 text-xs font-semibold text-purple-700">
                {info.hours_note}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
