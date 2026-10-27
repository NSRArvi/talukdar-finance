"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Home, Car, UserCheck, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface LoanService {
  icon: React.ElementType;
  title: string;
  description: string;
  actionText: string;
}

const loanServices: LoanService[] = [
  {
    icon: Home,
    title: "Home Loans",
    description:
      "Explore finance options for your first home, next property, or refinancing needs.",
    actionText: "Explore Home Loans",
  },
  {
    icon: Car,
    title: "Car Loans",
    description:
      "Explore vehicle finance options for your next car or vehicle upgrade.",
    actionText: "Explore Car Loans",
  },
  {
    icon: UserCheck,
    title: "Personal Loans",
    description:
      "Explore borrowing options for eligible personal expenses and upcoming plans.",
    actionText: "Explore Personal Loans",
  },
  {
    icon: Briefcase,
    title: "Business Finance",
    description:
      "Explore finance solutions for business purchases, equipment, and growth.",
    actionText: "Explore Business Finance",
  },
];

export function LoanSolutionsSection() {
  const scrollToConsultation = () => {
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="solutions" background="white" spacing="md">
      <Container size="default">
        {/* Section Heading */}
        <div className="flex flex-col items-start gap-3 max-w-3xl mb-12">
          <Badge variant="primary">SOLUTIONS & PATHWAYS</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-brand-navy)]">
            Finance for Every Step Forward
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-brand-text-muted)]">
            Explore finance options designed around your goals and circumstances.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={scrollToConsultation}
                className="group cursor-pointer rounded-2xl border border-[var(--color-brand-border)] bg-white p-7 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--color-brand-blue)]/50"
              >
                <div>
                  {/* Icon badge */}
                  <div className="h-12 w-12 rounded-xl bg-[var(--color-brand-soft-blue)] flex items-center justify-center text-[var(--color-brand-blue)] mb-6 group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-brand-text-muted)] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-navy)] group-hover:text-[var(--color-brand-blue)] transition-colors pt-2 border-t border-slate-100">
                  <span>{service.actionText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

