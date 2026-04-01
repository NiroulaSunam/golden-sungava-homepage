'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { NewsArticle } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { ListingPage } from '@/components/shared/listing-page';

export const NewsListClient = () => {
  const { lang, t } = useLanguage();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<NewsArticle[]>('news', { lang });
      if (data) setNews(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  const categories = [...new Set(news.map((n) => n.category).filter(Boolean))];

  return (
    <>
      <PageHeader
        title={t('heading.latestNews')}
        breadcrumbs={[{ label: t('heading.latestNews'), href: '/news' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <ListingPage
          items={news}
          basePath="/news"
          isLoading={isLoading}
          searchPlaceholder={t('action.search')}
          categories={categories}
        />
      </div>
    </>
  );
};
