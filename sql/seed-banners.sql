-- =============================================
-- ELANI BEAUTY HUB - Banner & Offer Seed Data
-- =============================================
-- Run this SQL in your Supabase SQL Editor to populate
-- hero banners, promotional banners, navbar offers, and popup offers.
-- All image paths are relative to the /public/banners/ directory.

-- =============================================
-- 1. HERO BANNERS (Landing page carousel + side banners)
-- =============================================
-- Banner 1: Main carousel banner (large left panel)
-- Banners 2-3: Side banners (right panel, stacked)

INSERT INTO hero_banners (title, subtitle, button_text, button_link, image_url, is_active, sort_order)
VALUES
  (
    'Bodysuits Collection',
    'Sleek, sculpted bodysuits for every occasion. From casual layering to bold statement pieces — find your perfect fit.',
    'Shop Bodysuits',
    '/shop?category=women-bodysuits',
    '/banners/bodysuit-black-vneck.jpg',
    true,
    0
  ),
  (
    'Dresses & Tops',
    'Elegant dresses, floral tops, and corset pieces designed for the modern woman.',
    'Explore Collection',
    '/shop?filter=new',
    '/banners/dress-beige-wrap.jpg',
    true,
    1
  ),
  (
    'New Arrivals',
    'Fresh styles added weekly. Bodysuits, tops, dresses, and jackets — curated for you.',
    'View New In',
    '/shop?filter=new',
    '/banners/top-floral-garden.jpg',
    true,
    2
  );

-- =============================================
-- 2. BANNERS (Promotional offer banners - mid-page)
-- =============================================
-- These appear in the OfferBanner section between featured and new arrivals

INSERT INTO banners (title, subtitle, image_url, link, position, is_active, sort_order)
VALUES
  (
    'Bodysuits & Tops Sale',
    'Up to 30% off on selected bodysuits and tops. Premium women''s fashion, curated for you.',
    '/banners/bodysuit-blush-square.jpg',
    '/shop?filter=offers',
    'offer-left',
    true,
    0
  ),
  (
    'New Dresses & Jackets',
    'Fresh styles added weekly. Dresses, jackets, tops, and more.',
    '/banners/dress-white-floral.jpg',
    '/shop?filter=new',
    'offer-right',
    true,
    1
  );

-- =============================================
-- 3. NAVBAR OFFERS (Scrolling top bar messages)
-- =============================================

INSERT INTO navbar_offers (text, is_active, sort_order)
VALUES
  ('Free delivery on orders over KSh 5,000', true, 0),
  ('New arrivals added weekly — Shop now!', true, 1),
  ('Pay with M-PESA for instant checkout', true, 2),
  ('Follow us on Instagram @_classycollections', true, 3);

-- =============================================
-- 4. POPUP OFFERS (Newsletter popup modal)
-- =============================================

INSERT INTO popup_offers (title, description, discount_label, image_url, link, valid_until, is_active)
VALUES
  (
    'Get 10% Off Your First Order',
    'Subscribe to our newsletter and receive an exclusive 10% discount on your first purchase. Be the first to know about new arrivals and special offers.',
    '10% OFF',
    '/banners/bodysuit-nude-offshoulder.jpg',
    '/shop',
    '2026-12-31',
    true
  ),
  (
    'Weekend Flash Sale',
    'Enjoy up to 25% off selected bodysuits and dresses this weekend only. Limited stock available.',
    '25% OFF',
    '/banners/dress-black-lace-spaghetti.jpg',
    '/shop?filter=offers',
    '2026-12-31',
    true
  ),
  (
    'Free Delivery Weekend',
    'Order this weekend and get free delivery anywhere in Nairobi. No minimum spend required.',
    'FREE DELIVERY',
    '/banners/bodysuit-teal-cami.jpg',
    '/shop',
    '2026-12-31',
    true
  ),
  (
    'New Collection Drop',
    'Our latest collection just landed. Be the first to shop stunning new bodysuits, dresses, and tops.',
    'JUST DROPPED',
    '/banners/corset-floral-cream.jpg',
    '/shop?filter=new',
    '2026-12-31',
    true
  ),
  (
    'Bundle & Save',
    'Buy any 2 bodysuits and get 15% off your order. Mix and match your favourites.',
    '15% OFF',
    '/banners/bodysuit-white-ribbed.jpg',
    '/shop?category=women-bodysuits',
    '2026-12-31',
    true
  ),
  (
    'Refer a Friend',
    'Share your love for fashion! Refer a friend and you both get KSh 500 off your next order.',
    'KSh 500 OFF',
    '/banners/blouse-green-polkadot.jpg',
    '/shop',
    '2026-12-31',
    true
  ),
  (
    'Summer Dresses Sale',
    'Get ready for the season with our stunning dress collection. Up to 20% off all dresses.',
    '20% OFF',
    '/banners/dress-pink-button.jpg',
    '/shop?category=women-dresses',
    '2026-12-31',
    true
  ),
  (
    'VIP Early Access',
    'Subscribe now for VIP early access to our upcoming holiday collection. Exclusive styles dropping soon.',
    'VIP ACCESS',
    '/banners/dress-halter-leopard.jpg',
    '/shop',
    '2026-12-31',
    true
  ),
  (
    'Tops & Blouses Special',
    'Refresh your wardrobe with our latest tops and blouses. Perfect for work or weekend.',
    'NEW IN',
    '/banners/top-tropical-ruffle.jpg',
    '/shop?category=women-tops',
    '2026-12-31',
    true
  ),
  (
    'Style Your Way',
    'Discover versatile pieces you can dress up or down. From casual to glam — we have got you covered.',
    'SHOP NOW',
    '/banners/dress-green-paisley.jpg',
    '/shop',
    '2026-12-31',
    true
  );
