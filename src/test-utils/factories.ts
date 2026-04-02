/**
 * Test data factories for all content types.
 * Returns Zod-valid payloads matching create schemas.
 */

const bilingual = (en: string, np = '') => ({ en, np });

// ─── News ─────────────────────────────────────────────
export const createNewsData = (overrides?: Record<string, unknown>) => ({
  title: bilingual('Test News Article'),
  date: '2026-04-01',
  excerpt: bilingual('A test excerpt'),
  category: 'Test',
  ...overrides,
});

// ─── Events ───────────────────────────────────────────
export const createEventsData = (overrides?: Record<string, unknown>) => ({
  title: bilingual('Test Event'),
  date: '2026-04-15',
  time: '10:00 AM',
  venue: bilingual('Main Hall'),
  description: bilingual('A test event description'),
  ...overrides,
});

// ─── Blogs ────────────────────────────────────────────
export const createBlogsData = (overrides?: Record<string, unknown>) => ({
  title: bilingual('Test Blog Post'),
  date: '2026-04-01',
  author: 'Test Author',
  author_role: 'Teacher',
  excerpt: bilingual('Blog excerpt'),
  ...overrides,
});

// ─── Notices ──────────────────────────────────────────
export const createNoticesData = (overrides?: Record<string, unknown>) => ({
  title: bilingual('Test Notice'),
  date: '2026-04-01',
  excerpt: bilingual('Important notice'),
  ...overrides,
});

// ─── Staff ────────────────────────────────────────────
export const createStaffData = (overrides?: Record<string, unknown>) => ({
  name: 'Test Staff Member',
  designation: 'Teacher',
  department: 'Science',
  email: 'test@school.edu.np',
  ...overrides,
});

// ─── Facilities ───────────────────────────────────────
export const createFacilitiesData = (overrides?: Record<string, unknown>) => ({
  name: bilingual('Test Facility'),
  description: bilingual('A test facility'),
  icon: 'building',
  ...overrides,
});

// ─── Activities ───────────────────────────────────────
export const createActivitiesData = (overrides?: Record<string, unknown>) => ({
  name: bilingual('Test Activity'),
  description: bilingual('An activity description'),
  ...overrides,
});

// ─── Testimonials ─────────────────────────────────────
export const createTestimonialsData = (overrides?: Record<string, unknown>) => ({
  quote: bilingual('Great school!'),
  author_name: bilingual('Test Parent'),
  role: 'Parent',
  ...overrides,
});

// ─── FAQs ─────────────────────────────────────────────
export const createFaqsData = (overrides?: Record<string, unknown>) => ({
  question: bilingual('What is the admission process?'),
  answer: bilingual('Contact the school office.'),
  ...overrides,
});

// ─── Hero Slides ──────────────────────────────────────
export const createHeroSlidesData = (overrides?: Record<string, unknown>) => ({
  heading: bilingual('Welcome to Our School'),
  subheading: bilingual('Excellence in Education'),
  cta_text: bilingual('Learn More'),
  cta_link: '/about',
  ...overrides,
});

// ─── Navigation ───────────────────────────────────────
export const createNavigationData = (overrides?: Record<string, unknown>) => ({
  label: bilingual('About Us'),
  href: '/about',
  ...overrides,
});

// ─── Admission Steps ──────────────────────────────────
export const createAdmissionStepsData = (overrides?: Record<string, unknown>) => ({
  title: bilingual('Step 1: Apply Online'),
  description: bilingual('Fill out the online form'),
  icon: 'clipboard',
  ...overrides,
});

// ─── Payment Methods ──────────────────────────────────
export const createPaymentMethodsData = (overrides?: Record<string, unknown>) => ({
  name: bilingual('eSewa'),
  icon: 'wallet',
  color: '#60BB46',
  ...overrides,
});

// ─── Gallery Events ───────────────────────────────────
export const createGalleryEventsData = (overrides?: Record<string, unknown>) => ({
  name: bilingual('Annual Day 2082'),
  date: '2026-04-01',
  ...overrides,
});

// ─── Gallery Photos ───────────────────────────────────
export const createGalleryPhotosData = (eventId: string, overrides?: Record<string, unknown>) => ({
  gallery_event_id: eventId,
  url: 'https://drive.google.com/test-photo.jpg',
  caption: bilingual('Test photo'),
  ...overrides,
});

// ─── Gallery Videos ───────────────────────────────────
export const createGalleryVideosData = (eventId: string, overrides?: Record<string, unknown>) => ({
  gallery_event_id: eventId,
  url: 'https://www.youtube.com/watch?v=test123',
  title: bilingual('Test video'),
  ...overrides,
});

// ─── Site Config (singleton update) ───────────────────
export const createSiteConfigData = (overrides?: Record<string, unknown>) => ({
  school_name: bilingual('Test School Name'),
  tagline: bilingual('Test Tagline'),
  established_year: 2053,
  ...overrides,
});

// ─── Principal Message (singleton update) ─────────────
export const createPrincipalMessageData = (overrides?: Record<string, unknown>) => ({
  name: bilingual('Test Principal'),
  title: bilingual('Principal'),
  message: bilingual('Welcome message from the principal.'),
  ...overrides,
});
