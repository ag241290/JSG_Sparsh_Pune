-- Migration: Add transaction fields to registrations table
-- Date: 2024-01-XX
-- Description: Add transaction_id and transaction_screenshot_url fields for payment tracking

-- Add transaction_id column
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS transaction_id TEXT;

-- Add transaction_screenshot_url column  
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS transaction_screenshot_url TEXT;

-- Add comments for documentation
COMMENT ON COLUMN registrations.transaction_id IS 'UPI/Payment gateway transaction ID provided by user';
COMMENT ON COLUMN registrations.transaction_screenshot_url IS 'URL to transaction screenshot uploaded by user';

-- Create index for transaction_id for faster searches
CREATE INDEX IF NOT EXISTS idx_registrations_transaction_id ON registrations(transaction_id);

-- Grant appropriate permissions (if needed)
-- Note: Adjust these based on your RLS policies
-- ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;