-- Enhanced analytics: add UTM tracking, visitor identification, and language to page_views
-- Run this migration on your Supabase database to enable real Google-like tracking

-- UTM campaign tracking columns
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

-- Visitor identification and behavior
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS visitor_id TEXT;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS is_returning BOOLEAN DEFAULT false;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS language TEXT;

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views (visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_utm_source ON page_views (utm_source) WHERE utm_source IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_page_views_is_returning ON page_views (is_returning);
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views (country) WHERE country IS NOT NULL;
