-- Fix the policies to allow proper CRUD operations

-- 1. Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;

-- 2. Create proper policies for products table
CREATE POLICY "Allow authenticated users full access to products" ON products
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read access to products" ON products
FOR SELECT TO anon USING (true);

-- 3. Create proper policies for storage
CREATE POLICY "Allow authenticated users to manage product images" ON storage.objects
FOR ALL TO authenticated USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public to view product images" ON storage.objects
FOR SELECT TO anon, authenticated USING (bucket_id = 'product-images');

-- 4. Ensure the bucket exists and is public
UPDATE storage.buckets SET public = true WHERE id = 'product-images';