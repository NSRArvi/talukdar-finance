"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  Home,
  RefreshCw,
  TrendingUp,
  HardHat,
  Car,
  Briefcase,
  Wrench,
  Building,
  UserCheck,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import type { ServiceItem, ServiceCategory } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Home,
  RefreshCw,
  TrendingUp,
  HardHat,
  Car,
  Wrench,
  Building,
  Briefcase,
  Layers,
  UserCheck,
  Sparkles,
  GraduationCap,
};

export function LoanSolutionsSection() {
  const [services, setServices] = React.useState<ServiceItem[]>([]);
  const [categories, setCategories] = React.useState<ServiceCategory[]>([]);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [isLoading, setIsLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function loadLiveServices() {
      try {
        setIsLoading(true);
        setFetchError(null);

        const res = await fetch("/api/services", { cache: "no-store" });
        if (!res.ok) throw new Error(`Server returned ${res.status}`);

        const data = await res.json();
        if (isMounted) {
          setServices(data.services || []);
          setCategories(data.categories || []);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg =
            err instanceof Error ? err.message : "Failed to load live facilities";
          setFetchError(msg);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadLiveServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToConsultation = (facility?: ServiceItem) => {
    const el = document.getElementById("consultation");
    if (!el) return;

    if (facility) {
      window.dispatchEvent(
        new CustomEvent("prefill-consultation", {
          detail: {
            category: facility.category,
            serviceName: facility.title,
          },
        })
      );
    }
    el.scrollIntoView({ behavior: "smooth" });
  };

  const categoryTabs = [
    { id: "all", label: "All Solutions" },
    ...categories.map((c) => ({ id: c.slug, label: c.name })),
  ];

  const filteredFacilities =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#FBFBFA] border-b border-slate-200">
      <Container size="default">
        {/* Section Header with Rounded Pill Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 tracking-wider mb-5">
              Finance Solutions
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12]">
              Built Around Your Future
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              From residential first home purchases to commercial development funds, we structure accredited lending facilities aligned with your financial position.
            </p>
          </motion.div>

          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-navy)] hover:text-[var(--color-brand-blue)] transition-colors border-b-2 border-[var(--color-brand-navy)] hover:border-[var(--color-brand-blue)] pb-1 shrink-0"
          >
            <span>View Complete Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Tabs (Rounded Pill Tabs) */}
        {!isLoading && categories.length > 0 && (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`text-xs font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 cursor-pointer shadow-xs ${
                    isActive
                      ? "bg-[var(--color-brand-navy)] text-white border-[var(--color-brand-navy)] shadow-md"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-center">
            <Loader2 className="w-8 h-8 text-[var(--color-brand-blue)] animate-spin" />
            <p className="text-sm font-bold text-slate-800">
              Loading Finance Facilities...
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && fetchError && (
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center my-8">
            <p className="text-sm font-bold text-red-700">{fetchError}</p>
          </div>
        )}

        {/* Rounded Cards Grid (Matching LMG 24px/28px radius) */}
        {!isLoading && !fetchError && filteredFacilities.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredFacilities.map((facility, idx) => {
              const Icon = iconMap[facility.iconName] || Home;
              return (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 flex flex-col justify-between transition-all duration-300 group"
                >
                  {/* Image Container with Rounded Edge */}
                  <Link
                    href={`/solutions/${facility.id}`}
                    className="block relative aspect-[16/10] w-full overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={facility.imageSrc}
                      alt={facility.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-[var(--color-brand-navy)] flex items-center gap-1.5 shadow-xs">
                      <Icon className="w-3.5 h-3.5 text-[var(--color-brand-blue)]" />
                      <span>{facility.badge || "Finance Facility"}</span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <Link href={`/solutions/${facility.id}`}>
                        <h3 className="text-2xl font-extrabold text-[var(--color-brand-navy)] group-hover:text-[var(--color-brand-blue)] transition-colors mb-3">
                          {facility.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {facility.description}
                      </p>

                      <ul className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                        {facility.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-blue)]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Line with Rounded Button */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/solutions/${facility.id}`}
                        className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-navy)] hover:text-[var(--color-brand-blue)] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--color-brand-blue)]" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => scrollToConsultation(facility)}
                        className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[var(--color-brand-navy)] text-white hover:bg-[var(--color-brand-blue)] transition-colors cursor-pointer shadow-xs"
                      >
                        Consult
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
