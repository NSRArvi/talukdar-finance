"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Building2, Quote, ShieldCheck } from "lucide-react";

export function AboutBrokerSection() {
  const scrollToConsultation = () => {
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="about" background="soft" spacing="lg">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left: Professional Broker Profile Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="relative w-full max-w-sm">
              {/* Photo Box */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-[var(--color-brand-border)] bg-slate-200">
                <Image
                  src="/about.png"
                  alt="Talukdar Finance Principal Mortgage & Finance Specialist"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy)]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold leading-tight">
                    [Broker Full Name]
                  </h3>
                  <p className="text-xs text-white/80 font-medium">
                    Principal Mortgage & Finance Specialist
                  </p>
                </div>
              </div>

              {/* MFAA Accreditation Badge */}
              <div className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[var(--color-brand-border)] shadow-sm">
                <ShieldCheck className="h-5 w-5 text-[var(--color-brand-blue)] shrink-0" />
                <span className="text-xs font-semibold text-[var(--color-brand-navy)]">
                  MFAA Accredited Finance Broker
                </span>
              </div>
            </div>
          </div>

          {/* Right: Personal Advisory Pitch & Credentials */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-brand-navy)] leading-tight">
              Real Conversations. Personal Guidance.
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-brand-text-muted)] leading-relaxed">
              At Talukdar Finance, we believe a good finance experience starts with understanding the person behind the plans. We take the time to understand your goals and help you navigate your options with greater clarity.
            </p>

            {/* Structured Credentials Card */}
            <div className="w-full rounded-2xl border border-[var(--color-brand-border)] bg-white p-6 sm:p-7 flex flex-col gap-5 shadow-sm">
              {/* Qualifications */}
              <div className="flex items-start gap-3.5">
                <div className="h-9 w-9 rounded-lg bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-[var(--color-brand-text-muted)] uppercase mb-1">
                    Qualifications
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-brand-navy)]">
                    MFAA Accredited | Dip. Financial Services | Cert IV FMB
                  </div>
                </div>
              </div>

              {/* Professional Association */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="h-9 w-9 rounded-lg bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-[var(--color-brand-text-muted)] uppercase mb-1">
                    Professional Association
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-brand-navy)]">
                    Member of Mortgage & Finance Association of Australia (MFAA)
                  </div>
                </div>
              </div>

              {/* Client Philosophy */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="h-9 w-9 rounded-lg bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] flex items-center justify-center shrink-0 mt-0.5">
                  <Quote className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-[var(--color-brand-text-muted)] uppercase mb-1">
                    Client Philosophy
                  </div>
                  <p className="text-sm text-[var(--color-brand-text)] italic leading-relaxed">
                    &ldquo;Clear, transparent advice that puts borrower goals first, navigating complex credit pathways together.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button size="lg" onClick={scrollToConsultation}>
                Let&apos;s Talk About Your Goals
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
