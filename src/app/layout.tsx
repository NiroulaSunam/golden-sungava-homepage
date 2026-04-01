import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@frontend/providers';
import { fetchApi } from '@/lib/api/client';
import type { SiteConfig } from '@/types/api';
import { Toaster } from '@/components/ui/sonner';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-devanagari',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://goldensungava.edu.np';

export const generateMetadata = async (): Promise<Metadata> => {
  const { data: config } = await fetchApi<SiteConfig>('site-config', { lang: 'en' });

  return {
    title: {
      default: config?.seo?.defaultTitle || 'Golden Sungava English Boarding School',
      template: `%s | ${config?.schoolName || 'Golden Sungava'}`,
    },
    description: config?.seo?.defaultDescription || 'Premium English-medium boarding school in Changunarayan-2, Duwakot, Bhaktapur, Nepal.',
    keywords: config?.seo?.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: config?.seo?.defaultTitle || 'Golden Sungava English Boarding School',
      description: config?.seo?.defaultDescription,
      images: [{ url: config?.seo?.ogImage || '/images/logo.png' }],
      type: 'website',
      siteName: config?.schoolName || 'Golden Sungava English Boarding School',
    },
  };
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#B8860B' },
    { media: '(prefers-color-scheme: dark)', color: '#8B6508' },
  ],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${cormorant.variable} ${notoDevanagari.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          {children}
          <Toaster />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
