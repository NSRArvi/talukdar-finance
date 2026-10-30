export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  display_order?: number;
  created_at?: string;
}

export interface ServiceItem {
  id: string;
  category: string; // references service_categories.slug
  iconName: string;
  title: string;
  badge?: string | null;
  description: string;
  long_description?: string | null;
  features: string[];
  imageSrc: string;
  actionText: string;
  created_at?: string;
  updated_at?: string;
}

export interface FinanceOption {
  id: string;
  value: string;
  label: string;
  display_order?: number;
  is_active?: boolean;
  created_at?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  display_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LegalDocument {
  id: string; // 'privacy-policy' | 'terms-of-use'
  title: string;
  meta_title?: string | null;
  meta_description?: string | null;
  content_html: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string; // slug (e.g. 'australian-interest-rate-outlook-2026')
  title: string;
  excerpt: string;
  category: string;
  thumbnail_url: string;
  content_html: string;
  meta_title?: string | null;
  meta_description?: string | null;
  author_name: string;
  read_time_minutes: number;
  is_published: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}
