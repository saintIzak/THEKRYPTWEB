-- Add coordinates columns to orders table
ALTER TABLE orders 
ADD COLUMN delivery_latitude NUMERIC,
ADD COLUMN delivery_longitude NUMERIC;