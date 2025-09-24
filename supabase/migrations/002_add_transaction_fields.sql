-- Update existing registrations table migration to remove deleted columns
-- This should be run if the table structure needs to be recreated

-- The registrations table should have these columns (without approved and team_assigned):
-- id, category, full_name, parent_name, mobile_number, age, skillset, bowling_arm,
-- cricket_experience, cric_heroes_link, jersey_name, jersey_number, jersey_size,
-- photo_url, transaction_id, transaction_screenshot_url, payment_status,
-- registration_date, created_at, updated_at

-- If you need to recreate the table, use this structure:
/*
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  full_name TEXT NOT NULL,
  parent_name TEXT,
  mobile_number TEXT NOT NULL,
  age INTEGER NOT NULL,
  skillset TEXT NOT NULL,
  bowling_arm TEXT NOT NULL,
  cricket_experience TEXT,
  cric_heroes_link TEXT,
  jersey_name TEXT NOT NULL,
  jersey_number INTEGER NOT NULL,
  jersey_size TEXT NOT NULL,
  photo_url TEXT,
  transaction_id TEXT,
  transaction_screenshot_url TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/

-- For now, just ensure the table exists without the deleted columns
-- No action needed if you've already manually removed approved and team_assigned columns