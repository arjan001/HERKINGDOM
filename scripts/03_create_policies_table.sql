-- Create policies table for Terms, Privacy, Refund, Cookie policies, etc.
CREATE TABLE IF NOT EXISTS policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Rich HTML content
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_policies_slug ON policies(slug);
CREATE INDEX IF NOT EXISTS idx_policies_published ON policies(is_published);
CREATE INDEX IF NOT EXISTS idx_policies_created_at ON policies(created_at DESC);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_policies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS policies_updated_at_trigger ON policies;
CREATE TRIGGER policies_updated_at_trigger
BEFORE UPDATE ON policies
FOR EACH ROW
EXECUTE FUNCTION update_policies_updated_at();

-- Insert default policies
INSERT INTO policies (slug, title, content, meta_title, meta_description, is_published)
VALUES
  ('terms-and-conditions', 'Terms and Conditions', '<h1>Terms and Conditions</h1><p>Our terms and conditions will appear here. Please edit this content in the admin panel.</p>', 'Terms and Conditions | Classy Collections', 'Read our terms and conditions for using Classy Collections services.', true),
  ('privacy-policy', 'Privacy Policy', '<h1>Privacy Policy</h1><p>Our privacy policy will appear here. Please edit this content in the admin panel.</p>', 'Privacy Policy | Classy Collections', 'Learn how we protect your privacy and personal information.', true),
  ('refund-policy', 'Refund Policy', '<h1>Refund Policy</h1><p>Our refund policy will appear here. Please edit this content in the admin panel.</p>', 'Refund Policy | Classy Collections', 'Understand our refund and return process for customer satisfaction.', true),
  ('cookie-policy', 'Cookie Policy', '<h1>Cookie Policy</h1><p>Our cookie policy will appear here. Please edit this content in the admin panel.</p>', 'Cookie Policy | Classy Collections', 'Information about cookies and tracking on our website.', true),
  ('return-policy', 'Return Policy', '<h1>Return Policy</h1><p>Our return policy will appear here. Please edit this content in the admin panel.</p>', 'Return Policy | Classy Collections', 'Learn about our return process and conditions.', true),
  ('shipping-policy', 'Shipping Policy', '<h1>Shipping Policy</h1><p>Our shipping policy will appear here. Please edit this content in the admin panel.</p>', 'Shipping Policy | Classy Collections', 'Details about our shipping methods, rates, and delivery times.', true)
ON CONFLICT (slug) DO NOTHING;
