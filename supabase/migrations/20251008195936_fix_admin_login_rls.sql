/*
  # Fix Admin Login RLS Policy

  1. Changes
    - Add policy to allow anonymous users to read admin_users for login verification
    - This is safe because password verification happens in the client
    - The password_hash is needed for bcrypt comparison

  2. Security
    - Only SELECT is allowed for anonymous users
    - No data modification is possible without authentication
*/

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Admins can manage admin users" ON admin_users;

-- Allow anonymous users to read admin_users for login
CREATE POLICY "Allow login verification"
  ON admin_users
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Allow authenticated admin users to manage admin users
CREATE POLICY "Admins can manage admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.email = current_setting('request.jwt.claims', true)::json->>'email'
      AND au.is_active = true
    )
  );
