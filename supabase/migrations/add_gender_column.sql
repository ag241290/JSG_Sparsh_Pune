-- Migration to add gender column for Kids category
-- Run this in your Supabase SQL Editor

-- Add gender column to registrations table
ALTER TABLE registrations 
ADD COLUMN gender TEXT;

-- Add a comment to document the column
COMMENT ON COLUMN registrations.gender IS 'Gender for Kids category: Boy or Girl';

-- Optional: Add a check constraint to ensure only valid values
ALTER TABLE registrations 
ADD CONSTRAINT check_gender_valid 
CHECK (gender IS NULL OR gender IN ('Boy', 'Girl'));

-- Optional: Add a check constraint to ensure gender is provided for Kids category
-- Note: This might need adjustment based on existing data
-- ALTER TABLE registrations 
-- ADD CONSTRAINT check_kids_gender 
-- CHECK (
--   (category != 'kids') OR 
--   (category = 'kids' AND gender IS NOT NULL)
-- );