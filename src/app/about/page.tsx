import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { AboutPageClient } from './about-client';

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description: 'Learn about Golden Sungava English Boarding School — our history, mission, vision, and values.',
});

const AboutPage = () => {
  return <AboutPageClient />;
};

export default AboutPage;
