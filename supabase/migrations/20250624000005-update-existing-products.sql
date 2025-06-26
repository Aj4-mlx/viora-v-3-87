-- Update existing products to populate collection_ids from product_collections
UPDATE public.products p
SET collection_ids = (
  SELECT array_agg(DISTINCT pc.collection_id)
  FROM public.product_collections pc
  WHERE pc.product_id = p.id
);

-- Create a function to automatically update collection_ids when a product is created
CREATE OR REPLACE FUNCTION initialize_product_collection_ids()
RETURNS TRIGGER AS $$
BEGIN
  -- If collection_ids is not provided, initialize it as an empty array
  IF NEW.collection_ids IS NULL THEN
    NEW.collection_ids := '{}';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to initialize collection_ids for new products
DROP TRIGGER IF EXISTS initialize_product_collection_ids_trigger ON public.products;
CREATE TRIGGER initialize_product_collection_ids_trigger
BEFORE INSERT ON public.products
FOR EACH ROW
EXECUTE FUNCTION initialize_product_collection_ids();