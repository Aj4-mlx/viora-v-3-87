-- Create shipping_providers table
CREATE TABLE public.shipping_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  base_rate NUMERIC(10,2) NOT NULL,
  free_shipping_threshold NUMERIC(10,2) NOT NULL DEFAULT 1000,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shipping_rates table for governorate-specific rates
CREATE TABLE public.shipping_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  governorate TEXT NOT NULL,
  rate NUMERIC(10,2) NOT NULL,
  free_shipping_threshold NUMERIC(10,2) NOT NULL DEFAULT 1000,
  provider_id UUID REFERENCES public.shipping_providers(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(governorate, provider_id)
);

-- Enable Row Level Security
ALTER TABLE public.shipping_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_rates ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage shipping_providers" ON public.shipping_providers FOR ALL USING (true);
CREATE POLICY "Admins can manage shipping_rates" ON public.shipping_rates FOR ALL USING (true);

-- Create policies for public read access
CREATE POLICY "Public can view shipping_providers" ON public.shipping_providers FOR SELECT USING (true);
CREATE POLICY "Public can view shipping_rates" ON public.shipping_rates FOR SELECT USING (true);

-- Insert default shipping providers
INSERT INTO public.shipping_providers (name, base_rate, free_shipping_threshold)
VALUES 
  ('Bosta', 60, 1000),
  ('Aramex', 75, 1000);

-- Insert default shipping rates for common governorates
INSERT INTO public.shipping_rates (governorate, rate, free_shipping_threshold, provider_id)
VALUES 
  ('Cairo', 50, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Bosta')),
  ('Alexandria', 60, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Bosta')),
  ('Giza', 50, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Bosta')),
  ('Luxor', 80, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Bosta')),
  ('Aswan', 90, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Bosta')),
  ('Cairo', 65, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Aramex')),
  ('Alexandria', 75, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Aramex')),
  ('Giza', 65, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Aramex')),
  ('Luxor', 95, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Aramex')),
  ('Aswan', 105, 1000, (SELECT id FROM public.shipping_providers WHERE name = 'Aramex'));