-- Update men's products with their AI-generated images

-- Men - Ankara Suits
UPDATE products SET gallery_images = ARRAY['/products/men-ankara-suit-navy-gold.jpg']
WHERE slug = 'navy-gold-medallion-ankara-suit';

UPDATE products SET gallery_images = ARRAY['/products/men-ankara-suit-green-black.jpg']
WHERE slug = 'green-black-geometric-ankara-blazer-set';

UPDATE products SET gallery_images = ARRAY['/products/men-ankara-suit-brown-cream.jpg']
WHERE slug = 'brown-cream-diamond-ankara-suit';

-- Men - Ankara Shirts
UPDATE products SET gallery_images = ARRAY['/products/men-ankara-shirt-blue-gold.jpg']
WHERE slug = 'blue-gold-geometric-ankara-shirt';

UPDATE products SET gallery_images = ARRAY['/products/men-ankara-shirt-green-orange.jpg']
WHERE slug = 'green-orange-tropical-leaf-ankara-shirt';

UPDATE products SET gallery_images = ARRAY['/products/men-ankara-shirt-red-black.jpg']
WHERE slug = 'red-black-spiral-ankara-mandarin-shirt';

UPDATE products SET gallery_images = ARRAY['/products/men-ankara-shirt-teal-brown.jpg']
WHERE slug = 'teal-brown-abstract-ankara-camp-shirt';

UPDATE products SET gallery_images = ARRAY['/products/men-ankara-shirt-yellow-black.jpg']
WHERE slug = 'yellow-black-kente-ankara-shirt';

-- Men - Ankara Palazzo
UPDATE products SET gallery_images = ARRAY['/products/men-ankara-palazzo-orange-blue.jpg']
WHERE slug = 'orange-blue-medallion-ankara-dashiki-palazzo-set';

UPDATE products SET gallery_images = ARRAY['/products/men-ankara-palazzo-purple-yellow.jpg']
WHERE slug = 'purple-yellow-sunburst-ankara-palazzo-set';

-- Verify
SELECT name, slug, gallery_images FROM products WHERE slug LIKE 'navy%' OR slug LIKE 'green-black-geo%' OR slug LIKE 'brown-cream%' OR slug LIKE 'blue-gold%' OR slug LIKE 'green-orange%' OR slug LIKE 'red-black%' OR slug LIKE 'teal-brown%' OR slug LIKE 'yellow-black%' OR slug LIKE 'orange-blue-medallion%' OR slug LIKE 'purple-yellow%';
