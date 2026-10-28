"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  Home,
  RefreshCw,
  TrendingUp,
  HardHat,
  Car,
  Briefcase,
  Wrench,
  Building,
  UserCheck,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import loanFacilitiesData from "@/data/loan-facilities.json";

export type LoanCategory = "all" | "residential" | "commercial" | "asset" | "personal";

export interface LoanFacilityRaw {
  id: string;
  category: "residential" | "commercial" | "asset" | "personal";
  iconName: string;
  title: string;
  badge?: string;
  description: string;
  features: string[];
  imageSrc: string;
  actionText: string;
}

// Icon dictionary to map JSON string names to actual Lucide component icons
const iconMap: Record<string, React.ElementType> = {
  Home,
  RefreshCw,
  TrendingUp,
  HardHat,
  Car,
  Wrench,
  Building,
  Briefcase,
  Layers,
  UserCheck,
  Sparkles,
  GraduationCap,
};

const categoryTabs: { id: LoanCategory; label: string }[] = [
  { id: "all", label: "All Loan Facilities (12)" },
  { id: "residential", label: "Home & Residential (6)" },
  { id: "commercial", label: "Commercial & Business (3)" },
  { id: "asset", label: "Car & Asset Finance (2)" },
  { id: "personal", label: "Personal Loans (1)" },
];

export function LoanSolutionsSection() {
  const [activeCategory, setActiveCategory] = React.useState<LoanCategory>("all");

  const filteredFacilities = React.useMemo(() => {
    const data = loanFacilitiesData as LoanFacilityRaw[];
    if (activeCategory === "all") return data;
    return data.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const scrollToConsultation = (facilityTitle: string) => {
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });

    const selectElem = document.getElementById("financeType") as HTMLSelectElement | null;
    if (selectElem) {
      const lower = facilityTitle.toLowerCase();
      if (lower.includes("car") || lower.includes("equipment")) {
        selectElem.value = "car-loan";
      } else if (lower.includes("commercial") || lower.includes("business")) {
        selectElem.value = "business-finance";
      } else if (lower.includes("personal")) {
        selectElem.value = "personal-loan";
      } else if (lower.includes("refinanc")) {
        selectElem.value = "refinance";
      } else {
        selectElem.value = "home-loan";
      }
    }
  };

  return (
    <Section id="solutions" background="white" spacing="lg">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col items-start gap-3 max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] border border-[var(--color-brand-blue)]/20">
              SOLUTIONS &amp; PATHWAYS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-brand-navy)]">
              Comprehensive Finance Facilities Across Australia
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-brand-text-muted)] leading-relaxed">
              Explore finance options custom-architected around your financial goals, property ambitions, and business growth milestones.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-brand-navy)] px-4 py-2 rounded-xl bg-[var(--color-brand-soft-blue)] border border-[var(--color-brand-border)] shrink-0 self-start md:self-end">
            <ShieldCheck className="h-4 w-4 text-[var(--color-brand-blue)]" />
            <span>Over 35+ Australian Lenders Panel</span>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none -mx-2 px-2">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[var(--color-brand-navy)] text-white shadow-sm"
                    : "bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-navy)] hover:bg-slate-200/80"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Loan Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          <AnimatePresence>
            {filteredFacilities.map((facility) => {
              const Icon = iconMap[facility.iconName] || Home;
              return (
                <motion.div
                  layout
                  key={facility.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  onClick={() => scrollToConsultation(facility.title)}
                  className="group cursor-pointer rounded-2xl border border-[var(--color-brand-border)] bg-white overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[var(--color-brand-blue)]/50 transition-all duration-300"
                >
                  <div>
                    {/* Facility Image with Overlay Header */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={facility.imageSrc}
                        alt={facility.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy)]/80 via-transparent to-transparent pointer-events-none" />

                      {/* Icon & Category Pill */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-white/95 backdrop-blur-md flex items-center justify-center text-[var(--color-brand-blue)] shadow-md">
                          <Icon className="h-5 w-5" />
                        </div>
                        {facility.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[var(--color-brand-navy)] shadow-sm">
                            {facility.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[var(--color-brand-navy)] group-hover:text-[var(--color-brand-blue)] transition-colors mb-2.5">
                        {facility.title}
                      </h3>
                      <p className="text-sm text-[var(--color-brand-text-muted)] leading-relaxed mb-4">
                        {facility.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 mb-2">
                        {facility.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-[var(--color-brand-text)]"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-blue)] mt-1.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[var(--color-brand-navy)] group-hover:text-[var(--color-brand-blue)] transition-colors">
                    <span>{facility.actionText}</span>
                    <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center shadow-xs group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-all">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[var(--color-brand-soft-blue)] border border-[var(--color-brand-border)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-[var(--color-brand-navy)]">
              Have a unique or complex lending scenario?
            </h4>
            <p className="text-sm text-[var(--color-brand-text-muted)]">
              We handle complex company trusts, self-employed tax returns, and non-standard collateral structures.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("consultation");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-xl bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-sm font-semibold transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            Request Scenario Assessment
          </button>
        </div>
      </Container>
    </Section>
  );
}
