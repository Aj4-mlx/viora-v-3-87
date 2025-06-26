-- Create collections table
CREATE TABLE public.collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  theme TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product_collections junction table for many-to-many relationship
CREATE TABLE public.product_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id, collection_id)
);

-- Enable Row Level Security
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collections ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage collections" ON public.collections FOR ALL USING (true);
CREATE POLICY "Admins can manage product_collections" ON public.product_collections FOR ALL USING (true);

-- Create policies for public read access
CREATE POLICY "Public can view collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Public can view product_collections" ON public.product_collections FOR SELECT USING (true);