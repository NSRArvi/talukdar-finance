import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-text)] border-t border-[var(--color-brand-border)]">
      <Container size="default" className="pt-16 pb-12">
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative h-9 w-[130px] shrink-0">
                <Image
                  src="/tf-logo.png"
                  alt="Talukdar Finance Logo"
                  fill
                  className="object-contain object-left"
                  sizes="130px"
                />
              </div>
            </Link>
            <p className="text-sm text-[var(--color-brand-text-muted)] leading-relaxed max-w-sm">
              Bespoke financial architecture and advisory for Australian residential buyers, property investors, and commercial enterprises. Institutional expertise delivered with private banking discretion.
            </p>
          </div>

          {/* FINANCE Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-navy)]">
              Finance
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[var(--color-brand-text-muted)]">
              <li>
                <Link
                  href="/solutions"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  Home Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  Car Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  Personal Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  Business Finance
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-navy)]">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[var(--color-brand-text-muted)]">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/steps"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/approach"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  Client Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/#consultation"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* INFORMATION Column */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-navy)]">
              Information
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[var(--color-brand-text-muted)]">
              <li>
                <Link
                  href="/insights"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[var(--color-brand-blue)] transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Legal Box */}
        <div className="rounded-2xl bg-white border border-[var(--color-brand-border)] p-6 sm:p-7 flex flex-col gap-4 shadow-sm">
          <p className="text-xs text-[var(--color-brand-text-muted)] leading-relaxed">
            Talukdar Finance Pty Ltd (ABN 00 000 000 000) is an Authorized Credit Representative (CRN 000000) of Australian Lending Licence Group Pty Ltd, Australian Credit Licence (ACL) No. 000000.
          </p>
          <p className="text-xs text-[var(--color-brand-text-muted)] leading-relaxed">
            Disclaimer: The material on this website provides general information only and does not consider your personal objectives, financial situation, or specific needs. All lending applications are subject to credit assessment, verification, and lender approval. Terms, conditions, fees, and charges apply.
          </p>

          <div className="pt-4 border-t border-[var(--color-brand-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--color-brand-text-muted)]">
            <span>© 2026 Talukdar Finance Pty Ltd. All rights reserved.</span>
            <span>Regulated by the Australian Securities and Investments Commission (ASIC).</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
