import { createClient } from "@/lib/supabase/server";
import type { ServiceItem, ServiceCategory, FinanceOption, FAQItem, LegalDocument, BlogPost } from "@/types";

/**
 * Fetch all services directly from Supabase server database.
 */
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data) {
      console.error("Error fetching services from Supabase:", error);
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      category: item.category,
      iconName: item.iconName || "Home",
      title: item.title,
      badge: item.badge,
      description: item.description,
      long_description: item.long_description,
      features: Array.isArray(item.features)
        ? item.features
        : typeof item.features === "string"
        ? JSON.parse(item.features)
        : [],
      imageSrc: item.imageSrc,
      actionText: item.actionText,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (err) {
    console.error("Supabase getServices failure:", err);
    return [];
  }
}

/**
 * Fetch a single service by ID (slug) directly from Supabase server database.
 */
export async function getServiceById(id: string): Promise<ServiceItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      category: data.category,
      iconName: data.iconName || "Home",
      title: data.title,
      badge: data.badge,
      description: data.description,
      long_description: data.long_description,
      features: Array.isArray(data.features)
        ? data.features
        : typeof data.features === "string"
        ? JSON.parse(data.features)
        : [],
      imageSrc: data.imageSrc,
      actionText: data.actionText,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (err) {
    console.error("Supabase getServiceById failure:", err);
    return null;
  }
}

/**
 * Fetch all categories directly from Supabase server database.
 */
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("service_categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.error("Supabase getServiceCategories failure:", err);
  }

  return [];
}

/**
 * Fetch all active consultation finance options from Supabase.
 */
export async function getFinanceOptions(): Promise<FinanceOption[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("finance_options")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.error("Supabase getFinanceOptions failure:", err);
  }

  return [];
}

/**
 * Fetch all published FAQs ordered by display_order
 */
export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.error("Supabase getFAQs failure:", err);
  }

  return [];
}

/**
 * Fetch a legal document by ID ('privacy-policy' or 'terms-of-use')
 */
export async function getLegalDocument(id: string): Promise<LegalDocument | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("legal_documents")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.error(`Supabase getLegalDocument(${id}) failure:`, err);
  }

  return null;
}

/**
 * Fetch all published blog posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.error("Supabase getBlogPosts failure:", err);
  }

  return [];
}

/**
 * Fetch a single blog post by slug ID
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", slug)
      .single();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.error(`Supabase getBlogPostBySlug(${slug}) failure:`, err);
  }

  return null;
}
