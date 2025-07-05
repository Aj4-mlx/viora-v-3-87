
-- First, let's populate the categories table with the categories being used in the app
INSERT INTO public.categories (name, description) VALUES
('Rings', 'Beautiful rings for every occasion'),
('Necklaces', 'Elegant necklaces to complement your style'),
('Earrings', 'Stunning earrings for a perfect look'),
('Bracelets', 'Charming bracelets to adorn your wrists'),
('Watches', 'Luxury timepieces for the discerning individual'),
('Other', 'Miscellaneous jewelry items')
ON CONFLICT (name) DO NOTHING;

-- Update the products table to use proper foreign key relationship
-- First, let's add a category column as text for backwards compatibility
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category TEXT;

-- Update existing products to have category names
UPDATE public.products 
SET category = COALESCE(
  (SELECT name FROM public.categories WHERE id = products.category_id),
  'Other'
)
WHERE category IS NULL;

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
