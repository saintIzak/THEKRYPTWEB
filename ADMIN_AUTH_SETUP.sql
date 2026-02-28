-- 1. Enable authentication (if not already enabled)
-- This is usually done in Supabase dashboard under Authentication > Settings

-- 2. Create admin user (run this after setting up authentication)
-- You'll need to do this via Supabase dashboard or API call

-- 3. Update products table policies for authenticated users only
DROP POLICY IF EXISTS "Allow all operations on products" ON products;

-- Create policy for authenticated users only
CREATE POLICY "Authenticated users can manage products" ON products
FOR ALL USING (auth.role() = 'authenticated');

-- 4. Update storage policies for authenticated users only
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Create storage policy for authenticated users
CREATE POLICY "Authenticated users can manage images" ON storage.objects
FOR ALL USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Allow public read access to images (so customers can see them)
CREATE POLICY "Public can view product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- 5. Create a function to check if user is admin (optional - for future use)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.jwt() ->> 'email' = 'admin@gamerforge.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;