-- Add amount column to existing donations table
-- Run this in Supabase SQL Editor if the table already exists

ALTER TABLE donations ADD COLUMN IF NOT EXISTS amount DECIMAL(10,2) NOT NULL DEFAULT 0.00;

-- Create index for amount column for better performance
CREATE INDEX IF NOT EXISTS idx_donations_amount ON donations(amount);

-- Update existing records to have a default amount if needed
-- UPDATE donations SET amount = 100.00 WHERE amount = 0.00;