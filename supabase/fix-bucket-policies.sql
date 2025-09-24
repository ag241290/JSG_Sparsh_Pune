-- This script should be run in Supabase SQL Editor to fix bucket permissions

-- First, ensure the buckets exist and have correct settings
INSERT INTO storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id)
VALUES 
    ('registration-photos', 'registration-photos', NULL, NOW(), NOW(), true, false, 10485760, '{"image/jpeg","image/jpg","image/png","image/heic"}', NULL),
    ('registration-transaction-ss', 'registration-transaction-ss', NULL, NOW(), NOW(), true, false, 10485760, '{"image/jpeg","image/jpg","image/png"}', NULL),
    ('donation-transaction-ss', 'donation-transaction-ss', NULL, NOW(), NOW(), true, false, 10485760, '{"image/jpeg","image/jpg","image/png"}', NULL)
ON CONFLICT (id) 
DO UPDATE SET 
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create policies for registration-photos bucket
CREATE POLICY "Anyone can upload to registration-photos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'registration-photos');

CREATE POLICY "Anyone can view registration-photos" ON storage.objects
FOR SELECT USING (bucket_id = 'registration-photos');

-- Create policies for registration-transaction-ss bucket
CREATE POLICY "Anyone can upload to registration-transaction-ss" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'registration-transaction-ss');

CREATE POLICY "Anyone can view registration-transaction-ss" ON storage.objects
FOR SELECT USING (bucket_id = 'registration-transaction-ss');

-- Create policies for donation-transaction-ss bucket
CREATE POLICY "Anyone can upload to donation-transaction-ss" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'donation-transaction-ss');

CREATE POLICY "Anyone can view donation-transaction-ss" ON storage.objects
FOR SELECT USING (bucket_id = 'donation-transaction-ss');

-- If the policies already exist, they'll be ignored due to the CREATE POLICY statement
-- You can also use CREATE POLICY IF NOT EXISTS in newer versions of PostgreSQL

-- Check bucket configurations
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
WHERE id IN ('registration-photos', 'registration-transaction-ss', 'donation-transaction-ss');

-- Check existing policies
SELECT policyname, tablename, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%registration%' 
OR policyname LIKE '%donation%';