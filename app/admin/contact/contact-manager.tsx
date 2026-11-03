"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Loader2,
  Check,
  Building,
  Mail,
  Phone,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ContactInfo } from "@/types";

interface ContactManagerProps {
  initialInfo: ContactInfo;
}

export function ContactManager({ initialInfo }: ContactManagerProps) {
  const router = useRouter();
  const [formData, setFormData] = React.useState<ContactInfo>(initialInfo);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleChange = (
    field: keyof ContactInfo,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_info").upsert({
        ...formData,
        id: "primary",
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      setSuccessMsg("Contact & map information updated successfully!");
      router.refresh();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update contact info.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 max-w-4xl">
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Office & Address Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--color-brand-blue)] flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--color-brand-navy)]">
              Office Details &amp; Address
            </h2>
            <p className="text-xs text-slate-500">
              Displayed in the first card on the contact page.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Office Title
            </label>
            <input
              type="text"
              value={formData.office_title}
              onChange={(e) => handleChange("office_title", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Address Line 1 (Suite / Street)
            </label>
            <input
              type="text"
              value={formData.address_line1}
              onChange={(e) => handleChange("address_line1", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Address Line 2 (City, State, Postcode)
            </label>
            <input
              type="text"
              value={formData.address_line2}
              onChange={(e) => handleChange("address_line2", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Location Footnote / Note
            </label>
            <input
              type="text"
              value={formData.address_note || ""}
              onChange={(e) => handleChange("address_note", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              placeholder="e.g. Convenient parking & public transit nearby"
            />
          </div>
        </div>
      </div>

      {/* Email & Phone Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--color-brand-navy)]">
              Communication Channels
            </h2>
            <p className="text-xs text-slate-500">
              Direct inbox, customer care hotline, and expected response time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              placeholder="e.g. 1300 000 000"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Email Response Footnote
            </label>
            <input
              type="text"
              value={formData.email_note || ""}
              onChange={(e) => handleChange("email_note", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              placeholder="e.g. Responds within 1 business day"
            />
          </div>
        </div>
      </div>

      {/* Operating Hours Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--color-brand-navy)]">
              Operating Hours
            </h2>
            <p className="text-xs text-slate-500">
              Broker availability for phone consultations and office meetings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Weekdays (Mon – Fri)
            </label>
            <input
              type="text"
              value={formData.hours_weekdays}
              onChange={(e) => handleChange("hours_weekdays", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Weekends (Sat – Sun)
            </label>
            <input
              type="text"
              value={formData.hours_weekends}
              onChange={(e) => handleChange("hours_weekends", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Hours Footnote / Note
            </label>
            <input
              type="text"
              value={formData.hours_note || ""}
              onChange={(e) => handleChange("hours_note", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              placeholder="e.g. After-hours calls available on request"
            />
          </div>
        </div>
      </div>

      {/* Map Query Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[var(--color-brand-blue)] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--color-brand-navy)]">
              Interactive Google Map Location
            </h2>
            <p className="text-xs text-slate-500">
              The exact address query string pinned on the public Google Map iframe.
            </p>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
            Full Google Maps Location Query
          </label>
          <input
            type="text"
            value={formData.map_query}
            onChange={(e) => handleChange("map_query", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
            required
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Example: Suite 15, 186 Queen Street, Campbelltown, NSW 2560
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 py-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-sm font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Contact &amp; Map Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

