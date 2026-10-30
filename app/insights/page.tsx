import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ConsultationSection } from "@/components/home/consultation-section";
import { getBlogPosts } from "@/lib/services";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Market Insights & Finance Guides | Talukdar Finance",
  description:
    "Expert Australian mortgage analysis, Reserve Bank of Australia (RBA) cash rate updates, first home buyer guides, and commercial debt strategy.",
};

export default async function InsightsPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[var(--color-brand-navy)] via-[#0e2c56] to-[#071d33] text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#246bfd_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <Container size="default">
            <div className="flex flex-col items-start gap-4 max-w-3xl relative z-10">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>Australian Broker Intelligence</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight !text-white">
                Market Insights &amp; Financial Guides
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                Clear, actionable analysis on RBA cash rate decisions, bank lending policies, tax-effective loan structures, and property acquisition in Australia.
              </p>
            </div>
          </Container>
        </div>

        {/* Articles Grid */}
        <Section background="white" spacing="lg">
          <Container size="default">
            {posts.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center gap-3 bg-[var(--color-brand-soft-blue)]/60 rounded-2xl border border-dashed border-slate-300">
                <BookOpen className="w-10 h-10 text-slate-400" />
                <h3 className="text-base font-bold text-[var(--color-brand-navy)]">
                  Articles are being curated
                </h3>
                <p className="text-xs text-slate-500 max-w-md">
                  Our brokers are compiling the latest Australian credit and property market forecasts. Check back shortly.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-[var(--color-brand-blue)]/40 transition-all duration-300"
                  >
                    {/* Cover Thumbnail */}
                    <Link
                      href={`/insights/${post.id}`}
                      className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 block"
                    >
                      <Image
                        src={post.thumbnail_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[var(--color-brand-navy)] shadow-sm backdrop-blur-xs">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    {/* Article Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.created_at
                              ? new Date(post.created_at).toLocaleDateString(
                                  "en-AU",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "Recent"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.read_time_minutes || 4} min read
                          </span>
                        </div>

                        <Link href={`/insights/${post.id}`}>
                          <h2 className="text-lg font-bold text-[var(--color-brand-navy)] group-hover:text-[var(--color-brand-blue)] transition-colors leading-snug">
                            {post.title}
                          </h2>
                        </Link>

                        <p className="text-xs text-[var(--color-brand-text-muted)] line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Read More Link */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-500">
                          By {post.author_name}
                        </span>
                        <Link
                          href={`/insights/${post.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-brand-blue)] group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </Section>

        {/* Bottom Consultation CTA */}
        <ConsultationSection />
      </main>

      <Footer />
    </div>
  );
}

