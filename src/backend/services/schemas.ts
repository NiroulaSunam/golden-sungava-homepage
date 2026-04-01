/**
 * Zod Validation Schemas for all content types.
 * Each content type has create (required fields) and update (all optional) schemas.
 */

import { z } from 'zod';

// Shared bilingual field schema
const bilingual = z.object({ en: z.string(), np: z.string() });
const bilingualOptional = z.object({ en: z.string(), np: z.string() }).optional();

// ─── News ─────────────────────────────────────────────
export const newsCreateSchema = z.object({
  title: bilingual,
  date: z.string(),
  excerpt: bilingualOptional,
  image_url: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  content: bilingualOptional,
});
export const newsUpdateSchema = newsCreateSchema.partial();

// ─── Events ───────────────────────────────────────────
export const eventsCreateSchema = z.object({
  title: bilingual,
  date: z.string(),
  time: z.string().nullable().optional(),
  venue: bilingualOptional,
  description: bilingualOptional,
  image_url: z.string().nullable().optional(),
});
export const eventsUpdateSchema = eventsCreateSchema.partial();

// ─── Blogs ────────────────────────────────────────────
export const blogsCreateSchema = z.object({
  title: bilingual,
  date: z.string(),
  author: z.string().nullable().optional(),
  author_role: z.string().nullable().optional(),
  excerpt: bilingualOptional,
  image_url: z.string().nullable().optional(),
  content: bilingualOptional,
});
export const blogsUpdateSchema = blogsCreateSchema.partial();

// ─── Notices ──────────────────────────────────────────
export const noticesCreateSchema = z.object({
  title: bilingual,
  date: z.string(),
  excerpt: bilingualOptional,
  pdf_url: z.string().nullable().optional(),
});
export const noticesUpdateSchema = noticesCreateSchema.partial();

// ─── Staff (non-bilingual) ────────────────────────────
export const staffCreateSchema = z.object({
  name: z.string().min(1),
  designation: z.string().min(1),
  department: z.string().min(1),
  email: z.string().email().nullable().optional(),
  photo_url: z.string().nullable().optional(),
});
export const staffUpdateSchema = staffCreateSchema.partial();

// ─── Facilities ───────────────────────────────────────
export const facilitiesCreateSchema = z.object({
  name: bilingual,
  description: bilingualOptional,
  image_url: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
});
export const facilitiesUpdateSchema = facilitiesCreateSchema.partial();

// ─── Activities ───────────────────────────────────────
export const activitiesCreateSchema = z.object({
  name: bilingual,
  description: bilingualOptional,
  image_url: z.string().nullable().optional(),
});
export const activitiesUpdateSchema = activitiesCreateSchema.partial();

// ─── Testimonials ─────────────────────────────────────
export const testimonialsCreateSchema = z.object({
  quote: bilingual,
  author_name: bilingual,
  role: z.string().nullable().optional(),
  photo_url: z.string().nullable().optional(),
});
export const testimonialsUpdateSchema = testimonialsCreateSchema.partial();

// ─── FAQs ─────────────────────────────────────────────
export const faqsCreateSchema = z.object({
  question: bilingual,
  answer: bilingual,
});
export const faqsUpdateSchema = faqsCreateSchema.partial();

// ─── Hero Slides ──────────────────────────────────────
export const heroSlidesCreateSchema = z.object({
  heading: bilingual,
  subheading: bilingualOptional,
  image_url: z.string().nullable().optional(),
  cta_text: bilingualOptional,
  cta_link: z.string().nullable().optional(),
});
export const heroSlidesUpdateSchema = heroSlidesCreateSchema.partial();

// ─── Navigation Items ─────────────────────────────────
export const navigationCreateSchema = z.object({
  label: bilingual,
  href: z.string().min(1),
  parent_id: z.string().uuid().nullable().optional(),
});
export const navigationUpdateSchema = navigationCreateSchema.partial();

// ─── Admission Steps ──────────────────────────────────
export const admissionStepsCreateSchema = z.object({
  icon: z.string().nullable().optional(),
  title: bilingual,
  description: bilingualOptional,
});
export const admissionStepsUpdateSchema = admissionStepsCreateSchema.partial();

// ─── Payment Methods ──────────────────────────────────
const bilingualSteps = z.object({
  en: z.array(z.string()),
  np: z.array(z.string()),
}).optional();

export const paymentMethodsCreateSchema = z.object({
  name: bilingual,
  icon: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  steps: bilingualSteps,
});
export const paymentMethodsUpdateSchema = paymentMethodsCreateSchema.partial();

// ─── Gallery Events ───────────────────────────────────
export const galleryEventsCreateSchema = z.object({
  name: bilingual,
  date: z.string(),
  cover_url: z.string().nullable().optional(),
});
export const galleryEventsUpdateSchema = galleryEventsCreateSchema.partial();

// ─── Gallery Photos ───────────────────────────────────
export const galleryPhotosCreateSchema = z.object({
  gallery_event_id: z.string().uuid(),
  url: z.string().min(1),
  caption: bilingualOptional,
  sort_order: z.number().optional(),
});
export const galleryPhotosUpdateSchema = galleryPhotosCreateSchema.partial();

// ─── Gallery Videos ───────────────────────────────────
export const galleryVideosCreateSchema = z.object({
  gallery_event_id: z.string().uuid(),
  url: z.string().min(1),
  title: bilingualOptional,
  thumbnail_url: z.string().nullable().optional(),
  sort_order: z.number().optional(),
});
export const galleryVideosUpdateSchema = galleryVideosCreateSchema.partial();

// ─── Site Config (singleton) ──────────────────────────
export const siteConfigUpdateSchema = z.object({
  school_name: bilingualOptional,
  tagline: bilingualOptional,
  logo_url: z.string().nullable().optional(),
  established_year: z.number().nullable().optional(),
  address: bilingualOptional,
  phones: z.array(z.string()).optional(),
  emails: z.array(z.string()).optional(),
  office_hours: bilingualOptional,
  social_links: z.record(z.string()).optional(),
  google_maps_embed: z.string().nullable().optional(),
  theme: z.record(z.string()).optional(),
  currency: z.string().optional(),
  languages: z.array(z.string()).optional(),
  default_language: z.string().optional(),
  stats: z.any().optional(),
  hero_accent_text: bilingualOptional,
  section_subtitles: z.any().optional(),
  page_descriptions: z.any().optional(),
  footer: z.any().optional(),
  seo: z.any().optional(),
}).partial();

// ─── Principal Message (singleton) ────────────────────
export const principalMessageUpdateSchema = z.object({
  name: bilingualOptional,
  title: bilingualOptional,
  photo_url: z.string().nullable().optional(),
  signature_url: z.string().nullable().optional(),
  message: bilingualOptional,
}).partial();
