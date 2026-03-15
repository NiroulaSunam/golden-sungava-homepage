import type { Metadata } from 'next';
import { SITE_DEFAULTS } from '@/lib/constants/site-defaults';

interface SeoFields {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
}

/**
 * Generate Next.js Metadata object from CMS SEO fields.
 * Used in page-level `generateMetadata()` functions.
 */
export const buildMetadata = (fields: SeoFields = {}): Metadata => {
  const title = fields.title || SITE_DEFAULTS.seo.defaultTitle;
  const description = fields.description || SITE_DEFAULTS.seo.defaultDescription;
  const image = fields.image || SITE_DEFAULTS.seo.ogImage;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    title,
    description,
    keywords: fields.keywords || SITE_DEFAULTS.seo.keywords,
    robots: fields.noIndex ? { index: false, follow: false } : undefined,
    alternates: fields.canonicalUrl ? { canonical: fields.canonicalUrl } : undefined,
    openGraph: {
      title,
      description,
      images: [{ url: image.startsWith('/') ? `${appUrl}${image}` : image }],
      type: 'website',
      siteName: SITE_DEFAULTS.schoolName,
    },
  };
};
