'use client';

import type { BlogPost } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { ContentCard } from '@/components/shared/content-card';
import { useLanguage } from '@/frontend/providers/language-provider';

interface BlogPreviewProps {
  blogs: BlogPost[];
  subtitle?: string;
}

export const BlogPreview = ({ blogs, subtitle }: BlogPreviewProps) => {
  const { t } = useLanguage();

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.blogs')}
          subtitle={subtitle || 'Insights and stories from our school community'}
          viewAllHref="/blogs"
          viewAllLabel={t('action.readMore')}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(0, 3).map((blog) => (
            <ContentCard
              key={blog.id}
              title={blog.title}
              href={`/blogs/${blog.id}`}
              imageUrl={blog.imageUrl}
              date={blog.date}
              excerpt={blog.excerpt}
              author={blog.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
