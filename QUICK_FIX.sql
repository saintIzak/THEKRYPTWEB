-- Quick fix for product visibility on main site

-- 1. Drop all existing policies
DROP POLICY IF EXISTS "Allow all operations on products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Allow authenticated users full access to products" ON products;
DROP POLICY IF EXISTS "Allow public read access to products" ON products;

-- 2. Create simple policies that work
CREATE POLICY "Public can read products" ON products
FOR SELECT USING (true);

CREATE POLICY "Authenticated can do everything with products" ON products
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Check if products exist
SELECT COUNT(*) as product_count FROM products;