"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  Car,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  Calculator,
  Percent,
} from "lucide-react";
import { motion } from "motion/react";

const carBenefits = [
  {
    title: "$0 Upfront Cash Deposit",
    description:
      "Finance 100% of the vehicle purchase price with zero out-of-pocket deposit required for eligible applicants.",
    icon: CheckCircle2,
    badge: "Most Popular",
  },
  {
    title: "Fast 24-48h Pre-Approval",
    description:
      "Shop with confidence. Walk onto the dealership lot or negotiate private sales as a cash buyer in hand.",
    icon: Clock,
    badge: "Rapid Turnaround",
  },
  {
    title: "Skip Dealership Financing Markups",
    description:
      "Dealership finance often packs hidden commissions. We benchmark across 40+ Australian lenders for true wholesale rates.",
    icon: Percent,
    badge: "Direct Lender Rates",
  },
  {
    title: "New, Used & Business Utes",
    description:
      "Consumer personal car loans, commercial chattel mortgages, and novated lease structures tailored to your tax scenario.",
    icon: ShieldCheck,
    badge: "Flexible Terms",
  },
];

export function CarLoanFeatureSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#FBFBFA] border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#02376d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)] mb-4">
              <Car className="w-3.5 h-3.5" />
              <span>Drive Away Sooner • $0 Deposit Options</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-brand-navy)] tracking-tight leading-[1.12]">
              Specialist Car Finance Designed Around Your Terms
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
              Whether you are buying your family SUV, upgrading your work ute, or buying an EV, Talukdar Finance arranges tailored vehicle lending across top Australian banks and non-bank lenders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-800 text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all"
            >
              <Calculator className="w-4 h-4 text-[var(--color-brand-blue)]" />
              <span>Calculate Car Repayment</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs sm:text-sm font-bold shadow-md transition-all group"
            >
              <span>Get 24h Pre-Approval</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-brand-blue)] flex items-center justify-center group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-brand-navy)] mb-2 group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-blue)] group-hover:gap-2.5 transition-all">
                  <span>Explore loan terms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Banner / Quick Eligibility Pill */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[var(--color-brand-navy)] to-[#0c2a52] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Ready to finance your next car with $0 deposit?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Check borrowing eligibility with zero impact on your credit score.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="w-full md:w-auto text-center px-6 py-3 rounded-full bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#0B1528] text-xs sm:text-sm font-bold shadow-md hover:shadow-cyan-500/25 transition-all whitespace-nowrap"
          >
            Check My Eligibility
          </Link>
        </div>
      </Container>
    </section>
  );
}

