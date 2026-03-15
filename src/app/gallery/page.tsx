import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { GalleryClient } from './gallery-client';

export const metadata: Metadata = buildMetadata({
  title: 'Gallery',
  description: 'Explore photo albums and videos from Golden Sungava English Boarding School events and activities.',
});

const GalleryPage = () => <GalleryClient />;
export default GalleryPage;
