"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { User, FileText, LifeBuoy, ArrowRight, CheckCircle2 } from "lucide-react";

interface CommitmentPillar {
  tag: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  accentBg: string;
  badgeColor: string;
}

const pillars: CommitmentPillar[] = [
  {
    tag: "PERSONALISED ADVISORY",
    number: "01",
    title: "Guidance That Starts With You",
    subtitle: "Your borrowing strategy built around your individual ambitions.",
    description:
      "We take the time to understand your circumstances, income structure, and long-term goals before comparing lender credit policies. No cookie-cutter assumptions, no algorithmic bias.",
    highlights: [
      "Deep analysis of your borrowing capacity",
      "Tailored loan structuring across 40+ banks",
      "Comprehensive tax & entity review (PAYG & Self-Employed)",
    ],
    image: "/A More Personal Approach to Finance/Guidance That Starts With You.png",
    accentBg: "bg-white",
    badgeColor: "bg-blue-50 text-[var(--color-brand-blue)] border-blue-200",
  },
  {
    tag: "PLAIN-ENGLISH ADVISORY",
    number: "02",
    title: "Clear, Informed Decisions",
    subtitle: "Translating complex bank jargon into actionable clarity.",
    description:
      "Lending policies, comparison rates, offset accounts, and redraw terms can be confusing. We present clear side-by-side lender breakdowns so you can choose your facility with total confidence.",
    highlights: [
      "Side-by-side interest rate & fee comparisons",
      "Transparent breakdown of lender turnaround times",
      "Zero hidden commissions or lender lock-ins",
    ],
    image: "/A More Personal Approach to Finance/Clear, Informed Decisions.png",
    accentBg: "bg-[#FBFBFA]",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    tag: "END-TO-END EXECUTION",
    number: "03",
    title: "Support Through Every Milestone",
    subtitle: "Active guidance from pre-approval through to settlement and beyond.",
    description:
      "We manage the back-and-forth communication directly with bank credit assessors, real estate agents, and legal conveyancers. When market interest rates fluctuate, we review your terms continuously.",
    highlights: [
      "Direct negotiation with bank credit assessors",
      "Seamless liaison with your legal conveyancer",
      "Proactive post-settlement annual rate reviews",
    ],
    image: "/A More Personal Approach to Finance/Support Through Every Milestone.png",
    accentBg: "bg-white",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

export function CommitmentSection() {
  const scrollToAbout = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToConsultation = () => {
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="commitment" className="py-20 lg:py-28 bg-[#FBFBFA] border-b border-slate-200">
      <Container size="default">
        <div className="space-y-6">
          {/* Left Column: Sticky Section Header on Desktop */}
          <div className="flex flex-col items-start">
            {/* LMG Style Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 tracking-wider mb-5">
              Our Advisory Approach
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12] mb-6">
              A More Personal Approach to Finance
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Finance decisions can feel overwhelming. Talukdar Finance makes the journey straightforward by listening to your needs, presenting clear options, and steering your application smoothly to approval.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={scrollToConsultation}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                <span>Book Free Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={scrollToAbout}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Get to Know Us</span>
              </button>
            </div>
          </div>

          {/* Right Column: Card Stacking Track (Each card sticks and stacks as user scrolls) */}
          <div className="flex flex-col gap-8 lg:gap-12 pb-12">
            {pillars.map((pillar, idx) => {
              // Progressive sticky top offset creates the true card-stacking depth effect
              const topOffset = 110 + idx * 28;

              return (
                <div
                  key={pillar.title}
                  style={{ top: `${topOffset}px` }}
                  className={`lg:sticky rounded-[32px] sm:rounded-[36px] border border-slate-200/90 ${pillar.accentBg} p-8 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col justify-between`}
                >
                  {/* Top Stage Bar */}
                  <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 mb-6">
                    <span
                      className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${pillar.badgeColor}`}
                    >
                      {pillar.tag}
                    </span>
                    <span className="text-3xl sm:text-4xl font-serif italic font-black text-slate-300">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Card Content & Photography Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-7 flex flex-col">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-brand-navy)] tracking-tight mb-2">
                        {pillar.title}
                      </h3>
                      {/* <p className="text-xs sm:text-sm font-semibold text-[var(--color-brand-blue)] mb-4">
                        {pillar.subtitle}
                      </p> */}
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {pillar.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="flex flex-col gap-2.5">
                        {pillar.highlights.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs font-medium text-slate-700"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architectural Image View */}
                    <div className="sm:col-span-5 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-xs">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 300px"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
