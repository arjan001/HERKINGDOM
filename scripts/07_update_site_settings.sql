-- Update Site Settings for Classy Collections
UPDATE site_settings SET 
  store_name = 'Classy Collections',
  store_phone = '0702642324',
  whatsapp_number = '254702642324',
  footer_phone = '0702642324',
  footer_whatsapp = '0702642324',
  store_email = 'info@classycollections.com',
  footer_email = 'info@classycollections.com',
  footer_description = 'Premium authentic Ankara fashion for men and women. Handcrafted suits, dresses, kimonos, palazzo, tops, and more. Celebrate African style with quality fabrics delivered across East Africa.',
  logo_text = 'Classy Collections',
  site_title = 'Classy Collections | Premium African Ankara Print Clothing',
  site_description = 'Shop authentic Ankara fashion - premium ready-made suits, dresses, kimonos, palazzo, tops, and shirts for men and women. Fast delivery across Kenya and East Africa.',
  footer_dispatch_days = 'Tuesdays & Fridays'
WHERE id IS NOT NULL;

-- Remove all banner references
DELETE FROM hero_banners WHERE image_url LIKE '%baby%' OR image_url LIKE '%kids%';
