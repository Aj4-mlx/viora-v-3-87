
-- Add missing profile fields to the customers table
ALTER TABLE public.customers 
ADD COLUMN phone text,
ADD COLUMN address text,
ADD COLUMN city text,
ADD COLUMN governorate text;
