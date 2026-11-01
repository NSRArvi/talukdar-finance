"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface JourneyStep {
  stepNumber: string;
  stageName: string;
  title: string;
  description: string;
  sublabel: string;
}

const journeySteps: JourneyStep[] = [
  {
    stepNumber: "01",
    stageName: "Stage 01",
    title: "Discovery & Goals",
    description:
      "A confidential discussion examining your borrowing needs, tax structure, and property timeline.",
    sublabel: "Initial Discovery",
  },
  {
    stepNumber: "02",
    stageName: "Stage 02",
    title: "Panel Comparison",
    description:
      "We compare borrowing capacity, assessment criteria, and rate margins across 40+ accredited lenders.",
    sublabel: "Policy Analysis",
  },
  {
    stepNumber: "03",
    stageName: "Stage 03",
    title: "Application Packaging",
    description:
      "We structure and package your documents to meet specific bank credit guidelines for faster approval.",
    sublabel: "Credit Submission",
  },
  {
    stepNumber: "04",
    stageName: "Stage 04",
    title: "Settlement & Review",
    description:
      "Direct coordination with bank assessors, conveyancers, and ongoing post-settlement rate reviews.",
    sublabel: "Ongoing Support",
  },
];

export function ProcessJourneySection() {
  return (
    <section id="journey" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <Container size="default">
        {/* Section Heading with Rounded Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-start max-w-2xl mb-14"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-[#FBFBFA] text-xs font-semibold text-slate-800 tracking-wider mb-5">
            The Process
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12]">
            Clear, Controlled &amp; Seamless
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Eliminating bank friction through a transparent four-stage progression from your initial consultation to final loan drawdown.
          </p>
        </motion.div>

        {/* 4 Rounded Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {journeySteps.map((step, idx) => (
            <motion.div
              key={step.stageName}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-8 sm:p-9 flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div>
                <div className="text-4xl sm:text-5xl font-black text-slate-300 group-hover:text-[var(--color-brand-blue)] transition-colors mb-6 font-serif italic">
                  {step.stepNumber}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)] mb-2">
                  {step.stageName}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-brand-navy)] tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{step.sublabel}</span>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[var(--color-brand-blue)] group-hover:border-[var(--color-brand-blue)] transition-colors shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
