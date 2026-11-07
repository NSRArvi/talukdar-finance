"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

// CountUp number component that animates smoothly from 0 to target when scrolled into view
function Counter({
  end,
  duration = 1.8,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  React.useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function GlanceSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#FBFBFA] border-b border-slate-200 overflow-hidden">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Context, and Link */}
          <div className="lg:col-span-5 flex flex-col justify-between z-10">
            <div>
              {/* LMG style pill badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 tracking-wider mb-6 sm:mb-8">
                Talukdar Finance at a Glance
              </div>

              {/* Bold Headline */}
              <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12] mb-6">
                Australia&apos;s trusted independent lending advisory
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mb-8">
                Backed by accredited banking experience and dedicated customer advocacy. We lead the way in bespoke mortgage structuring, rapid asset pre-approvals, and business financing.
              </p>

              {/* Action Link */}
              <div className="pt-2">
                <a
                  href="#consultation"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-navy)] hover:text-[var(--color-brand-blue)] border-b-2 border-[var(--color-brand-navy)] hover:border-[var(--color-brand-blue)] pb-1 transition-colors group"
                >
                  <span>How does Talukdar Finance compare to retail banks?</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[var(--color-brand-blue)]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait on Left, Floating Stat Cards on Right */}
          <div className="lg:col-span-7 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Primary Portrait Image (Clean and unobstructed) */}
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] h-[400px] sm:h-[460px] lg:h-[480px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 shrink-0">
              <Image
                src="/Mantasha-Sits.png"
                alt="Talukdar Finance Principal Broker"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 320px, 340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Stat Cards Stack on Right Side (Not overlapping the portrait) */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full flex-1">
              {/* Stat Card 1: Soft Peach */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#FFE4D6] text-[#7A2800] border border-[#FCD2BF] shadow-sm flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-serif italic font-black leading-none">
                  <Counter end={10} suffix="+" />
                </div>
                <div className="w-full border-t border-[#7A2800]/20 my-2" />
                <div className="text-[11px] sm:text-xs font-semibold leading-tight text-[#7A2800]/90">
                  Years experience
                </div>
              </motion.div>

              {/* Stat Card 2: Soft Sky Blue */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#DCEBFE] text-[#1E3A8A] border border-[#BFDBFE] shadow-sm flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-serif italic font-black leading-none">
                  <Counter end={40} suffix="+" />
                </div>
                <div className="w-full border-t border-[#1E3A8A]/20 my-2" />
                <div className="text-[11px] sm:text-xs font-semibold leading-tight text-[#1E3A8A]/90">
                  Lenders accredited
                </div>
              </motion.div>

              {/* Stat Card 3: Soft Lime / Mint */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#E8F8CE] text-[#245903] border border-[#D1F0A4] shadow-sm flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-serif italic font-black leading-none">
                  <Counter end={100} suffix="%" />
                </div>
                <div className="w-full border-t border-[#245903]/20 my-2" />
                <div className="text-[11px] sm:text-xs font-semibold leading-tight text-[#245903]/90">
                  FBAA member &amp; BID compliant
                </div>
              </motion.div>

              {/* Stat Card 4: Soft Warm Butter */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#FDECC8] text-[#804D00] border border-[#FBE09E] shadow-sm flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-serif italic font-black leading-none">
                  $0
                </div>
                <div className="w-full border-t border-[#804D00]/20 my-2" />
                <div className="text-[11px] sm:text-xs font-semibold leading-tight text-[#804D00]/90">
                  Fee for standard home loans
                </div>
              </motion.div>

              {/* Stat Card 5: Deep Forest Teal */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#09352F] text-white border border-[#0F4E45] shadow-sm flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-serif italic font-black leading-none text-[#75E6DA]">
                  <Counter end={98} suffix="%" />
                </div>
                <div className="w-full border-t border-white/20 my-2" />
                <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-200">
                  Satisfaction rate
                </div>
              </motion.div>

              {/* Stat Card 6: Soft Neutral Cream */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#F3F2EB] text-[#2D3325] border border-[#E3E1D5] shadow-sm flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-serif italic font-black leading-none">
                  <Counter end={1} prefix="$" suffix="00M+" />
                </div>
                <div className="w-full border-t border-[#2D3325]/20 my-2" />
                <div className="text-[11px] sm:text-xs font-semibold leading-tight text-[#2D3325]/90">
                  Loan volume settled
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
