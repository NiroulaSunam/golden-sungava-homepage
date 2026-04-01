'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { NewsArticle } from '@/types/api';
import { DetailPage } from '@/components/shared/detail-page';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

export const NewsDetailClient = () => {
  const params = useParams();
  const { lang, t } = useLanguage();
  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<NewsArticle[]>('news', { lang });
      if (data) {
        const found = data.find((n) => String(n.id) === String(params.id));
        if (found) setArticle(found);
      }
    };
    load();
  }, [lang, params.id]);

  if (!article) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <SkeletonLoader variant="text" lines={2} />
        <SkeletonLoader variant="image" className="mt-6" />
        <SkeletonLoader variant="text" lines={6} className="mt-6" />
      </div>
    );
  }

  return (
    <DetailPage
      title={article.title}
      date={article.date}
      imageUrl={article.imageUrl}
      content={article.content || article.excerpt}
      breadcrumbItems={[
        { label: t('heading.latestNews'), href: '/news' },
        { label: article.title, href: `/news/${article.id}` },
      ]}
      backHref="/news"
      backLabel={t('heading.latestNews')}
      relatedLinks={[
        { label: t('nav.events'), href: '/events' },
        { label: t('nav.notices'), href: '/notices' },
      ]}
    />
  );
};
