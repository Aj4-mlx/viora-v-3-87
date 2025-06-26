-- Add collection_ids array to products table for quick access
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS collection_ids UUID[] DEFAULT '{}';

-- Add is_featured flag to collections
ALTER TABLE public.collections
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Create a function to update product collection_ids when product_collections changes
CREATE OR REPLACE FUNCTION update_product_collection_ids()
RETURNS TRIGGER AS $$
DECLARE
  product_id_val UUID;
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    product_id_val := NEW.product_id;
  ELSIF TG_OP = 'DELETE' THEN
    product_id_val := OLD.product_id;
  END IF;

  -- Update the collection_ids array for the product
  UPDATE public.products
  SET collection_ids = (
    SELECT array_agg(DISTINCT collection_id)
    FROM public.product_collections
    WHERE product_id = product_id_val
  )
  WHERE id = product_id_val;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to maintain collection_ids in products
DROP TRIGGER IF EXISTS update_product_collection_ids_trigger ON public.product_collections;
CREATE TRIGGER update_product_collection_ids_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.product_collections
FOR EACH ROW
EXECUTE FUNCTION update_product_collection_ids();

-- Create a function to update product_collections when collection_ids changes
CREATE OR REPLACE FUNCTION update_product_collections()
RETURNS TRIGGER AS $$
DECLARE
  collection_id_val UUID;
BEGIN
  -- Delete any product_collections entries that are no longer in the array
  DELETE FROM public.product_collections
  WHERE product_id = NEW.id
    AND collection_id <> ALL(NEW.collection_ids);

  -- Add new product_collections entries for any new collection_ids
  IF NEW.collection_ids IS NOT NULL THEN
    FOREACH collection_id_val IN ARRAY NEW.collection_ids
    LOOP
      INSERT INTO public.product_collections (product_id, collection_id)
      VALUES (NEW.id, collection_id_val)
      ON CONFLICT (product_id, collection_id) DO NOTHING;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to maintain product_collections when collection_ids changes
DROP TRIGGER IF EXISTS update_product_collections_trigger ON public.products;
CREATE TRIGGER update_product_collections_trigger
AFTER UPDATE OF collection_ids ON public.products
FOR EACH ROW
EXECUTE FUNCTION update_product_collections();

-- Create a view to easily see products with their collections
CREATE OR REPLACE VIEW public.products_with_collections AS
SELECT 
  p.*,
  COALESCE(
    (SELECT json_agg(json_build_object(
      'id', c.id,
      'name', c.name,
      'theme', c.theme,
      'is_featured', c.is_featured
    ))
    FROM public.collections c
    WHERE c.id = ANY(p.collection_ids)), '[]'::json
  ) as collections
FROM 
  public.products p;

-- Update existing products to populate collection_ids from product_collections
UPDATE public.products p
SET collection_ids = (
  SELECT array_agg(DISTINCT pc.collection_id)
  FROM public.product_collections pc
  WHERE pc.product_id = p.id
);

-- Create a function to get products by collection
CREATE OR REPLACE FUNCTION get_products_by_collection(collection_id_param UUID)
RETURNS SETOF public.products AS $$
BEGIN
  RETURN QUERY
  SELECT p.*
  FROM public.products p
  WHERE collection_id_param = ANY(p.collection_ids);
END;
$$ LANGUAGE plpgsql;