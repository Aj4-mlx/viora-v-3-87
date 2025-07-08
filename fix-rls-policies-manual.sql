-- Manual SQL script to fix RLS policies
-- Run this in your Supabase Dashboard > SQL Editor

-- Drop existing admin-only policies
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Create new policies that allow public access for products
CREATE POLICY "Public can view products" ON public.products
FOR SELECT USING (true);

CREATE POLICY "Public can insert products" ON public.products
FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update products" ON public.products
FOR UPDATE USING (true);

CREATE POLICY "Public can delete products" ON public.products
FOR DELETE USING (true);

-- Also fix storage policies to allow public access
DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;

CREATE POLICY "Public can upload product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Public can update product images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Public can delete product images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('products') 
ORDER BY tablename, policyname; 