"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, Tag, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ServiceCategory } from "@/types/service";

interface CategoryManagerProps {
  categories: ServiceCategory[];
}

export function CategoryManager({ categories }: CategoryManagerProps) {
  const router = useRouter();
  const [slug, setSlug] = React.useState("");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugManuallyEdited(true);
    setSlug(generateSlug(val));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!slug.trim() || !name.trim()) {
      setErrorMsg("Please provide both category name and slug.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("service_categories").insert([
        {
          slug: slug.trim().toLowerCase(),
          name: name.trim(),
          description: description.trim() || null,
          display_order: categories.length + 1,
        },
      ]);

      if (error) throw error;

      setName("");
      setSlug("");
      setDescription("");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create category";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (cat: ServiceCategory) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete category "${cat.name}"? Any services currently under this category should be reassigned.`
    );
    if (!confirmed) return;

    setDeletingId(cat.id);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("service_categories")
        .delete()
        .eq("id", cat.id);

      if (error) throw error;

      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete category";
      alert(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Create Category Form */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b pb-3">
          <Tag className="w-5 h-5 text-[var(--color-brand-cyan)]" />
          <h2 className="text-base font-bold text-[var(--color-brand-navy)]">
            Add New Category
          </h2>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Commercial & Business"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Slug Identifier <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="e.g. commercial"
              className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Auto-generated URL identifier (e.g. <code>residential</code>, <code>commercial</code>).
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Brief Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short note about this portfolio classification..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-brand-navy)] text-white text-xs font-bold hover:brightness-110 shadow-sm transition-all disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Adding...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" /> Save Category
              </>
            )}
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-bold text-[var(--color-brand-navy)]">
            Configured Categories ({categories.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[var(--color-brand-navy)]">
                    {cat.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[11px]">
                      {cat.slug}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 max-w-xs truncate">
                    {cat.description || "—"}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(cat)}
                      disabled={deletingId === cat.id}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete category"
                    >
                      {deletingId === cat.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

