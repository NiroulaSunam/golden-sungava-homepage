import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://goldensungava.edu.np';

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    '', // homepage
    '/about',
    '/principal-message',
    '/staff',
    '/gallery/photos',
    '/gallery/videos',
    '/news',
    '/events',
    '/notices',
    '/admission',
    '/activities',
    '/calendar',
    '/facilities',
    '/blogs',
    '/downloads',
    '/payment-info',
    '/contact',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  // TODO: When backend APIs are implemented, dynamically add
  // individual news/events/blogs detail pages from the database.
  // For now, listing pages cover all content.

  return staticPages;
};

export default sitemap;
