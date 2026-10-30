"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Loader2,
  HelpCircle,
  Check,
  Edit2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { FAQItem } from "@/types";

interface FAQManagerProps {
  initialFaqs: FAQItem[];
}

export function FAQManager({ initialFaqs }: FAQManagerProps) {
  const router = useRouter();
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [actionId, setActionId] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!question.trim() || !answer.trim()) {
      setErrorMsg("Please enter both the question and answer.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();

      if (editingId) {
        const { error } = await supabase
          .from("faqs")
          .update({
            question: question.trim(),
            answer: answer.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("faqs").insert([
          {
            question: question.trim(),
            answer: answer.trim(),
            display_order: initialFaqs.length + 1,
            is_published: true,
          },
        ]);

        if (error) throw error;
      }

      setQuestion("");
      setAnswer("");
      setEditingId(null);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save FAQ";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (faq: FAQItem) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
  };

  const togglePublished = async (faq: FAQItem) => {
    setActionId(faq.id);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("faqs")
        .update({ is_published: !faq.is_published })
        .eq("id", faq.id);

      if (error) throw error;
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update FAQ";
      alert(msg);
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (faq: FAQItem) => {
    const confirmed = window.confirm(
      `Delete question: "${faq.question}"?`
    );
    if (!confirmed) return;

    setActionId(faq.id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("faqs").delete().eq("id", faq.id);
      if (error) throw error;
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete FAQ";
      alert(msg);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Create / Edit FAQ Form */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[var(--color-brand-blue)]" />
            <h2 className="text-sm font-bold text-[var(--color-brand-navy)]">
              {editingId ? "Edit FAQ" : "Add FAQ Question"}
            </h2>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Are there upfront fees for consultation?"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Explain policy, broker process, or advice clearly..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />{" "}
                {editingId ? "Update FAQ" : "Publish FAQ"}
              </>
            )}
          </button>
        </form>
      </div>

      {/* FAQs List Table */}
      <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[var(--color-brand-navy)]">
              Published FAQs ({initialFaqs.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              These accordion questions render live on your home and FAQ pages.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Question &amp; Answer</th>
                <th className="py-3 px-4 text-center w-24">Status</th>
                <th className="py-3 px-4 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {initialFaqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    No FAQs found in database. Run the SQL script or add one above.
                  </td>
                </tr>
              ) : (
                initialFaqs.map((faq, idx) => (
                  <tr key={faq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 max-w-md">
                      <p className="font-bold text-[var(--color-brand-navy)] mb-1">
                        {faq.question}
                      </p>
                      <p className="text-slate-500 line-clamp-2 text-[11px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => togglePublished(faq)}
                        disabled={actionId === faq.id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide transition-colors ${
                          faq.is_published !== false
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                        title="Click to toggle publish status"
                      >
                        {faq.is_published !== false ? "Visible" : "Hidden"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(faq)}
                          className="p-1.5 text-slate-500 hover:text-[var(--color-brand-blue)] hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit question"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(faq)}
                          disabled={actionId === faq.id}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete question"
                        >
                          {actionId === faq.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

