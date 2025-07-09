
-- Add missing columns to orders table for proper order tracking
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS order_number TEXT,
  ADD COLUMN IF NOT EXISTS payment_method TEXT,
  ADD COLUMN IF NOT EXISTS shipping_address JSONB,
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS product_ids TEXT[]; -- Temporary column for current structure

-- Create a function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  month_part TEXT;
  sequence_part TEXT;
  random_part TEXT;
BEGIN
  year_part := to_char(CURRENT_DATE, 'YY');
  month_part := to_char(CURRENT_DATE, 'MM');
  sequence_part := to_char(floor(random() * 10000), 'FM0000');
  random_part := to_char(floor(random() * 1000), 'FM000');
  
  RETURN 'V' || year_part || month_part || '-' || sequence_part || random_part;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS policies for orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Service role can manage orders" ON public.orders
  FOR ALL USING (true);

-- Enable RLS for order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their order items" ON public.order_items
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM public.orders WHERE customer_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage order items" ON public.order_items
  FOR ALL USING (true);
