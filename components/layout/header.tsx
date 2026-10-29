"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
    href: "/solutions",
    label: "Solutions",
    subtitle: "Home, vehicle, personal & commercial",
    tag: "01",
  },
  {
    href: "/approach",
    label: "Approach",
    subtitle: "Advisory built around your goals",
    tag: "02",
  },
  {
    href: "/steps",
    label: "Steps",
    subtitle: "From discovery to settlement",
    tag: "03",
  },
  {
    href: "/about",
    label: "About",
    subtitle: "MFAA accredited finance specialist",
    tag: "04",
  },
  {
    href: "/faqs",
    label: "FAQs",
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
      setScrolled(window.scrollY > 10);
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
      {/* Permanent Sticky Top Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--color-brand-border)] bg-white/95 backdrop-blur-md shadow-sm py-2"
            : "border-b border-[var(--color-brand-border)]/60 bg-white/90 backdrop-blur-sm py-3"
        }`}
      >
        <Container size="default" className="flex items-center justify-between">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="relative h-10 w-[110px] sm:h-12 sm:w-[130px] shrink-0">
              <Image
                src="/tf-logo.png"
                alt="Talukdar Finance Logo"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 110px, 130px"
              />
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
              className="lg:hidden relative z-[60] h-10 w-10 rounded-xl border border-[var(--color-brand-border)] bg-white hover:bg-slate-50 flex items-center justify-center text-[var(--color-brand-navy)] transition-colors cursor-pointer shadow-sm active:scale-95 shrink-0"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[var(--color-brand-navy)] shrink-0" />
              ) : (
                <Menu className="h-6 w-6 text-[var(--color-brand-navy)] shrink-0" />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Light Full-Screen Mobile Menu Matching Navbar & Footer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-text)] flex flex-col justify-between pb-8 px-4 sm:px-6 lg:hidden overflow-y-auto overflow-x-hidden w-screen max-w-full"
          >
            {/* Top Bar inside Menu matching Header height to ensure Close Button is 100% visible */}
            <div className="flex items-center justify-between pb-4 pt-1 border-b border-[var(--color-brand-border)] mb-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="inline-block">
                <div className="relative h-9 w-[115px] shrink-0">
                  <Image
                    src="/tf-logo.png"
                    alt="Talukdar Finance Logo"
                    fill
                    priority
                    className="object-contain object-left"
                    sizes="115px"
                  />
                </div>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="h-10 w-10 rounded-xl border border-[var(--color-brand-border)] bg-white hover:bg-slate-50 flex items-center justify-center text-[var(--color-brand-navy)] transition-colors cursor-pointer shadow-sm active:scale-95 shrink-0"
              >
                <X className="h-6 w-6 text-[var(--color-brand-navy)]" />
              </button>
            </div>
            {/* Subtle Clean Ambient Highlights */}
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-64 h-64 bg-white/80 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col flex-1 max-w-md mx-auto w-full">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-brand-border)] mb-3">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
                  Navigation &amp; Services
                </span>
                <span className="text-[11px] font-semibold text-[var(--color-brand-text-muted)]">
                  Talukdar Finance
                </span>
              </div>

              {/* Navigation Links in Clean Light Style */}
              <nav className="flex flex-col gap-1.5 my-auto py-2 w-full">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.04 + idx * 0.04,
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between p-3.5"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <span className="text-xs font-mono font-bold text-[var(--color-brand-blue)] shrink-0">
                          {link.tag}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-base font-bold text-[var(--color-brand-navy)] group-hover:text-[var(--color-brand-blue)] transition-colors truncate">
                            {link.label}
                          </span>
                          <span className="text-[11px] sm:text-xs text-[var(--color-brand-text-muted)] font-normal truncate">
                            {link.subtitle}
                          </span>
                        </div>
                      </div>
                      <div className="h-7 w-7 rounded-full bg-[var(--color-brand-soft-blue)] group-hover:bg-[var(--color-brand-blue)] flex items-center justify-center text-[var(--color-brand-navy)] group-hover:text-white transition-all shrink-0">
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Light Advisory Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                className="mt-4 pt-4 border-t border-[var(--color-brand-border)] flex flex-col gap-3 w-full"
              >
                <div className="grid grid-cols-2 gap-2.5 w-full">
                  <a
                    href="tel:+61280000000"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[var(--color-brand-border)] hover:border-[var(--color-brand-blue)] transition-colors shadow-sm min-w-0"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] text-[var(--color-brand-text-muted)] uppercase font-semibold">
                        Call Directly
                      </span>
                      <span className="text-xs font-bold text-[var(--color-brand-navy)] truncate">
                        +61 2 8000
                      </span>
                    </div>
                  </a>

                  <a
                    href="mailto:advisory@talukdarfinance.com.au"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[var(--color-brand-border)] hover:border-[var(--color-brand-blue)] transition-colors shadow-sm min-w-0"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] text-[var(--color-brand-text-muted)] uppercase font-semibold">
                        Email Desk
                      </span>
                      <span className="text-xs font-bold text-[var(--color-brand-navy)] truncate">
                        advisory@
                      </span>
                    </div>
                  </a>
                </div>

                {/* Primary Consultation Action Button */}
                <button
                  type="button"
                  onClick={handleConsultationClick}
                  className="w-full h-12 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white font-bold text-sm tracking-wide shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Regulatory Trust Badge */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[var(--color-brand-text-muted)] pt-0.5 text-center">
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
