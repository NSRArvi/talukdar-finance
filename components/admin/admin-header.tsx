"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  FileText,
  Layers,
  FolderTree,
  LogOut,
  ExternalLink,
} from "lucide-react";

interface AdminNavProps {
  userEmail?: string;
}

export function AdminHeader({ userEmail }: AdminNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Consultation Inquiries", icon: FileText },
    { href: "/admin/services", label: "Services & Loans", icon: Layers },
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[var(--color-brand-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="inline-block">
            <div className="relative h-8 w-[110px]">
              <Image
                src="/tf-logo.png"
                alt="Talukdar Finance Logo"
                fill
                priority
                className="object-contain"
                sizes="110px"
              />
            </div>
          </Link>
          <span className="hidden sm:inline-block h-4 w-px bg-slate-200" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)]">
            Admin Portal
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-blue)]"
                    : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-navy)] hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User / Sign Out */}
        <div className="flex items-center gap-4">
          {userEmail && (
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-[var(--color-brand-navy)]">
                {userEmail}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active Session
              </span>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[var(--color-brand-navy)] px-2.5 py-1.5 rounded-lg border border-slate-200"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="h-9 px-3 rounded-xl border border-[var(--color-brand-border)] bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-[var(--color-brand-navy)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="flex md:hidden border-t border-[var(--color-brand-border)] bg-slate-50/50 px-4 py-2 gap-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                isActive
                  ? "bg-white text-[var(--color-brand-blue)] shadow-xs"
                  : "text-slate-600"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
