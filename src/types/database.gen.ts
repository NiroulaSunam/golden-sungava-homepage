export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Primitive = string | number | boolean | null;
type RowValue = Json | Primitive | string[] | undefined;
type RowRecord = Record<string, RowValue>;

type ContentRow = RowRecord & {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: Database['public']['Enums']['content_status'];
  is_active: boolean;
  sort_order: number;
};

type ContentInsert = Partial<ContentRow>;
type ContentUpdate = Partial<ContentRow>;

type SingletonRow = RowRecord & {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: Database['public']['Enums']['content_status'];
  is_active: boolean;
};

type SingletonInsert = Partial<SingletonRow>;
type SingletonUpdate = Partial<SingletonRow>;

type SiteConfigRow = {
  id: string;
  school_name: Json;
  tagline: Json | null;
  logo_url: string | null;
  established_year: number | null;
  address: Json | null;
  phones: string[] | null;
  emails: string[] | null;
  office_hours: Json | null;
  social_links: Json | null;
  google_maps_embed: string | null;
  theme: Json | null;
  seo: Json | null;
  currency: string | null;
  languages: string[] | null;
  default_language: string | null;
  stats: Json | null;
  hero_accent_text: Json | null;
  section_subtitles: Json | null;
  page_descriptions: Json | null;
  footer: Json | null;
  admission_mode: 'internal' | 'external' | null;
  admission_external_url: string | null;
  status: Database['public']['Enums']['content_status'];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type SiteConfigInsert = Partial<SiteConfigRow>;
type SiteConfigUpdate = Partial<SiteConfigRow>;

export type Database = {
  public: {
    Tables: {
      activities: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      admission_applications: { Row: RowRecord; Insert: RowRecord; Update: RowRecord };
      admission_steps: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      audit_log: { Row: RowRecord; Insert: RowRecord; Update: RowRecord };
      blogs: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      contact_submissions: { Row: RowRecord; Insert: RowRecord; Update: RowRecord };
      downloads: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      events: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      facilities: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      faqs: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      gallery_events: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      gallery_photos: { Row: RowRecord; Insert: RowRecord; Update: RowRecord };
      gallery_videos: { Row: RowRecord; Insert: RowRecord; Update: RowRecord };
      hero_slides: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      navigation_items: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      news: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      notices: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      payment_methods: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      principal_message: { Row: SingletonRow; Insert: SingletonInsert; Update: SingletonUpdate };
      profiles: { Row: RowRecord; Insert: RowRecord; Update: RowRecord };
      publish_log: { Row: RowRecord; Insert: RowRecord; Update: RowRecord };
      site_config: { Row: SiteConfigRow; Insert: SiteConfigInsert; Update: SiteConfigUpdate };
      staff: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
      testimonials: { Row: ContentRow; Insert: ContentInsert; Update: ContentUpdate };
    };
    Enums: {
      content_status: 'draft' | 'published';
      user_role: 'admin' | 'editor' | 'viewer';
    };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export const Constants = {
  public: {
    Enums: {
      content_status: ['draft', 'published'],
      user_role: ['admin', 'editor', 'viewer'],
    },
  },
} as const;
