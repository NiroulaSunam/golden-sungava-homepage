'use client';

import type { BlogPost } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { ContentCard } from '@/components/shared/content-card';
import { useLanguage } from '@/frontend/providers/language-provider';

interface BlogPreviewProps {
  blogs: BlogPost[];
}

export const BlogPreview = ({ blogs }: BlogPreviewProps) => {
  const { t } = useLanguage();

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.blogs')}
          viewAllHref="/blogs"
          viewAllLabel={t('action.readMore')}
        />
        {/* Offset grid: first two cards, then remaining shifted */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(0, 4).map((blog, i) => (
            <ContentCard
              key={blog.id}
              title={blog.title}
              href={`/blogs/${blog.id}`}
              imageUrl={blog.imageUrl}
              date={blog.date}
              excerpt={blog.excerpt}
              author={blog.author}
              className={i >= 2 ? 'lg:translate-y-4' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
