import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { EventsListClient } from './events-list-client';

export const metadata: Metadata = buildMetadata({ title: 'Events', description: 'School events at Golden Sungava English Boarding School.' });

const EventsPage = () => <EventsListClient />;
export default EventsPage;
