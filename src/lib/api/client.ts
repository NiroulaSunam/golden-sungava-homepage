/**
 * Centralized Data-Fetching Client
 *
 * Single entry point for all data access across the application.
 * Routes to mock data or real API based on the implementation registry.
 *
 * - Checks `apiRegistry[endpoint].implemented` for each call
 * - Appends `lang` query parameter to all real API requests
 * - Returns typed ApiResponse — never throws
 * - Falls back to default language when requested language is unavailable
 */

import type { ApiEndpoint, ApiResponse, FetchOptions } from '@/types/api';
import { isImplemented, getApiUrl } from './registry';
import { DEFAULT_LANGUAGE } from '@/lib/constants/site-defaults';
import {
  mockSiteConfig,
  mockHeroSlides,
  mockNavigation,
  mockNews,
  mockEvents,
  mockBlogs,
  mockNotices,
  mockStaff,
  mockFacilities,
  mockActivities,
  mockTestimonials,
  mockGalleryEvents,
  mockPrincipalMessage,
  mockFaqs,
  mockAdmissionSteps,
  mockPaymentMethods,
} from '@/mocks';

// Map of endpoint keys to their mock data objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockDataMap: Record<ApiEndpoint, Record<string, unknown> | unknown[]> = {
  'site-config': mockSiteConfig,
  'hero-slides': mockHeroSlides,
  navigation: mockNavigation,
  news: mockNews,
  events: mockEvents,
  blogs: mockBlogs,
  notices: mockNotices,
  staff: mockStaff as unknown as Record<string, unknown>,
  facilities: mockFacilities,
  activities: mockActivities,
  testimonials: mockTestimonials,
  'gallery-events': mockGalleryEvents,
  'principal-message': mockPrincipalMessage,
  faqs: mockFaqs,
  'admission-steps': mockAdmissionSteps,
  'payment-methods': mockPaymentMethods,
};

/**
 * Resolve mock data for an endpoint with language support.
 * Bilingual mocks are keyed as `{ en: [...], np: [...] }`.
 * Non-bilingual mocks (e.g., staff) are returned as-is.
 */
const resolveMockData = <T>(endpoint: ApiEndpoint, lang: string): T => {
  const data = mockDataMap[endpoint];

  // Check if data is bilingual (has `en` key)
  if (data && typeof data === 'object' && !Array.isArray(data) && 'en' in data) {
    const bilingual = data as Record<string, unknown>;
    return (bilingual[lang] ?? bilingual[DEFAULT_LANGUAGE]) as T;
  }

  // Non-bilingual data — return as-is
  return data as T;
};

/**
 * Fetch data from real API endpoint.
 * Appends lang query parameter. Returns null on failure.
 */
const fetchFromApi = async <T>(
  endpoint: ApiEndpoint,
  options: FetchOptions = {},
): Promise<{ data: T | null; error: string | null }> => {
  const url = new URL(getApiUrl(endpoint), process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

  if (options.lang) url.searchParams.set('lang', options.lang);
  if (options.page) url.searchParams.set('page', String(options.page));
  if (options.limit) url.searchParams.set('limit', String(options.limit));
  if (options.search) url.searchParams.set('search', options.search);
  if (options.category) url.searchParams.set('category', options.category);

  try {
    const response = await fetch(url.toString(), {
      cache: 'no-store',
      next: { tags: [endpoint] },
    });

    if (!response.ok) {
      return { data: null, error: `API returned ${response.status}` };
    }

    const text = await response.text();
    const json = text
      ? (() => {
        try {
          return JSON.parse(text) as Record<string, unknown>;
        } catch {
          return null;
        }
      })()
      : null;

    // Unwrap paginated API payloads that return { data, meta }
    if (json && typeof json === 'object' && !Array.isArray(json) && 'data' in json) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { data: (json as any).data as T, error: null };
    }

    return { data: json as T, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown fetch error';
    return { data: null, error: message };
  }
};

/**
 * Main data-fetching function.
 *
 * @param endpoint - The API endpoint identifier
 * @param options - Optional fetch parameters (lang, page, limit, search, category)
 * @returns Typed ApiResponse with data, error state, and mock indicator
 *
 * @example
 * ```ts
 * const { data, error, isMock } = await fetchApi<HeroSlide[]>('hero-slides', { lang: 'np' });
 * ```
 */
export const fetchApi = async <T>(
  endpoint: ApiEndpoint,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> => {
  const lang = options.lang || DEFAULT_LANGUAGE;
  const allowMockFallback = process.env.NODE_ENV !== 'production';

  // Route to real API if endpoint is implemented
  if (isImplemented(endpoint)) {
    const { data, error } = await fetchFromApi<T>(endpoint, { ...options, lang });

    if (data !== null) {
      return { data, error: null, isMock: false };
    }

    if (!allowMockFallback) {
      return { data: [] as T, error, isMock: false };
    }

    // Fall back to mock data on API failure
    const fallback = resolveMockData<T>(endpoint, lang);
    return { data: fallback, error, isMock: true };
  }

  // Use mock data for unimplemented endpoints
  const data = resolveMockData<T>(endpoint, lang);
  return { data, error: null, isMock: true };
};
