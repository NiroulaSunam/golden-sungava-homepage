-- ============================================================
-- 002: All content tables with bilingual JSONB columns
-- ============================================================

-- Site Config (singleton — one row)
CREATE TABLE site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_name JSONB NOT NULL,          -- {"en": "...", "np": "..."}
  tagline JSONB,
  logo_url TEXT,
  established_year INTEGER,
  address JSONB,
  phones TEXT[] DEFAULT '{}',
  emails TEXT[] DEFAULT '{}',
  office_hours JSONB,
  social_links JSONB,                  -- {"facebook": "...", "whatsapp": "...", "messenger": "..."}
  google_maps_embed TEXT,
  theme JSONB,                         -- {"primaryColor": "...", ...}
  currency TEXT DEFAULT 'NPR',
  languages TEXT[] DEFAULT '{en,np}',
  default_language TEXT DEFAULT 'en',
  stats JSONB,                         -- [{"icon": "...", "value": "...", "label": "..."}]
  hero_accent_text JSONB,
  section_subtitles JSONB,
  page_descriptions JSONB,
  footer JSONB,
  seo JSONB,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Principal Message (singleton — one row)
CREATE TABLE principal_message (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name JSONB NOT NULL,                 -- {"en": "...", "np": "..."}
  title JSONB,
  photo_url TEXT,
  signature_url TEXT,
  message JSONB,                       -- {"en": "...", "np": "..."}
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Hero Slides
CREATE TABLE hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  heading JSONB NOT NULL,              -- {"en": "...", "np": "..."}
  subheading JSONB,
  image_url TEXT,
  cta_text JSONB,
  cta_link TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Navigation Items (self-referencing tree)
CREATE TABLE navigation_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label JSONB NOT NULL,                -- {"en": "...", "np": "..."}
  href TEXT NOT NULL,
  parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- News
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL,
  date DATE NOT NULL,
  excerpt JSONB,
  image_url TEXT,
  category TEXT,
  content JSONB,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Events
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  venue JSONB,
  description JSONB,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Blogs
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL,
  date DATE NOT NULL,
  author TEXT,
  author_role TEXT,
  excerpt JSONB,
  image_url TEXT,
  content JSONB,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Notices
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL,
  date DATE NOT NULL,
  excerpt JSONB,
  pdf_url TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Staff (NOT bilingual — names don't translate)
CREATE TABLE staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Facilities
CREATE TABLE facilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name JSONB NOT NULL,
  description JSONB,
  image_url TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Activities
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name JSONB NOT NULL,
  description JSONB,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote JSONB NOT NULL,
  author_name JSONB NOT NULL,
  role TEXT,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- FAQs
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question JSONB NOT NULL,
  answer JSONB NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Admission Steps
CREATE TABLE admission_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT,
  title JSONB NOT NULL,
  description JSONB,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

-- Payment Methods
CREATE TABLE payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name JSONB NOT NULL,
  icon TEXT,
  color TEXT,
  steps JSONB,                         -- {"en": ["step1", ...], "np": ["step1", ...]}
  sort_order INTEGER DEFAULT 0 NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);
