import * as React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getLegalDocument } from "@/lib/services";
import { FileText, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDocument("terms-of-use");

  return {
    title:
      doc?.meta_title ||
      "Terms of Use | Talukdar Finance Melbourne",
    description:
      doc?.meta_description ||
      "Review the Terms of Use governing your access to Talukdar Finance digital services, borrowing calculators, and brokerage platforms.",
  };
}

export default async function TermsOfUsePage() {
  const doc = await getLegalDocument("terms-of-use");

  const title = doc?.title || "Terms of Use";
  const updatedDate = doc?.updated_at
    ? new Date(doc.updated_at).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "October 2026";

  const defaultHtml = `
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or utilizing the website and digital portals of Talukdar Finance Pty Ltd, you acknowledge and agree to be bound by these Terms of Use and our Privacy Policy.</p>
    
    <h2>2. General Information Only (No Credit Advice)</h2>
    <p>The calculators, rate comparisons, and informational articles presented on this website are provided for general educational purposes only. They do not constitute formal financial advice, tax recommendations, or an offer of credit.</p>

    <h2>3. Credit Assessment & Lender Approval</h2>
    <p>All loan applications and credit facilities are subject to formal verification, credit assessment, and final approval by our participating Australian credit providers. Interest rates, fees, loan-to-value limits, and government concession eligibility may vary over time.</p>

    <h2>4. Intellectual Property</h2>
    <p>All trademarks, graphics, loan guides, and interface code on this platform are the property of Talukdar Finance Pty Ltd. Unauthorized reproduction or commercial re-use without explicit written consent is strictly prohibited.</p>

    <h2>5. Limitation of Liability</h2>
    <p>To the maximum extent permitted by Australian Consumer Law, Talukdar Finance shall not be held liable for any indirect or consequential damages arising from reliance on website information.</p>

    <h2>6. Governing Law</h2>
    <p>These terms are governed by and construed in accordance with the laws of Victoria, Australia.</p>
  `;

  const content = doc?.content_html || defaultHtml;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Header */}
        <div className="bg-[var(--color-brand-soft-blue)] border-b border-slate-200/80 py-12 lg:py-16">
          <Container size="default">
            <div className="flex flex-col items-start gap-4 max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-blue)] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </Link>

              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-50 text-[var(--color-brand-blue)]">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Terms &amp; Conditions
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-brand-navy)] tracking-tight">
                {title}
              </h1>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Last updated: {updatedDate}</span>
              </div>
            </div>
          </Container>
        </div>

        {/* Legal Body Section */}
        <Section background="white" spacing="lg">
          <Container size="narrow">
            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base prose-headings:text-[var(--color-brand-navy)] prose-headings:font-bold prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-lg prose-ul:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

