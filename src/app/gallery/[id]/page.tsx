import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { EventGalleryClient } from './event-gallery-client';

export const metadata: Metadata = buildMetadata({
  title: 'Event Gallery',
  description: 'View photos and videos from this school event.',
});

const EventGalleryPage = () => <EventGalleryClient />;
export default EventGalleryPage;
