-- Classy Collections / Elani Beauty Hub - Thrift Clothing Categories
-- Seed new thrift clothing categories: Body Suits, Tops, Dresses, Jackets, Bags
-- All items are in stock and new

-- Remove old Ankara-only categories and reset for thrift clothing store
TRUNCATE TABLE categories CASCADE;

-- Insert thrift clothing categories with images
INSERT INTO categories (name, slug, description, image_url, sort_order, is_active)
VALUES
  -- BODY SUITS
  (
    'Body Suits',
    'body-suits',
    'Stylish and versatile thrift body suits. Sleek silhouettes in various styles — sleeveless, off-shoulder, and more. All items in stock and new.',
    '/images/categories/body-suits.jpg',
    1,
    true
  ),

  -- TOPS
  (
    'Tops',
    'tops',
    'Trendy thrift tops including blouses, crop tops, and tie-front styles. Unique prints and patterns at unbeatable prices. All items in stock and new.',
    '/images/categories/tops.jpg',
    2,
    true
  ),

  -- DRESSES
  (
    'Dresses',
    'dresses',
    'Beautiful thrift dresses for every occasion — maxi, midi, and mini styles. Floral prints, tropical vibes, and classic patterns. All items in stock and new.',
    '/images/categories/dresses.jpg',
    3,
    true
  ),

  -- JACKETS
  (
    'Jackets',
    'jackets',
    'Quality thrift jackets including tweed, plaid, and denim styles. Perfect layering pieces for any season. All items in stock and new.',
    '/images/categories/jackets.jpg',
    4,
    true
  ),

  -- BAGS
  (
    'Bags',
    'bags',
    'Curated thrift bags and handbags. Stylish crossbody, shoulder bags, and clutches to complete any outfit. All items in stock and new.',
    '/images/categories/bags.jpg',
    5,
    true
  );

-- Create thrift-relevant tags
DELETE FROM tags;
INSERT INTO tags (id, name, slug) VALUES
  (gen_random_uuid(), 'Thrift', 'thrift'),
  (gen_random_uuid(), 'Vintage', 'vintage'),
  (gen_random_uuid(), 'New Arrival', 'new-arrival'),
  (gen_random_uuid(), 'In Stock', 'in-stock'),
  (gen_random_uuid(), 'Casual', 'casual'),
  (gen_random_uuid(), 'Party Wear', 'party-wear'),
  (gen_random_uuid(), 'Office Wear', 'office-wear'),
  (gen_random_uuid(), 'Statement Piece', 'statement-piece'),
  (gen_random_uuid(), 'Best Seller', 'best-seller'),
  (gen_random_uuid(), 'Limited Edition', 'limited-edition');
