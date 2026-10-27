"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  Car,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Shield,
  Handshake,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSlide {
  id: string;
  tabLabel: string;
  tabIcon: React.ElementType;
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  bulletText: string;
  imageSrc: string;
  imageAlt: string;
  topBadge: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
  };
  bottomCard: {
    tag: string;
    subtag: string;
    title: string;
    progressWidth: string;
  };
  floatingPill: {
    icon?: React.ElementType;
    showPing?: boolean;
    text: string;
  };
}

const heroSlides: HeroSlide[] = [
  {
    id: "residential",
    tabLabel: "Residential & Property",
    tabIcon: HomeIcon,
    badgeText: "FINANCE, MADE PERSONAL",
    titlePrefix: "Your Next Chapter Starts With the ",
    titleHighlight: "Right Finance.",
    description:
      "Whether you're buying your first home, upgrading your car, or planning your next big move, Talukdar Finance helps you explore your options with clear, personalised guidance.",
    bulletText: "Personal guidance. Clear options. Support at every step.",
    imageSrc: "/screen.png",
    imageAlt: "Residential Property and Family Finance Consultation",
    topBadge: {
      icon: CheckCircle2,
      title: "Your goals, your options",
      subtitle: "Tailored borrowing structure",
    },
    bottomCard: {
      tag: "FINANCE JOURNEY",
      subtag: "Step 1 of 4",
      title: "Stage 01: Strategy & Options",
      progressWidth: "w-1/3",
    },
    floatingPill: {
      showPing: true,
      text: "Personalised guidance",
    },
  },
  {
    id: "vehicle",
    tabLabel: "Car & Asset Finance",
    tabIcon: Car,
    badgeText: "TRANSPARENT VEHICLE FINANCE",
    titlePrefix: "Drive Forward With ",
    titleHighlight: "Confidence & Clarity.",
    description:
      "From family upgrades to tailored business vehicle finance, we navigate dealer offers, competitive rates, and seamless settlement so you can take the wheel sooner.",
    bulletText:
      "Fast pre-approvals. Transparent dealer negotiation. Zero hidden costs.",
    imageSrc: "/screen 2.png",
    imageAlt: "Vehicle and Asset Finance Solutions",
    topBadge: {
      icon: Car,
      title: "Vehicle Finance Structure",
      subtitle: "Consumer & Chattel Mortgage",
    },
    bottomCard: {
      tag: "FAST TURNAROUND",
      subtag: "24-48 Hours",
      title: "Streamlined Pre-Approval",
      progressWidth: "w-4/5",
    },
    floatingPill: {
      icon: Shield,
      text: "No Dealer Markup Trap",
    },
  },
  {
    id: "business",
    tabLabel: "Business & Commercial",
    tabIcon: Briefcase,
    badgeText: "STRATEGIC ADVISORY",
    titlePrefix: "Empowering Australian ",
    titleHighlight: "Enterprise & Growth.",
    description:
      "Tailored cash flow solutions, commercial property funding, and capital expansion facilities structured to support your business ambitions and tax-effective goals.",
    bulletText: "Commercial facilities. Equipment leasing. Custom terms.",
    imageSrc: "/screen 3.png",
    imageAlt: "Commercial and Business Finance Advisory",
    topBadge: {
      icon: Check,
      title: "Working Capital & Equipment",
      subtitle: "Scalable cash flow facilities",
    },
    bottomCard: {
      tag: "ASSET STRUCTURE",
      subtag: "Bespoke",
      title: "Commercial Portfolio Strategy",
      progressWidth: "w-full",
    },
    floatingPill: {
      icon: Handshake,
      text: "Direct Broker Relationship",
    },
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [isPaused, setIsPaused] = React.useState(false);

  const nextSlide = React.useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = React.useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const scrollToConsultation = () => {
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSolutions = () => {
    const el = document.getElementById("solutions");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const activeSlide = heroSlides[currentSlide];

  return (
    <section
      id="hero-slider-section"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[var(--color-brand-soft-blue)]/50 to-white pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pb-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container size="default">
        {/* Pathway Tabs & Slide Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-brand-border)] mb-6 sm:mb-8">
          {/* Pathway Tabs with horizontal scroll on mobile */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto -mx-1 px-1">
            {heroSlides.map((slide, idx) => {
              const TabIcon = slide.tabIcon;
              const isActive = currentSlide === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`relative inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-300 cursor-pointer shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-navy)] bg-[var(--color-brand-soft-blue)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 rounded-full bg-[var(--color-brand-navy)] shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <TabIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 relative z-10" />
                  <span className="relative z-10">{slide.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Slide Navigation Arrows & Numeric Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--color-brand-text-muted)]">
              <span className="text-[var(--color-brand-blue)] font-bold text-sm">
                0{currentSlide + 1}
              </span>
              <span>/</span>
              <span>0{heroSlides.length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous Slide"
                onClick={prevSlide}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[var(--color-brand-border)] bg-white hover:bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-navy)] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next Slide"
                onClick={nextSlide}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[var(--color-brand-border)] bg-white hover:bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-navy)] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stable 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start gap-4 sm:gap-6 z-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`badge-${activeSlide.id}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3 }}
              >
                <Badge variant="primary" size="md">
                  {activeSlide.badgeText}
                </Badge>
              </motion.div>
            </AnimatePresence>

            <div className="min-h-0 sm:min-h-[120px] lg:min-h-[140px] flex items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h1
                  key={`title-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-brand-navy)] leading-[1.12]"
                >
                  {activeSlide.titlePrefix}
                  <span className="text-[var(--color-brand-blue)]">
                    {activeSlide.titleHighlight}
                  </span>
                </motion.h1>
              </AnimatePresence>
            </div>

            <div className="min-h-0 sm:min-h-[60px] lg:min-h-[70px] flex items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`desc-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
                  className="text-base sm:text-lg text-[var(--color-brand-text-muted)] max-w-xl leading-relaxed"
                >
                  {activeSlide.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={scrollToConsultation}
                className="w-full sm:w-auto"
              >
                Book a Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToSolutions}
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Explore Loan Options
              </Button>
            </div>

            {/* Bullet */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-brand-text-muted)] font-medium pt-2 border-t border-[var(--color-brand-border)] w-full">
              <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-blue)] shrink-0" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`bullet-${activeSlide.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSlide.bulletText}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Visual Stage */}
          <div className="lg:col-span-6 relative flex justify-center mt-4 sm:mt-6 lg:mt-0 pb-6 sm:pb-0">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Decorative background glow */}
              <div className="absolute -top-6 -right-6 w-64 sm:w-80 h-64 sm:h-80 bg-[var(--color-brand-blue)]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Fixed-Dimension Image Stage */}
              <div className="relative rounded-[20px] sm:rounded-[22px] overflow-hidden shadow-xl sm:shadow-2xl border border-[var(--color-brand-border)] aspect-[4/3] sm:aspect-[16/11] bg-slate-900">
                {heroSlides.map((slide, idx) => {
                  const isCurrent = currentSlide === idx;
                  return (
                    <motion.div
                      key={slide.id}
                      initial={false}
                      animate={{
                        opacity: isCurrent ? 1 : 0,
                        scale: isCurrent ? 1 : 1.05,
                        x: isCurrent ? 0 : direction * 15,
                        zIndex: isCurrent ? 2 : 1,
                      }}
                      transition={{
                        duration: 0.65,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      className="absolute inset-0 w-full h-full"
                      style={{
                        pointerEvents: isCurrent ? "auto" : "none",
                      }}
                    >
                      <Image
                        src={slide.imageSrc}
                        alt={slide.imageAlt}
                        fill
                        priority={idx === 0}
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 560px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy)]/40 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Top Badge Card */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`top-badge-${activeSlide.id}`}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-3 sm:-top-4 -right-1 sm:right-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 shadow-lg sm:shadow-xl border border-[var(--color-brand-border)] flex items-center gap-2.5 sm:gap-3 max-w-[210px] sm:max-w-[260px]"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--color-brand-soft-blue)] flex items-center justify-center shrink-0 text-[var(--color-brand-blue)]">
                    <activeSlide.topBadge.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] sm:text-xs font-semibold text-[var(--color-brand-navy)] truncate">
                      {activeSlide.topBadge.title}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[var(--color-brand-text-muted)] truncate">
                      {activeSlide.topBadge.subtitle}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Journey Progress Card */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`bottom-card-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 14, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-4 sm:-bottom-6 -left-1 sm:left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg sm:shadow-xl border border-[var(--color-brand-border)] max-w-[230px] sm:max-w-[280px] w-full"
                >
                  <div className="flex items-center justify-between mb-1 text-[10px] sm:text-[11px] font-semibold">
                    <span className="text-[var(--color-brand-blue)] uppercase tracking-wider">
                      {activeSlide.bottomCard.tag}
                    </span>
                    <span className="text-[var(--color-brand-text-muted)]">
                      {activeSlide.bottomCard.subtag}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-[var(--color-brand-navy)] mb-1.5 sm:mb-2 truncate">
                    {activeSlide.bottomCard.title}
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`h-full bg-[var(--color-brand-blue)] rounded-full ${activeSlide.bottomCard.progressWidth}`}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Floating Pill - Bottom Right */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`floating-pill-${activeSlide.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="hidden md:flex absolute bottom-8 -right-4 z-20 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-[var(--color-brand-border)] items-center gap-2"
                >
                  {activeSlide.floatingPill.showPing ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-blue)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-brand-blue)]" />
                    </span>
                  ) : (
                    activeSlide.floatingPill.icon && (
                      <activeSlide.floatingPill.icon className="h-4 w-4 text-[var(--color-brand-blue)]" />
                    )
                  )}
                  <span className="text-xs font-semibold text-[var(--color-brand-navy)]">
                    {activeSlide.floatingPill.text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Slider Indicator Progress Bar Line */}
        <div className="w-full flex items-center gap-2 mt-8 sm:mt-12 pt-2 sm:pt-4">
          {heroSlides.map((_, idx) => {
            const isCurrent = currentSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Jump to slide ${idx + 1}`}
                onClick={() => goToSlide(idx)}
                className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden relative cursor-pointer"
              >
                {isCurrent && (
                  <motion.div
                    layoutId="sliderIndicatorLine"
                    className="absolute inset-0 bg-[var(--color-brand-blue)] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

