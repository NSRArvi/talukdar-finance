import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Plus, Edit2, ExternalLink, Layers } from "lucide-react";
import { getServices, getServiceCategories } from "@/lib/services";
import { DeleteServiceButton } from "./delete-service-button";

export const metadata = {
  title: "Services Management | Talukdar Finance Admin",
  description: "Create, edit, and organize Australian finance facilities.",
};

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [services, categories] = await Promise.all([
    getServices(),
    getServiceCategories(),
  ]);

  const categoryMap = new Map(categories.map((c) => [c.slug, c.name]));

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col lg:flex-row">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 flex flex-col gap-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">
              Loan Services &amp; Facilities
            </h1>
            <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
              Manage public loan facilities, image assets, features, and detailed descriptions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/categories"
              className="px-4 py-2.5 rounded-xl border border-[var(--color-brand-border)] bg-white text-xs font-semibold text-[var(--color-brand-navy)] hover:bg-slate-50 transition-colors shadow-xs"
            >
              Manage Categories
            </Link>
            <Link
              href="/admin/services/new"
              className="px-4 py-2.5 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Service</span>
            </Link>
          </div>
        </div>

        {/* Services List Table */}
        <div className="rounded-3xl bg-white border border-[var(--color-brand-border)] shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[var(--color-brand-text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--color-brand-border)]">
                <tr>
                  <th className="py-3.5 px-5">Image</th>
                  <th className="py-3.5 px-5">Service Title &amp; Slug</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Badge / Policy</th>
                  <th className="py-3.5 px-5">Key Features</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-brand-border)] text-[var(--color-brand-text)]">
                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-5">
                        <div className="relative h-12 w-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image
                            src={service.imageSrc}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-[var(--color-brand-navy)]">
                            {service.title}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            /{service.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[var(--color-brand-soft-blue)] text-[var(--color-brand-navy)] font-semibold text-[11px]">
                          {categoryMap.get(service.category) || service.category}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        {service.badge ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                            {service.badge}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-4 px-5 max-w-xs">
                        <span className="text-slate-600 line-clamp-2">
                          {service.features && service.features.length > 0
                            ? service.features.join(" • ")
                            : "—"}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/solutions/${service.id}`}
                            target="_blank"
                            title="View Public Page"
                            className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[var(--color-brand-blue)] hover:border-[var(--color-brand-blue)] transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                          <Link
                            href={`/admin/services/${service.id}`}
                            title="Edit Service"
                            className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[var(--color-brand-navy)] hover:bg-slate-100 transition-colors"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Link>
                          <DeleteServiceButton serviceId={service.id} serviceTitle={service.title} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="font-medium">No services created yet.</p>
                      <p className="text-[11px] mt-0.5">Click &ldquo;Add New Service&rdquo; above to publish your first facility.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
