/**
 * API Response Transformer
 *
 * Converts database responses from snake_case with JSONB strings
 * to camelCase with parsed objects, matching TypeScript API types.
 *
 * Handles:
 * - snake_case → camelCase field conversion
 * - JSON string parsing (both bilingual and non-bilingual)
 * - Language extraction from bilingual JSONB fields
 */

import type { SiteConfig } from '@/types/api';
import type { Database } from '@/types/database.gen';

type SiteConfigRow = Database['public']['Tables']['site_config']['Row'];

/**
 * Parse a bilingual JSONB field, extracting the specified language.
 * Falls back to 'en' if language not found.
 *
 * If the field is a bilingual structure {en: value, np: value}, extracts for the language.
 * Otherwise returns the field as-is (for non-bilingual values).
 *
 * @param field - JSONB field from database (can be object, string, or already a value)
 * @param lang - Language code ('en' or 'np')
 * @returns Extracted value or empty string if not found
 */
const extractBilingualField = (field: unknown, lang: string): unknown => {
  if (!field) return '';

  // If it's a string (non-bilingual), return as-is
  if (typeof field === 'string') return field;

  // If it's an object, check if it's bilingual {en: ..., np: ...}
  if (typeof field === 'object' && field !== null) {
    const obj = field as Record<string, unknown>;
    
    // If it looks like bilingual structure (has 'en' or 'np' keys at top level)
    if ('en' in obj || 'np' in obj) {
      return (obj[lang] ?? obj['en']) ?? '';
    }
    
    // Otherwise it's a regular object, return as-is
    return field;
  }

  return field;
};

/**
 * Safely parse a JSONB field that might be a string or already an object.
 *
 * @param field - JSONB field from database
 * @param fallback - Default value if parsing fails
 * @returns Parsed object/array or fallback
 */
const parseJsonField = <T>(field: unknown, fallback: T): T => {
  // If already an object/array, return as-is
  if (typeof field === 'object') return (field as T) || fallback;

  // If it's a string, try to parse
  if (typeof field === 'string') {
    try {
      return JSON.parse(field) as T;
    } catch {
      return fallback;
    }
  }

  return fallback;
};

/**
 * Transform a single site_config row from database format to API format.
 *
 * @param row - Raw database row with snake_case fields
 * @param lang - Language code for bilingual field extraction
 * @returns Transformed object matching SiteConfig type
 */
export const transformSiteConfigRow = (row: SiteConfigRow, lang: string = 'en'): SiteConfig => {
  return {
    schoolName: extractBilingualField(row.school_name, lang) as string,
    tagline: extractBilingualField(row.tagline, lang) as string,
    logoUrl: row.logo_url ?? '',
    establishedYear: row.established_year,
    address: extractBilingualField(row.address, lang) as string,
    phones: row.phones || [],
    emails: row.emails || [],
    officeHours: extractBilingualField(row.office_hours, lang) as string,
    socialLinks: parseJsonField(row.social_links, { facebook: '', whatsapp: '', messenger: '' }),
    googleMapsEmbed: row.google_maps_embed ?? '',
    theme: parseJsonField(row.theme, {
      primaryColor: '',
      primaryLight: '',
      primaryDark: '',
      backgroundColor: '',
      foregroundColor: '',
      mutedColor: '',
      mutedForeground: '',
      accentColor: '',
      accentForeground: '',
    }),
    seo: parseJsonField(row.seo, { defaultTitle: '', defaultDescription: '', ogImage: '', keywords: [] }),
    currency: row.currency ?? '',
    languages: row.languages || ['en', 'np'],
    defaultLanguage: row.default_language ?? '',
    stats: parseJsonField(row.stats, []),
    heroAccentText: extractBilingualField(row.hero_accent_text, lang) as string,
    sectionSubtitles: parseJsonField(row.section_subtitles, {
      facilities: '',
      activities: '',
      latestNews: '',
      upcomingEvents: '',
      blogs: '',
      testimonials: '',
    }),
    pageDescriptions: parseJsonField(row.page_descriptions, {
      about: '',
      admission: '',
      contact: '',
      paymentInfo: '',
      facilities: '',
      activities: '',
      gallery: '',
      staff: '',
      calendar: '',
      downloads: '',
      notices: '',
    }),
    footer: parseJsonField(row.footer, { ctaHeading: '', ctaDescription: '', ctaButtonText: '', tagline: '' }),
  };
};

/**
 * Transform multiple content rows.
 * Generic transformer for news, events, blogs, facilities, activities, staff, gallery, etc.
 *
 * Converts snake_case fields to camelCase:
 * - image_url → imageUrl
 * - photo_url → photoUrl
 * - signature_url → signatureUrl
 * - cta_text → ctaText
 * - cta_link → ctaLink
 * - pdf_url → pdfUrl
 * - cover_url → coverUrl
 * - parent_id → parentId
 * - sort_order → sortOrder
 * - gallery_photos → galleryPhotos
 * - gallery_videos → galleryVideos
 * - author_role → authorRole
 * - author_name → authorName
 * - is_active → isActive
 * - created_at → createdAt
 * - updated_at → updatedAt
 * - deleted_at → deletedAt
 *
 * Bilingual fields (name, title, message, etc.) are extracted per the lang parameter.
 * JSON fields (stats, theme, steps, etc.) are parsed if they are strings.
 * Nested arrays and objects are recursively transformed.
 */
export const transformContentRow = <T extends Record<string, unknown>>(
  row: T,
  lang: string = 'en',
): Record<string, unknown> => {
  const transformed: Record<string, unknown> = {};

  // Fields that are always bilingual (extract language-specific value)
  const bilingualFields = [
    'school_name', 'tagline', 'address', 'office_hours', 'name', 'title', 'message',
    'heading', 'subheading', 'cta_text', 'label', 'excerpt', 'content', 'hero_accent_text',
    'quote', 'author_name', 'description', 'venue', 'caption'
  ];

  // Fields that contain JSON data and should be parsed (bilingual or not)
  const jsonFields = [
    'social_links', 'theme', 'seo', 'stats', 'footer', 'section_subtitles', 'page_descriptions',
    'steps', 'author_role', 'role' // Additional JSON-y fields
  ];

  for (const [key, value] of Object.entries(row)) {
    // Convert snake_case to camelCase
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

    // Handle bilingual fields
    if (bilingualFields.includes(key)) {
      transformed[camelKey] = extractBilingualField(value, lang);
      continue;
    }

    // Handle JSON fields that need parsing
    if (jsonFields.includes(key)) {
      transformed[camelKey] = parseJsonField(value, value);
      continue;
    }

    // Handle nested arrays (transform each item recursively)
    if (Array.isArray(value)) {
      transformed[camelKey] = value.map((item) => {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          return transformContentRow(item as Record<string, unknown>, lang);
        }
        return item;
      });
      continue;
    }

    // Handle nested objects (transform recursively)
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      transformed[camelKey] = transformContentRow(value as Record<string, unknown>, lang);
      continue;
    }

    // Everything else — pass through as-is
    transformed[camelKey] = value;
  }

  return transformed;
};

/**
 * Transform an array of content rows (for list endpoints).
 */
export const transformContentRows = <T extends Record<string, unknown>>(
  rows: T[],
  lang: string = 'en',
): Record<string, unknown>[] => rows.map((row) => transformContentRow(row, lang));

/**
 * Transform gallery events with special handling for photos/videos.
 * Converts galleryPhotos → photos and galleryVideos → videos.
 */
export const transformGalleryEvents = <T extends Record<string, unknown>>(
  rows: T[],
  lang: string = 'en',
): Record<string, unknown>[] =>
  rows.map((row) => {
    const transformed = transformContentRow(row, lang);
    
    // Rename galleryPhotos to photos, galleryVideos to videos
    if (transformed.galleryPhotos) {
      transformed.photos = transformed.galleryPhotos;
      delete transformed.galleryPhotos;
    }
    if (transformed.galleryVideos) {
      transformed.videos = transformed.galleryVideos;
      delete transformed.galleryVideos;
    }
    
    return transformed;
  });
