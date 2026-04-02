import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { BlogsListClient } from './blogs-list-client';

export const metadata: Metadata = buildMetadata({ title: 'Blogs', description: 'Blog posts from Golden Sungava English Boarding School.' });

const BlogsPage = () => <BlogsListClient />;
export default BlogsPage;
