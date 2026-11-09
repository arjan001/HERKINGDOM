-- ============================================================
-- Migration 032: Analytics on Supabase (replaces Netlify Blobs)
-- Adds the columns the analytics pipeline needs and creates
-- tables for realtime sessions and abandoned checkouts.
-- Idempotent - safe to re-run.
-- ============================================================

-- page_views: extra columns used by the analytics dashboard
ALTER TABLE public.page_views
  ADD COLUMN IF NOT EXISTS session_id      character varying,
  ADD COLUMN IF NOT EXISTS visitor_id      character varying,
  ADD COLUMN IF NOT EXISTS is_returning   boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS language       character varying,
  ADD COLUMN IF NOT EXISTS country_name   character varying,
  ADD COLUMN IF NOT EXISTS city           character varying,
  ADD COLUMN IF NOT EXISTS region         character varying,
  ADD COLUMN IF NOT EXISTS is_bot         boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS ip_address     character varying,
  ADD COLUMN IF NOT EXISTS duration_seconds integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS scroll_depth   integer DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_page_views_session ON public.page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_is_bot   ON public.page_views(is_bot);

-- analytics_events: extra columns used by the analytics dashboard
ALTER TABLE public.analytics_events
  ADD COLUMN IF NOT EXISTS event_target  character varying,
  ADD COLUMN IF NOT EXISTS page_path     character varying,
  ADD COLUMN IF NOT EXISTS device_type   character varying,
  ADD COLUMN IF NOT EXISTS browser       character varying,
  ADD COLUMN IF NOT EXISTS country       character varying,
  ADD COLUMN IF NOT EXISTS country_name  character varying,
  ADD COLUMN IF NOT EXISTS city          character varying,
  ADD COLUMN IF NOT EXISTS region        character varying,
  ADD COLUMN IF NOT EXISTS is_bot        boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS bot_reason    character varying;

CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page    ON public.analytics_events(page_path);

-- Realtime "live users" tracker: one row per active session
CREATE TABLE IF NOT EXISTS public.analytics_sessions (
  session_id  character varying NOT NULL PRIMARY KEY,
  last_seen   timestamp with time zone NOT NULL DEFAULT now(),
  page_path   character varying,
  created_at  timestamp with time zone DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_last_seen ON public.analytics_sessions(last_seen);

-- Abandoned checkouts captured during checkout flow
CREATE TABLE IF NOT EXISTS public.abandoned_checkouts (
  id              uuid NOT NULL DEFAULT gen_random_uuid(),
  session_id      character varying NOT NULL UNIQUE,
  customer_name   character varying,
  customer_phone  character varying,
  customer_email  character varying,
  items           jsonb DEFAULT '[]'::jsonb,
  subtotal        numeric DEFAULT 0,
  step_reached    character varying,
  reason          character varying DEFAULT '',
  device_type     character varying,
  browser         character varying,
  recovered       boolean DEFAULT false,
  created_at      timestamp with time zone DEFAULT now(),
  updated_at      timestamp with time zone DEFAULT now(),
  CONSTRAINT abandoned_checkouts_pkey PRIMARY KEY (id)
);
CREATE INDEX IF NOT EXISTS idx_abandoned_checkouts_created ON public.abandoned_checkouts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_abandoned_checkouts_recovered ON public.abandoned_checkouts(recovered);
