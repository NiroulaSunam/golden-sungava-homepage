/**
 * Spike Test: JSONB Language Extraction via Supabase JS Client
 *
 * Validates that bilingual JSONB columns can be extracted to flat strings
 * using Supabase JS `select('field->>lang')` syntax in a single query.
 *
 * This spike must pass before building the repository layer (task 2.1+).
 * Runs against a local Supabase instance with seeded data.
 *
 * @requires Local Supabase running (`pnpm sb:start`)
 * @requires Seed data applied (`pnpm db:reset`)
 */
import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';

// Standard Supabase local demo key — safe to commit, same for all local instances
const LOCAL_URL = 'http://127.0.0.1:54521';
const LOCAL_SERVICE_KEY = // nosemgrep: hardcoded-credentials
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(LOCAL_URL, LOCAL_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

describe('JSONB Language Extraction Spike', () => {
  describe('select with ->> operator for language extraction', () => {
    it('should extract English text from JSONB column using aliased ->>en', async () => {
      // IMPORTANT FINDING: Without aliases, multiple ->>en extractions collide
      // under the same 'en' key (last one wins). Always use aliases:
      //   heading:heading->>en (NOT heading->>en)
      const { data, error } = await supabase
        .from('hero_slides')
        .select('id, heading:heading->>en, cta_text:cta_text->>en, cta_link, sort_order')
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true })
        .limit(1);

      expect(error).toBeNull();
      expect(data).not.toBeNull();
      expect(data!.length).toBeGreaterThan(0);

      const slide = data![0];
      // With aliases, each field gets its own key
      expect(typeof slide.heading).toBe('string');
      expect(slide.heading).toBe('Explore the Potentiality of Your Child');
      expect(typeof slide.cta_text).toBe('string');
      expect(slide.cta_text).toBe('Get Admission');
    });

    it('should extract Nepali text from JSONB column using ->>np', async () => {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('id, heading->>np, sort_order')
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true })
        .limit(1);

      expect(error).toBeNull();
      expect(data).not.toBeNull();
      expect(data!.length).toBeGreaterThan(0);

      const slide = data![0];
      expect(typeof slide.np).toBe('string');
      expect(slide.np).toBe('तपाईंको बच्चाको सम्भावना खोज्नुहोस्');
    });

    it('should extract multiple JSONB columns in a single query', async () => {
      const { data, error } = await supabase
        .from('facilities')
        .select('id, name->>en, description->>en, icon, sort_order')
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true })
        .limit(1);

      expect(error).toBeNull();
      expect(data).not.toBeNull();
      expect(data!.length).toBeGreaterThan(0);

      const facility = data![0];
      expect(typeof facility.en).toBe('string');
      // name->>en and description->>en both alias to 'en' — check if this causes a conflict
      // If so, we'll need a different approach
      expect(facility.en).toBeDefined();
    });

    it('should support aliased column names for multiple JSONB fields', async () => {
      // Use PostgREST renamed columns syntax: column_name::alias
      const { data, error } = await supabase
        .from('facilities')
        .select('id, name:name->>en, description:description->>en, icon, sort_order')
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true })
        .limit(1);

      expect(error).toBeNull();
      expect(data).not.toBeNull();
      expect(data!.length).toBeGreaterThan(0);

      const facility = data![0];
      // With aliasing, each field should have its own named key
      expect(typeof facility.name).toBe('string');
      expect(typeof facility.description).toBe('string');
      expect(facility.name).toBe('Sports');
      expect(facility.description).toContain('Comprehensive sports programs');
    });

    it('should work with singleton tables (site_config)', async () => {
      const { data, error } = await supabase
        .from('site_config')
        .select('id, school_name:school_name->>en, tagline:tagline->>en')
        .eq('status', 'published')
        .is('deleted_at', null)
        .limit(1)
        .single();

      expect(error).toBeNull();
      expect(data).not.toBeNull();
      expect(data!.school_name).toBe('Golden Sungava English Boarding School');
      expect(data!.tagline).toBe('Explore potentiality of the students');
    });

    it('should work with paginated list content (news)', async () => {
      const { data, error, count } = await supabase
        .from('news')
        .select('id, title:title->>en, excerpt:excerpt->>en, date, category, image_url', { count: 'exact' })
        .eq('status', 'published')
        .is('deleted_at', null)
        .eq('is_active', true)
        .order('date', { ascending: false })
        .range(0, 2);

      expect(error).toBeNull();
      expect(data).not.toBeNull();
      expect(data!.length).toBe(3);
      expect(count).toBeGreaterThanOrEqual(3);

      // Verify flat string fields
      const article = data![0];
      expect(typeof article.title).toBe('string');
      expect(typeof article.excerpt).toBe('string');
      // Non-JSONB fields should be untouched
      expect(typeof article.date).toBe('string');
      expect(typeof article.category).toBe('string');
    });

    it('should handle non-bilingual tables (staff) without extraction', async () => {
      const { data, error } = await supabase
        .from('staff')
        .select('id, name, designation, department, email, photo_url')
        .is('deleted_at', null)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(1);

      expect(error).toBeNull();
      expect(data).not.toBeNull();
      expect(data!.length).toBeGreaterThan(0);

      const member = data![0];
      expect(typeof member.name).toBe('string');
      expect(member.name).toBe('Lila Nath Niroula');
    });

    it('should extract JSONB from nested gallery photos via join', async () => {
      const { data, error } = await supabase
        .from('gallery_events')
        .select(`
          id,
          name:name->>en,
          date,
          cover_url,
          gallery_photos(id, url, caption:caption->>en, sort_order)
        `)
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true })
        .limit(1);

      expect(error).toBeNull();
      expect(data).not.toBeNull();
      expect(data!.length).toBeGreaterThan(0);

      const event = data![0];
      expect(typeof event.name).toBe('string');
      expect(event.gallery_photos).toBeDefined();
      expect(Array.isArray(event.gallery_photos)).toBe(true);
      expect(event.gallery_photos.length).toBeGreaterThan(0);
      expect(typeof event.gallery_photos[0].caption).toBe('string');
    });
  });
});
