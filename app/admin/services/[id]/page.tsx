import * as React from "react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ServiceForm } from "@/components/admin/service-form";
import { getServiceById, getServiceCategories } from "@/lib/services";

export const metadata = {
  title: "Edit Facility | Talukdar Finance Admin",
  description: "Modify an existing loan facility or financial service.",
};

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [service, categories] = await Promise.all([
    getServiceById(id),
    getServiceCategories(),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col lg:flex-row">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">
            Edit Loan Facility: {service.title}
          </h1>
          <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
            Updating slug: <code className="font-mono">{service.id}</code>
          </p>
        </div>

        <ServiceForm
          initialService={service}
          categories={categories}
          isEditing={true}
        />
      </main>
    </div>
  );
}
