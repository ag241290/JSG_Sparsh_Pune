-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  transaction_screenshot_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'volunteer',
  enquiry_type TEXT NOT NULL DEFAULT 'Volunteer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_mobile ON donations(mobile_number);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_enquiries_mobile ON enquiries(mobile_number);
CREATE INDEX IF NOT EXISTS idx_enquiries_type ON enquiries(type);
CREATE INDEX IF NOT EXISTS idx_enquiries_enquiry_type ON enquiries(enquiry_type);

-- Enable Row Level Security
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for donations table
CREATE POLICY "Enable insert for donations" ON donations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for donations" ON donations
  FOR SELECT USING (true);

-- Create policies for enquiries table
CREATE POLICY "Enable insert for enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for enquiries" ON enquiries
  FOR SELECT USING (true);

-- Add enquiry_type column to existing enquiries table if it doesn't exist
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS enquiry_type TEXT NOT NULL DEFAULT 'Volunteer';

-- Update existing records to have proper enquiry_type
UPDATE enquiries SET enquiry_type = 'Volunteer' WHERE enquiry_type IS NULL OR enquiry_type = '';