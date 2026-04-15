-- SEO page-level overrides table
CREATE TABLE IF NOT EXISTS seo_pages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path text UNIQUE NOT NULL,
  page_title text,
  meta_title text,
  meta_description text,
  meta_keywords text,
  og_title text,
  og_description text,
  og_image text,
  canonical_url text,
  no_index boolean DEFAULT false,
  no_follow boolean DEFAULT false,
  structured_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Page views tracking table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path text NOT NULL,
  referrer text,
  user_agent text,
  country text,
  city text,
  device_type text,
  browser text,
  session_id text,
  created_at timestamptz DEFAULT now()
);

-- Index for fast queries on page_views
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views (page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views (session_id);

-- Seed default SEO entries for key pages
INSERT INTO seo_pages (page_path, page_title, meta_title, meta_description, meta_keywords) VALUES
  ('/', 'Home', 'Kallittos Fashions | Curated Thrift & New Denim in Kenya', 'Shop the best curated thrift jeans, denim jackets, mom jeans, skinny jeans and more. Delivered across Nairobi & Kenya. Affordable, sustainable fashion.', 'kallittosfashions, kallittos fashions, thrift jeans Kenya, denim Nairobi, buy jeans online Kenya'),
  ('/shop', 'Shop', 'Shop Thrift Jeans & Denim | Kallittos Fashions Kenya', 'Browse our full collection of curated thrift & new denim. Mom jeans, skinny, boyfriend, shorts & more. Best denim designs in Kenya.', 'shop denim Kenya, thrift jeans Nairobi, buy jeans online, mom jeans Kenya, skinny jeans'),
  ('/delivery', 'Delivery', 'Delivery Locations | Kallittos Fashions', 'We deliver across Nairobi and major towns in Kenya. Same-day delivery in Nairobi CBD. Check our delivery locations and rates.', 'denim delivery Nairobi, jeans delivery Kenya, Kallittos delivery'),
  ('/track-order', 'Track Order', 'Track My Order | Kallittos Fashions', 'Track your Kallittos Fashions order in real time. Enter your order number or phone to check delivery status.', 'track order Kallittos, order tracking Kenya, denim delivery status'),
  ('/privacy-policy', 'Privacy Policy', 'Privacy Policy | Kallittos Fashions', 'Read our privacy policy to understand how we handle your data.', 'privacy policy, data protection Kenya'),
  ('/terms-of-service', 'Terms of Service', 'Terms of Service | Kallittos Fashions', 'Read our terms and conditions for using Kallittos Fashions.', 'terms of service, terms and conditions'),
  ('/refund-policy', 'Refund Policy', 'Refund Policy | Kallittos Fashions', 'Read our refund and return policy for Kallittos Fashions purchases.', 'refund policy, return policy Kenya')
ON CONFLICT (page_path) DO NOTHING;

-- RLS policies
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow public read on seo_pages (for the frontend to read meta)
CREATE POLICY "Allow public read on seo_pages" ON seo_pages FOR SELECT USING (true);
-- Allow authenticated users to manage seo_pages
CREATE POLICY "Allow authenticated manage seo_pages" ON seo_pages FOR ALL USING (auth.role() = 'authenticated');

-- Allow public insert on page_views (anyone visiting can be tracked)
CREATE POLICY "Allow public insert page_views" ON page_views FOR INSERT WITH CHECK (true);
-- Allow authenticated to read page_views (admin analytics)
CREATE POLICY "Allow authenticated read page_views" ON page_views FOR SELECT USING (auth.role() = 'authenticated');
