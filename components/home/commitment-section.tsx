"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, FileText, LifeBuoy, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface CommitmentPillar {
  icon: React.ElementType;
  title: string;
  description: string;
}

const pillars: CommitmentPillar[] = [
  {
    icon: User,
    title: "Guidance That Starts With You",
    description:
      "Understand the client's goals and circumstances before exploring suitable options. No one-size-fits-all assumptions.",
  },
  {
    icon: FileText,
    title: "Clear, Informed Decisions",
    description:
      "Explain the process and available options in straightforward language, eliminating bank jargon so you can proceed with confidence.",
  },
  {
    icon: LifeBuoy,
    title: "Support Through the Journey",
    description:
      "Help clients understand the application process and the steps that follow, staying responsive and proactive at each milestone.",
  },
];

export function CommitmentSection() {
  const scrollToAbout = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="commitment" background="soft" spacing="lg">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5 flex flex-col items-start gap-5">
            <Badge variant="navy">OUR COMMITMENT</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-brand-navy)] leading-tight">
              A More Personal Approach to Finance
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-brand-text-muted)] leading-relaxed">
              Finance decisions can feel complicated. Talukdar Finance aims to make the journey easier to understand by listening to your needs, explaining your options, and helping you navigate the next steps.
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={scrollToAbout}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Get to Know Us
              </Button>
            </div>
          </div>

          {/* Right Column: 3 Pillars Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.12 }}
                  className="rounded-2xl border border-[var(--color-brand-border)] bg-white p-6 sm:p-7 flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 rounded-xl bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-brand-navy)] mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[var(--color-brand-text-muted)] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

