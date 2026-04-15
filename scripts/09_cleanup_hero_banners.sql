-- Remove all hero banners and re-insert only the 3 correct ones
DELETE FROM hero_banners;

INSERT INTO hero_banners (title, subtitle, image_url, button_link, button_text, is_active, sort_order, created_at)
VALUES
  ('Premium Ankara Dresses Collection', 'Discover vibrant, ready-made Ankara dresses perfect for any occasion. From casual to formal wear.', '/banners/ankara-dresses-banner.jpg', '/shop?category=women-ankara-dresses', 'Shop Dresses', true, 1, now()),
  ('Ankara Party & Event Wear', 'Stunning Ankara dresses for weddings, events, and celebrations. Premium African prints with expert craftsmanship.', '/banners/ankara-new-arrivals-banner.jpg', '/shop?filter=party', 'Explore Party Wear', true, 2, now()),
  ('New Ankara Arrivals', 'Fresh styles added weekly. Kimonos, fitted dresses, and statement pieces for the modern African woman.', '/banners/hero-ankara-main.jpg', '/shop?filter=new', 'View New In', true, 3, now());

SELECT id, title, image_url, button_link, is_active, sort_order FROM hero_banners ORDER BY sort_order;
