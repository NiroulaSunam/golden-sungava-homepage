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

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: string;
}

const AnimatedSection = ({ children, delay }: AnimatedSectionProps) => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn('animate-on-scroll', delay, isInView && 'in-view')}>
      {children}
    </div>
  );
};

// --- Section Divider ---

const SectionDivider = () => (
  <div className="mx-auto max-w-7xl px-4 md:px-6">
    <div className="section-divider" />
  </div>
);

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

      <AnimatedSection delay="delay-100">
        <ActivitiesSection activities={data.activities} />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay="delay-100">
        <LatestNews news={data.news} />
      </AnimatedSection>

      <AnimatedSection delay="delay-200">
        <UpcomingEvents events={data.events} />
      </AnimatedSection>

      <SectionDivider />

      <AnimatedSection delay="delay-100">
        <BlogPreview blogs={data.blogs} />
      </AnimatedSection>

      <AnimatedSection delay="delay-200">
        <TestimonialsCarousel testimonials={data.testimonials} />
      </AnimatedSection>
    </>
  );
};
