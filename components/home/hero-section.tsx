"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CategoryPill {
  id: string;
  label: string;
  thumb: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  image: string;
}

const pathways: CategoryPill[] = [
  {
    id: "residential",
    label: "Residential",
    thumb: "/screen.png",
    titlePrefix: "A better way to finance starts ",
    titleHighlight: "here.",
    description:
      "From first home buyers to seasoned property investors, Talukdar Finance provides clear options, competitive bank comparisons, and dedicated guidance across 40+ accredited lenders.",
    image: "/screen.png",
  },
  {
    id: "commercial",
    label: "Commercial",
    thumb: "/screen 3.png",
    titlePrefix: "Strategic funding for enterprise ",
    titleHighlight: "growth.",
    description:
      "Working capital, commercial property development, and structured equipment facilities designed to protect cash flow and scale your business.",
    image: "/screen 3.png",
  },
  {
    id: "asset",
    label: "Asset Finance",
    thumb: "/screen 2.png",
    titlePrefix: "Drive forward with transparent ",
    titleHighlight: "clarity.",
    description:
      "Avoid dealership markups. Fast 24-48h pre-approvals for motor vehicles, yellow goods, and business machinery with flexible chattel mortgages.",
    image: "/screen 2.png",
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);

  // Exact 4-second autoplay loop
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pathways.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeData = pathways[currentIndex];

  const scrollToConsultation = () => {
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSolutions = () => {
    const el = document.getElementById("solutions");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#FBFBFA] pt-3 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 overflow-hidden">
      {/* Outer Rounded Billboard Container with Fixed Constant Height */}
      <div
        className="relative w-full max-w-7xl mx-auto rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#0B1528] via-[#0F224A] to-[#1E3A8A] text-white overflow-hidden shadow-2xl h-[680px] sm:h-[720px] lg:h-[660px] flex flex-col justify-between"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Ambient Grain & Light Bloom */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
          {/* Left Column: Fixed Layout with Constant Heights for zero layout shift */}
          <div className="lg:col-span-7 p-8 sm:p-14 lg:p-16 flex flex-col justify-between z-10 h-full">
            {/* Top Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-cyan-200 w-fit">
                <span>Talukdar Finance • FBAA Accredited</span>
              </div>
            </div>

            {/* Middle Section: Fixed Headline & Button Heights */}
            <div className="py-2 flex flex-col justify-center">
              {/* Headline Container with Fixed Min Height to guarantee identical height */}
              <div className="h-[140px] sm:h-[180px] lg:h-[190px] flex items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h1
                    key={`hero-title-${activeData.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] text-white"
                  >
                    {activeData.titlePrefix}
                    <span className="text-[#38BDF8] inline-block">
                      {activeData.titleHighlight}
                    </span>
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* Action Buttons: Pill CTA + Text Link */}
              <div className="flex flex-wrap items-center gap-6 mt-12 sm:mt-16">
                <button
                  type="button"
                  onClick={scrollToConsultation}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#0B1528] text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyan-500/25 group"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={scrollToSolutions}
                  className="text-sm sm:text-base font-semibold text-white/90 hover:text-white underline underline-offset-8 decoration-white/40 hover:decoration-white transition-colors cursor-pointer"
                >
                  Book a consultation
                </button>
              </div>
            </div>

            {/* Bottom Descriptive Caption Container with Fixed Height */}
            <div className="pt-4 border-t border-white/10 max-w-lg h-[80px] sm:h-[75px] flex items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`hero-desc-${activeData.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 sm:line-clamp-2"
                >
                  {activeData.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Organic Cutout Photo Window (Identical Fixed Height on All Slides) */}
          <div className="lg:col-span-5 relative flex items-center justify-end p-4 sm:p-6 lg:p-0 h-full">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-full overflow-hidden lg:rounded-l-[180px] rounded-[24px] lg:rounded-r-none border-4 sm:border-8 border-white/10 lg:border-r-0 bg-slate-900 shadow-2xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`hero-img-${activeData.id}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeData.image}
                    alt={activeData.label}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 550px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528]/80 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Floating Category Switcher Pills */}
        <div className="relative lg:absolute lg:bottom-6 lg:right-8 z-30 p-4 lg:p-0 flex flex-wrap items-center justify-center lg:justify-end gap-2.5 sm:gap-3 bg-[#0B1528]/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border-t lg:border-t-0 border-white/10">
          {pathways.map((pathway, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={pathway.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md ${
                  isActive
                    ? "bg-white text-[#0B1528] scale-105 shadow-xl font-bold ring-2 ring-[#38BDF8]"
                    : "bg-white/90 hover:bg-white text-slate-800 hover:text-black"
                }`}
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <Image
                    src={pathway.thumb}
                    alt={pathway.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{pathway.label}</span>
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? "text-[#0B1528] translate-x-0.5" : "text-slate-400"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
