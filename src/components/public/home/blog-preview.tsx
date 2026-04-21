'use client';

import type { BlogPost } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { ContentCard } from '@/components/shared/content-card';
import { useLanguage } from '@/frontend/providers/language-provider';
import { SITE_DEFAULTS } from '@/lib/constants/site-defaults';
import { resolveLocalizedSiteText } from '@/lib/i18n/site-text';

interface BlogPreviewProps {
  blogs: BlogPost[];
  subtitle?: string;
}

export const BlogPreview = ({ blogs, subtitle }: BlogPreviewProps) => {
  const { lang, t } = useLanguage();
  const blogsList = Array.isArray(blogs) ? blogs : [];
  const localizedSubtitle = resolveLocalizedSiteText(
    subtitle,
    SITE_DEFAULTS.sectionSubtitles.blogs,
    t('home.blogsSubtitle'),
    lang,
  );

  if (blogsList.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.blogs')}
          subtitle={localizedSubtitle}
          viewAllHref="/blogs"
          viewAllLabel={t('action.readMore')}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogsList.slice(0, 3).map((blog) => (
            <ContentCard
              key={blog.id}
              title={blog.title}
              href={`/blogs/${blog.id}`}
              imageUrl={blog.imageUrl}
              date={blog.date}
              excerpt={blog.excerpt}
              author={blog.author}
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};
