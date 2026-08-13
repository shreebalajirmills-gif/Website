-- ==============================================================================
-- SHREE BALAJI ROLLING MILLS - POSTGRESQL / SUPABASE ROW-LEVEL SECURITY (RLS)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Inquiries Data Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id VARCHAR(50) UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  segment TEXT NOT NULL CHECK (segment IN ('distributor', 'contractor', 'project', 'investor')),
  spec_interest TEXT,
  message TEXT,
  crm_tag TEXT DEFAULT 'inbound_lead',
  assigned_role TEXT DEFAULT 'Sales Desk Qualifier',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ENABLE ROW-LEVEL SECURITY (RLS) - Mandatory Baseline Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. PUBLIC INSERT POLICY
-- Allows anonymous and public site visitors to insert new validated lead submissions.
-- Strictly denies SELECT, UPDATE, and DELETE to anonymous public callers.
CREATE POLICY "Allow public insert of inquiries"
  ON public.inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 5. ADMIN / AUTHENTICATED STAFF ALL OPERATIONS POLICY
-- Restricts reading, updating, and deleting inquiry records exclusively to authenticated admin/staff users.
CREATE POLICY "Allow authenticated staff full access"
  ON public.inquiries
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() ->> 'role' = 'admin') OR 
    (auth.jwt() ->> 'role' = 'sales_desk')
  )
  WITH CHECK (
    (auth.jwt() ->> 'role' = 'admin') OR 
    (auth.jwt() ->> 'role' = 'sales_desk')
  );

-- 6. INDEXES FOR PERFORMANCE & QUERY OPTIMIZATION
CREATE INDEX IF NOT EXISTS idx_inquiries_inquiry_id ON public.inquiries(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_segment ON public.inquiries(segment);
