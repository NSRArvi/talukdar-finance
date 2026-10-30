"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
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
  ShieldCheck,
  Loader2,
  FolderOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { ServiceItem, ServiceCategory } from "@/types";

// Icon dictionary to map string names to actual Lucide component icons
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

  // Fetch real-time live data from server API
  React.useEffect(() => {
    let isMounted = true;

    async function loadLiveServices() {
      try {
        setIsLoading(true);
        setFetchError(null);

        const res = await fetch("/api/services", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }

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
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadLiveServices();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter facilities by active category
  const filteredFacilities = React.useMemo(() => {
    if (activeCategory === "all") return services;
    return services.filter((item) => item.category === activeCategory);
  }, [services, activeCategory]);

  // Compute tabs dynamically from actual database categories
  const categoryTabs = React.useMemo(() => {
    const list = [
      {
        id: "all",
        label: `All Loan Facilities (${services.length})`,
      },
    ];

    categories.forEach((cat) => {
      const count = services.filter((s) => s.category === cat.slug).length;
      list.push({
        id: cat.slug,
        label: `${cat.name} (${count})`,
      });
    });

    return list;
  }, [categories, services]);

  const scrollToConsultation = (facility: ServiceItem) => {
    const el = document.getElementById("consultation");
    el?.scrollIntoView({ behavior: "smooth" });

    // Dispatch event to consultation form with both category and facility title
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-facility", {
          detail: {
            category: facility.category,
            serviceTitle: facility.title,
          },
        })
      );
    }
  };

  return (
    <Section id="solutions" background="white" spacing="lg">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col items-start gap-3 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-brand-navy)]">
              Finance Sollutions
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-brand-text-muted)] leading-relaxed">
              Explore finance options custom-architected around your financial
              goals, property ambitions, and business growth milestones.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-brand-navy)] px-4 py-2 rounded-xl bg-[var(--color-brand-soft-blue)] border border-[var(--color-brand-border)] shrink-0 self-start md:self-end">
            <ShieldCheck className="h-4 w-4 text-[var(--color-brand-blue)]" />
            <span>Over 35+ Australian Lenders Panel</span>
          </div>
        </div>

        {/* Dynamic Category Filter Tabs */}
        {!isLoading && categoryTabs.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[var(--color-brand-navy)] text-white shadow-sm"
                      : "bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-navy)] hover:bg-slate-200/80"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Live Loading State */}
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-soft-blue)] flex items-center justify-center text-[var(--color-brand-blue)] shadow-xs">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--color-brand-navy)]">
                Fetching Loan Facilities...
              </p>
              <p className="text-xs text-[var(--color-brand-text-muted)] mt-0.5">
                Connecting to server database to load live credit products.
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && fetchError && (
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center my-8">
            <p className="text-sm font-bold text-red-700">
              Unable to load live loan facilities
            </p>
            <p className="text-xs text-red-600 mt-1">{fetchError}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !fetchError && filteredFacilities.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-3 bg-[var(--color-brand-soft-blue)]/60 rounded-2xl border border-dashed border-slate-300">
            <FolderOpen className="w-8 h-8 text-slate-400" />
            <p className="text-sm font-semibold text-[var(--color-brand-navy)]">
              No loan facilities found in this category.
            </p>
            <p className="text-xs text-slate-500">
              Facilities will appear once published in the admin panel.
            </p>
          </div>
        )}

        {/* Live Loaded Facilities Cards Grid */}
        {!isLoading && !fetchError && filteredFacilities.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            <AnimatePresence>
              {filteredFacilities.map((facility) => {
                const Icon = iconMap[facility.iconName] || Home;
                return (
                  <motion.div
                    layout
                    key={facility.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -4 }}
                    className="group rounded-2xl border border-[var(--color-brand-border)] bg-white overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[var(--color-brand-blue)]/50 transition-all duration-300"
                  >
                    {/* Facility Image with Overlay Header (Clickable link to /solutions/[slug]) */}
                    <Link
                      href={`/solutions/${facility.id}`}
                      className="block relative aspect-[16/9] w-full overflow-hidden bg-slate-100 cursor-pointer"
                    >
                      <Image
                        src={facility.imageSrc}
                        alt={facility.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy)]/80 via-transparent to-transparent pointer-events-none" />

                      {/* Icon & Category Pill */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-white/95 backdrop-blur-md flex items-center justify-center text-[var(--color-brand-blue)] shadow-md">
                          <Icon className="h-5 w-5" />
                        </div>
                        {facility.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[var(--color-brand-navy)] shadow-sm">
                            {facility.badge}
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Card Content (Headline links to /solutions/[slug]) */}
                    <div className="p-6">
                      <Link href={`/solutions/${facility.id}`}>
                        <h3 className="text-xl font-bold text-[var(--color-brand-navy)] group-hover:text-[var(--color-brand-blue)] transition-colors mb-2.5">
                          {facility.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-[var(--color-brand-text-muted)] leading-relaxed mb-4">
                        {facility.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 mb-2">
                        {facility.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-[var(--color-brand-text)]"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-blue)] mt-1.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Bar: Two Clear Separate Buttons */}
                    <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                      {/* View Facility Details */}
                      <Link
                        href={`/solutions/${facility.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-navy)] hover:text-[var(--color-brand-blue)] transition-colors group/link"
                      >
                        <span>{facility.actionText || "View Facility"}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[var(--color-brand-blue)] transition-transform group-hover/link:translate-x-0.5" />
                      </Link>

                      {/* Direct Consult Button */}
                      <button
                        type="button"
                        onClick={() => scrollToConsultation(facility)}
                        className="px-3.5 py-1.5 rounded-lg bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
                      >
                        Consult
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[var(--color-brand-soft-blue)] border border-[var(--color-brand-border)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-[var(--color-brand-navy)]">
              Have a unique or complex lending scenario?
            </h4>
            <p className="text-sm text-[var(--color-brand-text-muted)]">
              We handle complex company trusts, self-employed tax returns, and
              non-standard collateral structures.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("consultation");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-xl bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-sm font-semibold transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            Request Scenario Assessment
          </button>
        </div>
      </Container>
    </Section>
  );
}
