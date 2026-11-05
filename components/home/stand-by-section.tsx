"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StandByPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  image: string;
}

const pillars: StandByPillar[] = [
  {
    number: "01",
    title: "Save You Time",
    subtitle: "We handle the legwork, policy analysis, and bank paperwork.",
    description:
      "Comparing 40+ lenders yourself is a full-time job. We streamline documentation, calculate accurate borrowing capacities, and manage back-and-forth bank queries directly.",
    badge: "Fast-Track Approval",
    image: "/The Promises We Make to You/Save You Time.png",
  },
  {
    number: "02",
    title: "Keep You Safe",
    subtitle: "FBAA accredited standards and clear, transparent advice.",
    description:
      "No confusing bank jargon, no hidden commission bias. We present verified lending comparisons and explain all terms in plain, straightforward language.",
    badge: "Consumer Protection",
    image: "/The Promises We Make to You/Keep You Safe.png",
  },
  {
    number: "03",
    title: "Diverse Lender Options",
    subtitle: "Residential, commercial, vehicle, and specialist credit under one roof.",
    description:
      "Whether you need a prime home mortgage, self-employed low-doc loan, SMSF financing, or business cashflow facility, we unlock multiple lending pathways.",
    badge: "40+ Bank Access",
    image: "/The Promises We Make to You/Diverse Lender Options.png",
  },
  {
    number: "04",
    title: "Lifetime Partnership",
    subtitle: "Guidance that extends well beyond loan settlement.",
    description:
      "When market interest rates shift, we review your loan regularly to ensure your terms remain competitive over the life of your facility.",
    badge: "Ongoing Loan Reviews",
    image: "/The Promises We Make to You/Lifetime Partnership.png",
  },
];

export function StandBySection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 overflow-hidden">
      <Container size="default">
        {/* Section Header with LMG Pill Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* LMG Style Rounded Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-[#FBFBFA] text-xs font-semibold text-slate-800 tracking-wider mb-5">
              What We Stand By
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12]">
              The Promises We Make to You
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              We&apos;re promise makers, not promise breakers. Everything we do is designed to help you secure the right finance with confidence and clarity.
            </p>
          </motion.div>

          {/* Horizontal Scroll Rounded Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollLeft}
              className="p-3.5 rounded-full border border-slate-300 hover:border-slate-900 text-slate-800 transition-colors bg-white shadow-xs hover:shadow-md cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3.5 rounded-full border border-slate-300 hover:border-slate-900 text-slate-800 transition-colors bg-white shadow-xs hover:shadow-md cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Rail with Rounded Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="snap-start shrink-0 w-[320px] sm:w-[420px] lg:w-[460px] rounded-3xl border border-slate-200/90 bg-[#FBFBFA] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
            >
              {/* Rounded Image Stage */}
              <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-100">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 320px, 460px"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-[var(--color-brand-navy)] shadow-xs">
                  {pillar.badge}
                </div>
                <div className="absolute top-4 left-4 text-3xl font-black text-white/95 drop-shadow-md">
                  {pillar.number}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-brand-navy)] tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--color-brand-blue)] mt-2">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-[var(--color-brand-navy)]">
                  <span>Talukdar Finance Guarantee</span>
                  <span className="text-[var(--color-brand-blue)] font-bold">Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
