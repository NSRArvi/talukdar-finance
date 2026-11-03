-- ==============================================================================
-- TALUKDAR FINANCE: CONTACT DETAILS & HERO PATHWAYS SCHEMA
-- Run this in your Supabase SQL Editor
-- ==============================================================================

-- 1. Table for Contact & Office Information
CREATE TABLE IF NOT EXISTS public.contact_info (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  office_title TEXT NOT NULL DEFAULT 'Campbelltown Office',
  address_line1 TEXT NOT NULL DEFAULT 'Suite 15, 186 Queen Street',
  address_line2 TEXT NOT NULL DEFAULT 'Campbelltown, NSW 2560',
  address_note TEXT DEFAULT 'Convenient parking & public transit nearby',
  email TEXT NOT NULL DEFAULT 'advisory@talukdarfinance.com.au',
  email_note TEXT DEFAULT 'Responds within 1 business day',
  phone TEXT DEFAULT '1300 000 000',
  hours_weekdays TEXT NOT NULL DEFAULT '9:00 AM – 6:00 PM AEST',
  hours_weekends TEXT NOT NULL DEFAULT 'Weekend consultations by appointment',
  hours_note TEXT DEFAULT 'After-hours calls available on request',
  map_query TEXT NOT NULL DEFAULT 'Suite 15, 186 Queen Street, Campbelltown, NSW 2560',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default contact record if not exists
INSERT INTO public.contact_info (
  id,
  office_title,
  address_line1,
  address_line2,
  address_note,
  email,
  email_note,
  phone,
  hours_weekdays,
  hours_weekends,
  hours_note,
  map_query
) VALUES (
  'primary',
  'Campbelltown Office',
  'Suite 15, 186 Queen Street',
  'Campbelltown, NSW 2560',
  'Convenient parking & public transit nearby',
  'advisory@talukdarfinance.com.au',
  'Responds within 1 business day',
  '1300 000 000',
  '9:00 AM – 6:00 PM AEST',
  'Weekend consultations by appointment',
  'After-hours calls available on request',
  'Suite 15, 186 Queen Street, Campbelltown, NSW 2560'
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS for contact_info
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on contact_info"
  ON public.contact_info FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to update contact_info"
  ON public.contact_info FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- 2. Table for Hero Banner Slides / Pathways
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  title_prefix TEXT NOT NULL,
  title_highlight TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumb_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial hero slides
INSERT INTO public.hero_slides (
  id,
  label,
  title_prefix,
  title_highlight,
  description,
  image_url,
  thumb_url,
  display_order,
  is_active
) VALUES 
(
  'car-finance',
  'Car Loans ($0 Deposit)',
  'Drive away sooner with ',
  '$0 Deposit.',
  'Specialist vehicle finance with $0 deposit options, fast 24-48h pre-approvals, and competitive interest rates across 40+ Australian lenders. Skip dealership markups.',
  '/screen 2.png',
  '/screen 2.png',
  1,
  true
),
(
  'residential',
  'Residential Home Loans',
  'A better way to finance starts ',
  'here.',
  'From first home buyers to seasoned property investors, Talukdar Finance provides clear options, competitive bank comparisons, and dedicated guidance across 40+ accredited lenders.',
  '/screen.png',
  '/screen.png',
  2,
  true
),
(
  'commercial',
  'Commercial & Business',
  'Strategic funding for enterprise ',
  'growth.',
  'Working capital, commercial property development, and structured equipment facilities designed to protect cash flow and scale your business.',
  '/screen 3.png',
  '/screen 3.png',
  3,
  true
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS for hero_slides
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on hero_slides"
  ON public.hero_slides FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users full access on hero_slides"
  ON public.hero_slides FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- 3. Storage Bucket Configuration for Hero & Service Images
-- Ensure 'service-images' storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for 'service-images' bucket
CREATE POLICY "Public Access for service-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'service-images');

CREATE POLICY "Authenticated users can upload to service-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'service-images');

CREATE POLICY "Authenticated users can update in service-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'service-images');

CREATE POLICY "Authenticated users can delete in service-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'service-images');
