-- Create products storage bucket for image uploads
-- This script creates the bucket if it doesn't exist
-- Used by all modules that need image upload (products, categories, banners, popups)

-- Insert the products bucket (will fail silently if already exists with DO NOTHING)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for the products bucket
-- Allow public read access (since bucket is public)
CREATE POLICY IF NOT EXISTS "Allow public read access on products" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'products');

-- Allow authenticated users to upload
CREATE POLICY IF NOT EXISTS "Allow authenticated upload to products" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'products');

-- Allow authenticated users to update
CREATE POLICY IF NOT EXISTS "Allow authenticated update on products" 
ON storage.objects FOR UPDATE 
TO authenticated 
WITH CHECK (bucket_id = 'products');

-- Allow authenticated users to delete
CREATE POLICY IF NOT EXISTS "Allow authenticated delete on products" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'products');

-- Grant usage on storage schema to public
GRANT USAGE ON SCHEMA storage TO public;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT ALL ON SCHEMA storage TO service_role;

-- Grant all privileges on products bucket to service_role
GRANT ALL ON storage.buckets TO service_role;
GRANT ALL ON storage.objects TO service_role;

-- Grant select on objects to public (for public read access)
GRANT SELECT ON storage.objects TO public;

-- Grant all on objects to authenticated (for upload/update/delete)
GRANT ALL ON storage.objects TO authenticated;

-- Add comment
COMMENT ON TABLE storage.buckets IS 'Products storage bucket for product, category, banner, and popup images';
