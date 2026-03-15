'use client';

import { useState, useEffect, useCallback } from 'react';
import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { useLanguage } from '@/frontend/providers/language-provider';
import { cn } from '@/lib/utils';

// --- Sub-component ---

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const TestimonialCard = ({ testimonial, isActive }: TestimonialCardProps) => (
  <div
    className={cn(
      'absolute inset-0 flex items-center justify-center transition-opacity duration-500',
      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none',
    )}
  >
    <div className="max-w-2xl text-center">
      <Quote className="mx-auto mb-4 h-8 w-8 text-primary/40" />
      <blockquote className="font-heading text-lg italic leading-relaxed text-foreground md:text-xl">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="mt-6">
        <p className="font-semibold text-foreground">{testimonial.authorName}</p>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

// --- Main Component ---

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext, isPaused, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section
      className="bg-muted py-16 md:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading title={t('heading.testimonials')} />
        <div className="relative min-h-[250px]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={index === current}
            />
          ))}
        </div>
        {/* Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                i === current ? 'w-6 bg-primary' : 'w-2 bg-foreground/20 hover:bg-foreground/40',
              )}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
