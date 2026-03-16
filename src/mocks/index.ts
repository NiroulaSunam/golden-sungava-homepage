/**
 * Mock Data Registry
 *
 * Central registry of all mock data files.
 * Each entry maps an API endpoint to its mock data source.
 *
 * All content mocks are bilingual: `{ en: [...], np: [...] }`
 * The data-fetching layer passes `lang` parameter and returns the appropriate variant.
 *
 * Implementation tracking lives in `src/lib/api/registry.ts`:
 * - `implemented: true`  → call real API (regardless of USE_MOCK_API)
 * - `implemented: false` → use mock data (regardless of USE_MOCK_API)
 *
 * @see src/lib/api/ for the data-fetching abstraction layer
 * @see src/lib/api/registry.ts for per-endpoint implementation status
 */

// --- Re-exports for convenience ---
export { mockSiteConfig } from './data/site-config';
export { mockPrincipalMessage } from './data/principal-message';
export { mockStaff } from './data/staff';
export { mockNews } from './data/news';
export { mockEvents } from './data/events';
export { mockBlogs } from './data/blogs';
export { mockNotices } from './data/notices';
export { mockPhotoAlbums } from './data/gallery';
export { mockFacilities } from './data/facilities';
export { mockTestimonials } from './data/testimonials';
export { mockActivities } from './data/activities';
export { mockHeroSlides } from './data/hero-slides';
export { mockNavigation } from './data/navigation';
export { mockFaqs } from './data/faqs';
export { mockGalleryVideos } from './data/gallery-videos';
export { mockAdmissionSteps } from './data/admission-steps';
export { mockPaymentMethods } from './data/payment-methods';

// --- Type re-exports ---
export type { StaffMember } from './data/staff';
export type { NewsArticle } from './data/news';
export type { SchoolEvent } from './data/events';
export type { BlogPost } from './data/blogs';
export type { Notice } from './data/notices';
export type { PhotoAlbum } from './data/gallery';
export type { Facility } from './data/facilities';
export type { Testimonial } from './data/testimonials';
export type { Activity } from './data/activities';
export type { HeroSlide } from './data/hero-slides';
export type { NavItem } from './data/navigation';
export type { FaqItem } from './data/faqs';
export type { GalleryVideo } from './data/gallery-videos';
export type { AdmissionStep } from './data/admission-steps';
export type { PaymentMethod } from './data/payment-methods';

/**
 * Mock Registry — tracks all endpoints
 *
 * | Endpoint                   | Mock File              | Bilingual | Notes                    |
 * |----------------------------|------------------------|-----------|--------------------------|
 * | GET /api/site-config       | site-config.ts         | Yes       | Theme, branding, contact |
 * | GET /api/principal-message | principal-message.ts   | No*       | Single language content   |
 * | GET /api/staff             | staff.ts               | No*       | Names don't translate    |
 * | GET /api/news              | news.ts                | No*       | Mixed en/np from source  |
 * | GET /api/events            | events.ts              | No*       | Mixed en/np from source  |
 * | GET /api/blogs             | blogs.ts               | No*       | Mixed en/np from source  |
 * | GET /api/notices           | notices.ts             | No*       | Mixed en/np from source  |
 * | GET /api/gallery/photos    | gallery.ts             | No*       | Album names only         |
 * | GET /api/facilities        | facilities.ts          | Yes       | Full bilingual           |
 * | GET /api/testimonials      | testimonials.ts        | Yes       | Full bilingual           |
 * | GET /api/activities        | activities.ts          | Yes       | Full bilingual           |
 * | GET /api/hero-slides       | hero-slides.ts         | Yes       | Full bilingual           |
 * | GET /api/navigation        | navigation.ts          | Yes       | Full bilingual           |
 *
 * *No = content from existing site is mixed language; full bilingual will come from CMS
 *
 * Implementation status tracked in: src/lib/api/registry.ts
 */
