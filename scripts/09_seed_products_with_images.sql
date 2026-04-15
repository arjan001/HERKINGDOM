-- Classy Collections - Full Product Seed with Real Images
-- Clear existing data
DELETE FROM product_tags;
DELETE FROM product_variations;
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM tags;

-- Create Tags
INSERT INTO tags (id, name, slug) VALUES
  (gen_random_uuid(), 'Ankara', 'ankara'),
  (gen_random_uuid(), 'African Print', 'african-print'),
  (gen_random_uuid(), 'Party Wear', 'party-wear'),
  (gen_random_uuid(), 'Casual', 'casual'),
  (gen_random_uuid(), 'Formal', 'formal'),
  (gen_random_uuid(), 'Wedding', 'wedding'),
  (gen_random_uuid(), 'Office Wear', 'office-wear'),
  (gen_random_uuid(), 'Plus Size', 'plus-size'),
  (gen_random_uuid(), 'Lace Detail', 'lace-detail'),
  (gen_random_uuid(), 'Tulle Detail', 'tulle-detail'),
  (gen_random_uuid(), 'Organza', 'organza'),
  (gen_random_uuid(), 'Fitted', 'fitted'),
  (gen_random_uuid(), 'New Arrival', 'new-arrival');

-- Product 1: Green & Black Ankara Print Fitted Midi Dress
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price, cost_price,
  sku, stock_quantity, featured, is_new, in_stock, material, 
  gallery_images, discount_percentage, is_on_offer, offer_percentage, low_stock_threshold
)
SELECT 
  gen_random_uuid(),
  'Green & Black Ankara Lace Midi Dress',
  'green-black-ankara-lace-midi-dress',
  id,
  'Elegant fitted midi dress featuring vibrant green and orange Ankara print with black lace sleeves. The perfect blend of traditional African print and modern lace detailing. Flattering silhouette ideal for parties, weddings, and special occasions.',
  2200, 2500, 1100,
  'CC-WD-001', 15, true, true, true, 'Premium Ankara Cotton & Lace',
  ARRAY['/images/products/green-black-midi-1.jpg', '/images/products/green-black-midi-2.jpg', '/images/products/green-black-midi-3.jpg'],
  12, true, 12, 3
FROM categories WHERE slug = 'women-ankara-dresses';

-- Product 2: Red & Brown Bulb Sleeve Ankara Short Dress 
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price, cost_price,
  sku, stock_quantity, featured, is_new, in_stock, material,
  gallery_images, discount_percentage, is_on_offer, offer_percentage, low_stock_threshold
)
SELECT 
  gen_random_uuid(),
  'Red & Brown Bulb Sleeve Ankara Tulle Dress',
  'red-brown-bulb-sleeve-ankara-tulle-dress',
  id,
  'Stunning off-shoulder Ankara dress with puffed bulb sleeves and pink tulle overlay. Features a bold red and brown geometric sunburst print. A head-turning piece perfect for cocktail parties and celebrations.',
  1800, 2000, 900,
  'CC-WD-002', 20, true, true, true, 'Premium Ankara Cotton & Tulle',
  ARRAY['/images/products/red-brown-bulb-1.jpg', '/images/products/red-brown-bulb-2.jpg', '/images/products/red-brown-bulb-3.jpg'],
  10, false, 0, 3
FROM categories WHERE slug = 'women-ankara-dresses';

-- Product 3: Orange & Blue Ankara Party Dress
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price, cost_price,
  sku, stock_quantity, featured, is_new, in_stock, material,
  gallery_images, discount_percentage, is_on_offer, offer_percentage, low_stock_threshold
)
SELECT 
  gen_random_uuid(),
  'Orange & Blue Ankara Cutout Party Dress',
  'orange-blue-ankara-cutout-party-dress',
  id,
  'Vibrant orange and blue Ankara print party dress with stylish front cutout detail. Features red floral accents and a structured corset-style bodice. A show-stopping design for events and celebrations.',
  2500, 2500, 1250,
  'CC-WD-003', 12, true, true, true, 'Premium Ankara Cotton',
  ARRAY['/images/products/orange-blue-party-1.jpg', '/images/products/orange-blue-party-2.jpg', '/images/products/orange-blue-party-3.jpg'],
  0, false, 0, 3
FROM categories WHERE slug = 'women-ankara-dresses';

-- Product 4: Red Multi Ankara Organza Party Dress
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price, cost_price,
  sku, stock_quantity, featured, is_new, in_stock, material,
  gallery_images, discount_percentage, is_on_offer, offer_percentage, low_stock_threshold
)
SELECT 
  gen_random_uuid(),
  'Red Ankara Organza Ruffle Party Dress',
  'red-ankara-organza-ruffle-party-dress',
  id,
  'Breathtaking fitted Ankara dress with dramatic red organza ruffled sleeves and neckline. The multicolor geometric print body creates a bold contrast with the sheer organza. Perfect for formal events and red carpet moments. Plus size friendly.',
  2400, 2800, 1200,
  'CC-WD-004', 8, true, true, true, 'Premium Ankara Cotton & Organza',
  ARRAY['/images/products/red-organza-party-1.jpg'],
  14, true, 14, 2
FROM categories WHERE slug = 'women-ankara-dresses';

-- Now add product images to product_images table
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/green-black-midi-1.jpg', 'Green & Black Ankara Lace Midi Dress - Front', 0, true
FROM products p WHERE p.slug = 'green-black-ankara-lace-midi-dress'
UNION ALL
SELECT gen_random_uuid(), p.id, '/images/products/green-black-midi-2.jpg', 'Green & Black Ankara Lace Midi Dress - Side', 1, false
FROM products p WHERE p.slug = 'green-black-ankara-lace-midi-dress'
UNION ALL
SELECT gen_random_uuid(), p.id, '/images/products/green-black-midi-3.jpg', 'Green & Black Ankara Lace Midi Dress - Detail', 2, false
FROM products p WHERE p.slug = 'green-black-ankara-lace-midi-dress';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/red-brown-bulb-1.jpg', 'Red Brown Bulb Sleeve Dress - Front', 0, true
FROM products p WHERE p.slug = 'red-brown-bulb-sleeve-ankara-tulle-dress'
UNION ALL
SELECT gen_random_uuid(), p.id, '/images/products/red-brown-bulb-2.jpg', 'Red Brown Bulb Sleeve Dress - Side', 1, false
FROM products p WHERE p.slug = 'red-brown-bulb-sleeve-ankara-tulle-dress'
UNION ALL
SELECT gen_random_uuid(), p.id, '/images/products/red-brown-bulb-3.jpg', 'Red Brown Bulb Sleeve Dress - Detail', 2, false
FROM products p WHERE p.slug = 'red-brown-bulb-sleeve-ankara-tulle-dress';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/orange-blue-party-1.jpg', 'Orange Blue Party Dress - Front', 0, true
FROM products p WHERE p.slug = 'orange-blue-ankara-cutout-party-dress'
UNION ALL
SELECT gen_random_uuid(), p.id, '/images/products/orange-blue-party-2.jpg', 'Orange Blue Party Dress - Side', 1, false
FROM products p WHERE p.slug = 'orange-blue-ankara-cutout-party-dress'
UNION ALL
SELECT gen_random_uuid(), p.id, '/images/products/orange-blue-party-3.jpg', 'Orange Blue Party Dress - Detail', 2, false
FROM products p WHERE p.slug = 'orange-blue-ankara-cutout-party-dress';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/red-organza-party-1.jpg', 'Red Organza Party Dress - Front', 0, true
FROM products p WHERE p.slug = 'red-ankara-organza-ruffle-party-dress';

-- Add product variations (sizes)
INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL', 'XXL']
FROM products p WHERE p.slug = 'green-black-ankara-lace-midi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'red-brown-bulb-sleeve-ankara-tulle-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL', 'XXL']
FROM products p WHERE p.slug = 'orange-blue-ankara-cutout-party-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL', 'XXL', '3XL']
FROM products p WHERE p.slug = 'red-ankara-organza-ruffle-party-dress';

-- Add tags to products
INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t 
WHERE p.slug = 'green-black-ankara-lace-midi-dress' AND t.slug IN ('ankara', 'african-print', 'party-wear', 'lace-detail', 'fitted', 'new-arrival');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t 
WHERE p.slug = 'red-brown-bulb-sleeve-ankara-tulle-dress' AND t.slug IN ('ankara', 'african-print', 'casual', 'tulle-detail', 'new-arrival');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t 
WHERE p.slug = 'orange-blue-ankara-cutout-party-dress' AND t.slug IN ('ankara', 'african-print', 'party-wear', 'formal', 'wedding', 'new-arrival');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t 
WHERE p.slug = 'red-ankara-organza-ruffle-party-dress' AND t.slug IN ('ankara', 'african-print', 'party-wear', 'organza', 'plus-size', 'formal', 'new-arrival');

-- Update site settings to remove orange/warm colors
UPDATE site_settings SET
  primary_color = '#0a0a0a',
  accent_color = '#171717',
  store_name = 'Classy Collections',
  site_title = 'Classy Collections - Premium African Ankara Fashion',
  site_description = 'Premium authentic Ankara fashion for men and women. Dresses, suits, kimonos, and more. Delivered across Kenya.',
  store_email = 'info@classycollections.com',
  store_phone = '+254702642324',
  whatsapp_number = '+254702642324',
  footer_email = 'info@classycollections.com',
  footer_phone = '+254702642324',
  footer_whatsapp = '+254702642324',
  footer_description = 'Classy Collections - Premium African Ankara Fashion. Quality handcrafted clothing celebrating African heritage. Delivered across Kenya.',
  copyright_text = '2025 Classy Collections. All rights reserved.',
  logo_text = 'Classy Collections',
  order_prefix = 'CC'
WHERE true;

-- Update hero banners
UPDATE hero_banners SET
  image_url = '/images/products/green-black-midi-1.jpg',
  title = 'Ankara Dresses Collection',
  subtitle = 'Elegant Ankara dresses for every occasion. From casual to formal, crafted with premium African print fabrics.',
  button_text = 'Shop Dresses',
  button_link = '/shop?category=women-ankara-dresses'
WHERE sort_order = 0;

UPDATE hero_banners SET
  image_url = '/images/products/red-organza-party-1.jpg',
  title = 'New Ankara Arrivals',
  subtitle = 'Discover our latest collection of premium Ankara fashion. Unique designs you wont find anywhere else.',
  button_text = 'Shop New In',
  button_link = '/shop?filter=new'
WHERE sort_order = 1;

UPDATE hero_banners SET
  image_url = '/images/products/orange-blue-party-1.jpg',
  title = 'Ankara Party Dresses',
  subtitle = 'Make a statement at your next event. Bold prints and elegant designs for unforgettable moments.',
  button_text = 'View Collection',
  button_link = '/shop?category=women-ankara-dresses'
WHERE sort_order = 2;

-- Update navbar offers
UPDATE navbar_offers SET text = 'Free delivery on orders above KSh 5,000 | New Ankara arrivals weekly' WHERE sort_order = 0;
UPDATE navbar_offers SET text = 'Premium African Ankara Fashion | Classy Collections' WHERE sort_order = 1;
UPDATE navbar_offers SET text = 'Order via WhatsApp: 0702 642 324 | Fast delivery across Kenya' WHERE sort_order = 2;

-- Clean up popup offers
UPDATE popup_offers SET 
  title = 'Welcome to Classy Collections',
  description = 'Get 10% off your first Ankara purchase! Use code CLASSY10 at checkout.',
  discount_label = '10% OFF',
  image_url = '/images/products/red-brown-bulb-1.jpg'
WHERE is_active = true;
