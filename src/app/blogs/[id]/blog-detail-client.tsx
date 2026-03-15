'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { BlogPost } from '@/types/api';
import { DetailPage } from '@/components/shared/detail-page';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

export const BlogDetailClient = () => {
  const params = useParams();
  const { lang, t } = useLanguage();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<BlogPost[]>('blogs', { lang });
      if (data) {
        const found = data.find((b) => String(b.id) === String(params.id));
        if (found) setBlog(found);
      }
    };
    load();
  }, [lang, params.id]);

  if (!blog) {
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
      title={blog.title}
      date={blog.date}
      author={blog.author}
      imageUrl={blog.imageUrl}
      content={blog.content || blog.excerpt}
      breadcrumbItems={[
        { label: t('heading.blogs'), href: '/blogs' },
        { label: blog.title, href: `/blogs/${blog.id}` },
      ]}
      backHref="/blogs"
      backLabel={t('heading.blogs')}
      relatedLinks={[
        { label: t('nav.activities'), href: '/activities' },
        { label: t('nav.news'), href: '/news' },
      ]}
    />
  );
};
