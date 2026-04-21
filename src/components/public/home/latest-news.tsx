'use client';

import type { NewsArticle } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { ContentCard } from '@/components/shared/content-card';
import { useLanguage } from '@/frontend/providers/language-provider';
import { SITE_DEFAULTS } from '@/lib/constants/site-defaults';
import { resolveLocalizedSiteText } from '@/lib/i18n/site-text';

interface LatestNewsProps {
  news: NewsArticle[];
  subtitle?: string;
}

export const LatestNews = ({ news, subtitle }: LatestNewsProps) => {
  const { lang, t } = useLanguage();
  const localizedSubtitle = resolveLocalizedSiteText(
    subtitle,
    SITE_DEFAULTS.sectionSubtitles.latestNews,
    t('home.newsSubtitle'),
    lang,
  );

  const newsItems = Array.isArray(news) ? news : [];

  if (newsItems.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.latestNews')}
          subtitle={localizedSubtitle}
          viewAllHref="/news"
          viewAllLabel={t('action.viewAll')}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {newsItems.slice(0, 3).map((article) => (
            <ContentCard
              key={article.id}
              title={article.title}
              href={`/news/${article.id}`}
              imageUrl={article.imageUrl}
              date={article.date}
              excerpt={article.excerpt}
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};
