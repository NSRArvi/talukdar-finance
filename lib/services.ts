import { createClient } from "@/lib/supabase/server";
import type {
  ServiceItem,
  ServiceCategory,
  FinanceOption,
  FAQItem,
  LegalDocument,
  BlogPost,
  ContactInfo,
  HeroSlide,
} from "@/types";

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

/**
 * Default fallback contact info
 */
export const defaultContactInfo: ContactInfo = {
  id: "primary",
  office_title: "Campbelltown Office",
  address_line1: "Suite 15, 186 Queen Street",
  address_line2: "Campbelltown, NSW 2560",
  address_note: "Convenient parking & public transit nearby",
  email: "advisory@talukdarfinance.com.au",
  email_note: "Responds within 1 business day",
  phone: "1300 000 000",
  hours_weekdays: "9:00 AM – 6:00 PM AEST",
  hours_weekends: "Weekend consultations by appointment",
  hours_note: "After-hours calls available on request",
  map_query: "Suite 15, 186 Queen Street, Campbelltown, NSW 2560",
};

/**
 * Fetch contact details from Supabase with safe fallback
 */
export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .eq("id", "primary")
      .single();

    if (!error && data) {
      return data as ContactInfo;
    }
  } catch (err) {
    console.error("Supabase getContactInfo failure:", err);
  }

  return defaultContactInfo;
}

/**
 * Default fallback hero pathways
 */
export const defaultHeroSlides: HeroSlide[] = [
  {
    id: "car-finance",
    label: "Car Loans ($0 Deposit)",
    thumb_url: "/screen 2.png",
    title_prefix: "Drive away sooner with ",
    title_highlight: "$0 Deposit.",
    description:
      "Specialist vehicle finance with $0 deposit options, fast 24-48h pre-approvals, and competitive interest rates across 40+ Australian lenders. Skip dealership markups.",
    image_url: "/screen 2.png",
    display_order: 1,
    is_active: true,
  },
  {
    id: "residential",
    label: "Residential Home Loans",
    thumb_url: "/screen.png",
    title_prefix: "A better way to finance starts ",
    title_highlight: "here.",
    description:
      "From first home buyers to seasoned property investors, Talukdar Finance provides clear options, competitive bank comparisons, and dedicated guidance across 40+ accredited lenders.",
    image_url: "/screen.png",
    display_order: 2,
    is_active: true,
  },
  {
    id: "commercial",
    label: "Commercial & Business",
    thumb_url: "/screen 3.png",
    title_prefix: "Strategic funding for enterprise ",
    title_highlight: "growth.",
    description:
      "Working capital, commercial property development, and structured equipment facilities designed to protect cash flow and scale your business.",
    image_url: "/screen 3.png",
    display_order: 3,
    is_active: true,
  },
];

/**
 * Fetch hero pathways / slides from Supabase with safe fallback
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as HeroSlide[];
    }
  } catch (err) {
    console.error("Supabase getHeroSlides failure:", err);
  }

  return defaultHeroSlides;
}
