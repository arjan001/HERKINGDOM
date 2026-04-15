-- Enhanced analytics: add session_id, duration, is_bot, scroll_depth to page_views
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS session_id TEXT;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS duration_seconds INTEGER DEFAULT 0;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS is_bot BOOLEAN DEFAULT false;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS scroll_depth INTEGER DEFAULT 0;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS ip_address TEXT;

CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_is_bot ON page_views (is_bot);

-- Analytics events table for tracking clicks, interactions, etc.
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_target TEXT,
  event_data JSONB,
  page_path TEXT,
  session_id TEXT,
  device_type TEXT DEFAULT 'desktop',
  browser TEXT,
  country TEXT,
  is_bot BOOLEAN DEFAULT false,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events (event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_path ON analytics_events (page_path);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts on analytics_events" ON analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated reads on analytics_events" ON analytics_events FOR SELECT USING (true);

-- Abandoned checkouts tracking table
CREATE TABLE IF NOT EXISTS abandoned_checkouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC(10,2) DEFAULT 0,
  step_reached TEXT DEFAULT 'cart',
  device_type TEXT DEFAULT 'desktop',
  browser TEXT,
  recovered BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_abandoned_checkouts_created_at ON abandoned_checkouts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_abandoned_checkouts_session_id ON abandoned_checkouts (session_id);
CREATE INDEX IF NOT EXISTS idx_abandoned_checkouts_recovered ON abandoned_checkouts (recovered);

ALTER TABLE abandoned_checkouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts on abandoned_checkouts" ON abandoned_checkouts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous updates on abandoned_checkouts" ON abandoned_checkouts FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated reads on abandoned_checkouts" ON abandoned_checkouts FOR SELECT USING (true);
