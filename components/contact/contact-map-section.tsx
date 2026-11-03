"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";

interface ContactMapSectionProps {
  mapQuery: string;
}

export function ContactMapSection({ mapQuery }: ContactMapSectionProps) {
  if (!mapQuery) return null;

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
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
            Located in the heart of Campbelltown CBD at {mapQuery}.
          </p>
        </div>

        <div className="rounded-[32px] sm:rounded-[40px] border border-slate-200/90 overflow-hidden shadow-xl bg-white h-[420px] sm:h-[480px] w-full relative">
          <iframe
            title="Talukdar Finance Office Location Map"
            src={embedUrl}
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
  );
}
