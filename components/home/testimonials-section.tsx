"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { motion } from "motion/react";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Talukdar Finance gave us clarity when the home buying market felt overwhelming. They explained how different lender requirements worked and supported us through each step.",
    author: "Sarah & David M.",
    location: "First Home Buyers, Sydney",
    rating: 5,
  },
  {
    quote:
      "From vehicle choices to equipment financing, the structure was tailored to our work needs. Prompt, straightforward communication with zero fuss.",
    author: "Marcus T.",
    location: "Vehicle & Equipment Upgrade, Melbourne",
    rating: 5,
  },
  {
    quote:
      "The refinance review took into account our longer-term plans, not just the upfront headline rate. We appreciated the integrity and thorough attention to detail.",
    author: "Elena R.",
    location: "Property Refinancing, Brisbane",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <Section background="white" spacing="lg">
      <Container size="default">
        {/* Header & ASIC Regulatory Note */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col items-start gap-2 max-w-xl">
            <Badge variant="neutral">CLIENT PERSPECTIVES (PLACEHOLDER COPY FOR REVIEW)</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-brand-navy)] mt-2">
              Experiences That Matter
            </h2>
          </div>
          <p className="text-xs text-[var(--color-brand-text-muted)] max-w-xs md:text-right leading-relaxed">
            Client testimonials will be published upon verified collection in accordance with ASIC regulatory standards.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="rounded-2xl border border-[var(--color-brand-border)] bg-white p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-[var(--color-brand-text)] italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Attribution */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-sm font-bold text-[var(--color-brand-navy)]">
                  {item.author}
                </div>
                <div className="text-xs text-[var(--color-brand-text-muted)] mt-0.5">
                  {item.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

