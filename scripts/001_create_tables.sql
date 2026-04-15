-- =====================================================
-- Kallitos Fashion - Full Database Schema
-- =====================================================

-- 1. categories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  image_url TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. tags
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  is_new BOOLEAN DEFAULT false,
  is_on_offer BOOLEAN DEFAULT false,
  offer_percentage INTEGER,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. product_images
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. product_variations
CREATE TABLE IF NOT EXISTS public.product_variations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  options TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. product_tags (junction)
CREATE TABLE IF NOT EXISTS public.product_tags (
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

-- 7. delivery_locations
CREATE TABLE IF NOT EXISTS public.delivery_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  fee NUMERIC(10,2) NOT NULL,
  estimated_days VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  delivery_location_id UUID REFERENCES public.delivery_locations(id) ON DELETE SET NULL,
  delivery_address TEXT NOT NULL,
  order_notes TEXT,
  subtotal NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','dispatched','delivered','cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 9. order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image TEXT,
  product_price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  selected_variations JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. banners
CREATE TABLE IF NOT EXISTS public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  image_url TEXT NOT NULL,
  link VARCHAR(255),
  position VARCHAR(20) NOT NULL DEFAULT 'hero' CHECK (position IN ('hero','mid-page')),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. navbar_offers
CREATE TABLE IF NOT EXISTS public.navbar_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. popup_offers
CREATE TABLE IF NOT EXISTS public.popup_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_label VARCHAR(100) NOT NULL,
  image_url TEXT,
  link VARCHAR(255),
  valid_until DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 13. site_settings (single row)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Store
  store_name VARCHAR(255) DEFAULT 'Kallitos Fashion',
  store_email VARCHAR(255) DEFAULT 'info@kallitosfashion.com',
  store_phone VARCHAR(50) DEFAULT '+254 700 000000',
  whatsapp_number VARCHAR(20) DEFAULT '+254700000000',
  currency_symbol VARCHAR(10) DEFAULT 'KSh',
  free_shipping_threshold NUMERIC(10,2) DEFAULT 5000,
  order_prefix VARCHAR(10) DEFAULT 'KF',
  enable_whatsapp_checkout BOOLEAN DEFAULT true,
  enable_quick_checkout BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,

  -- SEO
  site_title VARCHAR(255) DEFAULT 'Kallitos Fashion - Thrift & New Jeans',
  site_description TEXT DEFAULT 'Discover curated thrifted and brand-new denim at Kallitos Fashion.',
  meta_keywords TEXT DEFAULT 'jeans, denim, thrift, fashion, Kenya',
  canonical_url VARCHAR(500) DEFAULT '',
  og_image_url TEXT,
  google_analytics_id VARCHAR(50),
  facebook_pixel_id VARCHAR(50),
  robots_txt TEXT DEFAULT 'User-agent: *\nAllow: /',

  -- Theme
  primary_color VARCHAR(20) DEFAULT '#0a0a0a',
  accent_color VARCHAR(20) DEFAULT '#fafafa',
  font_heading VARCHAR(100) DEFAULT 'Playfair Display',
  font_body VARCHAR(100) DEFAULT 'Inter',
  logo_text VARCHAR(255) DEFAULT 'Kallitos Fashion',
  logo_image_url TEXT,
  favicon_url TEXT,
  show_recent_purchase BOOLEAN DEFAULT true,
  show_offer_modal BOOLEAN DEFAULT true,
  show_newsletter BOOLEAN DEFAULT true,

  -- Footer
  footer_description TEXT DEFAULT 'Curated thrift and brand-new denim. Style made affordable.',
  footer_address TEXT DEFAULT 'Nairobi, Kenya',
  footer_phone VARCHAR(50) DEFAULT '+254 700 000000',
  footer_email VARCHAR(255) DEFAULT 'info@kallitosfashion.com',
  footer_whatsapp VARCHAR(20) DEFAULT '+254700000000',
  footer_instagram VARCHAR(500) DEFAULT 'https://www.instagram.com/kallittofashions/',
  footer_tiktok VARCHAR(500) DEFAULT 'https://www.tiktok.com/@kallittos',
  footer_twitter VARCHAR(500),
  footer_open_hours VARCHAR(255) DEFAULT 'Mon - Sat: 9AM - 6PM',
  footer_dispatch_days VARCHAR(255) DEFAULT 'Orders dispatched within 24hrs',
  copyright_text VARCHAR(255) DEFAULT '2026 Kallitos Fashion. All rights reserved.',
  show_privacy_policy BOOLEAN DEFAULT true,
  show_terms BOOLEAN DEFAULT true,
  show_refund_policy BOOLEAN DEFAULT true,

  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 14. newsletter_subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- 15. analytics_events
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  session_id VARCHAR(100),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 16. admin_users (for custom admin auth)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('super_admin','admin','editor')),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_on_offer ON public.products(is_on_offer);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON public.products(is_new);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_created ON public.products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variations_product ON public.product_variations(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.analytics_events(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY
-- Public tables: anyone can read, only authenticated (admin) can write
-- =====================================================

-- categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_admin_insert" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "categories_admin_update" ON public.categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "categories_admin_delete" ON public.categories FOR DELETE USING (auth.role() = 'authenticated');

-- tags
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tags_public_read" ON public.tags FOR SELECT USING (true);
CREATE POLICY "tags_admin_insert" ON public.tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "tags_admin_update" ON public.tags FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "tags_admin_delete" ON public.tags FOR DELETE USING (auth.role() = 'authenticated');

-- products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON public.products FOR SELECT USING (true);
CREATE POLICY "products_admin_insert" ON public.products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "products_admin_update" ON public.products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "products_admin_delete" ON public.products FOR DELETE USING (auth.role() = 'authenticated');

-- product_images
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "product_images_public_read" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "product_images_admin_insert" ON public.product_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "product_images_admin_update" ON public.product_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "product_images_admin_delete" ON public.product_images FOR DELETE USING (auth.role() = 'authenticated');

-- product_variations
ALTER TABLE public.product_variations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "product_variations_public_read" ON public.product_variations FOR SELECT USING (true);
CREATE POLICY "product_variations_admin_insert" ON public.product_variations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "product_variations_admin_update" ON public.product_variations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "product_variations_admin_delete" ON public.product_variations FOR DELETE USING (auth.role() = 'authenticated');

-- product_tags
ALTER TABLE public.product_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "product_tags_public_read" ON public.product_tags FOR SELECT USING (true);
CREATE POLICY "product_tags_admin_insert" ON public.product_tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "product_tags_admin_delete" ON public.product_tags FOR DELETE USING (auth.role() = 'authenticated');

-- delivery_locations
ALTER TABLE public.delivery_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "delivery_public_read" ON public.delivery_locations FOR SELECT USING (true);
CREATE POLICY "delivery_admin_insert" ON public.delivery_locations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "delivery_admin_update" ON public.delivery_locations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "delivery_admin_delete" ON public.delivery_locations FOR DELETE USING (auth.role() = 'authenticated');

-- orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_public_insert" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_admin_read" ON public.orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "orders_admin_update" ON public.orders FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "orders_admin_delete" ON public.orders FOR DELETE USING (auth.role() = 'authenticated');

-- order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_items_public_insert" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "order_items_admin_read" ON public.order_items FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "order_items_admin_update" ON public.order_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "order_items_admin_delete" ON public.order_items FOR DELETE USING (auth.role() = 'authenticated');

-- banners
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "banners_public_read" ON public.banners FOR SELECT USING (true);
CREATE POLICY "banners_admin_insert" ON public.banners FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "banners_admin_update" ON public.banners FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "banners_admin_delete" ON public.banners FOR DELETE USING (auth.role() = 'authenticated');

-- navbar_offers
ALTER TABLE public.navbar_offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "navbar_offers_public_read" ON public.navbar_offers FOR SELECT USING (true);
CREATE POLICY "navbar_offers_admin_insert" ON public.navbar_offers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "navbar_offers_admin_update" ON public.navbar_offers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "navbar_offers_admin_delete" ON public.navbar_offers FOR DELETE USING (auth.role() = 'authenticated');

-- popup_offers
ALTER TABLE public.popup_offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "popup_offers_public_read" ON public.popup_offers FOR SELECT USING (true);
CREATE POLICY "popup_offers_admin_insert" ON public.popup_offers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "popup_offers_admin_update" ON public.popup_offers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "popup_offers_admin_delete" ON public.popup_offers FOR DELETE USING (auth.role() = 'authenticated');

-- site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_settings_public_read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_admin_update" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "site_settings_admin_insert" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "newsletter_public_insert" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "newsletter_admin_read" ON public.newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "newsletter_admin_update" ON public.newsletter_subscribers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "newsletter_admin_delete" ON public.newsletter_subscribers FOR DELETE USING (auth.role() = 'authenticated');

-- analytics_events
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "analytics_public_insert" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "analytics_admin_read" ON public.analytics_events FOR SELECT USING (auth.role() = 'authenticated');

-- admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_users_self_read" ON public.admin_users FOR SELECT USING (auth.uid() = auth_user_id);
CREATE POLICY "admin_users_admin_all" ON public.admin_users FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- Updated_at trigger function
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER set_updated_at_categories BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_delivery BEFORE UPDATE ON public.delivery_locations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_orders BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_banners BEFORE UPDATE ON public.banners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_popup_offers BEFORE UPDATE ON public.popup_offers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_site_settings BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_admin_users BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
