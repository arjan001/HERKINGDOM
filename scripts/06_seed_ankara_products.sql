-- Classy Collections - Complete Database Seeding
-- Add sample products with SKU, quantities, and pricing

-- First, clear existing products
DELETE FROM products;

-- Seed Women Ankara Dresses
INSERT INTO products (name, slug, category_id, description, price, cost_price, sku, stock_quantity, featured, is_new, in_stock, material)
SELECT 
  'Red Elegance Ankara Dress',
  'red-elegance-ankara-dress',
  id,
  'Stunning red Ankara dress with gold geometric patterns. Perfect for weddings and special events. Premium quality fabric.',
  8500, 4200, 'CC-WOMEN-DRESS-001', 15, true, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-dresses'
UNION ALL
SELECT 
  'Green & Gold Maxi Dress',
  'green-gold-maxi-dress',
  id,
  'Elegant long flowing Ankara maxi dress in emerald green and gold. Sophisticated and comfortable for all occasions.',
  9200, 4600, 'CC-WOMEN-DRESS-002', 12, true, false, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-dresses'
UNION ALL
SELECT 
  'Purple Leaf Ankara Dress',
  'purple-leaf-ankara-dress',
  id,
  'Beautiful purple and green Ankara print dress with leaf motifs. Perfect blend of style and comfort.',
  7800, 3900, 'CC-WOMEN-DRESS-003', 18, false, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-dresses'
UNION ALL
SELECT 
  'Red Ruffled Ankara Dress',
  'red-ruffled-ankara-dress',
  id,
  'Trendy red Ankara dress with decorative ruffles. Eye-catching design perfect for parties and celebrations.',
  8200, 4100, 'CC-WOMEN-DRESS-004', 10, true, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-dresses';

-- Seed Women Ankara Kimonos
INSERT INTO products (name, slug, category_id, description, price, cost_price, sku, stock_quantity, featured, is_new, in_stock, material)
SELECT 
  'Purple Leaf Kimono',
  'purple-leaf-kimono',
  id,
  'Stylish Ankara kimono with purple and green leaf patterns. Versatile piece for casual and formal wear.',
  6500, 3250, 'CC-WOMEN-KIMONO-001', 20, true, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-kimonos'
UNION ALL
SELECT 
  'Green Gold Kimono Set',
  'green-gold-kimono-set',
  id,
  'Elegant Ankara kimono with matching accessories. Green and gold geometric patterns for modern African style.',
  7000, 3500, 'CC-WOMEN-KIMONO-002', 16, false, false, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-kimonos';

-- Seed Men Ankara Suits
INSERT INTO products (name, slug, category_id, description, price, cost_price, sku, stock_quantity, featured, is_new, in_stock, material)
SELECT 
  'Terracotta Ankara Suit',
  'terracotta-ankara-suit',
  id,
  'Premium mens Ankara suit in terracotta and gold. Perfect for weddings and formal events. Tailored fit.',
  12500, 6250, 'CC-MEN-SUIT-001', 8, true, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'men-ankara-suits'
UNION ALL
SELECT 
  'Emerald Green Ankara Suit',
  'emerald-green-ankara-suit',
  id,
  'Sophisticated mens Ankara suit in emerald green and gold. Bold and elegant design for the modern African gentleman.',
  13000, 6500, 'CC-MEN-SUIT-002', 6, true, false, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'men-ankara-suits';

-- Seed Men Ankara Shirts
INSERT INTO products (name, slug, category_id, description, price, cost_price, sku, stock_quantity, featured, is_new, in_stock, material)
SELECT 
  'Green Gold Ankara Shirt',
  'green-gold-ankara-shirt',
  id,
  'Casual mens Ankara shirt in green and gold geometric print. Perfect for everyday wear and social events.',
  4500, 2250, 'CC-MEN-SHIRT-001', 25, true, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'men-ankara-shirts'
UNION ALL
SELECT 
  'Orange Terracotta Ankara Shirt',
  'orange-terracotta-ankara-shirt',
  id,
  'Bold orange Ankara shirt with terracotta accents. Stylish and comfortable short-sleeve button-up design.',
  4800, 2400, 'CC-MEN-SHIRT-002', 22, false, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'men-ankara-shirts';

-- Seed Women Ankara Tops
INSERT INTO products (name, slug, category_id, description, price, cost_price, sku, stock_quantity, featured, is_new, in_stock, material)
SELECT 
  'Green Gold Ankara Top',
  'green-gold-ankara-top',
  id,
  'Trendy Ankara crop top in green and gold. Perfect for casual wear and styled looks with jeans or skirts.',
  3500, 1750, 'CC-WOMEN-TOP-001', 30, true, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-tops'
UNION ALL
SELECT 
  'Multicolor Ankara Blouse',
  'multicolor-ankara-blouse',
  id,
  'Vibrant multicolor Ankara blouse with geometric patterns. Versatile piece for work and casual settings.',
  4000, 2000, 'CC-WOMEN-TOP-002', 28, false, false, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-tops';

-- Seed Women Ankara Palazzo
INSERT INTO products (name, slug, category_id, description, price, cost_price, sku, stock_quantity, featured, is_new, in_stock, material)
SELECT 
  'Multicolor Ankara Palazzo',
  'multicolor-ankara-palazzo',
  id,
  'Comfortable wide-leg Ankara palazzo pants in vibrant multicolor print. Perfect for casual and formal occasions.',
  6200, 3100, 'CC-WOMEN-PALAZZO-001', 18, true, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-palazzo'
UNION ALL
SELECT 
  'Green Gold Palazzo Pants',
  'green-gold-palazzo-pants',
  id,
  'Elegant Ankara palazzo pants in green and gold. Relaxed fit perfect for warm weather and social events.',
  5800, 2900, 'CC-WOMEN-PALAZZO-002', 15, false, false, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-palazzo';

-- Seed Men Ankara Palazzo
INSERT INTO products (name, slug, category_id, description, price, cost_price, sku, stock_quantity, featured, is_new, in_stock, material)
SELECT 
  'Multicolor Ankara Palazzo Pants',
  'multicolor-ankara-palazzo-pants',
  id,
  'Comfortable mens Ankara palazzo pants with vibrant geometric patterns. Perfect for casual and smart-casual styling.',
  5500, 2750, 'CC-MEN-PALAZZO-001', 16, true, true, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'men-ankara-palazzo';

-- Seed Women Ankara Suits
INSERT INTO products (name, slug, category_id, description, price, cost_price, sku, stock_quantity, featured, is_new, in_stock, material)
SELECT 
  'Gold Terracotta Ankara Suit',
  'gold-terracotta-ankara-suit',
  id,
  'Elegant womens Ankara suit with matching jacket and trousers. Perfect for formal occasions and professional settings.',
  10500, 5250, 'CC-WOMEN-SUIT-001', 12, true, false, true, 'Premium Ankara Fabric'
FROM categories WHERE slug = 'women-ankara-suits';

-- Remove baby collection references from database (if it exists)
DELETE FROM hero_banners WHERE collection_id IN (SELECT id FROM categories WHERE slug LIKE '%baby%' OR slug LIKE '%kids%');
DELETE FROM categories WHERE slug LIKE '%baby%' OR slug LIKE '%kids%';
