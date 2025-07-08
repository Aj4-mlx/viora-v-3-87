-- Fix products table structure
-- Run this in your Supabase Dashboard > SQL Editor

-- First, let's check the current table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'products' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- If the category column doesn't exist, add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'category' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.products ADD COLUMN category TEXT;
        RAISE NOTICE 'Added category column to products table';
    ELSE
        RAISE NOTICE 'Category column already exists';
    END IF;
END $$;

-- If the stock column doesn't exist, add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'stock' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.products ADD COLUMN stock INTEGER DEFAULT 0;
        RAISE NOTICE 'Added stock column to products table';
    ELSE
        RAISE NOTICE 'Stock column already exists';
    END IF;
END $$;

-- If the image_url column doesn't exist, add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'image_url' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.products ADD COLUMN image_url TEXT;
        RAISE NOTICE 'Added image_url column to products table';
    ELSE
        RAISE NOTICE 'Image_url column already exists';
    END IF;
END $$;

-- If the created_at column doesn't exist, add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'created_at' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.products ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT now();
        RAISE NOTICE 'Added created_at column to products table';
    ELSE
        RAISE NOTICE 'Created_at column already exists';
    END IF;
END $$;

-- Show the final table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'products' 
AND table_schema = 'public'
ORDER BY ordinal_position; 