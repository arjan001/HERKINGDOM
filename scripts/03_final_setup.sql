-- Ankara Fashion Store - Clean Database Setup
-- This script works with existing tables and adds enhancements

-- ============================================================================
-- PART 1: ADD MISSING INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_new ON products(is_new);

CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories(sort_order);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_banners_position ON banners(position);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- ============================================================================
-- PART 2: ADD MISSING COLUMNS TO PRODUCTS
-- ============================================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS cost_price DECIMAL(10, 2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS discount_percentage DECIMAL(5, 2) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sku VARCHAR(100) UNIQUE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS low_stock_threshold INTEGER DEFAULT 5;
ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_images TEXT[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS material VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS care_instructions TEXT;

-- ============================================================================
-- PART 3: CREATE NEW SUPPORTING TABLES
-- ============================================================================

-- Customers table for customer management
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  is_subscribed_newsletter BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- Delivery zones for enhanced shipping management
CREATE TABLE IF NOT EXISTS delivery_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(100) NOT NULL,
  region VARCHAR(255),
  delivery_fee DECIMAL(10, 2) NOT NULL,
  delivery_days_min INTEGER DEFAULT 1,
  delivery_days_max INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_delivery_zones_country ON delivery_zones(country);

-- Customer addresses for better order management
CREATE TABLE IF NOT EXISTS customer_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address_line_1 VARCHAR(255) NOT NULL,
  address_line_2 VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  postal_code VARCHAR(20),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_addresses_customer ON customer_addresses(customer_id);

-- Order shipments for tracking
CREATE TABLE IF NOT EXISTS order_shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  tracking_number VARCHAR(100) UNIQUE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  carrier VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_shipments_order ON order_shipments(order_id);

-- Hero banners for homepage
CREATE TABLE IF NOT EXISTS hero_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  button_text VARCHAR(100),
  button_link VARCHAR(500),
  image_url VARCHAR(500),
  collection_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hero_banners_active ON hero_banners(is_active);

-- Audit logs for tracking changes
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action VARCHAR(255) NOT NULL,
  table_name VARCHAR(255),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- PART 4: ENHANCE ANALYTICS
-- ============================================================================

ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS order_id UUID REFERENCES orders(id) ON DELETE SET NULL;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS metadata JSONB;

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);

-- ============================================================================
-- PART 5: UPDATE TIMESTAMPS FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to new tables
DROP TRIGGER IF EXISTS update_customers_timestamp ON customers;
CREATE TRIGGER update_customers_timestamp BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_delivery_zones_timestamp ON delivery_zones;
CREATE TRIGGER update_delivery_zones_timestamp BEFORE UPDATE ON delivery_zones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customer_addresses_timestamp ON customer_addresses;
CREATE TRIGGER update_customer_addresses_timestamp BEFORE UPDATE ON customer_addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_order_shipments_timestamp ON order_shipments;
CREATE TRIGGER update_order_shipments_timestamp BEFORE UPDATE ON order_shipments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_hero_banners_timestamp ON hero_banners;
CREATE TRIGGER update_hero_banners_timestamp BEFORE UPDATE ON hero_banners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- PART 6: SEED INITIAL DATA
-- ============================================================================

-- Insert Ankara Categories
INSERT INTO categories (name, slug, description, sort_order, is_active)
VALUES 
  ('Ankara Suits', 'ankara-suits', 'Premium ready-made Ankara suits for men and women', 1, true),
  ('Ankara Dresses', 'ankara-dresses', 'Beautiful Ankara dresses for all occasions', 2, true),
  ('Ankara Shirts', 'ankara-shirts', 'Casual and formal Ankara shirts', 3, true),
  ('Ankara Kimonos', 'ankara-kimonos', 'Trendy Ankara kimonos and loose wear', 4, true),
  ('Ankara Palazzo', 'ankara-palazzo', 'Comfortable Ankara palazzo pants', 5, true),
  ('Ankara Tops', 'ankara-tops', 'Stylish Ankara crop tops and blouses', 6, true),
  ('Ankara Sets', 'ankara-sets', 'Matching Ankara two-piece sets', 7, true),
  ('Ankara Accessories', 'ankara-accessories', 'Bags, headwraps, and jewelry', 8, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert Delivery Zones
INSERT INTO delivery_zones (name, country, region, delivery_fee, delivery_days_min, delivery_days_max, sort_order, is_active)
VALUES
  ('Nairobi CBD', 'Kenya', 'Nairobi', 200, 1, 1, 1, true),
  ('Nairobi Suburbs', 'Kenya', 'Nairobi', 300, 1, 2, 2, true),
  ('Kiambu', 'Kenya', 'Central', 400, 1, 2, 3, true),
  ('Kisumu', 'Kenya', 'Western', 800, 2, 3, 4, true),
  ('Mombasa', 'Kenya', 'Coast', 1000, 2, 3, 5, true),
  ('Nakuru', 'Kenya', 'Rift Valley', 600, 2, 3, 6, true),
  ('Kigali', 'Rwanda', 'Kigali', 1500, 2, 4, 7, true),
  ('Dar es Salaam', 'Tanzania', 'Dar es Salaam', 1800, 3, 5, 8, true),
  ('Kampala', 'Uganda', 'Kampala', 1600, 2, 4, 9, true),
  ('Accra', 'Ghana', 'Accra', 2500, 4, 6, 10, true)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- COMPLETION
-- ============================================================================
-- Database schema setup completed successfully!
-- All tables created, indexes added, and initial data seeded.
