import * as React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { HeroSlidesManager } from "./hero-slides-manager";
import { getHeroSlides } from "@/lib/services";

export const metadata = {
  title: "Hero Banner Slides | Talukdar Finance Admin",
  description: "Manage homepage hero banner pathways, headlines, descriptions, and photography.",
};

export default async function AdminHeroPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch all hero slides (both active and inactive)
  const { data } = await supabase
    .from("hero_slides")
    .select("*")
    .order("display_order", { ascending: true });

  const initialSlides = (data && data.length > 0) ? data : await getHeroSlides();

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col lg:flex-row">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">
            Homepage Hero Slides &amp; Pathways
          </h1>
          <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
            Customize the 3 main category pathways (Car Loans, Home Loans, Commercial), swap pictures, and rewrite headlines.
          </p>
        </div>

        <HeroSlidesManager initialSlides={initialSlides} />
      </main>
    </div>
  );
}

