import * as React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { CategoryManager } from "./category-manager";
import { getServiceCategories } from "@/lib/services";

export const metadata = {
  title: "Service Categories | Talukdar Finance Admin",
  description: "Manage portfolio groupings for Australian loan facilities.",
};

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const categories = await getServiceCategories();

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col lg:flex-row">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">
            Service Categories
          </h1>
          <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
            Organize loan types across Residential, Commercial, Refinance, and Asset Finance tiers.
          </p>
        </div>

        <CategoryManager categories={categories} />
      </main>
    </div>
  );
}
