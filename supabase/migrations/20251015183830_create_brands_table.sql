/*
  # Create Brands Table

  1. New Tables
    - `brands`
      - `id` (uuid, primary key) - Unique identifier for each brand
      - `name` (text, not null) - Brand name
      - `category` (text, not null) - Brand category/industry
      - `logo_url` (text, nullable) - URL to brand logo image
      - `display_order` (integer, default 0) - Order for displaying brands
      - `is_active` (boolean, default true) - Whether brand is active/visible
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `brands` table
    - Add policy for public read access to active brands
    - Add policy for authenticated admin users to manage brands

  3. Indexes
    - Index on `display_order` for efficient sorting
    - Index on `is_active` for filtering active brands
*/

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  logo_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active brands
CREATE POLICY "Public can view active brands"
  ON brands
  FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated admins can view all brands
CREATE POLICY "Admins can view all brands"
  ON brands
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policy: Authenticated admins can insert brands
CREATE POLICY "Admins can insert brands"
  ON brands
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policy: Authenticated admins can update brands
CREATE POLICY "Admins can update brands"
  ON brands
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policy: Authenticated admins can delete brands
CREATE POLICY "Admins can delete brands"
  ON brands
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_brands_display_order ON brands(display_order);
CREATE INDEX IF NOT EXISTS idx_brands_is_active ON brands(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_brands_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS set_brands_updated_at ON brands;
CREATE TRIGGER set_brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW
  EXECUTE FUNCTION update_brands_updated_at();

-- Insert default brands
INSERT INTO brands (name, category, logo_url, display_order, is_active) VALUES
  ('Hikvision', 'CCTV Security', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 1, true),
  ('Dahua', 'Security Systems', 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 2, true),
  ('Ubiquiti', 'Networking', 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 3, true),
  ('Cisco', 'Enterprise Networking', 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 4, true),
  ('Dell', 'IT Infrastructure', 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 5, true),
  ('HP Enterprise', 'Servers & Storage', 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 6, true),
  ('Axis', 'IP Cameras', 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 7, true),
  ('Fortinet', 'Cybersecurity', 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 8, true)
ON CONFLICT DO NOTHING;
