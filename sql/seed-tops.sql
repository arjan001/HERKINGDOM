-- Elani Beauty Hub - Tops Category Products
-- 18 thrift tops, price range KSh 458-700
-- All items: in stock, new arrivals, on offer
-- Images from uploaded photos

-- =============================================================
-- TOP PRODUCTS
-- =============================================================

-- Top 1: Berry Floral Button Blouse
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Berry Floral Button Blouse',
  'berry-floral-button-blouse',
  'Rich berry-toned blouse with delicate pink cherry blossom print. Long sleeves, notch neckline with button placket. Lightweight and feminine.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 2: White Floral Peplum Cami
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'White Floral Peplum Cami',
  'white-floral-peplum-cami',
  'Elegant white camisole with soft pink and grey floral print. V-neckline with front tie detail and flowing peplum hem. Adjustable spaghetti straps.',
  458, 570,
  id, true, true, 20,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 3: Pink Floral Ruffle Crop Top
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Pink Floral Ruffle Crop Top',
  'pink-floral-ruffle-crop-top',
  'Playful pink floral crop top with tiered ruffle layers. Tie-strap shoulders with a sweet romantic vibe. Perfect for summer outings.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'tops';

-- Top 4: Lilac Floral V-Neck Blouse
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Lilac Floral V-Neck Blouse',
  'lilac-floral-v-neck-blouse',
  'Soft lilac blouse with hand-drawn floral sketches. Relaxed V-neckline and bishop sleeves with cuff detail. Effortlessly chic.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 5: Garden Ditsy Sweetheart Top
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Garden Ditsy Sweetheart Top',
  'garden-ditsy-sweetheart-top',
  'Charming multicolour ditsy floral top with sweetheart neckline and wide straps. Fitted bodice with a garden-fresh appeal.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'tops';

-- Top 6: Golden Paisley Off-Shoulder Top
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Golden Paisley Off-Shoulder Top',
  'golden-paisley-off-shoulder-top',
  'Stunning golden yellow off-shoulder top with white paisley print. Puff sleeves and cinched waist with tie front peplum detail.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 7: Navy Tropical Cold Shoulder Top
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Navy Tropical Cold Shoulder Top',
  'navy-tropical-cold-shoulder-top',
  'Bold navy top with vibrant pink and orange tropical floral print. Cold-shoulder ruffled sleeves and relaxed silhouette.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 8: Cream Ditsy Corset Top
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Cream Ditsy Corset Top',
  'cream-ditsy-corset-top',
  'Dainty cream corset-style top with tiny floral print. Adjustable shoulder straps and front tie detail. Structured and flattering.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'tops';

-- Top 9: White Botanical Peasant Blouse
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'White Botanical Peasant Blouse',
  'white-botanical-peasant-blouse',
  'Airy white peasant blouse with subtle botanical sprig print. Gathered neckline with tie, balloon sleeves. Relaxed bohemian style.',
  570, 700,
  id, true, true, 19,
  true, false
FROM categories WHERE slug = 'tops';

-- Top 10: Navy Boho Contrast Tunic
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Navy Boho Contrast Tunic',
  'navy-boho-contrast-tunic',
  'Sleeveless navy tunic with red and white ditsy floral yoke and contrasting print body. Handkerchief hem for effortless boho style.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 11: Green Polka Ruffle V-Neck Blouse
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Green Polka Ruffle V-Neck Blouse',
  'green-polka-ruffle-v-neck-blouse',
  'Fresh green blouse with white polka dot print. Ruffle V-neckline and puff half-sleeves. Cheerful and easy to style.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'tops';

-- Top 12: Blue Polka Dot V-Neck Blouse
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Blue Polka Dot V-Neck Blouse',
  'blue-polka-dot-v-neck-blouse',
  'Classic blue blouse with playful white polka dots. V-neckline with three-quarter balloon sleeves. Smart-casual versatility.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 13: Purple Watercolor Peplum Blouse
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Purple Watercolor Peplum Blouse',
  'purple-watercolor-peplum-blouse',
  'Artistic purple and blue watercolour print blouse with gathered empire waist. Long bell sleeves add a dreamy bohemian touch.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 14: Monochrome Lattice Shell Top
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Monochrome Lattice Shell Top',
  'monochrome-lattice-shell-top',
  'Sleek black and white geometric lattice print shell top with notch neckline. Red Greek key hem band adds a designer-inspired accent.',
  458, 570,
  id, true, true, 20,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 15: White Pleated Ruffle Top
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'White Pleated Ruffle Top',
  'white-pleated-ruffle-top',
  'Ethereal white pleated top with layered ruffle overlay at neckline. Sheer crinkle fabric for an elegant airy feel.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'tops';

-- Top 16: Black Tropical Tie-Front Top
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Black Tropical Tie-Front Top',
  'black-tropical-tie-front-top',
  'Sultry black bralette-style tie-front top with vivid tropical floral print. Spaghetti straps and centre knot. Perfect holiday piece.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'tops';

-- Top 17: Pink Aztec Boho Blouse
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Pink Aztec Boho Blouse',
  'pink-aztec-boho-blouse',
  'Warm pink boho blouse with intricate Aztec geometric print. V-neckline with tassel ties and relaxed bell sleeves.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'tops';

-- Top 18: Coral Cap Sleeve Tee
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Coral Cap Sleeve Tee',
  'coral-cap-sleeve-tee',
  'Simple and chic coral pink cap-sleeve tee with round neckline and curved hem. Soft cotton blend for everyday comfort.',
  458, 570,
  id, true, true, 20,
  true, false
FROM categories WHERE slug = 'tops';

-- Top 19: Hot Pink Sleeveless Button Blouse
INSERT INTO products (
  id, name, slug, description, price, original_price,
  category_id, is_new, is_on_offer, offer_percentage,
  in_stock, featured
)
SELECT
  gen_random_uuid(),
  'Hot Pink Sleeveless Button Blouse',
  'hot-pink-sleeveless-button-blouse',
  'Vibrant hot pink sleeveless blouse with classic collar and button-down front. Chest pocket details and a tailored fit for a polished summer look.',
  570, 700,
  id, true, true, 19,
  true, true
FROM categories WHERE slug = 'tops';

-- =============================================================
-- PRODUCT IMAGES
-- =============================================================

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/berry-floral-blouse-1.jpg',
  'Berry Floral Button Blouse - Front', 0, true
FROM products p WHERE p.slug = 'berry-floral-button-blouse';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/white-floral-peplum-cami-1.jpg',
  'White Floral Peplum Cami - Front', 0, true
FROM products p WHERE p.slug = 'white-floral-peplum-cami';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/pink-floral-ruffle-crop-1.jpg',
  'Pink Floral Ruffle Crop Top - Front', 0, true
FROM products p WHERE p.slug = 'pink-floral-ruffle-crop-top';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/lilac-floral-v-neck-blouse-1.jpg',
  'Lilac Floral V-Neck Blouse - Front', 0, true
FROM products p WHERE p.slug = 'lilac-floral-v-neck-blouse';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/garden-ditsy-sweetheart-top-1.jpg',
  'Garden Ditsy Sweetheart Top - Front', 0, true
FROM products p WHERE p.slug = 'garden-ditsy-sweetheart-top';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/golden-paisley-off-shoulder-1.jpg',
  'Golden Paisley Off-Shoulder Top - Front', 0, true
FROM products p WHERE p.slug = 'golden-paisley-off-shoulder-top';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/navy-tropical-cold-shoulder-1.jpg',
  'Navy Tropical Cold Shoulder Top - Front', 0, true
FROM products p WHERE p.slug = 'navy-tropical-cold-shoulder-top';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/cream-ditsy-corset-top-1.jpg',
  'Cream Ditsy Corset Top - Front', 0, true
FROM products p WHERE p.slug = 'cream-ditsy-corset-top';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/white-botanical-peasant-blouse-1.jpg',
  'White Botanical Peasant Blouse - Front', 0, true
FROM products p WHERE p.slug = 'white-botanical-peasant-blouse';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/navy-boho-contrast-tunic-1.jpg',
  'Navy Boho Contrast Tunic - Front', 0, true
FROM products p WHERE p.slug = 'navy-boho-contrast-tunic';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/green-polka-ruffle-blouse-1.jpg',
  'Green Polka Ruffle V-Neck Blouse - Front', 0, true
FROM products p WHERE p.slug = 'green-polka-ruffle-v-neck-blouse';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/blue-polka-dot-blouse-1.jpg',
  'Blue Polka Dot V-Neck Blouse - Front', 0, true
FROM products p WHERE p.slug = 'blue-polka-dot-v-neck-blouse';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/purple-watercolor-peplum-1.jpg',
  'Purple Watercolor Peplum Blouse - Front', 0, true
FROM products p WHERE p.slug = 'purple-watercolor-peplum-blouse';

-- Monochrome Lattice Shell Top has 2 images
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/monochrome-lattice-shell-top-1.jpg',
  'Monochrome Lattice Shell Top - Front', 0, true
FROM products p WHERE p.slug = 'monochrome-lattice-shell-top';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/monochrome-lattice-shell-top-2.jpg',
  'Monochrome Lattice Shell Top - Detail', 1, false
FROM products p WHERE p.slug = 'monochrome-lattice-shell-top';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/white-pleated-ruffle-top-1.jpg',
  'White Pleated Ruffle Top - Front', 0, true
FROM products p WHERE p.slug = 'white-pleated-ruffle-top';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/black-tropical-tie-front-1.jpg',
  'Black Tropical Tie-Front Top - Front', 0, true
FROM products p WHERE p.slug = 'black-tropical-tie-front-top';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/pink-aztec-boho-blouse-1.jpg',
  'Pink Aztec Boho Blouse - Front', 0, true
FROM products p WHERE p.slug = 'pink-aztec-boho-blouse';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/coral-cap-sleeve-tee-1.jpg',
  'Coral Cap Sleeve Tee - Front', 0, true
FROM products p WHERE p.slug = 'coral-cap-sleeve-tee';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id,
  '/images/products/hot-pink-sleeveless-button-blouse-1.jpg',
  'Hot Pink Sleeveless Button Blouse - Front', 0, true
FROM products p WHERE p.slug = 'hot-pink-sleeveless-button-blouse';

-- =============================================================
-- PRODUCT VARIATIONS (Sizes)
-- =============================================================

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'berry-floral-button-blouse';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'white-floral-peplum-cami';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'pink-floral-ruffle-crop-top';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'lilac-floral-v-neck-blouse';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'garden-ditsy-sweetheart-top';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'golden-paisley-off-shoulder-top';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'navy-tropical-cold-shoulder-top';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'cream-ditsy-corset-top';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'white-botanical-peasant-blouse';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'navy-boho-contrast-tunic';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'green-polka-ruffle-v-neck-blouse';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'blue-polka-dot-v-neck-blouse';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'purple-watercolor-peplum-blouse';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'monochrome-lattice-shell-top';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'white-pleated-ruffle-top';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-tropical-tie-front-top';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'pink-aztec-boho-blouse';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'coral-cap-sleeve-tee';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'hot-pink-sleeveless-button-blouse';

-- =============================================================
-- PRODUCT TAGS
-- =============================================================

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'berry-floral-button-blouse'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'white-floral-peplum-cami'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'date-night');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'pink-floral-ruffle-crop-top'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'lilac-floral-v-neck-blouse'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'office-wear');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'garden-ditsy-sweetheart-top'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'golden-paisley-off-shoulder-top'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'date-night');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'navy-tropical-cold-shoulder-top'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'statement-piece');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'cream-ditsy-corset-top'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'date-night');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'white-botanical-peasant-blouse'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'navy-boho-contrast-tunic'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'green-polka-ruffle-v-neck-blouse'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'blue-polka-dot-v-neck-blouse'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'office-wear');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'purple-watercolor-peplum-blouse'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'statement-piece');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'monochrome-lattice-shell-top'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'office-wear');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'white-pleated-ruffle-top'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'date-night');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-tropical-tie-front-top'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'date-night');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'pink-aztec-boho-blouse'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'coral-cap-sleeve-tee'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'hot-pink-sleeveless-button-blouse'
  AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'statement-piece');
