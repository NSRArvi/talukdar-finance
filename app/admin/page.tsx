import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import {
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Talukdar Finance",
  description: "Internal brokerage administration and management portal.",
};

interface ConsultationRecord {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  finance_type: string;
  service_name?: string | null;
  contact_method: string;
  message: string | null;
  status: string | null;
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch consultation inquiries from Supabase
  const { data } = await supabase
    .from("consultations")
    .select("*")
    .order("created_at", { ascending: false });

  const consultations = (data as ConsultationRecord[]) || [];

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col lg:flex-row">
      <AdminSidebar userEmail={user.email} />

      {/* Main Admin Workspace */}
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 flex flex-col gap-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-2xl bg-white p-5 border border-[var(--color-brand-border)] shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-[var(--color-brand-text-muted)] font-medium">
                Total Inquiries
              </span>
              <div className="text-2xl font-bold text-[var(--color-brand-navy)]">
                {consultations.length}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-[var(--color-brand-border)] shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-[var(--color-brand-text-muted)] font-medium">
                Pending Review
              </span>
              <div className="text-2xl font-bold text-[var(--color-brand-navy)]">
                {consultations.filter((c) => c.status === "new" || !c.status).length}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-[var(--color-brand-border)] shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-[var(--color-brand-text-muted)] font-medium">
                Contacted
              </span>
              <div className="text-2xl font-bold text-[var(--color-brand-navy)]">
                {consultations.filter((c) => c.status === "contacted").length}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-[var(--color-brand-border)] shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-[var(--color-brand-text-muted)] font-medium">
                Database Status
              </span>
              <div className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Supabase Connected
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries Table / Section */}
        <div className="rounded-3xl bg-white border border-[var(--color-brand-border)] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[var(--color-brand-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-brand-navy)]">
                Consultation Requests &amp; Leads
              </h2>
              <p className="text-xs text-[var(--color-brand-text-muted)]">
                Direct client inquiries submitted through the website consultation form
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/#consultation"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-brand-border)] text-xs font-semibold text-[var(--color-brand-navy)] hover:bg-slate-50 transition-colors"
              >
                <span>Preview Public Form</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[var(--color-brand-text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--color-brand-border)]">
                <tr>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5">Name</th>
                  <th className="py-3.5 px-5">Contact</th>
                  <th className="py-3.5 px-5">Category &amp; Facility</th>
                  <th className="py-3.5 px-5">Preferred</th>
                  <th className="py-3.5 px-5">Notes / Message</th>
                  <th className="py-3.5 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-brand-border)] text-[var(--color-brand-text)]">
                {consultations.length > 0 ? (
                  consultations.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5 text-slate-500 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-5 font-semibold text-[var(--color-brand-navy)]">
                        {item.full_name}
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-col">
                          <span>{item.email}</span>
                          <span className="text-slate-500">{item.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-col items-start gap-1">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-[var(--color-brand-blue)] font-semibold uppercase tracking-wider text-[10px]">
                            {item.finance_type}
                          </span>
                          {item.service_name && (
                            <span className="text-xs font-bold text-[var(--color-brand-navy)] truncate max-w-[200px]" title={item.service_name}>
                              {item.service_name}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-5 uppercase text-[10px] font-semibold text-slate-500">
                        {item.contact_method}
                      </td>
                      <td className="py-4 px-5 max-w-xs truncate text-slate-600">
                        {item.message || "—"}
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          {item.status || "New"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="font-medium">No inquiries received yet.</p>
                      <p className="text-[11px] mt-0.5 text-slate-400">
                        Inquiries submitted from the consultation form will populate in real-time here.
                      </p>
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
