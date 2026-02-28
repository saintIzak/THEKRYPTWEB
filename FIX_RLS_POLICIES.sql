-- Fix RLS policies for orders
DROP POLICY IF EXISTS "Public can create orders" ON orders;
DROP POLICY IF EXISTS "Authenticated can manage orders" ON orders;

-- Create new policies that work
CREATE POLICY "Anyone can create orders" ON orders
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read orders" ON orders
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage orders" ON orders
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Fix order_items policies
DROP POLICY IF EXISTS "Public can create order items" ON order_items;
DROP POLICY IF EXISTS "Authenticated can manage order items" ON order_items;

CREATE POLICY "Anyone can create order items" ON order_items
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read order items" ON order_items
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage order items" ON order_items
FOR ALL TO authenticated USING (true) WITH CHECK (true);