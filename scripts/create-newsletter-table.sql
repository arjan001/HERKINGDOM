CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON newsletter_subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admin read" ON newsletter_subscribers
  FOR SELECT TO authenticated
  USING (true);
