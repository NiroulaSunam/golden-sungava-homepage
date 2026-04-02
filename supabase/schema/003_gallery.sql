-- ============================================================
-- 003: Gallery tables (parent-child)
-- ============================================================

-- Gallery Events (parent)
CREATE TABLE gallery_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name JSONB NOT NULL,                 -- {"en": "...", "np": "..."}
  date DATE NOT NULL,
  cover_url TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Gallery Photos (child of gallery_events)
CREATE TABLE gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_event_id UUID REFERENCES gallery_events(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  caption JSONB,                       -- {"en": "...", "np": "..."}
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Gallery Videos (child of gallery_events)
CREATE TABLE gallery_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_event_id UUID REFERENCES gallery_events(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  title JSONB,                         -- {"en": "...", "np": "..."}
  thumbnail_url TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes for child table lookups
CREATE INDEX idx_gallery_photos_event_id ON gallery_photos(gallery_event_id);
CREATE INDEX idx_gallery_videos_event_id ON gallery_videos(gallery_event_id);
