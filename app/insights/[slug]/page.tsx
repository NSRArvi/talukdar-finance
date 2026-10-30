import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ConsultationSection } from "@/components/home/consultation-section";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/services";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  ChevronRight,
  ShieldCheck,
  User,
} from "lucide-react";

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Talukdar Finance",
    };
  }

  return {
    title:
      post.meta_title ||
      `${post.title} | Talukdar Finance Insights`,
    description: post.meta_description || post.excerpt,
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recent";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb Header */}
        <div className="bg-[var(--color-brand-soft-blue)]/60 border-b border-slate-200/80 py-4">
          <Container size="default">
            <nav className="flex items-center gap-2 text-xs text-slate-500">
              <Link href="/" className="hover:text-[var(--color-brand-navy)] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href="/insights"
                className="hover:text-[var(--color-brand-navy)] transition-colors"
              >
                Insights
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-[var(--color-brand-navy)] truncate max-w-xs sm:max-w-md">
                {post.title}
              </span>
            </nav>
          </Container>
        </div>

        {/* Article Hero */}
        <article className="py-12 lg:py-16">
          <Container size="narrow">
            <div className="flex flex-col gap-6">
              {/* Category Pill & Meta */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)]">
                  {post.category} Finance
                </span>
                <span className="text-xs text-slate-400">•</span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{formattedDate}</span>
                </div>
                <span className="text-xs text-slate-400">•</span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{post.read_time_minutes || 4} min read</span>
                </div>
              </div>

              {/* Title Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-brand-navy)] tracking-tight leading-tight">
                {post.title}
              </h1>


              {/* Featured Cover Image */}
              {post.thumbnail_url && (
                <div className="relative aspect-[16/9] w-full rounded overflow-hidden border border-slate-200 bg-slate-100 my-4">
                  <Image
                    src={post.thumbnail_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              )}

              {/* Lead Excerpt Callout */}
              <div className="p-5 sm:p-6 rounded bg-[var(--color-brand-soft-blue)]/60 border-l-4 border-[var(--color-brand-blue)] text-slate-700 font-medium text-base sm:text-lg leading-relaxed">
                {post.excerpt}
              </div>

              {/* Full HTML Article Content */}
              <div
                className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base pt-4 prose-headings:text-[var(--color-brand-navy)] prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-p:my-4 prose-ul:my-4 prose-li:my-1.5 [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-8 [&_img]:max-w-full"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />

              {/* Share & Back */}
              <div className="pt-8 border-t border-slate-200 mt-8 flex items-center justify-between">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-blue)] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to all insights</span>
                </Link>
              </div>
            </div>
          </Container>
        </article>

        {/* Related Articles Strip */}
        {relatedPosts.length > 0 && (
          <Section background="soft" spacing="md">
            <Container size="default">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-bold text-[var(--color-brand-navy)]">
                    Related Finance Research
                  </h3>
                  <Link
                    href="/insights"
                    className="text-xs font-bold text-[var(--color-brand-blue)] hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/insights/${rel.id}`}
                      className="group bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[var(--color-brand-blue)]/40 transition-all flex flex-col gap-3"
                    >
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100">
                        <Image
                          src={rel.thumbnail_url}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-blue)]">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-[var(--color-brand-navy)] group-hover:text-[var(--color-brand-blue)] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        )}

        {/* Embedded Consultation Section */}
        <ConsultationSection />
      </main>

      <Footer />
    </div>
  );
}

