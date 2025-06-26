-- Update orders table to add more status options and tracking information
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS order_number TEXT,
  ADD COLUMN IF NOT EXISTS tracking_number TEXT,
  ADD COLUMN IF NOT EXISTS shipping_provider TEXT,
  ADD COLUMN IF NOT EXISTS estimated_delivery_date DATE,
  ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  DROP CONSTRAINT IF EXISTS orders_status_check,
  ADD CONSTRAINT orders_status_check CHECK (status IN ('pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled'));

-- Create a function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  month_part TEXT;
  sequence_part TEXT;
  random_part TEXT;
BEGIN
  year_part := to_char(CURRENT_DATE, 'YY');
  month_part := to_char(CURRENT_DATE, 'MM');
  sequence_part := to_char(nextval('order_number_seq'), 'FM0000');
  random_part := to_char(floor(random() * 1000), 'FM000');
  
  NEW.order_number := 'V' || year_part || month_part || '-' || sequence_part || random_part;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Create a trigger to automatically generate order numbers
DROP TRIGGER IF EXISTS generate_order_number_trigger ON public.orders;
CREATE TRIGGER generate_order_number_trigger
BEFORE INSERT ON public.orders
FOR EACH ROW
WHEN (NEW.order_number IS NULL)
EXECUTE FUNCTION generate_order_number();

-- Create order_history table to track status changes
CREATE TABLE IF NOT EXISTS public.order_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.order_history ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage order_history" ON public.order_history FOR ALL USING (true);

-- Create policies for customer access
CREATE POLICY "Customers can view their own order_history" ON public.order_history 
  FOR SELECT USING (
    auth.uid() IN (
      SELECT customer_id FROM public.orders WHERE id = order_id
    )
  );

-- Create a function to record order status changes
CREATE OR REPLACE FUNCTION record_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') OR (TG_OP = 'UPDATE' AND OLD.status <> NEW.status) THEN
    INSERT INTO public.order_history (order_id, status, created_by)
    VALUES (NEW.id, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically record order status changes
DROP TRIGGER IF EXISTS record_order_status_change_trigger ON public.orders;
CREATE TRIGGER record_order_status_change_trigger
AFTER INSERT OR UPDATE OF status ON public.orders
FOR EACH ROW
EXECUTE FUNCTION record_order_status_change();