'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { NewsArticle } from '@/types/api';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
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
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={[{ label: t('heading.latestNews'), href: '/news' }]} />
      <h1 className="mt-8 font-heading text-3xl font-bold md:text-4xl">{t('heading.latestNews')}</h1>
      <ListingPage
        items={news}
        basePath="/news"
        isLoading={isLoading}
        searchPlaceholder={t('action.search')}
        categories={categories}
        className="mt-8"
      />
    </div>
  );
};
