/**
 * API Implementation Registry
 *
 * Code-level map of every endpoint with its implementation status.
 * This is the single source of truth for which endpoints are live vs mocked.
 *
 * - `implemented: true`  → data-fetching layer calls real API
 * - `implemented: false` → data-fetching layer returns mock data
 *
 * When a backend API is built, flip `implemented` to `true`.
 * No env vars needed — this is a compile-time constant.
 */

import type { ApiEndpoint } from '@/types/api';

export type EndpointConfig = {
  implemented: boolean;
  apiUrl: string;
  mockKey: string;
  description: string;
};

export const apiRegistry: Record<ApiEndpoint, EndpointConfig> = {
  'site-config': {
    implemented: true,
    apiUrl: '/api/site-config',
    mockKey: 'site-config',
    description: 'Global site settings — school identity, branding, contact, social links',
  },
  'hero-slides': {
    implemented: true,
    apiUrl: '/api/hero-slides',
    mockKey: 'hero-slides',
    description: 'Homepage hero carousel slides',
  },
  navigation: {
    implemented: true,
    apiUrl: '/api/navigation',
    mockKey: 'navigation',
    description: 'CMS-driven navigation menu structure',
  },
  news: {
    implemented: true,
    apiUrl: '/api/news',
    mockKey: 'news',
    description: 'News articles with thumbnails, dates, and excerpts',
  },
  events: {
    implemented: true,
    apiUrl: '/api/events',
    mockKey: 'events',
    description: 'School events with dates and descriptions',
  },
  blogs: {
    implemented: true,
    apiUrl: '/api/blogs',
    mockKey: 'blogs',
    description: 'Blog posts with authors and featured images',
  },
  notices: {
    implemented: true,
    apiUrl: '/api/notices',
    mockKey: 'notices',
    description: 'Official school notices and announcements',
  },
  staff: {
    implemented: true,
    apiUrl: '/api/staff',
    mockKey: 'staff',
    description: 'All school staff grouped by department',
  },
  facilities: {
    implemented: true,
    apiUrl: '/api/facilities',
    mockKey: 'facilities',
    description: 'School facilities with descriptions and images',
  },
  activities: {
    implemented: true,
    apiUrl: '/api/activities',
    mockKey: 'activities',
    description: 'Extracurricular activities showcase',
  },
  testimonials: {
    implemented: true,
    apiUrl: '/api/testimonials',
    mockKey: 'testimonials',
    description: 'Parent and student testimonials',
  },
  'gallery-events': {
    implemented: true,
    apiUrl: '/api/gallery/events',
    mockKey: 'gallery-events',
    description: 'Event-based gallery with photos and videos per event',
  },
  'principal-message': {
    implemented: true,
    apiUrl: '/api/principal-message',
    mockKey: 'principal-message',
    description: "Principal's welcome message, photo, and signature",
  },
  faqs: {
    implemented: true,
    apiUrl: '/api/faqs',
    mockKey: 'faqs',
    description: 'Frequently asked questions for admission page',
  },
  'admission-steps': {
    implemented: true,
    apiUrl: '/api/admission-steps',
    mockKey: 'admission-steps',
    description: 'Step-by-step admission process guide',
  },
  'payment-methods': {
    implemented: true,
    apiUrl: '/api/payment-methods',
    mockKey: 'payment-methods',
    description: 'Available fee payment methods with instructions',
  },
};

export const isImplemented = (endpoint: ApiEndpoint): boolean =>
  apiRegistry[endpoint].implemented;

export const getApiUrl = (endpoint: ApiEndpoint): string =>
  apiRegistry[endpoint].apiUrl;
