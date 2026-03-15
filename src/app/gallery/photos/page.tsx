import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { PhotoGalleryClient } from './photo-gallery-client';

export const metadata: Metadata = buildMetadata({
  title: 'Photo Gallery',
  description: 'Browse photo albums from Golden Sungava English Boarding School events and activities.',
});

const PhotoGalleryPage = () => {
  return <PhotoGalleryClient />;
};

export default PhotoGalleryPage;
