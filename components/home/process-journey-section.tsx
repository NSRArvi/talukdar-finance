"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

interface JourneyStep {
  stepNumber: string;
  stageName: string;
  title: string;
  description: string;
  sublabel: string;
}

const journeySteps: JourneyStep[] = [
  {
    stepNumber: "1",
    stageName: "STAGE 01",
    title: "Tell Us Your Goals",
    description:
      "Share what you're looking to achieve and the type of finance you need in a confidential discussion.",
    sublabel: "Initial Discovery",
  },
  {
    stepNumber: "2",
    stageName: "STAGE 02",
    title: "Explore Your Options",
    description:
      "Discuss potential options based on your circumstances, borrowing capacity, and specific priorities.",
    sublabel: "Product Comparison",
  },
  {
    stepNumber: "3",
    stageName: "STAGE 03",
    title: "Prepare Your Application",
    description:
      "Understand the information and documentation needed for the next stage, structured smoothly with our guidance.",
    sublabel: "Document Checklist",
  },
  {
    stepNumber: "4",
    stageName: "STAGE 04",
    title: "Navigate Next Steps",
    description:
      "Receive guidance as your application progresses, subject to the lender's process, through to final settlement.",
    sublabel: "Settlement & Beyond",
  },
];

export function ProcessJourneySection() {
  return (
    <Section id="journey" background="white" spacing="lg">
      <Container size="default">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <Badge variant="primary">SIMPLE & TRANSPARENT</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-brand-navy)] mt-3 mb-2">
            Your Finance Journey, Made Clear
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-brand-text-muted)]">
            A straightforward process, with guidance along the way.
          </p>
        </div>

        {/* 4 Process Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {journeySteps.map((step, idx) => (
            <motion.div
              key={step.stageName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative rounded-2xl border border-[var(--color-brand-border)] bg-white p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Step Header: Circle Number + Stage Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-10 w-10 rounded-full bg-[var(--color-brand-navy)] text-white font-bold flex items-center justify-center text-base group-hover:bg-[var(--color-brand-blue)] transition-colors">
                    {step.stepNumber}
                  </div>
                  <span className="text-[11px] font-bold tracking-wider text-[var(--color-brand-blue)] uppercase">
                    {step.stageName}
                  </span>
                </div>

                {/* Step Title & Description */}
                <h3 className="text-lg font-bold text-[var(--color-brand-navy)] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-brand-text-muted)] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[var(--color-brand-navy)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-blue)]" />
                <span>{step.sublabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

