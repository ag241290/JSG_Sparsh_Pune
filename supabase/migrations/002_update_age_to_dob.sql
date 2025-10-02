-- Migration: Update age field to date_of_birth
-- Date: 2024-12-XX
-- Description: Change age INTEGER field to date_of_birth DATE field

-- First, add the new date_of_birth column
ALTER TABLE registrations 
ADD COLUMN date_of_birth DATE;

-- For existing data, we need to calculate approximate birth dates
-- Since we have age as integer, we'll use the current date minus the age
-- This is an approximation and may not be accurate
UPDATE registrations 
SET date_of_birth = CURRENT_DATE - INTERVAL '1 year' * age
WHERE age IS NOT NULL AND date_of_birth IS NULL;

-- Now drop the old age column
ALTER TABLE registrations 
DROP COLUMN age;

-- Make the date_of_birth column NOT NULL since it's required
ALTER TABLE registrations 
ALTER COLUMN date_of_birth SET NOT NULL;

-- Add a comment for the new column
COMMENT ON COLUMN registrations.date_of_birth IS 'Date of birth of the participant for age verification';

-- Add a check constraint to ensure reasonable birth dates
ALTER TABLE registrations 
ADD CONSTRAINT reasonable_birth_date 
CHECK (
  date_of_birth >= '1920-01-01' AND 
  date_of_birth <= CURRENT_DATE
);