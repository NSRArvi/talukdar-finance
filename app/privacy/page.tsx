import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getLegalDocument } from "@/lib/services";
import { ShieldCheck, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDocument("privacy-policy");

  return {
    title:
      doc?.meta_title ||
      "Privacy Policy | Talukdar Finance Melbourne",
    description:
      doc?.meta_description ||
      "Read our Australian Credit Licence Privacy Policy, detailing how Talukdar Finance collects, safeguards, and handles personal and credit-related information.",
  };
}

export default async function PrivacyPolicyPage() {
  const doc = await getLegalDocument("privacy-policy");

  const title = doc?.title || "Privacy Policy";
  const updatedDate = doc?.updated_at
    ? new Date(doc.updated_at).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "October 2026";

  const defaultHtml = `
    <h2>1. Introduction & Overview</h2>
    <p>Talukdar Finance Pty Ltd ("we", "us", "our") is dedicated to protecting your personal information and credit information in compliance with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and the Credit Reporting Privacy Code.</p>
    
    <h2>2. Information We Collect</h2>
    <p>In our capacity as finance brokers and credit representatives, we collect information required to assess loan eligibility, model servicing capacity, and present credit applications to Australian lenders. This includes:</p>
    <ul>
      <li>Contact identity data (Full Name, Address, Email, Phone Number, Proof of ID)</li>
      <li>Financial details (Payslips, Tax Returns, Assets, Liabilities, Living Expenses)</li>
      <li>Credit histories obtained through credit reporting bodies with your explicit consent</li>
    </ul>

    <h2>3. How We Use & Disclose Your Information</h2>
    <p>We use your information exclusively to provide credit assistance, communicate with our panel of accredited Australian banks and lenders, and comply with Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) obligations.</p>

    <h2>4. Information Storage & Security</h2>
    <p>All client documents and records are held in encrypted, access-restricted databases. We do not sell or trade your personal details to third-party marketing entities.</p>

    <h2>5. Contacting Our Privacy Officer</h2>
    <p>If you have any questions regarding how your data is handled or wish to request access or correction to your information, please contact our Compliance Officer at advisory@talukdarfinance.com.au.</p>
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
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Legal Compliance
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

