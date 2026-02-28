-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  rating NUMERIC DEFAULT 4.5,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for development)
CREATE POLICY "Allow all operations on products" ON products
FOR ALL USING (true) WITH CHECK (true);

-- Insert sample data WITHOUT images (you'll add your own images via admin panel)
INSERT INTO products (name, category, price, image_url, description, rating, in_stock) VALUES
('Pro Gaming Console', 'Gaming Consoles', 64999, 'https://via.placeholder.com/400x400?text=Upload+Image', 'Next-gen gaming console with ultra-fast processing and 4K gaming capabilities. Experience immersive gameplay with cutting-edge technology.', 4.8, true),
('VR Headset Pro', 'VR Headsets', 51999, 'https://via.placeholder.com/400x400?text=Upload+Image', 'Premium virtual reality headset with high-resolution displays and immersive audio. Step into virtual worlds with stunning clarity.', 4.7, true),
('Wireless Gaming Headphones', 'Audio', 23399, 'https://via.placeholder.com/400x400?text=Upload+Image', 'Premium wireless headphones with noise cancellation and crystal-clear audio. Perfect for gaming and music with long battery life.', 4.6, true),
('RGB Mechanical Keyboard', 'Accessories', 19499, 'https://via.placeholder.com/400x400?text=Upload+Image', 'High-performance mechanical keyboard with customizable RGB lighting and premium switches. Elevate your typing and gaming experience.', 4.9, true);

-- Note: After running this, go to your admin panel to upload your own product images!