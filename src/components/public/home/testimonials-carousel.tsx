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
      'absolute inset-0 flex items-center justify-center transition-all duration-700',
      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
    )}
  >
    <div className="mx-auto max-w-3xl px-4 text-center">
      <blockquote className="font-heading text-xl italic leading-relaxed text-white/90 md:text-2xl lg:text-3xl">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="mt-8 flex flex-col items-center gap-1">
        <div className="h-[2px] w-8 rounded-full bg-primary-light" />
        <p className="mt-3 text-base font-bold text-white">{testimonial.authorName}</p>
        <p className="text-sm text-white/50">{testimonial.role}</p>
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
      className="relative overflow-hidden py-16 md:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gold-gradient" />
      <div className="absolute inset-0 texture-overlay opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* Quote icon */}
        <div className="mb-6 flex justify-center">
          <Quote className="h-10 w-10 text-primary-light/30" />
        </div>

        <div className="relative min-h-[260px] md:min-h-[300px]">
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
                'rounded-full transition-all duration-300',
                i === current ? 'h-2.5 w-8 bg-primary-light' : 'h-2.5 w-2.5 bg-white/20 hover:bg-white/40',
              )}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
