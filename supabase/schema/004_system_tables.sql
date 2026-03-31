-- ============================================================
-- 004: System tables (audit log, publish log) and functions
-- ============================================================

-- Audit Log (append-only — Category 1: NEVER delete)
CREATE TABLE audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,                -- create, update, delete, publish
  resource TEXT NOT NULL,              -- table/entity name
  resource_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Publish Log
CREATE TABLE publish_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  published_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  items_count INTEGER NOT NULL DEFAULT 0,
  details JSONB
);

-- Indexes for audit log queries
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_resource ON audit_log(resource, resource_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at DESC);
CREATE INDEX idx_publish_log_published_at ON publish_log(published_at DESC);

-- ============================================================
-- PostgreSQL function: Publish all drafts atomically
-- ============================================================
CREATE OR REPLACE FUNCTION publish_all_drafts(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  total_count INTEGER := 0;
  row_count INTEGER;
BEGIN
  -- Content tables with status column
  UPDATE hero_slides SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE navigation_items SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE news SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE events SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE blogs SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE notices SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE facilities SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE activities SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE testimonials SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE gallery_events SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE faqs SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE admission_steps SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE payment_methods SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE site_config SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE principal_message SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  -- Log the publish action
  INSERT INTO publish_log (user_id, published_at, items_count)
  VALUES (p_user_id, now(), total_count);

  RETURN total_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- PostgreSQL function: Count all drafts across tables
-- ============================================================
CREATE OR REPLACE FUNCTION get_draft_count()
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(cnt), 0)::INTEGER FROM (
    SELECT COUNT(*) AS cnt FROM hero_slides WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM navigation_items WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM news WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM events WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM blogs WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM notices WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM facilities WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM activities WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM testimonials WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM gallery_events WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM faqs WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM admission_steps WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM payment_methods WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM site_config WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM principal_message WHERE status = 'draft' AND deleted_at IS NULL
  ) counts;
$$ LANGUAGE sql STABLE;
