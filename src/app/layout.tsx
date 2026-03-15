import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@frontend/providers';
import { Header, Footer, FloatingCTA } from '@/components/public/layout';
import { SwRegister } from '@/components/shared/sw-register';
import { InstallPrompt } from '@/components/shared/install-prompt';
import { fetchApi } from '@/lib/api/client';
import type { SiteConfig } from '@/types/api';

// Primary body font - clean, modern sans-serif
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-dm-sans',
});

// Devanagari fallback for Nepali text
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-devanagari',
});

// Display/heading font - elegant serif
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://goldensungava.edu.np';

/**
 * Dynamic metadata fetched from CMS site-config via ISR.
 * Runs at build time, revalidates when ISR triggers.
 * Always uses default language (English) for SEO — search engines index the ISR shell.
 */
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
  maximumScale: 1,
  userScalable: false,
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
          <SwRegister />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingCTA />
          <InstallPrompt />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
