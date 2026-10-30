import * as React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LegalManager } from "./legal-manager";
import type { LegalDocument } from "@/types";

export const metadata = {
  title: "Legal & Policies | Talukdar Finance Admin",
  description: "Manage dynamic Privacy Policy and Terms of Use documents with Rich Text.",
};

export default async function AdminLegalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data } = await supabase.from("legal_documents").select("*");
  const documents = (data as LegalDocument[]) || [];

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col lg:flex-row">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">
            Legal &amp; Policy Documents
          </h1>
          <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
            Update your Australian Privacy Policy and Website Terms of Use with rich text formatting.
          </p>
        </div>

        <LegalManager initialDocuments={documents} />
      </main>
    </div>
  );
}

