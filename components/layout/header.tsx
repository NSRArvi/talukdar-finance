"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Mail,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  {
    href: "#solutions",
    label: "Solutions",
    subtitle: "Home, vehicle, personal & commercial",
    tag: "01",
  },
  {
    href: "#commitment",
    label: "Approach",
    subtitle: "Advisory built around your goals",
    tag: "02",
  },
  {
    href: "#journey",
    label: "Process",
    subtitle: "From discovery to settlement",
    tag: "03",
  },
  {
    href: "#about",
    label: "About",
    subtitle: "MFAA accredited finance specialist",
    tag: "04",
  },
  {
    href: "#faqs",
    label: "FAQ",
    subtitle: "Clear answers before you begin",
    tag: "05",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Lock body scroll when mobile menu is active
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConsultationClick = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--color-brand-border)] bg-white/95 backdrop-blur-md shadow-sm py-2"
            : "border-b border-transparent bg-white/90 backdrop-blur-sm py-3"
        }`}
      >
        <Container size="default" className="flex items-center justify-between">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group z-50">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-[var(--color-brand-navy)] flex items-center justify-center text-white font-bold text-lg sm:text-xl tracking-wider shadow-sm group-hover:bg-[var(--color-brand-blue)] transition-colors shrink-0">
              TF
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--color-brand-navy)] leading-tight truncate">
                Talukdar Finance
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-wide uppercase text-[var(--color-brand-text-muted)] truncate">
                Private Wealth &amp; Lending
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[var(--color-brand-text)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 hover:text-[var(--color-brand-blue)] transition-colors group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-brand-blue)] rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Quick Action / Phone CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 z-50 shrink-0">
            <a
              href="tel:+61280000000"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[var(--color-brand-navy)] hover:text-[var(--color-brand-blue)] px-3 py-2 rounded-lg transition-colors border border-[var(--color-brand-border)] bg-slate-50/80 hover:bg-white"
            >
              <Phone className="h-3.5 w-3.5 text-[var(--color-brand-blue)] shrink-0" />
              <span>+61 (02) 8000 0000</span>
            </a>

            <Button
              size="sm"
              onClick={handleConsultationClick}
              className="hidden md:inline-flex"
            >
              Book a Consultation
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-10 w-10 rounded-xl border border-[var(--color-brand-border)] bg-white/90 backdrop-blur-md flex items-center justify-center text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-soft-blue)] transition-colors cursor-pointer shadow-sm active:scale-95 shrink-0"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </header>

      {/* Full-Screen Premium Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[var(--color-brand-navy)] text-white flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 lg:hidden overflow-y-auto overflow-x-hidden w-screen max-w-full"
          >
            {/* Subtle Ambient Glow Background */}
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-[var(--color-brand-blue)]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col flex-1 max-w-md mx-auto w-full">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-[11px] font-bold tracking-widest uppercase text-blue-200">
                  Navigation &amp; Services
                </span>
                <span className="text-[11px] font-medium text-white/50">
                  Talukdar Finance
                </span>
              </div>

              {/* Navigation Links with Safe Staggered Entrance */}
              <nav className="flex flex-col gap-1 my-auto py-2 w-full">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 + idx * 0.04,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-2xl hover:bg-white/10 active:bg-white/15 transition-all duration-200 border border-transparent hover:border-white/10 w-full"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <span className="text-xs font-mono font-bold text-[var(--color-brand-blue)] group-hover:text-white transition-colors shrink-0">
                          {link.tag}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-base sm:text-lg font-bold text-white group-hover:text-blue-100 transition-colors truncate">
                            {link.label}
                          </span>
                          <span className="text-[11px] sm:text-xs text-blue-200/70 font-normal truncate">
                            {link.subtitle}
                          </span>
                        </div>
                      </div>
                      <div className="h-7 w-7 rounded-full bg-white/5 group-hover:bg-[var(--color-brand-blue)] flex items-center justify-center text-white/60 group-hover:text-white transition-all shrink-0">
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Premium Advisory Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
                className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3 w-full"
              >
                <div className="grid grid-cols-2 gap-2 w-full">
                  <a
                    href="tel:+61280000000"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors min-w-0"
                  >
                    <div className="h-7 w-7 rounded-lg bg-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
                      <Phone className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] text-blue-200/70 uppercase font-semibold">Direct Call</span>
                      <span className="text-[11px] font-bold text-white truncate">+61 2 8000</span>
                    </div>
                  </a>

                  <a
                    href="mailto:advisory@talukdarfinance.com.au"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors min-w-0"
                  >
                    <div className="h-7 w-7 rounded-lg bg-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
                      <Mail className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] text-blue-200/70 uppercase font-semibold">Email Desk</span>
                      <span className="text-[11px] font-bold text-white truncate">advisory@</span>
                    </div>
                  </a>
                </div>

                {/* Primary Consultation Action */}
                <button
                  type="button"
                  onClick={handleConsultationClick}
                  className="w-full h-11 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Regulatory Trust Badge */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-blue-200/80 pt-0.5 text-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-brand-blue)] shrink-0" />
                  <span>MFAA Accredited | Australian Credit Representative</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
