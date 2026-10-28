"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What types of finance can Talukdar Finance help me explore?",
    answer:
      "We assist with residential mortgages (first home buyers, subsequent purchases, investment properties), refinancing and equity release, vehicle and car loans, personal loans, as well as commercial and business asset finance across a wide panel of Australian lenders.",
  },
  {
    question: "How does the finance application process work?",
    answer:
      "The process follows 4 clear stages: (1) Initial Discovery to understand your goals and current financial position, (2) Product & Policy Comparison across our lender network, (3) Document Preparation & Submission, and (4) Tracking your application through to formal approval and settlement.",
  },
  {
    question: "What information might I need to provide?",
    answer:
      "Typically, lenders require proof of identity (passport or driver's licence), recent payslips or tax returns (for self-employed borrowers), bank statements showing savings and expenses, and details of existing commitments or liabilities.",
  },
  {
    question: "Can I discuss my circumstances before making an application?",
    answer:
      "Yes, absolutely. We encourage an obligation-free initial consultation to discuss your scenario, assess your borrowing capacity, and understand your timeline before any formal credit inquiry is conducted.",
  },
  {
    question: "Are there fees associated with using a finance broker?",
    answer:
      "In the vast majority of standard residential and vehicle lending scenarios, our broker services do not incur an upfront fee to the client, as finance brokers are remunerated by the lender upon successful loan settlement. Any specific fees, if applicable for complex commercial scenarios, will be disclosed transparently upfront in your Credit Quote.",
  },
  {
    question: "How do I arrange an initial consultation?",
    answer:
      "You can complete our simple consultation form below, call our advisory desk directly at +61 (02) 8000 0000, or send an email to advisory@talukdarfinance.com.au. A specialist will get in touch within one business day.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

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

        {/* Accordion List */}
        <div className="flex flex-col divide-y divide-[var(--color-brand-border)] border-y border-[var(--color-brand-border)]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-5">
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
                      <p className="pt-3 text-sm sm:text-base text-[var(--color-brand-text-muted)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

