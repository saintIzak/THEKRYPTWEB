-- Drop existing policy and recreate with correct logic
DROP POLICY IF EXISTS "Admin can manage settings" ON settings;

-- Create policy for admin access to settings using email
CREATE POLICY "Admin can manage settings" ON settings
    FOR ALL USING ( 
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email'
        )
    );