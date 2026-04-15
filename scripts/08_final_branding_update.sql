-- Classy Collections - Final Branding & Settings Update

-- Update site settings with correct column names
UPDATE site_settings SET
  store_name = 'Classy Collections',
  site_title = 'Classy Collections - Premium African Ankara Fashion',
  site_description = 'Premium authentic Ankara fashion for men and women. Ready-made Ankara suits, elegant dresses, kimonos, palazzo, and more.',
  store_email = 'info@classycollections.com',
  store_phone = '+254702642324',
  footer_email = 'info@classycollections.com',
  footer_phone = '+254702642324',
  footer_whatsapp = '+254702642324',
  footer_description = 'Classy Collections - Premium African Ankara Fashion. Authentic handcrafted clothing celebrating African style. Delivered across Kenya and East Africa.',
  copyright_text = '© 2025 Classy Collections. All rights reserved. Authentic African Ankara Fashion.',
  logo_text = 'Classy Collections'
WHERE true;

-- Update hero banners with correct titles
UPDATE hero_banners SET
  title = 'Ankara Dresses Collection',
  subtitle = 'Stunning Ankara dresses for every occasion. From casual to formal, find your perfect style with our curated collection.'
WHERE sort_order = 0;

UPDATE hero_banners SET
  title = 'Men''s Ankara Suits',
  subtitle = 'Premium ready-made Ankara suits for weddings, events, and celebrations. Handcrafted excellence for the modern African man.'
WHERE sort_order = 1;

UPDATE hero_banners SET
  title = 'Ankara Kimonos',
  subtitle = 'Trendy Ankara kimonos with matching accessories. Versatile pieces for modern African style and casual elegance.'
WHERE sort_order = 2;

-- Ensure no baby/kids categories exist
DELETE FROM hero_banners WHERE collection_id IN (SELECT id FROM categories WHERE slug LIKE '%baby%' OR slug LIKE '%kids%');
DELETE FROM categories WHERE slug LIKE '%baby%' OR slug LIKE '%kids%';
