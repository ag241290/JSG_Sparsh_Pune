-- Migration: Create registrations table and storage setup
-- Date: 2024-01-XX
-- Description: Initial database setup for JSG SPARSH registration system

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('male', 'female', 'kids')),
  
  -- Personal Information
  full_name TEXT NOT NULL,
  parent_name TEXT, -- Required only for kids category
  mobile_number TEXT NOT NULL,
  age INTEGER NOT NULL,
  
  -- Cricket Information
  skillset TEXT NOT NULL CHECK (skillset IN ('Batsman', 'Bowler', 'All Rounder')),
  bowling_arm TEXT NOT NULL CHECK (bowling_arm IN ('Left Arm', 'Right Arm')),
  cricket_experience TEXT, -- Optional field for adult categories
  cric_heroes_link TEXT, -- Optional cricket heroes profile URL
  
  -- Jersey Details
  jersey_name TEXT NOT NULL,
  jersey_number INTEGER NOT NULL CHECK (jersey_number >= 1 AND jersey_number <= 99),
  jersey_size TEXT NOT NULL CHECK (jersey_size IN ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL')),
  
  -- File Storage
  photo_url TEXT, -- URL to participant photo in Supabase storage
  
  -- Payment & Status
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  registration_date TIMESTAMP DEFAULT NOW(),
  
  -- Admin Fields
  approved BOOLEAN DEFAULT FALSE,
  team_assigned TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_category ON registrations(category);
CREATE INDEX IF NOT EXISTS idx_registrations_mobile ON registrations(mobile_number);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_registrations_updated_at 
  BEFORE UPDATE ON registrations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Set up Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public reads (for admin dashboard)
-- Note: In production, you might want to restrict this to admin users only
CREATE POLICY "Allow public read access" ON registrations
  FOR SELECT USING (true);

-- Create policy to allow public inserts (for registration form)
CREATE POLICY "Allow public insert access" ON registrations
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for registration photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('registration-photos', 'registration-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for the bucket
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'registration-photos');

CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT USING (bucket_id = 'registration-photos');

-- Add comments for documentation
COMMENT ON TABLE registrations IS 'Stores registration data for JSG SPARSH SPL 02 tournament';
COMMENT ON COLUMN registrations.category IS 'Registration category: male (14+), female (14+), or kids (7-14)';
COMMENT ON COLUMN registrations.parent_name IS 'Required for kids category only';
COMMENT ON COLUMN registrations.cricket_experience IS 'Optional field for adult categories';
COMMENT ON COLUMN registrations.photo_url IS 'URL to participant photo stored in Supabase storage';
COMMENT ON COLUMN registrations.payment_status IS 'Payment status: pending, completed, or failed';
COMMENT ON COLUMN registrations.approved IS 'Admin approval status for participation';
COMMENT ON COLUMN registrations.team_assigned IS 'Team assignment made by admin';