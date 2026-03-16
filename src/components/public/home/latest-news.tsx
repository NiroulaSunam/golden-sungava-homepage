'use client';

import type { NewsArticle } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { ContentCard } from '@/components/shared/content-card';
import { useLanguage } from '@/frontend/providers/language-provider';

interface LatestNewsProps {
  news: NewsArticle[];
  subtitle?: string;
}

export const LatestNews = ({ news, subtitle }: LatestNewsProps) => {
  const { t } = useLanguage();

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.latestNews')}
          subtitle={subtitle || 'Stay informed about school happenings'}
          viewAllHref="/news"
          viewAllLabel={t('action.viewAll')}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 6).map((article, i) => (
            <ContentCard
              key={article.id}
              title={article.title}
              href={`/news/${article.id}`}
              imageUrl={article.imageUrl}
              date={article.date}
              excerpt={article.excerpt}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
