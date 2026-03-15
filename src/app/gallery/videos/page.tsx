import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { VideoGalleryClient } from './video-gallery-client';

export const metadata: Metadata = buildMetadata({
  title: 'Video Gallery',
  description: 'Watch videos from Golden Sungava English Boarding School events and activities.',
});

const VideoGalleryPage = () => {
  return <VideoGalleryClient />;
};

export default VideoGalleryPage;
