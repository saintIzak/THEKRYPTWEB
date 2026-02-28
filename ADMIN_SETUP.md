# Admin Panel Setup Guide

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for setup to complete

### 2. Set Up Storage for Images
1. **Go to Storage in your Supabase dashboard**
2. **Click "Create a new bucket"**
3. **Bucket name:** `product-images`
4. **Make it public:** ✅ Check this
5. **Click "Create bucket"**

### 3. Create Storage Policy
1. **Go to Storage → Policies**
2. **Click "New Policy" for `product-images` bucket**
3. **Choose "For full customization"**
4. **Policy name:** `Public Access`
5. **Allowed operation:** `SELECT, INSERT, UPDATE, DELETE`
6. **Target roles:** `public`
7. **USING expression:** `true`
8. **WITH CHECK expression:** `true`
9. **Click "Save policy"**

### 4. Create Products Table
Run this SQL in your Supabase SQL Editor:

```sql
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

-- Insert sample data with placeholder images
INSERT INTO products (name, category, price, image_url, description, rating, in_stock) VALUES
('Pro Gaming Console', 'Gaming Consoles', 64999, 'https://via.placeholder.com/400x400?text=Upload+Image', 'Next-gen gaming console with ultra-fast processing and 4K gaming capabilities.', 4.8, true),
('VR Headset Pro', 'VR Headsets', 51999, 'https://via.placeholder.com/400x400?text=Upload+Image', 'Premium virtual reality headset with high-resolution displays and immersive audio.', 4.7, true),
('Wireless Gaming Headphones', 'Audio', 23399, 'https://via.placeholder.com/400x400?text=Upload+Image', 'Premium wireless headphones with noise cancellation and crystal-clear audio.', 4.6, true),
('RGB Mechanical Keyboard', 'Accessories', 19499, 'https://via.placeholder.com/400x400?text=Upload+Image', 'High-performance mechanical keyboard with customizable RGB lighting.', 4.9, true);
```

### 5. Configure Environment Variables
1. Copy your Supabase URL and anon key from Project Settings > API
2. Update `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. Access Admin Panel
- Visit: `http://localhost:5173/admin`
- Or click the "Admin Panel" button in the bottom-right corner

## 📋 Features

### ✅ Completed
- **Dashboard**: Overview with product statistics
- **Product Management**: Add, edit, delete products
- **Image Upload**: Upload your own product images to Supabase Storage
- **Real-time Updates**: Changes reflect immediately
- **Search & Filter**: Find products quickly
- **Responsive Design**: Works on all devices

### 🔄 Coming Soon
- **Order Management**: Process customer orders
- **User Authentication**: Secure admin access
- **Image Upload**: Direct file uploads to Supabase Storage
- **Analytics**: Sales and performance metrics
- **Inventory Alerts**: Low stock notifications

## 🛠️ Usage

### Adding Products
1. Go to Admin Panel > Products
2. Click "Add Product"
3. Fill in product details
4. **Upload your own image** or enter image URL
5. Click "Add Product"

### Editing Products
1. Find the product in the list
2. Click the edit (pencil) icon
3. Update details and **change image if needed**
4. Click "Update Product"

### Deleting Products
1. Find the product in the list
2. Click the delete (trash) icon
3. Confirm deletion

## 🔒 Security Notes

**Important**: The current setup allows all operations for development. For production:

1. **Enable Authentication**:
   ```sql
   -- Remove the permissive policy
   DROP POLICY "Allow all operations on products" ON products;
   
   -- Add authenticated user policy
   CREATE POLICY "Authenticated users can manage products" ON products
   FOR ALL USING (auth.role() = 'authenticated');
   ```

2. **Add Admin Role Check**:
   ```sql
   -- Only allow admin users
   CREATE POLICY "Only admins can manage products" ON products
   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
   ```

## 🚨 Troubleshooting

### Common Issues:

1. **"Failed to fetch"**: Check your Supabase URL and key
2. **"Row Level Security"**: Ensure policies are set correctly
3. **"CORS Error"**: Add your domain to Supabase allowed origins

### Need Help?
- Check Supabase logs in your dashboard
- Verify environment variables are loaded
- Ensure table exists and has correct structure