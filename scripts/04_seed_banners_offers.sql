-- Seed banner and offer data for admin dashboard

-- Insert hero banners (if they don't exist)
INSERT INTO hero_banners (title, subtitle, image_url, button_link, button_text, is_active, sort_order, created_at)
VALUES
  ('Premium Ankara Dresses Collection', 'Discover vibrant, ready-made Ankara dresses perfect for any occasion. From casual to formal wear.', '/banners/ankara-dresses-banner.jpg', '/shop?category=women-ankara-dresses', 'Shop Dresses', true, 1, now()),
  ('Ankara Party & Event Wear', 'Stunning Ankara dresses for weddings, events, and celebrations. Premium African prints with expert craftsmanship.', '/banners/ankara-new-arrivals-banner.jpg', '/shop?filter=party', 'Explore Party Wear', true, 2, now()),
  ('New Ankara Arrivals', 'Fresh styles added weekly. Kimonos, fitted dresses, and statement pieces for the modern African woman.', '/banners/hero-ankara-main.jpg', '/shop?filter=new', 'View New In', true, 3, now())
ON CONFLICT DO NOTHING;

-- Insert navbar offers (announcement bar)
INSERT INTO navbar_offers (text, is_active, sort_order, created_at)
VALUES
  ('Free delivery on orders over 5000 KES', true, 1, now()),
  ('New arrivals - Fresh Ankara prints just dropped', true, 2, now()),
  ('Weekend sale - Get 20% off on selected items', false, 3, now()),
  ('Celebrate with us - Enjoy premium African fashion', true, 4, now())
ON CONFLICT DO NOTHING;

-- Insert popup offers
INSERT INTO popup_offers (title, description, discount_label, image_url, is_active, created_at)
VALUES
  ('Welcome to Classy Collections', 'Get 15% off your first order with code WELCOME15', '15% OFF', '/banners/ankara-dresses-banner.jpg', true, now()),
  ('Flash Sale', 'Limited time: 25% off on all Ankara suits today only', '25% OFF', '/banners/ankara-new-arrivals-banner.jpg', false, now()),
  ('Join Our Newsletter', 'Subscribe to get exclusive offers and new arrivals first', 'SUBSCRIBE', '/banners/hero-ankara-main.jpg', true, now()),
  ('Easter Special', 'Celebrate with 20% off on selected dresses and kimonos', '20% OFF', '/banners/hero-ankara-main.jpg', false, now())
ON CONFLICT DO NOTHING;

-- Confirm data
SELECT COUNT(*) as hero_banners_count FROM hero_banners WHERE is_active = true;
SELECT COUNT(*) as navbar_offers_count FROM navbar_offers WHERE is_active = true;
SELECT COUNT(*) as popup_offers_count FROM popup_offers WHERE is_active = true;
