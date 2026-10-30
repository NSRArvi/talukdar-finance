"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Loader2,
  Check,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { BlogPost, ServiceCategory } from "@/types";

interface PostFormProps {
  initialPost?: BlogPost;
  categories: ServiceCategory[];
  isEditing?: boolean;
}

export function PostForm({
  initialPost,
  categories,
  isEditing = false,
}: PostFormProps) {
  const router = useRouter();

  const [id, setId] = React.useState(initialPost?.id || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(
    Boolean(initialPost?.id)
  );
  const [title, setTitle] = React.useState(initialPost?.title || "");
  const [category, setCategory] = React.useState(
    initialPost?.category || categories[0]?.slug || "residential"
  );
  const [excerpt, setExcerpt] = React.useState(initialPost?.excerpt || "");
  const [thumbnailUrl, setThumbnailUrl] = React.useState(
    initialPost?.thumbnail_url ||
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
  );
  const [contentHtml, setContentHtml] = React.useState(
    initialPost?.content_html ||
      "<h2>Market Analysis</h2><p>Provide Australian property, mortgage, or credit insights here...</p>"
  );
  const [authorName, setAuthorName] = React.useState(
    initialPost?.author_name || "Talukdar Research Team"
  );
  const [readTime, setReadTime] = React.useState(
    initialPost?.read_time_minutes || 4
  );
  const [metaTitle, setMetaTitle] = React.useState(
    initialPost?.meta_title || ""
  );
  const [metaDescription, setMetaDescription] = React.useState(
    initialPost?.meta_description || ""
  );
  const [isPublished, setIsPublished] = React.useState(
    initialPost?.is_published !== undefined ? initialPost.is_published : true
  );

  const [uploadingThumb, setUploadingThumb] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
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

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing && !isSlugManuallyEdited) {
      setId(generateSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugManuallyEdited(true);
    setId(generateSlug(val));
  };

  // Thumbnail upload to Supabase Storage
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }

    setUploadingThumb(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const safeId = (id || "insight").replace(/[^a-zA-Z0-9_-]/g, "");
      const fileName = `thumb-${safeId}-${Date.now()}.${ext}`;
      const filePath = `blog-thumbnails/${fileName}`;

      const { error } = await supabase.storage
        .from("service-images")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (error) throw error;

      const { data } = supabase.storage
        .from("service-images")
        .getPublicUrl(filePath);

      if (data?.publicUrl) {
        setThumbnailUrl(data.publicUrl);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      alert(msg);
    } finally {
      setUploadingThumb(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!id.trim() || !title.trim() || !excerpt.trim()) {
      setErrorMsg("Please provide an ID slug, Article Title, and Summary Excerpt.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const payload = {
        id: id.trim().toLowerCase(),
        title: title.trim(),
        category,
        excerpt: excerpt.trim(),
        thumbnail_url: thumbnailUrl.trim(),
        content_html: contentHtml,
        author_name: authorName.trim(),
        read_time_minutes: Number(readTime) || 4,
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
        is_published: isPublished,
        published_at: initialPost?.published_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", initialPost?.id || id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("posts").insert([payload]);
        if (error) throw error;
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save post";
      setErrorMsg(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-navy)] hover:text-[var(--color-brand-blue)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>
        <span className="text-xs text-[var(--color-brand-text-muted)]">
          {isEditing ? `Editing: ${initialPost?.id}` : "Authoring New Article"}
        </span>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2 Spans) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <h2 className="text-sm font-bold text-[var(--color-brand-navy)] border-b border-slate-100 pb-2">
              Article Meta &amp; Details
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Article Headline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. 2026 Australian Mortgage Interest Rate Forecast"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                disabled={isEditing}
                value={id}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="e.g. australian-mortgage-rate-forecast-2026"
                className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] disabled:bg-slate-100 disabled:text-slate-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Public URL: <code>/insights/{id || "[slug]"}</code>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] capitalize"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Read Time (Minutes)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={readTime}
                  onChange={(e) => setReadTime(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Excerpt / Lead Paragraph <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A compelling 2-3 sentence overview displayed on article cards..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
              />
            </div>
          </div>

          {/* Full Article Rich Text Editor with Image Upload */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-[var(--color-brand-navy)]">
                Article Body &amp; Media
              </h2>
              <span className="text-[11px] text-slate-400">
                Supports headings, lists, bold, links, and inline images
              </span>
            </div>

            <RichTextEditor
              value={contentHtml}
              onChange={(val) => setContentHtml(val)}
              minHeight="450px"
              allowImageUpload={true}
            />
          </div>

          {/* SEO Meta */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <h2 className="text-sm font-bold text-[var(--color-brand-navy)] border-b border-slate-100 pb-2">
              Search Engine Optimization (SEO)
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Leave blank to default to headline"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SEO Meta Description
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Leave blank to default to excerpt"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Controls (1 Span) */}
        <div className="flex flex-col gap-6">
          {/* Cover Thumbnail Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <h2 className="text-sm font-bold text-[var(--color-brand-navy)] border-b border-slate-100 pb-2">
              Cover Thumbnail Image
            </h2>

            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={title || "Cover preview"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-xs">No cover image</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Upload New Thumbnail
              </label>
              <label className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-[var(--color-brand-blue)] hover:bg-[var(--color-brand-soft-blue)] transition-colors text-xs font-semibold text-[var(--color-brand-navy)]">
                {uploadingThumb ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand-blue)]" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-[var(--color-brand-blue)]" />
                    <span>Upload Thumbnail</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  disabled={uploadingThumb}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Or Direct Image URL
              </label>
              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
              />
            </div>
          </div>

          {/* Author & Publishing Controls */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <h2 className="text-sm font-bold text-[var(--color-brand-navy)] border-b border-slate-100 pb-2">
              Publishing Options
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Author Attribution
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Talukdar Research Team"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700">
                Publish Immediately
              </span>
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isPublished ? "bg-emerald-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isPublished ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || uploadingThumb}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Article...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {isEditing ? "Update Article" : "Publish Article"}
                </>
              )}
            </button>

            <Link
              href="/admin/posts"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

