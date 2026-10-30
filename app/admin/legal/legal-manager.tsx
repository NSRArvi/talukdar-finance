"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Check, ArrowUpRight, ShieldCheck, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { LegalDocument } from "@/types";

interface LegalManagerProps {
  initialDocuments: LegalDocument[];
}

export function LegalManager({ initialDocuments }: LegalManagerProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState<string>(
    initialDocuments[0]?.id || "privacy-policy"
  );

  const activeDoc =
    initialDocuments.find((d) => d.id === selectedId) || {
      id: selectedId,
      title:
        selectedId === "privacy-policy" ? "Privacy Policy" : "Terms of Use",
      meta_title: "",
      meta_description: "",
      content_html: "<p>Start writing your legal policy here...</p>",
    };

  const [title, setTitle] = React.useState(activeDoc.title);
  const [metaTitle, setMetaTitle] = React.useState(activeDoc.meta_title || "");
  const [metaDescription, setMetaDescription] = React.useState(
    activeDoc.meta_description || ""
  );
  const [contentHtml, setContentHtml] = React.useState(activeDoc.content_html);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  // Switch tabs
  const handleSelectTab = (docId: string) => {
    setSelectedId(docId);
    setSuccessMsg("");
    setErrorMsg("");
    const doc = initialDocuments.find((d) => d.id === docId);
    if (doc) {
      setTitle(doc.title);
      setMetaTitle(doc.meta_title || "");
      setMetaDescription(doc.meta_description || "");
      setContentHtml(doc.content_html);
    } else {
      const defaultTitle =
        docId === "privacy-policy" ? "Privacy Policy" : "Terms of Use";
      setTitle(defaultTitle);
      setMetaTitle(`${defaultTitle} | Talukdar Finance`);
      setMetaDescription(`Australian ${defaultTitle} for Talukdar Finance.`);
      setContentHtml("<p>Start writing legal content...</p>");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const supabase = createClient();
      const payload = {
        id: selectedId,
        title: title.trim(),
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
        content_html: contentHtml,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("legal_documents")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMsg(`"${title}" successfully published and live!`);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save document";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const publicUrl = selectedId === "privacy-policy" ? "/privacy" : "/terms";

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      {/* Switch Document Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSelectTab("privacy-policy")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              selectedId === "privacy-policy"
                ? "bg-[var(--color-brand-blue)] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTab("terms-of-use")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              selectedId === "terms-of-use"
                ? "bg-[var(--color-brand-blue)] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Use</span>
          </button>
        </div>

        <Link
          href={publicUrl}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-blue)] hover:underline"
        >
          <span>View Live Page</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* SEO Meta Fields */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
          <h2 className="text-sm font-bold text-[var(--color-brand-navy)] border-b border-slate-100 pb-2">
            Page Title &amp; SEO Meta Data
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Document Display Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Privacy Policy"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="e.g. Privacy Policy | Talukdar Finance"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              SEO Meta Description
            </label>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Brief summary for Google search results and sharing..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
            />
          </div>
        </div>

        {/* Rich Text Editor */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-[var(--color-brand-navy)]">
              Document Content (Rich Text)
            </h2>
            <span className="text-[11px] text-slate-400">
              Formatted HTML saved live to database
            </span>
          </div>

          <RichTextEditor
            value={contentHtml}
            onChange={(val) => setContentHtml(val)}
            minHeight="480px"
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" /> Save &amp; Publish {title}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

