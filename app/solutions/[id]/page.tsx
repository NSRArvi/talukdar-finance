import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ConsultationSection } from "@/components/home/consultation-section";
import { getServices } from "@/lib/services";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const services = await getServices();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return { title: "Solution Not Found | Talukdar Finance" };
  }

  return {
    title: `${service.title} | Talukdar Finance Solutions`,
    description: service.description,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { id } = await params;
  const services = await getServices();
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-[var(--color-brand-soft-blue)] to-white py-14 border-b border-[var(--color-brand-border)]">
        <Container size="default">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Solutions</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              {service.badge && (
                <div className="inline-block px-3.5 py-1 rounded-full bg-white border border-[var(--color-brand-border)] text-xs font-bold uppercase tracking-wider text-[var(--color-brand-navy)] mb-3 shadow-xs">
                  {service.badge}
                </div>
              )}
              <h1 className="text-3xl sm:text-5xl font-black text-[var(--color-brand-navy)] tracking-tight leading-tight mb-4">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-[var(--color-brand-text-muted)] leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>

            <div className="lg:col-span-5 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src={service.imageSrc}
                alt={service.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Features & Criteria */}
      <Section background="white" spacing="lg">
        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Key Features */}
            <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-8 sm:p-10 shadow-xs">
              <h2 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-6">
                Facility Features &amp; Highlights
              </h2>
              <ul className="flex flex-col gap-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advisory Guarantee */}
            <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFA] p-8 sm:p-10 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-4">
                  The Talukdar Finance Advantage
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Unlike dealing directly with a single branch, our accredited brokers assess your eligibility across 40+ Australian bank and non-bank lending panels. We handle the paperwork, policy exceptions, and credit submission.
                </p>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div className="text-xs font-semibold text-slate-700">
                    Operating under FBAA Accreditation and Best Interests Duty (BID).
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <a
                  href="#consultation"
                  className="w-full py-4 rounded-full bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Request Specific Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <div id="consultation">
        <ConsultationSection initialServiceName={service.title} initialCategory={service.category} />
      </div>
    </>
  );
}
