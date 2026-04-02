import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { NoticesListClient } from './notices-list-client';

export const metadata: Metadata = buildMetadata({ title: 'Notices', description: 'Official notices from Golden Sungava English Boarding School.' });

const NoticesPage = () => <NoticesListClient />;
export default NoticesPage;
