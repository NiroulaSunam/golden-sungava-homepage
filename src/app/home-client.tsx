'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { HeroSlide, Facility, Activity, NewsArticle, SchoolEvent, BlogPost, Testimonial } from '@/types/api';
import {
  HeroCarousel,
  FacilitiesPreview,
  ActivitiesSection,
  LatestNews,
  UpcomingEvents,
  BlogPreview,
  TestimonialsCarousel,
} from '@/components/public/home';
import { useInView } from '@/lib/hooks/use-in-view';
import { cn } from '@/lib/utils';

// --- Animated Section Wrapper ---

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn('animate-on-scroll', isInView && 'in-view')}>
      {children}
    </div>
  );
};

// --- Homepage Data State ---

type HomeData = {
  heroSlides: HeroSlide[];
  facilities: Facility[];
  activities: Activity[];
  news: NewsArticle[];
  events: SchoolEvent[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
};

// --- Main Client Component ---

export const HomePageClient = () => {
  const { lang } = useLanguage();
  const [data, setData] = useState<HomeData>({
    heroSlides: [],
    facilities: [],
    activities: [],
    news: [],
    events: [],
    blogs: [],
    testimonials: [],
  });

  useEffect(() => {
    const load = async () => {
      const [heroRes, facilitiesRes, activitiesRes, newsRes, eventsRes, blogsRes, testimonialsRes] =
        await Promise.all([
          fetchApi<HeroSlide[]>('hero-slides', { lang }),
          fetchApi<Facility[]>('facilities', { lang }),
          fetchApi<Activity[]>('activities', { lang }),
          fetchApi<NewsArticle[]>('news', { lang }),
          fetchApi<SchoolEvent[]>('events', { lang }),
          fetchApi<BlogPost[]>('blogs', { lang }),
          fetchApi<Testimonial[]>('testimonials', { lang }),
        ]);

      setData({
        heroSlides: heroRes.data || [],
        facilities: facilitiesRes.data || [],
        activities: activitiesRes.data || [],
        news: newsRes.data || [],
        events: eventsRes.data || [],
        blogs: blogsRes.data || [],
        testimonials: testimonialsRes.data || [],
      });
    };

    load();
  }, [lang]);

  return (
    <>
      <HeroCarousel slides={data.heroSlides} />

      <AnimatedSection>
        <FacilitiesPreview facilities={data.facilities} />
      </AnimatedSection>

      <AnimatedSection>
        <ActivitiesSection activities={data.activities} />
      </AnimatedSection>

      <AnimatedSection>
        <LatestNews news={data.news} />
      </AnimatedSection>

      <AnimatedSection>
        <UpcomingEvents events={data.events} />
      </AnimatedSection>

      <AnimatedSection>
        <BlogPreview blogs={data.blogs} />
      </AnimatedSection>

      <AnimatedSection>
        <TestimonialsCarousel testimonials={data.testimonials} />
      </AnimatedSection>
    </>
  );
};
