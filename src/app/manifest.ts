import type { MetadataRoute } from 'next';
import { fetchApi } from '@/lib/api/client';
import type { SiteConfig } from '@/types/api';

/**
 * Dynamic web manifest sourced from CMS site config.
 * Generates manifest.json with school branding for PWA install.
 */
const manifest = async (): Promise<MetadataRoute.Manifest> => {
  const { data: config } = await fetchApi<SiteConfig>('site-config', { lang: 'en' });

  return {
    name: config?.schoolName || 'Golden Sungava English Boarding School',
    short_name: 'Golden Sungava',
    description: config?.seo?.defaultDescription || 'Premium English-medium boarding school in Bhaktapur, Nepal',
    start_url: '/',
    display: 'standalone',
    background_color: config?.theme?.backgroundColor || '#FFFFFF',
    theme_color: config?.theme?.primaryColor || '#B8860B',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
};

export default manifest;
