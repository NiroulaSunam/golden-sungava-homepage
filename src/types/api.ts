/**
 * Shared API types used across the data-fetching layer, providers, and components.
 */

// --- Endpoint identifiers ---

export type ApiEndpoint =
  | 'site-config'
  | 'hero-slides'
  | 'navigation'
  | 'news'
  | 'events'
  | 'blogs'
  | 'notices'
  | 'staff'
  | 'facilities'
  | 'activities'
  | 'testimonials'
  | 'gallery-photos'
  | 'gallery-videos'
  | 'principal-message'
  | 'faqs'
  | 'admission-steps'
  | 'payment-methods';

// --- Fetch options ---

export type FetchOptions = {
  lang?: string;
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
};

// --- API response wrapper ---

export type ApiResponse<T> = {
  data: T;
  error: string | null;
  isMock: boolean;
};

// --- Bilingual data helper ---

export type BilingualData<T> = Record<'en' | 'np', T>;

// --- Language code ---

export type LanguageCode = 'en' | 'np';

// --- Content types (re-exported from mocks for single source of truth) ---

export type { StaffMember } from '@/mocks/data/staff';
export type { NewsArticle } from '@/mocks/data/news';
export type { SchoolEvent } from '@/mocks/data/events';
export type { BlogPost } from '@/mocks/data/blogs';
export type { Notice } from '@/mocks/data/notices';
export type { PhotoAlbum } from '@/mocks/data/gallery';
export type { Facility } from '@/mocks/data/facilities';
export type { Testimonial } from '@/mocks/data/testimonials';
export type { Activity } from '@/mocks/data/activities';
export type { HeroSlide } from '@/mocks/data/hero-slides';
export type { NavItem } from '@/mocks/data/navigation';
export type { PrincipalMessage } from '@/mocks/data/principal-message';
export type { FaqItem } from '@/mocks/data/faqs';
export type { GalleryVideo } from '@/mocks/data/gallery-videos';
export type { AdmissionStep } from '@/mocks/data/admission-steps';
export type { PaymentMethod } from '@/mocks/data/payment-methods';

// SiteConfig type — inlined here since the mock file defines it locally
export type SiteConfig = {
  schoolName: string;
  tagline: string;
  logoUrl: string;
  establishedYear: number | null;
  address: string;
  phones: string[];
  emails: string[];
  officeHours: string;
  socialLinks: {
    facebook: string;
    whatsapp: string;
    messenger: string;
  };
  googleMapsEmbed: string;
  theme: {
    primaryColor: string;
    primaryLight: string;
    primaryDark: string;
    backgroundColor: string;
    foregroundColor: string;
    mutedColor: string;
    mutedForeground: string;
    accentColor: string;
    accentForeground: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
    keywords: string[];
  };
  currency: string;
  languages: string[];
  defaultLanguage: string;
  stats: { icon: string; value: string; label: string }[];
  heroAccentText: string;
  sectionSubtitles: {
    facilities: string;
    activities: string;
    latestNews: string;
    upcomingEvents: string;
    blogs: string;
    testimonials: string;
  };
  pageDescriptions: {
    about: string;
    admission: string;
    contact: string;
    paymentInfo: string;
    facilities: string;
    activities: string;
    gallery: string;
    staff: string;
    calendar: string;
    downloads: string;
    notices: string;
  };
  footer: {
    ctaHeading: string;
    ctaDescription: string;
    ctaButtonText: string;
    tagline: string;
  };
};
