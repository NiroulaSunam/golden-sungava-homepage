import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://goldensungava.edu.np';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
  ],
  sitemap: `${BASE_URL}/sitemap.xml`,
});

export default robots;
