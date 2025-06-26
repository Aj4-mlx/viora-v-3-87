-- Insert sample collections
INSERT INTO public.collections (name, description, theme, image_url)
VALUES 
  ('Summer Essentials', 'Our Summer Essentials collection features light, vibrant pieces perfect for the season.', 'Summer', 'https://images.unsplash.com/photo-1523268755815-fe7c372a0349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'),
  ('Elegant Evening', 'Sophisticated jewelry designed for special occasions and evening events.', 'Elegance', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'),
  ('Minimalist', 'Clean, simple designs for everyday wear with a modern aesthetic.', 'Minimalism', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'),
  ('Vintage Inspired', 'Timeless pieces inspired by classic designs from past eras.', 'Vintage', 'https://images.unsplash.com/photo-1570891836654-32f91104c324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80');

-- Get some product IDs to associate with collections
WITH product_ids AS (
  SELECT id FROM public.products LIMIT 20
)
-- Associate products with collections
INSERT INTO public.product_collections (product_id, collection_id)
SELECT 
  p.id,
  c.id
FROM 
  (SELECT id FROM product_ids) p
CROSS JOIN 
  (SELECT id FROM public.collections) c
WHERE 
  random() < 0.3  -- Only associate about 30% of products with each collection
ON CONFLICT DO NOTHING;