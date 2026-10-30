"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Plus, Minus, Loader2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { FAQItem } from "@/types";

export function FAQSection() {
  const [faqs, setFaqs] = React.useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Load live FAQs from server API
  React.useEffect(() => {
    let active = true;

    async function loadFaqs() {
      try {
        setIsLoading(true);
        setErrorMsg(null);
        const res = await fetch("/api/faqs", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to load FAQs (${res.status})`);
        }

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
    <Section id="faqs" background="white" spacing="lg">
      <Container size="narrow">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-brand-navy)] mt-3 mb-2">
            Questions Before You Get Started?
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-brand-text-muted)]">
            Understand how Talukdar Finance works with you.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-soft-blue)] flex items-center justify-center text-[var(--color-brand-blue)]">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <p className="text-xs text-[var(--color-brand-text-muted)] font-medium">
              Loading frequently asked questions...
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !errorMsg && faqs.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-2 bg-[var(--color-brand-soft-blue)]/50 rounded-2xl border border-dashed border-slate-200">
            <HelpCircle className="w-7 h-7 text-slate-400" />
            <p className="text-xs font-semibold text-slate-600">
              No FAQs published yet.
            </p>
          </div>
        )}

        {/* Live Accordion List */}
        {!isLoading && !errorMsg && faqs.length > 0 && (
          <div className="flex flex-col divide-y divide-[var(--color-brand-border)] border-y border-[var(--color-brand-border)]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id || faq.question} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between gap-4 text-left font-semibold text-base sm:text-lg text-[var(--color-brand-navy)] hover:text-[var(--color-brand-blue)] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <div className="h-7 w-7 rounded-full bg-[var(--color-brand-soft-blue)] flex items-center justify-center shrink-0 text-[var(--color-brand-blue)]">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          transition: { duration: 0.25, ease: "easeInOut" },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: { duration: 0.2, ease: "easeInOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm sm:text-base text-[var(--color-brand-text-muted)] leading-relaxed pt-3 pr-8 whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}
