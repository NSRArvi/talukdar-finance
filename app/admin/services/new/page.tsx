import * as React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ServiceForm } from "@/components/admin/service-form";
import { getServiceCategories } from "@/lib/services";

export const metadata = {
  title: "Create Loan Facility | Talukdar Finance Admin",
  description: "Add a new financial service or loan facility.",
};

export default async function NewServicePage() {
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

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">
            Create New Loan Facility
          </h1>
          <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
            Configure financial parameters, marketing copy, and key Australian credit benefits.
          </p>
        </div>

        <ServiceForm categories={categories} />
      </main>
    </div>
  );
}
