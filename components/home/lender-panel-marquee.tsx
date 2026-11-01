"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";

interface Lender {
  name: string;
  logo: string;
}

// Row 1: Featured Top Australian Lenders & Banks (matching LMG reference)
const LENDERS_ROW_1: Lender[] = [
  { name: "ANZ Bank", logo: "/lenders/anz.svg" },
  { name: "AMP", logo: "/lenders/amp.svg" },
  { name: "Commonwealth Bank", logo: "/lenders/cba.svg" },
  { name: "Thinktank", logo: "/lenders/thinktank.svg" },
  { name: "Resimac", logo: "/lenders/resimac.svg" },
  { name: "Pepper Money", logo: "/lenders/pepper.svg" },
  { name: "Macquarie Bank", logo: "/lenders/macquarie.svg" },
  { name: "Westpac", logo: "/lenders/westpac.svg" },
];

// Row 2: Regional, Mutual & Specialist Lenders (matching LMG reference)
const LENDERS_ROW_2: Lender[] = [
  { name: "BankSA", logo: "/lenders/banksa.svg" },
  { name: "BCU Bank", logo: "/lenders/bcu.svg" },
  { name: "Bendigo Bank", logo: "/lenders/bendigo.svg" },
  { name: "Beyond Bank Australia", logo: "/lenders/beyondbank.svg" },
  { name: "Credit Union SA", logo: "/lenders/creditunionsa.svg" },
  { name: "Apollo Financial", logo: "/lenders/apollo.svg" },
  { name: "National Australia Bank", logo: "/lenders/nab.svg" },
  { name: "ING", logo: "/lenders/ing.svg" },
];

function LenderCard({ lender }: { lender: Lender }) {
  return (
    <div
      title={lender.name}
      className="shrink-0 w-60 sm:w-72 lg:w-80 h-28 sm:h-32 bg-white border-r border-slate-200/80 flex items-center justify-center px-8 sm:px-10 cursor-default select-none group transition-colors duration-200 hover:bg-slate-50/50"
    >
      <div className="relative w-full h-14 sm:h-16 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Image
          src={lender.logo}
          alt={`${lender.name} logo`}
          fill
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 290px, 320px"
          className="object-contain"
          unoptimized
          priority
        />
      </div>
    </div>
  );
}

export function LenderPanelMarquee() {
  const [isPausedRow1, setIsPausedRow1] = React.useState(false);
  const [isPausedRow2, setIsPausedRow2] = React.useState(false);

  // Quadruple items to create infinite looping grid cells
  const row1Items = [
    ...LENDERS_ROW_1,
    ...LENDERS_ROW_1,
    ...LENDERS_ROW_1,
    ...LENDERS_ROW_1,
  ];
  const row2Items = [
    ...LENDERS_ROW_2,
    ...LENDERS_ROW_2,
    ...LENDERS_ROW_2,
    ...LENDERS_ROW_2,
  ];

  return (
    <section className="relative py-14 sm:py-20 bg-[#FBFBFA] border-y border-slate-200/90 overflow-hidden">
      <Container size="default">
        {/* Subtle, Sophisticated Header (LMG design philosophy) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <p className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 tracking-wider mb-6 sm:mb-8">
            The Industry’s Most Diverse Panel
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
            Over 40+ Accredited Australian Lenders
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl leading-relaxed">
            From the big four to boutique non-bank specialists, we connect you
            with Australia&apos;s most extensive lender panel — giving you more
            choice and competitive deals.
          </p>
        </div>
      </Container>

      {/* Grid Border Marquee Container (Identical to LMG Architecture) */}
      <div className="relative w-full overflow-hidden border-t border-b border-slate-200/80 bg-white">
        {/* Left Gradient Edge Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 z-20 bg-gradient-to-r from-[#FBFBFA] via-[#FBFBFA]/70 to-transparent" />

        {/* Right Gradient Edge Fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 z-20 bg-gradient-to-l from-[#FBFBFA] via-[#FBFBFA]/70 to-transparent" />

        {/* Row 1: Left to Right movement (Top Grid Row with Bottom Border) */}
        <div
          className="overflow-hidden border-b border-slate-200/80"
          onMouseEnter={() => setIsPausedRow1(true)}
          onMouseLeave={() => setIsPausedRow1(false)}
        >
          <motion.div
            className="flex w-max"
            animate={isPausedRow1 ? false : { x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 38,
              repeat: Infinity,
            }}
          >
            {row1Items.map((lender, idx) => (
              <LenderCard key={`row1-${lender.name}-${idx}`} lender={lender} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left movement (Bottom Grid Row) */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPausedRow2(true)}
          onMouseLeave={() => setIsPausedRow2(false)}
        >
          <motion.div
            className="flex w-max"
            animate={isPausedRow2 ? false : { x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
          >
            {row2Items.map((lender, idx) => (
              <LenderCard key={`row2-${lender.name}-${idx}`} lender={lender} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
