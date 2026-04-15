-- Fix hero banner image_url for existing records that have NULL image_url
-- These banners were seeded with correct image_url paths but the admin API
-- was writing to wrong columns. Ensure all active banners have images.

UPDATE hero_banners 
SET image_url = '/banners/ankara-dresses-banner.jpg'
WHERE sort_order = 1 AND (image_url IS NULL OR image_url = '');

UPDATE hero_banners 
SET image_url = '/banners/ankara-new-arrivals-banner.jpg'
WHERE sort_order = 2 AND (image_url IS NULL OR image_url = '');

UPDATE hero_banners 
SET image_url = '/banners/hero-ankara-main.jpg'
WHERE sort_order = 3 AND (image_url IS NULL OR image_url = '');

-- Catch-all: any remaining banners without images get the main banner
UPDATE hero_banners 
SET image_url = '/banners/hero-ankara-main.jpg'
WHERE image_url IS NULL OR image_url = '';

-- Verify
SELECT id, title, image_url, button_link, is_active, sort_order FROM hero_banners ORDER BY sort_order;
