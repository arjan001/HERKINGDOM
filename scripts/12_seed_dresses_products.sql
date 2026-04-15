-- Classy Collections / Elani Beauty Hub - Dresses Category Seed
-- 20 new dress products with creative descriptions, pricing KSh 600-900
-- Tags: new-arrival, in-stock, on-offer, casual, party-wear, office-wear, etc.

-- Ensure required tags exist
INSERT INTO tags (id, name, slug) VALUES
  (gen_random_uuid(), 'On Offer', 'on-offer'),
  (gen_random_uuid(), 'Date Night', 'date-night'),
  (gen_random_uuid(), 'Vintage', 'vintage')
ON CONFLICT DO NOTHING;

-- ============================================================
-- DRESS 1: Pink Button-Front Belted Midi Dress
-- Status: NEW IN STOCK | ON OFFER (11% off)
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Pink Button-Front Belted Midi Dress',
  'pink-button-front-belted-midi-dress',
  id,
  'Effortlessly feminine pink midi dress with a flattering V-neckline and delicate button detailing down the front. The self-tie waist belt cinches beautifully while the long balloon sleeves add a romantic flair. Soft ribbed fabric drapes gracefully for an elegant silhouette.',
  850, 950,
  true, true, 11, true, true,
  ARRAY['/images/products/dresses/pink-button-midi-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/pink-button-midi-dress.jpg', 'Pink Button-Front Belted Midi Dress - Front', 0, true
FROM products p WHERE p.slug = 'pink-button-front-belted-midi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'pink-button-front-belted-midi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'pink-button-front-belted-midi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual', 'office-wear');

-- ============================================================
-- DRESS 2: Yellow Sunflower Halterneck Bodycon Dress
-- Status: NEW IN STOCK | FEATURED
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Yellow Sunflower Halterneck Bodycon Dress',
  'yellow-sunflower-halterneck-bodycon-dress',
  id,
  'Turn heads in this stunning yellow sunflower print bodycon dress. The halterneck design frames the shoulders beautifully while the body-hugging silhouette celebrates every curve. A vibrant showstopper for brunches and summer outings.',
  750, NULL,
  true, false, 0, true, true,
  ARRAY['/images/products/dresses/yellow-sunflower-bodycon-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/yellow-sunflower-bodycon-dress.jpg', 'Yellow Sunflower Halterneck Bodycon Dress - Front', 0, true
FROM products p WHERE p.slug = 'yellow-sunflower-halterneck-bodycon-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'yellow-sunflower-halterneck-bodycon-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'yellow-sunflower-halterneck-bodycon-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'party-wear', 'statement-piece');

-- ============================================================
-- DRESS 3: Dark Floral Ruffle-Collar Midi Dress
-- Status: NEW IN STOCK | ON OFFER (11% off)
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Dark Floral Ruffle-Collar Midi Dress',
  'dark-floral-ruffle-collar-midi-dress',
  id,
  'Charming dark floral midi dress with a romantic ruffle collar and three-quarter sleeves. The cinched waist creates an hourglass shape while the flared skirt moves freely with every step. A timeless print that transitions effortlessly from day to evening.',
  800, 900,
  true, true, 11, true, false,
  ARRAY['/images/products/dresses/dark-floral-ruffle-midi-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/dark-floral-ruffle-midi-dress.jpg', 'Dark Floral Ruffle-Collar Midi Dress - Front', 0, true
FROM products p WHERE p.slug = 'dark-floral-ruffle-collar-midi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'dark-floral-ruffle-collar-midi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'dark-floral-ruffle-collar-midi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual', 'vintage');

-- ============================================================
-- DRESS 4: Blue Polka Dot Tiered Midi Dress
-- Status: NEW IN STOCK
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Blue Polka Dot Tiered Midi Dress',
  'blue-polka-dot-tiered-midi-dress',
  id,
  'Fresh and playful blue midi dress covered in cheerful white polka dots. Features a relaxed scoop neckline and short flutter sleeves with a tiered flowing skirt. Cinch the waist with the included tan leather belt for a pulled-together look.',
  700, NULL,
  true, false, 0, true, false,
  ARRAY['/images/products/dresses/blue-polka-dot-midi-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/blue-polka-dot-midi-dress.jpg', 'Blue Polka Dot Tiered Midi Dress - Front', 0, true
FROM products p WHERE p.slug = 'blue-polka-dot-tiered-midi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'blue-polka-dot-tiered-midi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'blue-polka-dot-tiered-midi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual');

-- ============================================================
-- DRESS 5: Beige Wrap Midi Dress
-- Status: NEW IN STOCK
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Beige Wrap Midi Dress',
  'beige-wrap-midi-dress',
  id,
  'Understated elegance meets everyday comfort in this beige wrap midi dress. The crossover V-neckline and cap sleeves create a clean minimalist look while the wrap silhouette flatters every body type. Pair with sandals for brunch or heels for the office.',
  750, NULL,
  true, false, 0, true, false,
  ARRAY['/images/products/dresses/beige-wrap-midi-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/beige-wrap-midi-dress.jpg', 'Beige Wrap Midi Dress - Front', 0, true
FROM products p WHERE p.slug = 'beige-wrap-midi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'beige-wrap-midi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'beige-wrap-midi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual', 'office-wear');

-- ============================================================
-- DRESS 6: Lilac Cap-Sleeve Midi Dress
-- Status: NEW IN STOCK
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Lilac Cap-Sleeve Midi Dress',
  'lilac-cap-sleeve-midi-dress',
  id,
  'Dreamy lilac midi dress with a softly gathered neckline and relaxed cap sleeves. The lightweight fabric falls beautifully to mid-calf while the included belt adds shape and definition. A pastel dream for garden parties and weekend strolls.',
  700, NULL,
  true, false, 0, true, false,
  ARRAY['/images/products/dresses/lilac-cap-sleeve-midi-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/lilac-cap-sleeve-midi-dress.jpg', 'Lilac Cap-Sleeve Midi Dress - Front', 0, true
FROM products p WHERE p.slug = 'lilac-cap-sleeve-midi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'lilac-cap-sleeve-midi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'lilac-cap-sleeve-midi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual');

-- ============================================================
-- DRESS 7: Black Sculpted Bodycon Mini Dress
-- Status: NEW IN STOCK | ON OFFER (19% off) | FEATURED
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Black Sculpted Bodycon Mini Dress',
  'black-sculpted-bodycon-mini-dress',
  id,
  'The ultimate little black dress reinvented. This sleek bodycon mini features structured cap sleeves and a high mock neckline for a bold and confident look. Thick stretch fabric smooths and sculpts for a flawless finish. Your new go-to for nights out.',
  650, 800,
  true, true, 19, true, true,
  ARRAY['/images/products/dresses/black-bodycon-mini-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/black-bodycon-mini-dress.jpg', 'Black Sculpted Bodycon Mini Dress - Front', 0, true
FROM products p WHERE p.slug = 'black-sculpted-bodycon-mini-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-sculpted-bodycon-mini-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-sculpted-bodycon-mini-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'party-wear');

-- ============================================================
-- DRESS 8: Black & White Pleated Sleeve Cocktail Dress
-- Status: NEW IN STOCK | FEATURED | BEST SELLER
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Black & White Pleated Sleeve Cocktail Dress',
  'black-white-pleated-sleeve-cocktail-dress',
  id,
  'Sophisticated black cocktail dress with show-stopping white accordion-pleated long sleeves. The keyhole neckline adds a touch of allure while the belted waist defines the silhouette. A head-turning fusion of classic and contemporary for formal events.',
  900, NULL,
  true, false, 0, true, true,
  ARRAY['/images/products/dresses/black-white-pleated-sleeve-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/black-white-pleated-sleeve-dress.jpg', 'Black & White Pleated Sleeve Cocktail Dress - Front', 0, true
FROM products p WHERE p.slug = 'black-white-pleated-sleeve-cocktail-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'black-white-pleated-sleeve-cocktail-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-white-pleated-sleeve-cocktail-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'party-wear', 'statement-piece', 'best-seller');

-- ============================================================
-- DRESS 9: White Floral Eyelet-Trim Midi Dress
-- Status: NEW IN STOCK
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'White Floral Eyelet-Trim Midi Dress',
  'white-floral-eyelet-trim-midi-dress',
  id,
  'Cottage-core charm meets modern style in this white floral midi dress. Delicate wildflower print scattered across lightweight cotton with eyelet lace trim along the flutter sleeves and hemline. The fitted waist flares into a romantic A-line skirt.',
  800, NULL,
  true, false, 0, true, false,
  ARRAY['/images/products/dresses/white-floral-eyelet-midi-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/white-floral-eyelet-midi-dress.jpg', 'White Floral Eyelet-Trim Midi Dress - Front', 0, true
FROM products p WHERE p.slug = 'white-floral-eyelet-trim-midi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'white-floral-eyelet-trim-midi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'white-floral-eyelet-trim-midi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual', 'vintage');

-- ============================================================
-- DRESS 10: Pastel Stripe Cami Mini Dress
-- Status: NEW IN STOCK | ON OFFER (20% off)
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Pastel Stripe Cami Mini Dress',
  'pastel-stripe-cami-mini-dress',
  id,
  'Sweet and flirty pastel-striped mini dress with thin spaghetti straps and a playful ruffled hem. The candy-coloured pink and cream stripes bring instant summer vibes while the fitted stretch fabric hugs the body in all the right places. Perfect for beach days and casual dates.',
  600, 750,
  true, true, 20, true, false,
  ARRAY['/images/products/dresses/pastel-stripe-mini-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/pastel-stripe-mini-dress.jpg', 'Pastel Stripe Cami Mini Dress - Front', 0, true
FROM products p WHERE p.slug = 'pastel-stripe-cami-mini-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'pastel-stripe-cami-mini-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'pastel-stripe-cami-mini-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

-- ============================================================
-- DRESS 11: Green Paisley Long-Sleeve Bodycon Dress
-- Status: NEW IN STOCK | FEATURED
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Green Paisley Long-Sleeve Bodycon Dress',
  'green-paisley-long-sleeve-bodycon-dress',
  id,
  'Make a statement in this vibrant green and turquoise paisley bodycon dress. Bold swirling patterns in green and purple create an eye-catching retro aesthetic. Long sleeves and a boat neckline keep it chic while the body-skimming fit adds modern edge.',
  750, NULL,
  true, false, 0, true, true,
  ARRAY['/images/products/dresses/green-paisley-bodycon-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/green-paisley-bodycon-dress.jpg', 'Green Paisley Long-Sleeve Bodycon Dress - Front', 0, true
FROM products p WHERE p.slug = 'green-paisley-long-sleeve-bodycon-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'green-paisley-long-sleeve-bodycon-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'green-paisley-long-sleeve-bodycon-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'party-wear', 'statement-piece');

-- ============================================================
-- DRESS 12: Champagne Smocked Bodice Maxi Dress
-- Status: NEW IN STOCK | FEATURED | BEST SELLER
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Champagne Smocked Bodice Maxi Dress',
  'champagne-smocked-bodice-maxi-dress',
  id,
  'Graceful champagne maxi dress with a stretchy smocked bodice and flowing layered skirt. Thin spaghetti straps create a delicate look while the floor-length silhouette adds drama. From sunset dinners to weddings this dress does it all beautifully.',
  850, NULL,
  true, false, 0, true, true,
  ARRAY['/images/products/dresses/champagne-smocked-maxi-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/champagne-smocked-maxi-dress.jpg', 'Champagne Smocked Bodice Maxi Dress - Front', 0, true
FROM products p WHERE p.slug = 'champagne-smocked-bodice-maxi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'champagne-smocked-bodice-maxi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'champagne-smocked-bodice-maxi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'party-wear', 'best-seller');

-- ============================================================
-- DRESS 13: Sage Green Button-Down Shirt Dress
-- Status: NEW IN STOCK | ON OFFER (11% off)
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Sage Green Button-Down Shirt Dress',
  'sage-green-button-down-shirt-dress',
  id,
  'Classic and effortlessly cool sage green shirt dress with a pointed collar and button-through front. The three-quarter sleeves roll up for a relaxed vibe and the self-tie waist belt adds feminine polish. A versatile wardrobe essential from boardroom to brunch.',
  800, 900,
  true, true, 11, true, false,
  ARRAY['/images/products/dresses/sage-button-shirt-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/sage-button-shirt-dress.jpg', 'Sage Green Button-Down Shirt Dress - Front', 0, true
FROM products p WHERE p.slug = 'sage-green-button-down-shirt-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'sage-green-button-down-shirt-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'sage-green-button-down-shirt-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual', 'office-wear');

-- ============================================================
-- DRESS 14: Black Double-Breasted Blazer Dress
-- Status: NEW IN STOCK | FEATURED | BEST SELLER
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Black Double-Breasted Blazer Dress',
  'black-double-breasted-blazer-dress',
  id,
  'Power dressing at its finest. This structured black blazer dress features a sharp notched lapel collar and polished gold double-breasted buttons. The short-sleeve design and tailored waist create a sleek boardroom-to-cocktails silhouette. Confidence never looked this good.',
  900, NULL,
  true, false, 0, true, true,
  ARRAY['/images/products/dresses/black-blazer-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/black-blazer-dress.jpg', 'Black Double-Breasted Blazer Dress - Front', 0, true
FROM products p WHERE p.slug = 'black-double-breasted-blazer-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'black-double-breasted-blazer-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-double-breasted-blazer-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'office-wear', 'statement-piece', 'best-seller');

-- ============================================================
-- DRESS 15: Green Tropical Palm Leaf Maxi Dress
-- Status: NEW IN STOCK
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Green Tropical Palm Leaf Maxi Dress',
  'green-tropical-palm-leaf-maxi-dress',
  id,
  'Escape to paradise in this lush green tropical maxi dress. Bold palm leaf and banana leaf prints in vivid greens create an exotic resort feel. The halterneck ties at the nape while the full flowing skirt sweeps dramatically. Holiday dressing at its absolute best.',
  850, NULL,
  true, false, 0, true, false,
  ARRAY['/images/products/dresses/green-tropical-maxi-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/green-tropical-maxi-dress.jpg', 'Green Tropical Palm Leaf Maxi Dress - Front', 0, true
FROM products p WHERE p.slug = 'green-tropical-palm-leaf-maxi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'green-tropical-palm-leaf-maxi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'green-tropical-palm-leaf-maxi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual', 'statement-piece');

-- ============================================================
-- DRESS 16: White & Blue Floral Smocked Mini Dress
-- Status: NEW IN STOCK | ON OFFER (19% off)
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'White & Blue Floral Smocked Mini Dress',
  'white-blue-floral-smocked-mini-dress',
  id,
  'Sweet and breezy white mini dress with tiny blue floral sprigs. The smocked elastic bodice provides a perfect fit while the tie-strap shoulders adjust for comfort. A relaxed A-line skirt falls above the knee for an easy-going feminine look.',
  650, 800,
  true, true, 19, true, false,
  ARRAY['/images/products/dresses/white-blue-floral-smocked-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/white-blue-floral-smocked-dress.jpg', 'White & Blue Floral Smocked Mini Dress - Front', 0, true
FROM products p WHERE p.slug = 'white-blue-floral-smocked-mini-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'white-blue-floral-smocked-mini-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'white-blue-floral-smocked-mini-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual');

-- ============================================================
-- DRESS 17: Black Lace-Trim Asymmetric Mini Dress
-- Status: NEW IN STOCK | FEATURED
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Black Lace-Trim Asymmetric Mini Dress',
  'black-lace-trim-asymmetric-mini-dress',
  id,
  'Daring and seductive black mini dress with intricate lace trim along the asymmetric hemline. Thin spaghetti straps and a fitted bodice hug the body while the lace overlay adds texture and drama. Your after-dark secret weapon.',
  700, NULL,
  true, false, 0, true, true,
  ARRAY['/images/products/dresses/black-lace-trim-mini-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/black-lace-trim-mini-dress.jpg', 'Black Lace-Trim Asymmetric Mini Dress - Front', 0, true
FROM products p WHERE p.slug = 'black-lace-trim-asymmetric-mini-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'black-lace-trim-asymmetric-mini-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-lace-trim-asymmetric-mini-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'party-wear', 'date-night');

-- ============================================================
-- DRESS 18: Brown Leopard Ombre Halter Midi Dress
-- Status: NEW IN STOCK
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Brown Leopard Ombre Halter Midi Dress',
  'brown-leopard-ombre-halter-midi-dress',
  id,
  'Wild and sophisticated. This halterneck midi dress features a gradient ombre effect that fades from rich chocolate brown into a bold leopard print. The crossover neckline and body-skimming jersey fabric create an effortlessly chic silhouette.',
  750, NULL,
  true, false, 0, true, false,
  ARRAY['/images/products/dresses/brown-leopard-halter-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/brown-leopard-halter-dress.jpg', 'Brown Leopard Ombre Halter Midi Dress - Front', 0, true
FROM products p WHERE p.slug = 'brown-leopard-ombre-halter-midi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L']
FROM products p WHERE p.slug = 'brown-leopard-ombre-halter-midi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'brown-leopard-ombre-halter-midi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'party-wear', 'statement-piece');

-- ============================================================
-- DRESS 19: Black Long-Sleeve Belted Maxi Dress
-- Status: NEW IN STOCK
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Black Long-Sleeve Belted Maxi Dress',
  'black-long-sleeve-belted-maxi-dress',
  id,
  'Timeless sophistication in this flowing black maxi dress with long sleeves and a relaxed scoop neckline. The braided tan belt cinches the waist beautifully while the floor-length skirt drapes elegantly. A wardrobe staple that works for literally any occasion.',
  800, NULL,
  true, false, 0, true, false,
  ARRAY['/images/products/dresses/black-long-sleeve-maxi-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/black-long-sleeve-maxi-dress.jpg', 'Black Long-Sleeve Belted Maxi Dress - Front', 0, true
FROM products p WHERE p.slug = 'black-long-sleeve-belted-maxi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'black-long-sleeve-belted-maxi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'black-long-sleeve-belted-maxi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'casual', 'office-wear');

-- ============================================================
-- DRESS 20: Teal Abstract Print Sleeveless Midi Dress
-- Status: NEW IN STOCK | ON OFFER (18% off)
-- ============================================================
INSERT INTO products (
  id, name, slug, category_id, description, price, original_price,
  is_new, is_on_offer, offer_percentage, in_stock, featured, gallery_images
)
SELECT
  gen_random_uuid(),
  'Teal Abstract Print Sleeveless Midi Dress',
  'teal-abstract-print-sleeveless-midi-dress',
  id,
  'Artistic and eye-catching teal midi dress with an abstract splatter print in turquoise black and white. The sleeveless design and scoop neckline keep it cool and contemporary. Cinch with the tan leather belt for a polished daytime look.',
  700, 850,
  true, true, 18, true, false,
  ARRAY['/images/products/dresses/teal-abstract-belted-dress.jpg']
FROM categories WHERE slug = 'dresses';

INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary)
SELECT gen_random_uuid(), p.id, '/images/products/dresses/teal-abstract-belted-dress.jpg', 'Teal Abstract Print Sleeveless Midi Dress - Front', 0, true
FROM products p WHERE p.slug = 'teal-abstract-print-sleeveless-midi-dress';

INSERT INTO product_variations (id, product_id, type, options)
SELECT gen_random_uuid(), p.id, 'Size', ARRAY['S', 'M', 'L', 'XL']
FROM products p WHERE p.slug = 'teal-abstract-print-sleeveless-midi-dress';

INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id FROM products p, tags t
WHERE p.slug = 'teal-abstract-print-sleeveless-midi-dress' AND t.slug IN ('thrift', 'new-arrival', 'in-stock', 'on-offer', 'casual', 'vintage');
