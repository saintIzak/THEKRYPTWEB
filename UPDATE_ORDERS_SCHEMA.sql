-- Update orders table for new checkout structure
ALTER TABLE orders 
ADD COLUMN shipping_method TEXT,
ADD COLUMN payment_method TEXT,
ADD COLUMN shipping_cost NUMERIC DEFAULT 0;