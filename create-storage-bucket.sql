-- Create storage bucket for product images if it doesn't exist
-- Run this in your Supabase Dashboard > SQL Editor

-- Insert storage bucket (will fail if already exists, but that's OK)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images', 
  'product-images', 
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create storage policies for public access
CREATE POLICY IF NOT EXISTS "Public can view product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY IF NOT EXISTS "Public can upload product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY IF NOT EXISTS "Public can update product images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY IF NOT EXISTS "Public can delete product images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Verify bucket exists
SELECT * FROM storage.buckets WHERE name = 'product-images'; 