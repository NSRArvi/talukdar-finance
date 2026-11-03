"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Save,
  Loader2,
  Check,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Layers,
  Sparkles,
  Upload,
  ImageIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { HeroSlide } from "@/types";

interface HeroSlidesManagerProps {
  initialSlides: HeroSlide[];
}

export function HeroSlidesManager({ initialSlides }: HeroSlidesManagerProps) {
  const router = useRouter();
  const [slides, setSlides] = React.useState<HeroSlide[]>(initialSlides);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [uploadingThumb, setUploadingThumb] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  // Form state
  const [id, setId] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [titlePrefix, setTitlePrefix] = React.useState("");
  const [titleHighlight, setTitleHighlight] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("/screen.png");
  const [thumbUrl, setThumbUrl] = React.useState("/screen.png");

  const resetForm = () => {
    setEditingId(null);
    setId("");
    setLabel("");
    setTitlePrefix("");
    setTitleHighlight("");
    setDescription("");
    setImageUrl("/screen.png");
    setThumbUrl("/screen.png");
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingId(slide.id);
    setId(slide.id);
    setLabel(slide.label);
    setTitlePrefix(slide.title_prefix);
    setTitleHighlight(slide.title_highlight);
    setDescription(slide.description);
    setImageUrl(slide.image_url);
    setThumbUrl(slide.thumb_url);
  };

  // Upload main hero cutout picture to Supabase Storage bucket 'service-images'
  const handleUploadHeroImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image file size must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const safeId = (id || "hero").replace(/[^a-zA-Z0-9_-]/g, "");
      const fileName = `hero-${safeId}-${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("service-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("service-images")
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        setImageUrl(urlData.publicUrl);
        // If thumb is not set or same as previous, also update thumb
        if (!thumbUrl || thumbUrl.startsWith("/screen")) {
          setThumbUrl(urlData.publicUrl);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image.";
      setErrorMsg(msg);
    } finally {
      setUploadingImage(false);
    }
  };

  // Upload small pill thumbnail
  const handleUploadThumb = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image file size must be less than 5MB");
      return;
    }

    setUploadingThumb(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const safeId = (id || "thumb").replace(/[^a-zA-Z0-9_-]/g, "");
      const fileName = `thumb-${safeId}-${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("service-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("service-images")
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        setThumbUrl(urlData.publicUrl);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload thumbnail.";
      setErrorMsg(msg);
    } finally {
      setUploadingThumb(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    const targetId = editingId || id.trim().toLowerCase().replace(/\s+/g, "-");

    if (!targetId || !label || !titlePrefix || !titleHighlight || !description) {
      setErrorMsg("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();
      const slideData = {
        id: targetId,
        label,
        title_prefix: titlePrefix,
        title_highlight: titleHighlight,
        description,
        image_url: imageUrl || "/screen.png",
        thumb_url: thumbUrl || imageUrl || "/screen.png",
        display_order: editingId
          ? slides.find((s) => s.id === editingId)?.display_order || 1
          : slides.length + 1,
        is_active: true,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("hero_slides").upsert(slideData);
      if (error) throw error;

      setSuccessMsg("Hero slide saved successfully!");
      resetForm();
      router.refresh();

      // Update local state
      setSlides((prev) => {
        const idx = prev.findIndex((s) => s.id === targetId);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = slideData;
          return updated;
        }
        return [...prev, slideData];
      });

      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save slide.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleActive = async (slide: HeroSlide) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("hero_slides")
        .update({ is_active: !slide.is_active, updated_at: new Date().toISOString() })
        .eq("id", slide.id);

      if (error) throw error;

      setSlides((prev) =>
        prev.map((s) => (s.id === slide.id ? { ...s, is_active: !s.is_active } : s))
      );
      router.refresh();
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  };

  const handleDelete = async (slideId: string) => {
    if (!confirm("Are you sure you want to delete this hero slide?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("hero_slides").delete().eq("id", slideId);
      if (error) throw error;

      setSlides((prev) => prev.filter((s) => s.id !== slideId));
      if (editingId === slideId) resetForm();
      router.refresh();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl">
      {/* Left Column: Form */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <form
          onSubmit={handleSave}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-5"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-[var(--color-brand-navy)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-brand-blue)]" />
              <span>{editingId ? "Edit Hero Slide" : "Create New Slide"}</span>
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-slate-500 hover:text-black underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Slide Identifier (Slug)
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={!!editingId}
                placeholder="e.g. car-finance"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden disabled:bg-slate-100"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Switcher Pill Label
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Car Loans ($0 Deposit)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Title Prefix (White Text)
              </label>
              <input
                type="text"
                value={titlePrefix}
                onChange={(e) => setTitlePrefix(e.target.value)}
                placeholder="e.g. Drive away sooner with "
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Title Highlight (Cyan Text)
              </label>
              <input
                type="text"
                value={titleHighlight}
                onChange={(e) => setTitleHighlight(e.target.value)}
                placeholder="e.g. $0 Deposit."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Description Body
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief value proposition (1-2 sentences)..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[var(--color-brand-blue)] focus:outline-hidden"
              required
            />
          </div>

          {/* Image Asset Upload Card (Bucket: service-images) */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-[#FBFBFA] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-navy)] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[var(--color-brand-blue)]" />
                <span>Hero Photography (Cutout Image)</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Supabase Bucket: <code>service-images</code>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Preview */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={label || "Hero preview"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-1.5">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[11px]">No image selected</span>
                  </div>
                )}
              </div>

              {/* Upload Input */}
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-[var(--color-brand-blue)] hover:bg-blue-50/50 transition-colors text-xs font-bold text-[var(--color-brand-navy)]">
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand-blue)]" />
                      <span>Uploading to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-[var(--color-brand-blue)]" />
                      <span>Upload Cutout (PNG, JPG, WebP)</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadHeroImage}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                    Or Direct URL / Path
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://... or /screen 2.png"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Thumbnail Upload (Optional separate thumbnail) */}
            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <Image
                    src={thumbUrl || imageUrl || "/screen.png"}
                    alt="Thumb"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Pill Thumbnail
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Shown inside the floating button pill
                  </span>
                </div>
              </div>

              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 cursor-pointer">
                {uploadingThumb ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                ) : (
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                )}
                <span>Change Thumb</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadThumb}
                  disabled={uploadingThumb}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || uploadingImage || uploadingThumb}
            className="w-full py-3.5 rounded-full bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{editingId ? "Update Hero Slide" : "Add Hero Slide"}</span>
          </button>
        </form>
      </div>

      {/* Right Column: Active Slides List */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[var(--color-brand-navy)] uppercase tracking-wider">
            Live Hero Slides ({slides.length})
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`p-4 rounded-2xl border transition-all bg-white flex items-center justify-between gap-3 shadow-xs ${
                editingId === slide.id
                  ? "border-[var(--color-brand-blue)] ring-2 ring-blue-100"
                  : "border-slate-200/90"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                  <Image
                    src={slide.thumb_url || slide.image_url || "/screen.png"}
                    alt={slide.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--color-brand-navy)] truncate">
                      {slide.label}
                    </span>
                    {!slide.is_active && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {slide.title_prefix} <span className="text-blue-600 font-bold">{slide.title_highlight}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleActive(slide)}
                  title={slide.is_active ? "Unpublish" : "Publish"}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                >
                  {slide.is_active ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleEdit(slide)}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[var(--color-brand-blue)] text-xs font-bold"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(slide.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
