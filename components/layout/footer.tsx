import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-700 bg-[#0A254D] text-slate-100">
      <Container size="default" className="py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--color-brand-blue)] flex items-center justify-center text-white font-bold text-xl shadow-md">
                TF
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white block">
                  Talukdar Finance
                </span>
                <span className="text-xs text-blue-200 font-medium">
                  Private Wealth &amp; Lending
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              Personalised lending solutions and credit strategy for home loans, vehicle finance, personal loans, and business growth across Australia.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-200 font-medium">
              <ShieldCheck className="h-4 w-4 text-[var(--color-brand-blue)] shrink-0" />
              <span>MFAA Accredited | Australian Credit Representative</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Finance Solutions
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-200">
              <li>
                <Link href="#solutions" className="hover:text-white hover:underline transition-colors">
                  Residential Home Loans
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-white hover:underline transition-colors">
                  Vehicle &amp; Car Finance
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-white hover:underline transition-colors">
                  Personal Loans
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-white hover:underline transition-colors">
                  Commercial &amp; Business Finance
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-white hover:underline transition-colors">
                  Refinancing &amp; Equity Release
                </Link>
              </li>
            </ul>
          </div>

          {/* Regulatory & Process */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              The Journey
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-200">
              <li>
                <Link href="#journey" className="hover:text-white hover:underline transition-colors">
                  Stage 01: Initial Discovery
                </Link>
              </li>
              <li>
                <Link href="#journey" className="hover:text-white hover:underline transition-colors">
                  Stage 02: Product Comparison
                </Link>
              </li>
              <li>
                <Link href="#journey" className="hover:text-white hover:underline transition-colors">
                  Stage 03: Document Checklist
                </Link>
              </li>
              <li>
                <Link href="#journey" className="hover:text-white hover:underline transition-colors">
                  Stage 04: Settlement &amp; Beyond
                </Link>
              </li>
              <li>
                <Link href="#faqs" className="hover:text-white hover:underline transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Advisory Office
            </h4>
            <div className="flex flex-col gap-3 text-sm text-slate-200">
              <a
                href="tel:+61280000000"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-[var(--color-brand-blue)] shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-semibold text-white">+61 (02) 8000 0000</span>
              </a>
              <a
                href="mailto:advisory@talukdarfinance.com.au"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-[var(--color-brand-blue)] shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="break-all">advisory@talukdarfinance.com.au</span>
              </a>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-[var(--color-brand-blue)] shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Australia Wide Services</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclosure & Legal Bottom Bar */}
        <div className="pt-8 border-t border-slate-700/80 text-xs text-slate-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="leading-relaxed max-w-2xl">
            © 2026 Talukdar Finance. All rights reserved. Disclaimer: The information provided on this website is of a general nature only and does not take into account personal objectives or individual financial circumstances.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-slate-200">
            <Link href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              Credit Guide
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
