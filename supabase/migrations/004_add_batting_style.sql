-- Migration: Add batting_style column to registrations table
-- Date: 2024-12-XX
-- Description: Add batting_style field for Left Handed/Right Handed batting preference

-- Add batting_style column to registrations table
ALTER TABLE registrations 
ADD COLUMN batting_style TEXT CHECK (batting_style IN ('Left Handed', 'Right Handed'));

-- Add comment for documentation
COMMENT ON COLUMN registrations.batting_style IS 'Batting style preference: Left Handed or Right Handed';

-- Update existing records (optional - set default values)
-- You can remove this if you want to keep existing records with NULL batting_style
UPDATE registrations 
SET batting_style = 'Right Handed' 
WHERE batting_style IS NULL;

-- If you want to make it required for future inserts, uncomment the line below
-- ALTER TABLE registrations ALTER COLUMN batting_style SET NOT NULL;