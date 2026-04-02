'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { BlogPost } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { ListingPage } from '@/components/shared/listing-page';

export const BlogsListClient = () => {
  const { lang, t } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<BlogPost[]>('blogs', { lang });
      if (data) setBlogs(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  const items = blogs.map((b) => ({
    id: b.id,
    title: b.title,
    date: b.date,
    excerpt: b.excerpt,
    imageUrl: b.imageUrl,
    author: b.author,
  }));

  return (
    <>
      <PageHeader
        title={t('heading.blogs')}
        breadcrumbs={[{ label: t('heading.blogs'), href: '/blogs' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <ListingPage items={items} basePath="/blogs" isLoading={isLoading} searchPlaceholder={t('action.search')} />
      </div>
    </>
  );
};
