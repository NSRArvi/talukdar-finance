"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Loader2,
  Check,
  ImageIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ServiceItem, ServiceCategory } from "@/types/service";

const ICON_OPTIONS = [
  "Home",
  "RefreshCw",
  "TrendingUp",
  "HardHat",
  "Car",
  "Wrench",
  "Building",
  "Briefcase",
  "Layers",
  "UserCheck",
  "Sparkles",
  "GraduationCap",
  "CreditCard",
  "Shield",
  "PiggyBank",
];

interface ServiceFormProps {
  initialService?: ServiceItem;
  categories: ServiceCategory[];
  isEditing?: boolean;
}

export function ServiceForm({
  initialService,
  categories,
  isEditing = false,
}: ServiceFormProps) {
  const router = useRouter();

  const [id, setId] = React.useState(initialService?.id || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(
    Boolean(initialService?.id)
  );
  const [category, setCategory] = React.useState(
    initialService?.category || categories[0]?.slug || "residential"
  );
  const [iconName, setIconName] = React.useState(
    initialService?.iconName || "Home"
  );
  const [title, setTitle] = React.useState(initialService?.title || "");
  const [badge, setBadge] = React.useState(initialService?.badge || "");
  const [actionText, setActionText] = React.useState(
    initialService?.actionText || "Explore Loan Facility"
  );
  const [description, setDescription] = React.useState(
    initialService?.description || ""
  );
  const [longDescription, setLongDescription] = React.useState(
    initialService?.long_description || ""
  );
  const [imageSrc, setImageSrc] = React.useState(
    initialService?.imageSrc ||
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
  );
  const [features, setFeatures] = React.useState<string[]>(
    initialService?.features && initialService.features.length > 0
      ? initialService.features
      : [""]
  );

  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  // Auto-generate slug ID from title if in create mode
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

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Image Upload to Supabase Storage bucket 'service-images'
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image file size must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const safeId = (id || "service").replace(/[^a-zA-Z0-9_-]/g, "");
      const fileName = `${safeId}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("service-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from("service-images")
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        setImageSrc(urlData.publicUrl);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      alert(`Image upload failed: ${msg}. Make sure bucket "service-images" exists in Supabase.`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!id.trim() || !title.trim() || !description.trim()) {
      setErrorMessage("Please complete all required fields (ID/Slug, Title, and Description).");
      return;
    }

    const filteredFeatures = features.map((f) => f.trim()).filter(Boolean);

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const payload = {
        id: id.trim().toLowerCase(),
        category,
        iconName,
        title: title.trim(),
        badge: badge.trim() || null,
        description: description.trim(),
        long_description: longDescription.trim() || null,
        features: filteredFeatures,
        imageSrc: imageSrc.trim(),
        actionText: actionText.trim() || "Explore Loan Facility",
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from("services")
          .update(payload)
          .eq("id", initialService?.id || id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert([payload]);
        if (error) throw error;
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save service";
      setErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-navy)] hover:text-[var(--color-brand-cyan)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
        <span className="text-xs text-[var(--color-brand-text-muted)]">
          {isEditing ? `Editing: ${initialService?.id}` : "Creating New Facility"}
        </span>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      {/* Main Form Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Core Meta & Content (2 spans) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-bold text-[var(--color-brand-navy)] border-b pb-2">
              Facility Details
            </h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Facility Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. First Home Buyer Loans"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)] focus:border-transparent transition-all"
              />
            </div>

            {/* Slug / ID */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Unique Slug / ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                disabled={isEditing}
                value={id}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="e.g. first-home-buyer"
                className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)] disabled:bg-gray-100 disabled:text-gray-500 transition-all"
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                Public URL: <code>/solutions/{id || "[slug]"}</code>
              </span>
            </div>

            {/* Category & Icon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)] capitalize"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Lucide Icon Name
                </label>
                <select
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Badge & Action Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Highlight Badge (Optional)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Government Schemes Eligible"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Card Action Text
                </label>
                <input
                  type="text"
                  value={actionText}
                  onChange={(e) => setActionText(e.target.value)}
                  placeholder="e.g. Explore First Home Loans"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Summary Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief 1-2 sentence overview shown on solution cards..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
              />
            </div>

            {/* Long Detailed Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Comprehensive Description (Details Page)
              </label>
              <textarea
                rows={6}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Multi-paragraph detailed explanation of loan parameters, criteria, Australian regulatory context, and advice..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                Supports line breaks and paragraphs for rich reading experience on the detail page.
              </span>
            </div>
          </div>

          {/* Key Features List */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-base font-bold text-[var(--color-brand-navy)]">
                Key Features &amp; Highlights
              </h2>
              <button
                type="button"
                onClick={handleAddFeature}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-cyan)] hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Bullet Point
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-400 w-4 text-center">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    placeholder="e.g. Access to 5% deposit schemes without LMI"
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove feature"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Image Asset & Submit (1 span) */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-bold text-[var(--color-brand-navy)] border-b pb-2">
              Facility Image Asset
            </h2>

            {/* Image Preview */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title || "Facility preview"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-xs">No image provided</span>
                </div>
              )}
            </div>

            {/* Upload to Supabase Storage */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Upload New Image File
              </label>
              <label className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[var(--color-brand-cyan)] hover:bg-[var(--color-brand-soft-blue)] transition-colors text-xs font-semibold text-[var(--color-brand-navy)]">
                {uploadingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand-cyan)]" />
                    <span>Uploading to Supabase...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-[var(--color-brand-cyan)]" />
                    <span>Choose Image (PNG, JPG, WebP)</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-gray-400 mt-1">
                Uploads directly to Supabase storage bucket <code>service-images</code>.
              </p>
            </div>

            {/* Direct Image URL fallback */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Or Direct Image URL
              </label>
              <input
                type="url"
                value={imageSrc}
                onChange={(e) => setImageSrc(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]"
              />
            </div>
          </div>

          {/* Action Buttons Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
            <button
              type="submit"
              disabled={isSubmitting || uploadingImage}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-brand-navy)] text-white text-xs font-bold tracking-wide hover:brightness-110 shadow-sm transition-all disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Facility...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {isEditing ? "Save & Update Facility" : "Publish Facility"}
                </>
              )}
            </button>

            <Link
              href="/admin/services"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

