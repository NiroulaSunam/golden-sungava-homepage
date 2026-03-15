'use client';

import type { NewsArticle } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { ContentCard } from '@/components/shared/content-card';
import { useLanguage } from '@/frontend/providers/language-provider';

interface LatestNewsProps {
  news: NewsArticle[];
}

export const LatestNews = ({ news }: LatestNewsProps) => {
  const { t } = useLanguage();

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.latestNews')}
          viewAllHref="/news"
          viewAllLabel={t('action.viewAll')}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 6).map((article) => (
            <ContentCard
              key={article.id}
              title={article.title}
              href={`/news/${article.id}`}
              imageUrl={article.imageUrl}
              date={article.date}
              excerpt={article.excerpt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
