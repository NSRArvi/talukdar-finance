import * as React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { FAQManager } from "./faq-manager";
import type { FAQItem } from "@/types";

export const metadata = {
  title: "FAQs | Talukdar Finance Admin",
  description: "Manage frequently asked questions and client onboarding guidance.",
};

export default async function AdminFAQsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch all FAQs (both published and drafts)
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  const faqs = (data as FAQItem[]) || [];

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col lg:flex-row">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
            Create, edit, reorder, or unpublish accordion questions shown across the public site.
          </p>
        </div>

        <FAQManager initialFaqs={faqs} />
      </main>
    </div>
  );
}

