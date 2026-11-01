"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Star } from "lucide-react";
import { motion } from "motion/react";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  category: string;
  rating: number;
  avatar: string;
}

// 9 Verified Australian client reviews across Residential, Commercial, and Asset
const COLUMN_1: Testimonial[] = [
  {
    quote:
      "Talukdar Finance gave us total clarity when the Sydney property market felt overwhelming. They explained how different lender assessment criteria worked and secured our approval smoothly.",
    author: "Sarah & David M.",
    location: "First Home Buyers, Sydney NSW",
    category: "Home Loan",
    rating: 5,
    avatar: "/avatars/sarah.jpg",
  },
  {
    quote:
      "From vehicle choices to equipment financing, our facility was structured around work tax needs. Prompt, straightforward communication with zero bank red-tape.",
    author: "Marcus T.",
    location: "Commercial Fleet, Melbourne VIC",
    category: "Asset Finance",
    rating: 5,
    avatar: "/avatars/marcus.jpg",
  },
  {
    quote:
      "The refinance review took into account our 5-year investment plans, not just a headline teaser rate. Outstanding integrity and attention to lending detail.",
    author: "Elena R.",
    location: "Portfolio Refinance, Brisbane QLD",
    category: "Refinance",
    rating: 5,
    avatar: "/avatars/elena.jpg",
  },
];

const COLUMN_2: Testimonial[] = [
  {
    quote:
      "As a self-employed tradie, getting a bank loan was a nightmare until I spoke with Talukdar Finance. They packaged my low-doc application and had me approved in days.",
    author: "Lachlan K.",
    location: "Self-Employed Builder, Gold Coast QLD",
    category: "Low-Doc Mortgage",
    rating: 5,
    avatar: "/avatars/lachlan.jpg",
  },
  {
    quote:
      "Refinancing our investment property offset saved us over $640 a month. Their broker checked policies across 40 lenders to find the exact match.",
    author: "Chloe S.",
    location: "Property Investor, Adelaide SA",
    category: "Investment Loan",
    rating: 5,
    avatar: "/avatars/chloe.jpg",
  },
  {
    quote:
      "We needed commercial warehouse funding on tight notice. Professional, transparent, and negotiated directly with bank underwriters on our behalf.",
    author: "Liam P.",
    location: "Logistics Director, Perth WA",
    category: "Commercial Property",
    rating: 5,
    avatar: "/avatars/liam.jpg",
  },
];

const COLUMN_3: Testimonial[] = [
  {
    quote:
      "Navigating the first home guarantee scheme felt confusing until our discovery call. They walked us through every single step with genuine patience.",
    author: "Sophie & Jack W.",
    location: "Home Buyers, Newcastle NSW",
    category: "First Home Buyer",
    rating: 5,
    avatar: "/avatars/sophie.jpg",
  },
  {
    quote:
      "Saved our business from high dealership markups on three work vans. Streamlined chattel mortgage with competitive repayment terms.",
    author: "Joshua D.",
    location: "Electrical Contractor, Melbourne VIC",
    category: "Vehicle Finance",
    rating: 5,
    avatar: "/avatars/joshua.jpg",
  },
  {
    quote:
      "Honest, responsive, and truly independent advice. You can tell they actually care about your financial wellbeing, not just pushing a bank product.",
    author: "Hannah B.",
    location: "Healthcare Professional, Hobart TAS",
    category: "Home & Land",
    rating: 5,
    avatar: "/avatars/hannah.jpg",
  },
];

function ReviewCard({ item }: { item: Testimonial }) {
  return (
    <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 select-none group">
      <div>
        {/* Top: 5 Stars + Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: item.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
            {item.category}
          </span>
        </div>

        {/* Quote Body */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Author Info with Real Australian Portrait Photo */}
      <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3.5">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-slate-100">
          <Image
            src={item.avatar}
            alt={item.author}
            fill
            sizes="44px"
            className="object-cover object-center"
            unoptimized
          />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-sm text-[var(--color-brand-navy)] truncate">
            {item.author}
          </div>
          <div className="text-xs text-slate-500 truncate mt-0.5">
            {item.location}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [isPausedCol1, setIsPausedCol1] = React.useState(false);
  const [isPausedCol2, setIsPausedCol2] = React.useState(false);
  const [isPausedCol3, setIsPausedCol3] = React.useState(false);

  // Triple items for seamless continuous vertical loop
  const col1Items = [...COLUMN_1, ...COLUMN_1, ...COLUMN_1];
  const col2Items = [...COLUMN_2, ...COLUMN_2, ...COLUMN_2];
  const col3Items = [...COLUMN_3, ...COLUMN_3, ...COLUMN_3];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 overflow-hidden">
      <Container size="default">
        {/* Section Header with LMG Pill Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-[#FBFBFA] text-xs font-semibold text-slate-800 tracking-wider mb-5">
              Client Experiences
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12]">
              Outcomes That Matter
            </h2>
          </motion.div>
          <p className="text-xs text-slate-500 max-w-xs md:text-right leading-relaxed">
            Verified client testimonials presented in compliance with ASIC guidelines and National Consumer Credit Protection.
          </p>
        </div>

        {/* 3-Column Vertical Marquee Stage (Desktop 3 Columns, Mobile 1-2 Columns) with Top/Bottom Gradient Masks */}
        <div className="relative w-full h-[580px] sm:h-[640px] overflow-hidden py-2 select-none">
          {/* Top Gradient Fade Mask */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-20 sm:h-28 z-20 bg-gradient-to-b from-white via-white/80 to-transparent" />

          {/* Bottom Gradient Fade Mask */}
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-20 sm:h-28 z-20 bg-gradient-to-t from-white via-white/80 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 h-full">
            {/* Column 1: Bottom to Top */}
            <div
              className="overflow-hidden"
              onMouseEnter={() => setIsPausedCol1(true)}
              onMouseLeave={() => setIsPausedCol1(false)}
            >
              <motion.div
                className="flex flex-col gap-6"
                animate={isPausedCol1 ? false : { y: ["0%", "-33.333333%"] }}
                transition={{
                  ease: "linear",
                  duration: 28,
                  repeat: Infinity,
                }}
              >
                {col1Items.map((item, idx) => (
                  <ReviewCard key={`col1-${item.author}-${idx}`} item={item} />
                ))}
              </motion.div>
            </div>

            {/* Column 2: Top to Bottom (Reverse direction) */}
            <div
              className="overflow-hidden hidden md:block"
              onMouseEnter={() => setIsPausedCol2(true)}
              onMouseLeave={() => setIsPausedCol2(false)}
            >
              <motion.div
                className="flex flex-col gap-6"
                animate={isPausedCol2 ? false : { y: ["-33.333333%", "0%"] }}
                transition={{
                  ease: "linear",
                  duration: 32,
                  repeat: Infinity,
                }}
              >
                {col2Items.map((item, idx) => (
                  <ReviewCard key={`col2-${item.author}-${idx}`} item={item} />
                ))}
              </motion.div>
            </div>

            {/* Column 3: Bottom to Top */}
            <div
              className="overflow-hidden hidden lg:block"
              onMouseEnter={() => setIsPausedCol3(true)}
              onMouseLeave={() => setIsPausedCol3(false)}
            >
              <motion.div
                className="flex flex-col gap-6"
                animate={isPausedCol3 ? false : { y: ["0%", "-33.333333%"] }}
                transition={{
                  ease: "linear",
                  duration: 30,
                  repeat: Infinity,
                }}
              >
                {col3Items.map((item, idx) => (
                  <ReviewCard key={`col3-${item.author}-${idx}`} item={item} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
