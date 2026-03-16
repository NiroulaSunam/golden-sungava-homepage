'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import type { HeroSlide, Facility, Activity, NewsArticle, SchoolEvent, BlogPost, Testimonial } from '@/types/api';
import {
  HeroCarousel,
  StatsCounter,
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
  const { config } = useSiteConfig();
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

  const subtitles = config.sectionSubtitles;

  return (
    <>
      <HeroCarousel slides={data.heroSlides} accentText={config.heroAccentText} />

      <StatsCounter />

      <AnimatedSection>
        <FacilitiesPreview facilities={data.facilities} subtitle={subtitles.facilities} />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <ActivitiesSection activities={data.activities} subtitle={subtitles.activities} />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <LatestNews news={data.news} subtitle={subtitles.latestNews} />
      </AnimatedSection>

      <AnimatedSection delay="delay-200">
        <UpcomingEvents events={data.events} subtitle={subtitles.upcomingEvents} />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <BlogPreview blogs={data.blogs} subtitle={subtitles.blogs} />
      </AnimatedSection>

      <TestimonialsCarousel testimonials={data.testimonials} />
    </>
  );
};
