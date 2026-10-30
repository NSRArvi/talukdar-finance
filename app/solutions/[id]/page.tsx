import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ConsultationSection } from "@/components/home/consultation-section";
import { getServiceById, getServices } from "@/lib/services";
import {
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  FileCheck2,
  Percent,
  Clock,
  Sparkles,
  PhoneCall,
  CalendarCheck,
  Award,
} from "lucide-react";

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    return {
      title: "Facility Not Found | Talukdar Finance",
    };
  }

  return {
    title: `${service.title} | Talukdar Finance Melbourne`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  const allServices = await getServices();
  const relatedServices = allServices
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Crisp Clean Breadcrumbs */}
        <div className="bg-[var(--color-brand-soft-blue)]/80 border-b border-slate-200/80 py-3.5">
          <Container size="default">
            <nav className="flex items-center gap-2 text-xs text-slate-500">
              <Link
                href="/"
                className="hover:text-[var(--color-brand-blue)] transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                href="/solutions"
                className="hover:text-[var(--color-brand-blue)] transition-colors"
              >
                Loan Facilities
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-[var(--color-brand-navy)] truncate max-w-xs sm:max-w-md">
                {service.title}
              </span>
            </nav>
          </Container>
        </div>

        {/* High-Contrast Professional Hero Section */}
        <section className="relative bg-gradient-to-b from-[var(--color-brand-navy)] via-[#0e2c56] to-[var(--color-brand-navy-dark)] text-white py-14 lg:py-20 overflow-hidden">
          {/* Subtle geometric dot grid overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#246bfd_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
              {/* Left Column: Title & Key Highlights */}
              <div className="lg:col-span-7 flex flex-col gap-5">

                {/* Hero Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
                  {service.title}
                </h1>

                {/* Hero Subtitle */}
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                  {service.description}
                </p>

                {/* 3 Pillars Metric Row */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/15">
                  <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                      <Percent className="w-3.5 h-3.5 text-blue-300" /> Rates
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      35+ Lenders
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-300" /> Turnaround
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Fast 24-48h
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-300" /> License
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      MFAA Member
                    </span>
                  </div>
                </div>

                {/* High Contrast CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#consultation-booking"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Apply / Book Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    href="/solutions"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-xs transition-colors"
                  >
                    Compare All Facilities
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Showcase Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900 aspect-[4/3] group">
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy-dark)]/90 via-transparent to-transparent" />

                  {/* Bottom Image Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-[var(--color-brand-navy)]/85 border border-white/15 flex items-center justify-between text-white">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                        Australian Credit Advisory
                      </p>
                      <p className="text-xs font-semibold text-white mt-0.5">
                        Melbourne &amp; Nationwide Broking
                      </p>
                    </div>
                    <Award className="w-6 h-6 text-[#FFD700] shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Detailed Breakdown Section */}
        <section className="py-16 bg-white">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content Column */}
              <div className="lg:col-span-8 flex flex-col gap-10">
                {/* Description & Overview */}
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-brand-navy)] tracking-tight">
                    Facility Overview &amp; Market Context
                  </h2>
                  <div className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 mt-4">
                    {service.long_description ? (
                      service.long_description
                        .split("\n\n")
                        .map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                    ) : (
                      <>
                        <p>{service.description}</p>
                        <p>
                          At Talukdar Finance, we navigate Australia&apos;s complex lending
                          landscape to identify optimal loan structures, negotiate competitive
                          interest rate margins, and ensure full compliance with Australian Credit
                          Licence standards.
                        </p>
                        <p>
                          Whether you are entering the property market, scaling a commercial
                          enterprise, or restructuring existing liabilities, our team prepares
                          exhaustive credit presentations tailored to individual lender servicing
                          calculators.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Key Benefits / Features Grid */}
                <div className="bg-[var(--color-brand-soft-blue)] border border-slate-200 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-brand-navy)] mb-6 flex items-center gap-2.5">
                    <FileCheck2 className="w-5 h-5 text-[var(--color-brand-blue)]" />
                    <span>Key Features &amp; Borrower Advantages</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3-Step Broking Process */}
                <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 bg-white shadow-xs">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-brand-navy)]">
                    Our 3-Step Broking Journey
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-navy)] text-white text-xs font-bold flex items-center justify-center">
                        1
                      </div>
                      <h4 className="text-sm font-bold text-[var(--color-brand-navy)]">
                        Discovery &amp; Capacity
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Comprehensive assessment of borrowing power across tier-1 banks and specialist non-bank lenders.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-blue)] text-white text-xs font-bold flex items-center justify-center">
                        2
                      </div>
                      <h4 className="text-sm font-bold text-[var(--color-brand-navy)]">
                        Lender Submission
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Precision compilation of supporting financials to bypass common credit delays and mitigate risk.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-navy)] text-white text-xs font-bold flex items-center justify-center">
                        3
                      </div>
                      <h4 className="text-sm font-bold text-[var(--color-brand-navy)]">
                        Settlement &amp; Beyond
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        End-to-end liaison with conveyancers, lenders, and ongoing post-settlement rate tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar: Advisory Contact & Related Facilities */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Fast Action Card with High Contrast */}
                <div className="bg-[var(--color-brand-navy)] text-white rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                      Direct Broker Access
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-tight !text-white">
                    Ready to evaluate your borrowing options?
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Book an obligation-free strategy consultation with a senior broker to model exact repayment scenarios.
                  </p>

                  <a
                    href="#consultation-booking"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Schedule Phone Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="text-[11px] text-slate-400 text-center pt-3 border-t border-white/10">
                    No impact on your credit score during initial assessment.
                  </div>
                </div>

                {/* Related Category Solutions */}
                {relatedServices.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-navy)]">
                      Other {service.category} Solutions
                    </h4>

                    <div className="flex flex-col divide-y divide-slate-100">
                      {relatedServices.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/solutions/${rel.id}`}
                          className="py-3 flex items-center justify-between group hover:text-[var(--color-brand-blue)] transition-colors"
                        >
                          <div className="flex flex-col min-w-0 pr-2">
                            <span className="text-xs font-bold text-slate-800 group-hover:text-[var(--color-brand-blue)] transition-colors truncate">
                              {rel.title}
                            </span>
                            <span className="text-[11px] text-slate-400 truncate">
                              {rel.actionText}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[var(--color-brand-blue)] transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Embedded Consultation Section pre-populated with current facility */}
        <div id="consultation-booking">
          <ConsultationSection
            initialCategory={service.category}
            initialServiceName={service.title}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
