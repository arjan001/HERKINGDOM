-- Elani Beauty Hub - Body Suits Category Products
-- 19 thrift body suits, price range KSh 458-700
-- All items: in stock, new arrivals, on offer
-- Images from uploaded photos (no duplicates)

-- =============================================================
-- BODY SUIT PRODUCTS (19 unique)
-- =============================================================

-- 1: Black Cami Strap Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Cami Strap Bodysuit',
  'black-cami-strap-bodysuit',
  'Sleek black cami bodysuit with delicate spaghetti straps and a flattering scoop neckline. Smooth stretch fabric sits perfectly against the body for a seamless look under any outfit.',
  458, 570,
  id, true, true, 20,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 2: Black Sweetheart Notch Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Sweetheart Notch Bodysuit',
  'black-sweetheart-notch-bodysuit',
  'Bold black bodysuit with a sculpted sweetheart V-notch neckline and wide supportive straps. Structured bodice with a smooth, body-hugging fit that flatters every curve.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 3: Black Lace Trim Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Lace Trim Bodysuit',
  'black-lace-trim-bodysuit',
  'Romantic black bodysuit with intricate floral lace appliqué along the plunging V-neckline and a dainty lace-up tie front. Spaghetti straps and a sensual silhouette make this perfect for date nights.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 4: Grey Turtleneck Long Sleeve Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Grey Turtleneck Long Sleeve Bodysuit',
  'grey-turtleneck-long-sleeve-bodysuit',
  'Classic heather grey turtleneck bodysuit with fitted long sleeves. Soft stretch jersey fabric and a clean, minimalist design that layers beautifully under blazers and jackets.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 5: Pink Lace V-Neck Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Pink Lace V-Neck Bodysuit',
  'pink-lace-vneck-bodysuit',
  'Soft dusty pink ribbed bodysuit with delicate lace trim along the deep V-neckline. Wide shoulder straps and a feminine gathered bust for a vintage-inspired romantic look.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'body-suits';

-- 6: Grey Cap Sleeve Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Grey Cap Sleeve Bodysuit',
  'grey-cap-sleeve-bodysuit',
  'Versatile heather grey bodysuit with a round crew neckline and cute cap sleeves. Ribbed stretch cotton for everyday comfort. An essential wardrobe staple.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'body-suits';

-- 7: Black Square Neck Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Square Neck Bodysuit',
  'black-square-neck-bodysuit',
  'Chic black bodysuit with a sophisticated square neckline and wide tank straps. Clean lines and a sculpted fit that transitions effortlessly from day to night.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 8: Neon Lime Cami Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Neon Lime Cami Bodysuit',
  'neon-lime-cami-bodysuit',
  'Eye-catching neon lime green bodysuit with ruched bust detail, ruffle trim, and a front tie. Spaghetti straps and a high-cut leg create a bold, fun party look.',
  458, 570,
  id, true, true, 20,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 9: White Ribbed Halter Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'White Ribbed Halter Bodysuit',
  'white-ribbed-halter-bodysuit',
  'Fresh white ribbed bodysuit with double-strap halter neckline and a flattering V-cut. Stretchy ribbed knit fabric hugs the figure for a clean, sporty-chic silhouette.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'body-suits';

-- 10: Black Ruffle V-Neck Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Ruffle V-Neck Bodysuit',
  'black-ruffle-vneck-bodysuit',
  'Statement black bodysuit with a dramatic ruffle collar framing a deep V-neckline. Short flutter sleeves and tie-shoulder detail add playful flair to this elegant piece.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 11: Black Leopard Cowl Neck Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Leopard Cowl Neck Bodysuit',
  'black-leopard-cowl-bodysuit',
  'Sultry black leopard print bodysuit with draped cowl neckline and adjustable spaghetti straps. Side ruching adds a flattering silhouette. Perfect for a night out.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 12: Black Mock Neck Sleeveless Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Mock Neck Sleeveless Bodysuit',
  'black-mock-neck-bodysuit',
  'Classic black sleeveless bodysuit with a high mock neckline and clean minimalist cut. Ribbed stretch fabric for a snug comfortable fit.',
  458, 570,
  id, true, true, 20,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 13: Nude Off-Shoulder Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Nude Off-Shoulder Bodysuit',
  'nude-off-shoulder-bodysuit',
  'Soft nude off-shoulder bodysuit with short puff sleeves and a smooth suede-like finish. Flattering thong cut for a seamless look under skirts or jeans.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 14: Sage Green Sleeveless Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Sage Green Sleeveless Bodysuit',
  'sage-green-sleeveless-bodysuit',
  'Fresh sage green sleeveless bodysuit with a crew neckline and ribbed stretch fabric. High-cut leg for a flattering everyday essential.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'body-suits';

-- 15: Black Ribbed V-Neck Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Ribbed V-Neck Bodysuit',
  'black-ribbed-vneck-bodysuit',
  'Sleek black ribbed bodysuit with deep V-neckline and thin spaghetti straps. Stretch-fit ribbed fabric moulds to the body beautifully.',
  458, 570,
  id, true, true, 20,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 16: Navy Crew Neck Short Sleeve Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Navy Crew Neck Short Sleeve Bodysuit',
  'navy-crew-neck-bodysuit',
  'Smooth navy blue bodysuit with classic crew neckline and short sleeves. Soft stretchy fabric ideal for layering or wearing solo.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'body-suits';

-- 17: Blush Square Neck Tank Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Blush Square Neck Tank Bodysuit',
  'blush-square-neck-bodysuit',
  'Delicate blush pink tank bodysuit with a square neckline and wide shoulder straps. Lightweight ribbed cotton for comfortable all-day wear.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'body-suits';

-- 18: Emerald Green Cami Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Emerald Green Cami Bodysuit',
  'emerald-cami-bodysuit',
  'Bold emerald green camisole bodysuit with thin spaghetti straps and a scooped neckline. Smooth satin-like fabric with a body-hugging fit.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'body-suits';

-- 19: Black Fringe Long Sleeve Bodysuit
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Fringe Long Sleeve Bodysuit',
  'black-fringe-sleeve-bodysuit',
  'Statement black V-neck bodysuit with dramatic fringe detailing along the long bell sleeves. Stretchy fabric for a flattering fit. Show-stopping piece.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'body-suits';

-- =============================================================
-- PRODUCT IMAGES (all bodysuit images, no duplicates)
-- =============================================================

-- 1: Black Cami Strap Bodysuit (2 images)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-cami-strap-bodysuit-1.jpg',
  'Black Cami Strap Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'black-cami-strap-bodysuit';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-cami-strap-bodysuit-2.jpg',
  'Black Cami Strap Bodysuit - Angle', 1, false
FROM products p WHERE p.slug = 'black-cami-strap-bodysuit';

-- 2: Black Sweetheart Notch Bodysuit (2 images)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-sweetheart-notch-bodysuit-1.jpg',
  'Black Sweetheart Notch Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'black-sweetheart-notch-bodysuit';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-sweetheart-notch-bodysuit-2.jpg',
  'Black Sweetheart Notch Bodysuit - Angle', 1, false
FROM products p WHERE p.slug = 'black-sweetheart-notch-bodysuit';

-- 3: Black Lace Trim Bodysuit (2 images)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-lace-trim-bodysuit-1.jpg',
  'Black Lace Trim Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'black-lace-trim-bodysuit';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-lace-trim-bodysuit-2.jpg',
  'Black Lace Trim Bodysuit - Detail', 1, false
FROM products p WHERE p.slug = 'black-lace-trim-bodysuit';

-- 4: Grey Turtleneck Long Sleeve Bodysuit (2 images)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/grey-turtleneck-bodysuit-1.jpg',
  'Grey Turtleneck Long Sleeve Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'grey-turtleneck-long-sleeve-bodysuit';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/grey-turtleneck-bodysuit-2.jpg',
  'Grey Turtleneck Long Sleeve Bodysuit - Angle', 1, false
FROM products p WHERE p.slug = 'grey-turtleneck-long-sleeve-bodysuit';

-- 5: Pink Lace V-Neck Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/pink-lace-vneck-bodysuit-1.jpg',
  'Pink Lace V-Neck Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'pink-lace-vneck-bodysuit';

-- 6: Grey Cap Sleeve Bodysuit (2 images)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/grey-cap-sleeve-bodysuit-1.jpg',
  'Grey Cap Sleeve Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'grey-cap-sleeve-bodysuit';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/grey-cap-sleeve-bodysuit-2.jpg',
  'Grey Cap Sleeve Bodysuit - Angle', 1, false
FROM products p WHERE p.slug = 'grey-cap-sleeve-bodysuit';

-- 7: Black Square Neck Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-square-neck-bodysuit-1.jpg',
  'Black Square Neck Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'black-square-neck-bodysuit';

-- 8: Neon Lime Cami Bodysuit (2 images)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/neon-lime-cami-bodysuit-1.jpg',
  'Neon Lime Cami Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'neon-lime-cami-bodysuit';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/neon-lime-cami-bodysuit-2.jpg',
  'Neon Lime Cami Bodysuit - Angle', 1, false
FROM products p WHERE p.slug = 'neon-lime-cami-bodysuit';

-- 9: White Ribbed Halter Bodysuit (2 images)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/white-ribbed-halter-bodysuit-1.jpg',
  'White Ribbed Halter Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'white-ribbed-halter-bodysuit';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/white-ribbed-halter-bodysuit-2.jpg',
  'White Ribbed Halter Bodysuit - Detail', 1, false
FROM products p WHERE p.slug = 'white-ribbed-halter-bodysuit';

-- 10: Black Ruffle V-Neck Bodysuit (2 images)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-ruffle-vneck-bodysuit-1.jpg',
  'Black Ruffle V-Neck Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'black-ruffle-vneck-bodysuit';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-ruffle-vneck-bodysuit-2.jpg',
  'Black Ruffle V-Neck Bodysuit - Angle', 1, false
FROM products p WHERE p.slug = 'black-ruffle-vneck-bodysuit';

-- 11: Black Leopard Cowl Neck Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-leopard-cowl-bodysuit-1.jpg',
  'Black Leopard Cowl Neck Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'black-leopard-cowl-bodysuit';

-- 12: Black Mock Neck Sleeveless Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-mock-neck-bodysuit-1.jpg',
  'Black Mock Neck Sleeveless Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'black-mock-neck-bodysuit';

-- 13: Nude Off-Shoulder Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/nude-off-shoulder-bodysuit-1.jpg',
  'Nude Off-Shoulder Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'nude-off-shoulder-bodysuit';

-- 14: Sage Green Sleeveless Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/sage-green-sleeveless-bodysuit-1.jpg',
  'Sage Green Sleeveless Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'sage-green-sleeveless-bodysuit';

-- 15: Black Ribbed V-Neck Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-ribbed-vneck-bodysuit-1.jpg',
  'Black Ribbed V-Neck Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'black-ribbed-vneck-bodysuit';

-- 16: Navy Crew Neck Short Sleeve Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/navy-crew-neck-bodysuit-1.jpg',
  'Navy Crew Neck Short Sleeve Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'navy-crew-neck-bodysuit';

-- 17: Blush Square Neck Tank Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/blush-square-neck-bodysuit-1.jpg',
  'Blush Square Neck Tank Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'blush-square-neck-bodysuit';

-- 18: Emerald Green Cami Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/emerald-cami-bodysuit-1.jpg',
  'Emerald Green Cami Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'emerald-cami-bodysuit';

-- 19: Black Fringe Long Sleeve Bodysuit (1 image)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-fringe-sleeve-bodysuit-1.jpg',
  'Black Fringe Long Sleeve Bodysuit - Front', 0, true
FROM products p WHERE p.slug = 'black-fringe-sleeve-bodysuit';

-- =============================================================
-- PRODUCT VARIATIONS (Sizes)
-- =============================================================

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-cami-strap-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-sweetheart-notch-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-lace-trim-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'grey-turtleneck-long-sleeve-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'pink-lace-vneck-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'grey-cap-sleeve-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-square-neck-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'neon-lime-cami-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'white-ribbed-halter-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'black-ruffle-vneck-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-leopard-cowl-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'black-mock-neck-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'nude-off-shoulder-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'sage-green-sleeveless-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-ribbed-vneck-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'navy-crew-neck-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'blush-square-neck-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'emerald-cami-bodysuit';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-fringe-sleeve-bodysuit';

-- =============================================================
-- PRODUCT TAGS
-- =============================================================

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-cami-strap-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-sweetheart-notch-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'party-wear');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-lace-trim-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'party-wear', 'statement-piece');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'grey-turtleneck-long-sleeve-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'office-wear', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'pink-lace-vneck-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'vintage');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'grey-cap-sleeve-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-square-neck-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'office-wear');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'neon-lime-cami-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'party-wear', 'statement-piece');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'white-ribbed-halter-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-ruffle-vneck-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'statement-piece', 'party-wear');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-leopard-cowl-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'date-night');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-mock-neck-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'nude-off-shoulder-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'date-night');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'sage-green-sleeveless-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-ribbed-vneck-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'date-night');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'navy-crew-neck-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'blush-square-neck-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'emerald-cami-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'statement-piece');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-fringe-sleeve-bodysuit'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'statement-piece');
