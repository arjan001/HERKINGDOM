-- ============================================================
-- 033: Enforce and normalize order status values
-- ============================================================
--
-- This migration:
-- 1. Normalizes existing status values to canonical form
-- 2. Adds a CHECK constraint to enforce valid statuses
-- 3. Creates an index on status for efficient filtering
--
-- Valid statuses:
--   - pending      : Order created, awaiting payment (STK not yet initiated or in progress)
--   - confirmed    : Payment received successfully (M-Pesa or card)
--   - cancelled    : Order cancelled by customer or admin
--   - failed       : Payment failed (insufficient balance, wrong PIN, timeout, etc.)
--   - processing   : Confirmed order being prepared for shipment
--   - shipped      : Order has been dispatched
--   - delivered    : Order delivered to customer
--   - refunded     : Payment refunded to customer
-- ============================================================

-- Normalize existing status values to lowercase (pending, confirmed, cancelled, failed, etc.)
UPDATE public.orders
SET status = LOWER(TRIM(status))
WHERE status IS NOT NULL;

-- Normalize common typos/variations
UPDATE public.orders
SET status = 'pending'
WHERE status IN ('pend', 'pendding', 'waiting', 'awaiting_payment', 'awaiting payment');

UPDATE public.orders
SET status = 'confirmed'
WHERE status IN ('complete', 'completed', 'paid', 'success', 'successful');

UPDATE public.orders
SET status = 'cancelled'
WHERE status IN ('canceled', 'cancel', 'rejected');

UPDATE public.orders
SET status = 'failed'
WHERE status IN ('fail', 'payment_failed', 'payment failed', 'error');

-- Add CHECK constraint to enforce valid statuses
ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE public.orders
ADD CONSTRAINT orders_status_check
CHECK (
  status IN (
    'pending',
    'confirmed',
    'cancelled',
    'failed',
    'processing',
    'shipped',
    'delivered',
    'refunded'
  )
);

-- Create index on status for efficient filtering
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- Add index on created_at for date-based filtering
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Add comment to document the status column
COMMENT ON COLUMN public.orders.status IS
'Order status: pending=awaiting payment, confirmed=payment received, cancelled=cancelled by user/admin, failed=payment failed, processing=being prepared, shipped=dispatched, delivered=received, refunded=payment returned';
