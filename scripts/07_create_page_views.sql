-- Create page_views table for analytics tracking
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT DEFAULT 'desktop',
  browser TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views (page_path);

-- Disable RLS so anonymous visitors can be tracked
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (anonymous tracking)
CREATE POLICY "Allow anonymous inserts" ON page_views FOR INSERT WITH CHECK (true);

-- Allow reads for authenticated users (admin)
CREATE POLICY "Allow authenticated reads" ON page_views FOR SELECT USING (true);
