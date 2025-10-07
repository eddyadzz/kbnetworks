/*
  # CMS Database Schema

  1. New Tables
    - `admin_users` - Admin authentication and user management
    - `projects` - Project portfolio management with detailed information
    - `gallery_images` - Gallery image management with URLs and metadata
    - `project_images` - Junction table for project-image relationships

  2. Security
    - Enable RLS on all tables
    - Admin-only access policies for CMS operations
    - Public read access for displaying content

  3. Features
    - Complete project management with all fields from existing portfolio
    - Gallery image management with categories and ordering
    - Admin user authentication and role management
    - Audit trails with created/updated timestamps
*/

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL CHECK (category IN ('CCTV Security', 'IT Solutions', 'Networking')),
  client text NOT NULL,
  location text NOT NULL,
  date text NOT NULL,
  duration text NOT NULL,
  budget text NOT NULL,
  description text NOT NULL,
  featured_image_url text,
  features jsonb DEFAULT '[]'::jsonb,
  challenges jsonb DEFAULT '[]'::jsonb,
  solutions jsonb DEFAULT '[]'::jsonb,
  results jsonb DEFAULT '[]'::jsonb,
  testimonial jsonb,
  tags jsonb DEFAULT '[]'::jsonb,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  alt_text text,
  category text CHECK (category IN ('CCTV Security', 'IT Solutions', 'Networking', 'General')),
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Project Images Junction Table
CREATE TABLE IF NOT EXISTS project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Admin Users Policies
CREATE POLICY "Admins can manage admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Projects Policies
CREATE POLICY "Anyone can read published projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Gallery Images Policies
CREATE POLICY "Anyone can read active gallery images"
  ON gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage gallery images"
  ON gallery_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Project Images Policies
CREATE POLICY "Anyone can read project images"
  ON project_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage project images"
  ON project_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_active ON gallery_images(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_images_sort_order ON gallery_images(sort_order);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, full_name, role) 
VALUES (
  'admin@kbnetworks.mv', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt hash for 'admin123'
  'KB Networks Admin',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();