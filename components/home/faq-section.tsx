"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Plus, Minus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { FAQItem } from "@/types";

export function FAQSection() {
  const [faqs, setFaqs] = React.useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    async function loadFaqs() {
      try {
        setIsLoading(true);
        setErrorMsg(null);
        const res = await fetch("/api/faqs", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load FAQs (${res.status})`);
        const data = await res.json();
        if (active && Array.isArray(data.faqs)) {
          setFaqs(data.faqs);
        }
      } catch (err: unknown) {
        if (active) {
          const msg = err instanceof Error ? err.message : "Error loading FAQs";
          setErrorMsg(msg);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadFaqs();
    return () => {
      active = false;
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#FBFBFA] border-b border-slate-200">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Context */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* LMG Style Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 tracking-wider mb-5">
              Frequently Asked Questions
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12] mb-6">
              Clear Answers Before You Begin
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              Everything you need to know about our broker advisory model, fees, lender panel accreditation, and application requirements.
            </p>
            <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-sm w-full">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-navy)] mb-1">
                Have a unique question?
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Reach out to our broker team directly for tailored scenario advice.
              </p>
              <a
                href="#consultation"
                className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)] border-b border-[var(--color-brand-blue)] pb-0.5 inline-block"
              >
                Ask a Broker Directly →
              </a>
            </div>
          </motion.div>

          {/* Right Column: Rounded Accordion Cards Container */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {isLoading && (
              <div className="py-16 text-center rounded-3xl border border-slate-200 bg-white">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--color-brand-blue)] mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">Loading FAQs...</p>
              </div>
            )}

            {!isLoading && errorMsg && (
              <div className="p-6 text-sm text-red-600 rounded-2xl bg-red-50 border border-red-200">
                {errorMsg}
              </div>
            )}

            {!isLoading &&
              faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-bold text-[var(--color-brand-navy)] tracking-tight">
                        {faq.question}
                      </span>
                      <div className="shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 bg-white shadow-2xs">
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-7 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-[#FBFBFA]/60">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </section>
  );
}
