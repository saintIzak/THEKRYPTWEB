-- Create admin_users table first
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO admin_users (email) VALUES ('admin@gamerforge.com')
ON CONFLICT (email) DO NOTHING;

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES 
('general', '{
    "siteName": "GamerForge",
    "siteDescription": "Where gamers gear up for victory",
    "contactEmail": "contact@gamerforge.com",
    "currency": "USD"
}'),
('payments', '{
    "stripeEnabled": true,
    "paypalEnabled": false
}'),
('features', '{
    "analyticsEnabled": true,
    "chatSupportEnabled": true,
    "reviewsEnabled": true,
    "wishlistEnabled": true
}'),
('social', '{
    "facebook": "",
    "twitter": "",
    "instagram": ""
}')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policy for admin_users table
CREATE POLICY "Admin users can view themselves" ON admin_users
    FOR SELECT USING (email = auth.jwt() ->> 'email');

-- Create policy for admin access to settings
CREATE POLICY "Admin can manage settings" ON settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email'
        )
    );