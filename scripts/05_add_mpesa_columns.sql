-- Add missing columns to orders table for payment tracking
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method varchar DEFAULT 'cod';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS mpesa_code varchar;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS mpesa_phone varchar;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS mpesa_message text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS ordered_via varchar DEFAULT 'website';

-- Confirm columns added
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'orders' ORDER BY ordinal_position;
