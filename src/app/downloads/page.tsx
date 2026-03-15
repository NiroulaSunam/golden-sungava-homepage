import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { DownloadsClient } from './downloads-client';

export const metadata: Metadata = buildMetadata({ title: 'Downloads', description: 'Download forms, syllabi, and other documents.' });

const DownloadsPage = () => <DownloadsClient />;
export default DownloadsPage;
