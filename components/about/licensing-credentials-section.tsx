"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { ShieldCheck, FileCheck2, Scale, Building2 } from "lucide-react";
import { motion } from "motion/react";

export function LicensingCredentialsSection() {
  return (
    <section className="py-12 lg:py-16 bg-white border-b border-slate-200/90 relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="default">
        {/* Main Regulatory Credential Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#0B1528] via-[#0E2248] to-[#123168] p-7 sm:p-10 lg:p-12 text-white shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Subtle radial pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
            {/* Left: Headline & Trading Entity */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 text-xs font-bold uppercase tracking-wider mb-5">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                <span>Australian Credit Licensing &amp; Compliance</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                MMA GLOBAL PTY LIMITED
              </h2>

              <p className="text-base sm:text-lg text-cyan-100 font-semibold mt-2">
                Trading as <span className="text-white font-extrabold underline decoration-cyan-400 decoration-2 underline-offset-4">Talukder Finance</span> since 2021
              </p>

              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed max-w-xl">
                Talukdar Finance operates strictly under full Australian regulatory oversight, adhering to best-interests duty (BID) and consumer credit protections mandated by ASIC.
              </p>
            </div>

            {/* Right: Highlighted ACR & ACL Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:min-w-[380px] shrink-0">
              {/* ACR Card */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 flex flex-col justify-between shadow-lg hover:border-cyan-400/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">
                    Credit Representative
                  </span>
                  <FileCheck2 className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs text-slate-300 font-medium">
                    Australian Credit Representative Number
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-wider font-mono mt-1">
                    567708
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-300 mt-1 inline-block">
                    • ACR #567708 Active
                  </span>
                </div>
              </div>

              {/* ACL Card */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 flex flex-col justify-between shadow-lg hover:border-cyan-400/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">
                    Credit Licence
                  </span>
                  <Scale className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs text-slate-300 font-medium">
                    Australian Credit Licence
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-wider font-mono mt-1">
                    577112
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-300 mt-1 inline-block">
                    • Under ACL #577112
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
