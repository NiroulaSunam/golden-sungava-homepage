import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { NewsListClient } from './news-list-client';

export const metadata: Metadata = buildMetadata({ title: 'News', description: 'Latest news from Golden Sungava English Boarding School.' });

const NewsPage = () => <NewsListClient />;
export default NewsPage;
