"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, Home, Car, Percent, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export function CalculatorHeroBanner() {
  const scrollToCalculator = () => {
    const el = document.getElementById("calculator-tool");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToConsultation = () => {
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#FBFBFA] pt-4 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 overflow-hidden">
      {/* Outer LMG-Style Billboard Canvas */}
      <div className="relative w-full max-w-7xl mx-auto rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#0B1528] via-[#0F224A] to-[#1E3A8A] text-white overflow-hidden shadow-2xl min-h-[500px] sm:min-h-[540px] flex flex-col justify-between">
        {/* Glow & Bloom Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 p-8 sm:p-14 lg:p-16 flex flex-col justify-between z-10">
            <div>
              {/* LMG Style Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-cyan-200 mb-6">
                <span>Australian Financial Calculators</span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-4xl sm:text-6xl lg:text-[62px] font-extrabold tracking-tight leading-[1.08] text-white mb-6"
              >
                Calculate repayments with confidence &amp;{" "}
                <span className="text-[#38BDF8] inline-block">clarity.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8"
              >
                Model your home loan or vehicle repayments, test extra contribution savings, and compare weekly, fortnightly, and monthly amortisation schedules grounded in Australian banking standards.
              </motion.p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={scrollToCalculator}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#0B1528] text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyan-500/25 group"
                >
                  <span>Use Calculator</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={scrollToConsultation}
                  className="text-sm sm:text-base font-semibold text-white/90 hover:text-white underline underline-offset-8 decoration-white/40 hover:decoration-white transition-colors cursor-pointer"
                >
                  Speak to an accredited broker
                </button>
              </div>
            </div>

            {/* Bottom Highlights Bar */}
            <div className="pt-8 border-t border-white/10 mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-[#38BDF8]" />
                <span>Moneysmart Formula Grounded</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#38BDF8]" />
                <span>$0 Deposit Car Finance</span>
              </div>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-[#38BDF8]" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Right Column: Organic Cutout Photo Window */}
          <div className="lg:col-span-5 relative flex items-center justify-end p-4 sm:p-6 lg:p-0 h-full">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-full lg:min-h-[500px] overflow-hidden lg:rounded-l-[180px] rounded-[24px] lg:rounded-r-none border-4 sm:border-8 border-white/10 lg:border-r-0 bg-slate-900 shadow-2xl">
              <Image
                src="/Calculate repayments with confidence & clarity.png"
                alt="Talukdar Finance Repayment Calculators"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 550px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

