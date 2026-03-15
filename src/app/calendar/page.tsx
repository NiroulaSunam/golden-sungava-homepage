import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { CalendarClient } from './calendar-client';

export const metadata: Metadata = buildMetadata({ title: 'Academic Calendar', description: 'Academic calendar and events schedule.' });

const CalendarPage = () => <CalendarClient />;
export default CalendarPage;
