-- Temporarily disable RLS on products table to fix admin page
-- Run this in your Supabase Dashboard > SQL Editor

-- Disable RLS on products table
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'products'; 