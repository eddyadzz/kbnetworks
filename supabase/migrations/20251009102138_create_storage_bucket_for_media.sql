/*
  # Create Storage Bucket for Media Files

  1. Storage Setup
    - Create a public storage bucket named 'media' for image uploads
    - Configure public access for uploaded files
    - Set up appropriate file size and type restrictions

  2. Security
    - Allow public read access to all files
    - Allow authenticated users (admins) to upload files
    - Allow authenticated users to delete their uploaded files
*/

-- Create the storage bucket for media files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access to Media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete media" ON storage.objects;

-- Allow public read access to all files in the media bucket
CREATE POLICY "Public Access to Media"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'media');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

-- Allow authenticated users to update media files
CREATE POLICY "Authenticated users can update media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media')
  WITH CHECK (bucket_id = 'media');

-- Allow authenticated users to delete media files
CREATE POLICY "Authenticated users can delete media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
