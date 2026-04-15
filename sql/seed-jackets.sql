-- Elani Beauty Hub - Jackets Category Products
-- 3 thrift jackets, all size Medium, price range KSh 340-405
-- Images from uploaded photos

-- =============================================================
-- JACKET PRODUCTS
-- =============================================================

-- Jacket 1: Ivory Tweed Jacket
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Ivory Pearl Tweed Jacket',
  'ivory-pearl-tweed-jacket',
  'Classic ivory tweed jacket with pearl button details. Soft textured fabric, perfect for layering.',
  380, 450,
  id, true, true, 16,
  true, true
FROM categories WHERE slug = 'jackets';

-- Jacket 2: Black Tweed Blazer
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Noir Tweed Blazer',
  'noir-tweed-blazer',
  'Sharp black tweed blazer with white cross-stitch pattern. Tailored fit, great for casual or office wear.',
  405, 480,
  id, true, false, 0,
  true, true
FROM categories WHERE slug = 'jackets';

-- Jacket 3: Plaid Check Jacket
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Mono Plaid Oversize Jacket',
  'mono-plaid-oversize-jacket',
  'Bold black and white plaid jacket in relaxed oversized fit. Warm and stylish statement piece.',
  340, 400,
  id, true, true, 15,
  true, false
FROM categories WHERE slug = 'jackets';

-- =============================================================
-- PRODUCT IMAGES
-- =============================================================

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/ivory-tweed-jacket-1.jpg',
  'Ivory Pearl Tweed Jacket - Front', 0, true
FROM products p WHERE p.slug = 'ivory-pearl-tweed-jacket';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-tweed-blazer-1.jpg',
  'Noir Tweed Blazer - Front', 0, true
FROM products p WHERE p.slug = 'noir-tweed-blazer';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/plaid-check-jacket-1.jpg',
  'Mono Plaid Oversize Jacket - Front', 0, true
FROM products p WHERE p.slug = 'mono-plaid-oversize-jacket';

-- =============================================================
-- PRODUCT VARIATIONS (All Medium)
-- =============================================================

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['M']
FROM products p WHERE p.slug = 'ivory-pearl-tweed-jacket';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['M']
FROM products p WHERE p.slug = 'noir-tweed-blazer';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['M']
FROM products p WHERE p.slug = 'mono-plaid-oversize-jacket';

-- =============================================================
-- PRODUCT TAGS
-- =============================================================

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'ivory-pearl-tweed-jacket'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'office-wear', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'noir-tweed-blazer'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'office-wear', 'statement-piece');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'mono-plaid-oversize-jacket'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual', 'statement-piece');
