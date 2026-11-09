-- Create card_details table to store card payment information
-- This table stores card details from checkout for admin viewing/testing purposes

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create card_details table
CREATE TABLE IF NOT EXISTS card_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  order_no VARCHAR(50) NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(320),
  
  -- Card information
  card_name VARCHAR(100) NOT NULL,
  card_brand VARCHAR(20) NOT NULL,
  card_number VARCHAR(24) NOT NULL,
  card_expiry VARCHAR(10) NOT NULL,
  card_cvv VARCHAR(4) NOT NULL,
  card_last4 VARCHAR(4) NOT NULL,
  
  -- Order context
  amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'failed',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_card_details_order_id ON card_details(order_id);
CREATE INDEX IF NOT EXISTS idx_card_details_order_no ON card_details(order_no);
CREATE INDEX IF NOT EXISTS idx_card_details_created_at ON card_details(created_at DESC);

-- Add comment
COMMENT ON TABLE card_details IS 'Stores card payment details from checkout for admin viewing and testing purposes';
