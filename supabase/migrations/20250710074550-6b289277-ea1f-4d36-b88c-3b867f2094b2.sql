-- Enable RLS on customers table and create proper policies
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Allow users to view and update their own customer record
CREATE POLICY "Users can view their own customer data" 
ON public.customers 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own customer data" 
ON public.customers 
FOR UPDATE 
USING (auth.uid() = id);

-- Allow users to create their own customer record
CREATE POLICY "Users can create their own customer record" 
ON public.customers 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Enable RLS on products table to allow public read access
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view products
CREATE POLICY "Products are publicly readable" 
ON public.products 
FOR SELECT 
USING (true);

-- Enable RLS on cart table
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;

-- Cart policies for authenticated users
CREATE POLICY "Users can view their own cart items" 
ON public.cart 
FOR SELECT 
USING (auth.uid() = customer_id);

CREATE POLICY "Users can add items to their own cart" 
ON public.cart 
FOR INSERT 
WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update their own cart items" 
ON public.cart 
FOR UPDATE 
USING (auth.uid() = customer_id);

CREATE POLICY "Users can delete their own cart items" 
ON public.cart 
FOR DELETE 
USING (auth.uid() = customer_id);

-- Enable RLS on wishlist table
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- Wishlist policies
CREATE POLICY "Users can view their own wishlist" 
ON public.wishlist 
FOR SELECT 
USING (auth.uid() = customer_id);

CREATE POLICY "Users can add items to their own wishlist" 
ON public.wishlist 
FOR INSERT 
WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can remove items from their own wishlist" 
ON public.wishlist 
FOR DELETE 
USING (auth.uid() = customer_id);

-- Update orders table to make customer_id not nullable since it's used in RLS
ALTER TABLE public.orders ALTER COLUMN customer_id SET NOT NULL;