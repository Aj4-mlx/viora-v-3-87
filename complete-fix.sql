-- Complete fix for admin page database issues
-- Run this in your Supabase Dashboard > SQL Editor

-- Step 1: Recreate products table with correct structure
DROP TABLE IF EXISTS public.products CASCADE;

CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Step 2: Disable RLS on products table
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Step 3: Create indexes for better performance
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_created_at ON public.products(created_at);

-- Step 4: Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images', 
  'product-images', 
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Step 5: Create storage policies for public access
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Public can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete product images" ON storage.objects;

CREATE POLICY "Public can view product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Public can upload product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Public can update product images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Public can delete product images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Step 6: Verify everything is set up correctly
SELECT 'Products table structure:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'products' 
AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 'Storage buckets:' as info;
SELECT * FROM storage.buckets WHERE name = 'product-images';

SELECT 'RLS status:' as info;
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'products'; 