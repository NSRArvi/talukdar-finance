import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="w-full bg-[#02376D] text-white border-t border-blue-900/40">
      <Container size="default" className="pt-16 pb-12">
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center">
              <div className="relative h-11 w-[160px] shrink-0">
                <Image
                  src="/Talukder Finance/Talukdar-Finance-Logo-White.png"
                  alt="Talukdar Finance Logo"
                  fill
                  className="object-contain object-left"
                  sizes="160px"
                />
              </div>
            </Link>
            <p className="text-sm text-blue-100/80 leading-relaxed max-w-sm">
              Accredited finance brokerage connecting Australian home buyers, investors, and business owners with competitive lending solutions across 40+ banks.
            </p>
          </div>

          {/* Navigation Type 1: Main Pages */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-white transition-colors">
                  Loan Calculators
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Type 2: Resources & Compliance */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              Information
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-200">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Accreditation & Office Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              Office &amp; Accreditation
            </h4>
            <div className="flex flex-col gap-3 text-xs text-blue-100/80 leading-relaxed">
              <p>
                <strong className="text-white">Office Location:</strong>
                <br />
                Suite 15, 186 Queen Street, Campbelltown, NSW 2560
              </p>
              <p>
                <strong className="text-white">Direct Inquiries:</strong>
                <br />
                advisory@talukdarfinance.com.au
              </p>
              <p>
                <strong className="text-white">Licensing &amp; Legal Entity:</strong>
                <br />
                MMA GLOBAL PTY LIMITED trading as Talukder Finance (Since 2021). ACR #567708 under ACL #577112.
              </p>
              <p>
                <strong className="text-white">FBAA Accredited:</strong> Finance Brokers Association of Australia Member.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <p>© {new Date().getFullYear()} Talukdar Finance. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/faqs" className="hover:text-white transition-colors">
              FAQs
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
