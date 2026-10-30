"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Layers,
  FolderTree,
  PlusCircle,
  ExternalLink,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Compass,
  ArrowUpRight,
  UserCheck,
  HelpCircle,
  Scale,
  BookOpen,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminSidebarProps {
  userEmail?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  exact?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Close mobile drawer on route changes
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      window.location.href = "/admin/login";
    }
  };

  const navSections: NavSection[] = [
    {
      title: "CRM & Inquiries",
      items: [
        {
          href: "/admin",
          label: "Inquiries",
          icon: FileText,
          exact: true,
        },
      ],
    },
    {
      title: "Content & Editorial",
      items: [
        {
          href: "/admin/posts",
          label: "Articles",
          icon: BookOpen,
        },
        {
          href: "/admin/faqs",
          label: "FAQs",
          icon: HelpCircle,
        },
        {
          href: "/admin/legal",
          label: "Legal Policies",
          icon: Scale,
        },
      ],
    },
    {
      title: "Loans & Facilities",
      items: [
        {
          href: "/admin/categories",
          label: "Categories",
          icon: FolderTree,
        },
        {
          href: "/admin/services",
          label: "Services",
          icon: Layers,
          exact: true,
        },
        {
          href: "/admin/services/new",
          label: "New Service",
          icon: PlusCircle,
        },
      ],
    },
  ];

  const sidebarMarkup = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80">
      {/* Brand Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative h-10 w-28 transition-transform group-hover:scale-102">
            <Image
              src="/tf-logo.png"
              alt="Talukdar Finance"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Admin
          </span>
        </Link>

        {/* Mobile close toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] shadow-xs"
                        : "text-slate-600 hover:text-[var(--color-brand-navy)] hover:bg-slate-50"
                    }`}
                  >
                    {/* Active Left Pill Indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[var(--color-brand-blue)]" />
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-white text-[var(--color-brand-blue)] shadow-xs"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-[var(--color-brand-navy)]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="tracking-tight">{item.label}</span>
                    </div>

                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-[var(--color-brand-blue)] shrink-0" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Live Client Preview Shortcuts */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick Navigation
          </h3>
          <div className="space-y-1">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-[var(--color-brand-navy)] hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-brand-blue)] transition-colors" />
                <span>Live Website</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[var(--color-brand-navy)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-[var(--color-brand-navy)] hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-brand-blue)] transition-colors" />
                <span>Public Loan Facilities</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[var(--color-brand-navy)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Admin User Profile & Sign Out Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70 shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-[var(--color-brand-navy)] shadow-xs flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4 text-[var(--color-brand-blue)]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[var(--color-brand-navy)] truncate">
                {userEmail?.split("@")[0] || "Administrator"}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {userEmail || "admin@talukdarfinance.com"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isLoggingOut}
            title="Sign out of Admin Panel"
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0 disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative h-7 w-24">
            <Image
              src="/tf-logo.png"
              alt="Talukdar Finance"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <span className="text-[11px] font-bold text-[var(--color-brand-blue)] uppercase tracking-wider bg-[var(--color-brand-blue-subtle)] px-2.5 py-1 rounded-md">
          Admin Portal
        </span>
      </div>

      {/* Mobile Modal Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 flex flex-col">
            {sidebarMarkup}
          </div>
        </div>
      )}

      {/* Desktop Fixed Modern Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 min-h-screen sticky top-0 h-screen">
        {sidebarMarkup}
      </aside>
    </>
  );
}
