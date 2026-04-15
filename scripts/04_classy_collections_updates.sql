-- Classy Collections - Update Categories with Men and Women Main Collections
-- Update existing categories structure

-- Clear and reset categories with new structure
TRUNCATE TABLE categories CASCADE;

-- Insert main collections with sub-categories
INSERT INTO categories (name, slug, description, sort_order, is_active)
VALUES
  -- MEN COLLECTION
  ('Men - Ankara Suits', 'men-ankara-suits', 'Premium ready-made Ankara suits for men. Perfect for weddings, events, and celebrations.', 1, true),
  ('Men - Ankara Shirts', 'men-ankara-shirts', 'Stylish casual and formal Ankara shirts for men.', 2, true),
  ('Men - Ankara Palazzo', 'men-ankara-palazzo', 'Comfortable Ankara palazzo pants for men.', 3, true),
  
  -- WOMEN COLLECTION
  ('Women - Ankara Dresses', 'women-ankara-dresses', 'Beautiful Ankara dresses for all occasions. Short, midi, and long styles.', 4, true),
  ('Women - Ankara Suits', 'women-ankara-suits', 'Elegant Ankara suits and two-piece sets for women.', 5, true),
  ('Women - Ankara Kimonos', 'women-ankara-kimonos', 'Trendy Ankara kimonos and kimono sets for women.', 6, true),
  ('Women - Ankara Tops', 'women-ankara-tops', 'Stylish Ankara crop tops, blouses, and casual wear.', 7, true),
  ('Women - Ankara Palazzo', 'women-ankara-palazzo', 'Comfortable and elegant Ankara palazzo pants for women.', 8, true);
