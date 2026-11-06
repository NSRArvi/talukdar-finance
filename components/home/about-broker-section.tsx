"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function AboutBrokerSection() {
  const scrollToConsultation = () => {
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FBFBFA] border-b border-slate-200">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Professional Broker Portrait with Rounded 3xl Frame */}
          <div className="lg:col-span-5 relative aspect-[4/5] sm:min-h-[500px] rounded-[32px] sm:rounded-[40px] border border-slate-200/90 overflow-hidden shadow-xl">
            <Image
              src="/Mantasha.jpeg"
              alt="Talukdar Finance Principal Mortgage & Finance Specialist"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-5 shadow-lg">
              <h3 className="text-xl font-bold text-[var(--color-brand-navy)]">
                Mantasha Alam Tonni
              </h3>
              <p className="text-xs font-semibold text-[var(--color-brand-blue)] mt-0.5 tracking-wider uppercase">
                Director &amp; Mortgage Broker
              </p>
            </div>
          </div>

          {/* Right: Personal Advisory Pitch & Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* LMG Style Pill Badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 tracking-wider mb-5">
                About Talukdar Finance
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12] mb-6">
                Direct Conversations. <br />
                Tailored Guidance.
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                At Talukdar Finance, we believe a great lending outcome begins with understanding your individual life goals. We eliminate bank red-tape, negotiate policy exceptions, and advocate strictly on your behalf.
              </p>

              {/* Rounded Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Regulatory Licensing
                  </div>
                  <div className="text-sm font-bold text-[var(--color-brand-navy)]">
                    MMA GLOBAL PTY LIMITED
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Trading as Talukder Finance (Since 2021)
                  </div>
                  <div className="text-xs font-bold text-[var(--color-brand-blue)] mt-2">
                    ACR: 567708 • ACL: 577112
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Industry Memberships
                  </div>
                  <div className="text-sm font-bold text-[var(--color-brand-navy)]">
                    FBAA Member &amp; ASIC Regulated
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Cert IV FMB | AML/CTF | BID Compliant
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 mt-2">
                    • 100% Best-Interests Duty Governed
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              <button
                type="button"
                onClick={scrollToConsultation}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl group"
              >
                <span>Book Direct Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
