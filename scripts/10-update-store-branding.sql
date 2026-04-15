-- Update store settings to Classy Collections branding
UPDATE site_settings SET
  store_name = 'Classy Collections',
  store_email = 'info@classycollections.com',
  site_title = 'Classy Collections | Ankara Collection in Kenya',
  site_description = 'Shop curated Ankara collection. Elegant African fashion for every occasion. Delivered across Nairobi & Kenya.',
  logo_text = 'Classy Collections',
  footer_email = 'info@classycollections.com',
  footer_instagram = 'https://www.instagram.com/classycollections/',
  footer_tiktok = 'https://www.tiktok.com/@classycollections',
  copyright_text = '2026 Classy Collections. All rights reserved.'
WHERE id = (SELECT id FROM site_settings LIMIT 1);

-- Update SEO pages to Classy Collections branding (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'seo_pages') THEN
    UPDATE seo_pages SET
      meta_title = REPLACE(meta_title, 'Kallittos Fashions', 'Classy Collections'),
      meta_description = REPLACE(meta_description, 'Kallittos Fashions', 'Classy Collections'),
      meta_keywords = REPLACE(meta_keywords, 'kallittosfashions', 'classycollections')
    WHERE meta_title LIKE '%Kallittos%' OR meta_description LIKE '%Kallittos%' OR meta_keywords LIKE '%kallittos%';

    UPDATE seo_pages SET
      meta_title = REPLACE(meta_title, 'Kallittos', 'Classy Collections'),
      meta_description = REPLACE(meta_description, 'Kallittos', 'Classy Collections'),
      meta_keywords = REPLACE(meta_keywords, 'Kallittos', 'Classy Collections')
    WHERE meta_title LIKE '%Kallittos%' OR meta_description LIKE '%Kallittos%' OR meta_keywords LIKE '%Kallittos%';
  END IF;
END $$;
