-- Ankara Fashion Store - Seed Data
-- Initial data for categories, site settings, and delivery locations

-- ───────────────────────────────────────────────────────
-- Insert default Site Settings
-- ───────────────────────────────────────────────────────
INSERT INTO site_settings (
  store_name,
  store_email,
  store_phone,
  whatsapp_number,
  currency_symbol,
  order_prefix,
  site_title,
  site_description,
  meta_keywords,
  primary_color,
  accent_color,
  logo_text,
  footer_description,
  footer_address,
  footer_phone,
  footer_email,
  footer_whatsapp,
  footer_instagram,
  footer_tiktok,
  footer_open_hours,
  footer_dispatch_days,
  copyright_text
) VALUES (
  'Ankara Fashion Store',
  'hello@ankarafashion.com',
  '+254 0700 000 000',
  '+254 0700 000 000',
  'KSh',
  'ANK',
  'Ankara Fashion - Authentic African Print Clothing',
  'Premium Ankara clothing for the modern African. Suits, dresses, kimonos, and more.',
  'ankara, african print, clothing, dresses, suits, kimonos, fashion, africa',
  '#DC7A40',
  '#1a1a1a',
  'Ankara Fashion',
  'Experience the beauty of authentic African print fashion. We curate premium Ankara clothing for the modern African who celebrates their culture.',
  'Nairobi CBD, Kenya',
  '+254 0700 000 000',
  'hello@ankarafashion.com',
  '+254 0700 000 000',
  'https://instagram.com/ankarafashion',
  'https://tiktok.com/@ankarafashion',
  '9:00 AM - 6:00 PM (Mon-Fri) | 10:00 AM - 5:00 PM (Sat)',
  'Next day delivery available (Nairobi), 2-3 days (Upcountry)',
  '© 2025 Ankara Fashion. All rights reserved.'
);

-- ───────────────────────────────────────────────────────
-- Insert Ankara Product Categories
-- ───────────────────────────────────────────────────────
INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES
('Ankara Suits', 'ankara-suits', 'Premium ready-made and custom Ankara suits for men and women', 1, true),
('Ankara Dresses', 'ankara-dresses', 'Beautiful Ankara dresses for every occasion', 2, true),
('Ankara Shirts', 'ankara-shirts', 'Stylish Ankara shirts and blouses', 3, true),
('Ankara Kimonos', 'ankara-kimonos', 'Trendy Ankara kimonos and kimono sets', 4, true),
('Ankara Palazzo', 'ankara-palazzo', 'Comfortable and elegant Ankara palazzo pants', 5, true),
('Ankara Tops', 'ankara-tops', 'Versatile Ankara tops and crop tops', 6, true),
('Ankara Skirts', 'ankara-skirts', 'Elegant Ankara skirts and midi skirts', 7, true),
('Ankara Accessories', 'ankara-accessories', 'African print bags, scarves, and jewelry', 8, true);

-- ───────────────────────────────────────────────────────
-- Insert Delivery Locations
-- ───────────────────────────────────────────────────────
INSERT INTO delivery_locations (name, fee, estimated_days, sort_order, is_active) VALUES
('Nairobi CBD', 0, 'Same day / Next day', 1, true),
('Greater Nairobi', 200, '1-2 days', 2, true),
('Kisumu', 400, '2-3 days', 3, true),
('Mombasa', 400, '2-3 days', 4, true),
('Nakuru', 300, '1-2 days', 5, true),
('Kigali', 800, '3-5 days', 6, true),
('Dar es Salaam', 1000, '3-5 days', 7, true),
('Uganda', 600, '3-5 days', 8, true);

-- ───────────────────────────────────────────────────────
-- Insert Tags for product filtering
-- ───────────────────────────────────────────────────────
INSERT INTO tags (name, slug) VALUES
('New Arrival', 'new-arrival'),
('On Sale', 'on-sale'),
('Best Seller', 'best-seller'),
('Premium Quality', 'premium'),
('Handmade', 'handmade'),
('Ready Made', 'ready-made'),
('Custom Available', 'custom-available'),
('Limited Edition', 'limited-edition');

-- ───────────────────────────────────────────────────────
-- Insert Sample Products (Ankara clothing)
-- ───────────────────────────────────────────────────────
WITH suit_cat AS (SELECT id FROM categories WHERE slug = 'ankara-suits' LIMIT 1),
     dress_cat AS (SELECT id FROM categories WHERE slug = 'ankara-dresses' LIMIT 1),
     shirt_cat AS (SELECT id FROM categories WHERE slug = 'ankara-shirts' LIMIT 1),
     kimono_cat AS (SELECT id FROM categories WHERE slug = 'ankara-kimonos' LIMIT 1)
INSERT INTO products (
  name,
  slug,
  description,
  price,
  original_price,
  category_id,
  is_new,
  is_on_offer,
  offer_percentage,
  in_stock,
  featured
) VALUES
-- Suits
('Classic Ankara 3-Piece Suit - Royal Blue', 'classic-ankara-suit-royal', 'Handcrafted 3-piece Ankara suit with matching tie. Perfect for weddings and formal events.', 8500, 10000, (SELECT id FROM suit_cat), true, true, 15, true, true),
('Women''s Ankara Boubou Suit - Kente Pattern', 'womens-ankara-boubou-kente', 'Elegant women''s boubou suit in stunning Kente pattern. Comfortable and stylish.', 7500, 9000, (SELECT id FROM suit_cat), true, false, null, true, true),
('Men''s Ankara Blazer Set - Geometric', 'mens-ankara-blazer-geometric', 'Sharp geometric pattern Ankara blazer with trousers. Modern tailoring.', 9000, null, (SELECT id FROM suit_cat), false, false, null, true, false),

-- Dresses
('Ankara Evening Gown - Gold Embroidery', 'ankara-evening-gown-gold', 'Sophisticated evening gown with gold embroidery details. Ankle length.', 6500, 8000, (SELECT id FROM dress_cat), true, true, 18, true, true),
('Short Ankara Day Dress - Floral Mix', 'ankara-day-dress-floral', 'Cheerful floral mix Ankara dress. Perfect for casual outings.', 2500, 3500, (SELECT id FROM dress_cat), true, false, null, true, true),
('Ankara Wrap Dress - Maxi Length', 'ankara-wrap-dress-maxi', 'Flattering wrap dress in maxi length. One size fits most.', 3500, 4500, (SELECT id FROM dress_cat), false, false, null, true, false),

-- Shirts
('Ankara Button-Up Shirt - Unisex', 'ankara-button-shirt-unisex', 'Versatile button-up shirt suitable for men and women. Bold African print.', 1800, 2500, (SELECT id FROM shirt_cat), true, true, 25, true, true),
('Ankara Crop Top - Braided Detail', 'ankara-crop-top-braided', 'Trendy crop top with braided neckline detail. Perfect for festival season.', 1200, 1800, (SELECT id FROM shirt_cat), true, false, null, true, true),

-- Kimonos
('Ankara Kimono - Sunset Collection', 'ankara-kimono-sunset', 'Flowing kimono in warm sunset colors. Perfect layering piece.', 2800, 3800, (SELECT id FROM kimono_cat), true, true, 20, true, true),
('Ankara Kimono Set - Matching Pants', 'ankara-kimono-set-pants', 'Complete kimono set with matching high-waisted pants.', 4500, 5500, (SELECT id FROM kimono_cat), true, false, null, true, true);

-- ───────────────────────────────────────────────────────
-- Insert Sample Product Images
-- ───────────────────────────────────────────────────────
WITH products_data AS (
  SELECT id, slug FROM products LIMIT 10
)
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT id, '/images/products/placeholder-' || ROW_NUMBER() OVER (ORDER BY slug) || '.jpg', 
       'Product image for ' || slug, 0, true
FROM products_data;

-- ───────────────────────────────────────────────────────
-- Insert Sample Product Variations
-- ───────────────────────────────────────────────────────
WITH suit_prod AS (SELECT id FROM products WHERE slug = 'classic-ankara-suit-royal' LIMIT 1),
     dress_prod AS (SELECT id FROM products WHERE slug = 'ankara-evening-gown-gold' LIMIT 1),
     shirt_prod AS (SELECT id FROM products WHERE slug = 'ankara-button-shirt-unisex' LIMIT 1)
INSERT INTO product_variations (product_id, type, options) VALUES
((SELECT id FROM suit_prod), 'Size', ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL']),
((SELECT id FROM suit_prod), 'Color', ARRAY['Royal Blue', 'Emerald Green', 'Burgundy']),
((SELECT id FROM dress_prod), 'Size', ARRAY['XS', 'S', 'M', 'L', 'XL']),
((SELECT id FROM dress_prod), 'Length', ARRAY['Ankle', 'Midi', 'Knee']),
((SELECT id FROM shirt_prod), 'Size', ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL']),
((SELECT id FROM shirt_prod), 'Fit', ARRAY['Regular', 'Slim', 'Oversized']);

-- ───────────────────────────────────────────────────────
-- Insert Tags for Sample Products
-- ───────────────────────────────────────────────────────
WITH products_to_tag AS (
  SELECT id FROM products LIMIT 5
),
new_arrival_tag AS (
  SELECT id FROM tags WHERE slug = 'new-arrival' LIMIT 1
),
best_seller_tag AS (
  SELECT id FROM tags WHERE slug = 'best-seller' LIMIT 1
)
INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, new_arrival_tag.id FROM products_to_tag p, new_arrival_tag
UNION ALL
SELECT p.id, best_seller_tag.id FROM products_to_tag p, best_seller_tag LIMIT 5;
