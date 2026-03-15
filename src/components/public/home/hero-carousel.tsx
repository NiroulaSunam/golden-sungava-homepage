'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide } from '@/types/api';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { cn } from '@/lib/utils';

// --- Sub-components ---

interface HeroSlideProps {
  slide: HeroSlide;
  isActive: boolean;
  isPriority: boolean;
}

const HeroSlideItem = ({ slide, isActive, isPriority }: HeroSlideProps) => (
  <div
    className={cn(
      'absolute inset-0 transition-opacity duration-700',
      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none',
    )}
  >
    <ImageWithFallback
      src={slide.imageUrl}
      alt={slide.heading}
      fill
      className="object-cover"
      sizes="100vw"
      priority={isPriority}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
    <div className="absolute inset-0 flex items-end pb-16 md:items-center md:pb-0">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <h1 className="max-w-2xl font-heading text-3xl font-bold text-white md:text-5xl lg:text-6xl">
          {slide.heading}
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/90 md:text-lg">
          {slide.subheading}
        </p>
        <Link
          href={slide.ctaLink}
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark md:px-8 md:py-3.5 md:text-base"
        >
          {slide.ctaText}
        </Link>
      </div>
    </div>
  </div>
);

interface HeroIndicatorsProps {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}

const HeroIndicators = ({ count, active, onSelect }: HeroIndicatorsProps) => (
  <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onSelect(i)}
        className={cn(
          'h-2.5 rounded-full transition-all',
          i === active ? 'w-8 bg-primary' : 'w-2.5 bg-white/60 hover:bg-white/80',
        )}
        aria-label={`Go to slide ${i + 1}`}
      />
    ))}
  </div>
);

interface HeroControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

const HeroControls = ({ onPrev, onNext }: HeroControlsProps) => (
  <>
    <button
      type="button"
      onClick={onPrev}
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50 md:p-3"
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
    </button>
    <button
      type="button"
      onClick={onNext}
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50 md:p-3"
      aria-label="Next slide"
    >
      <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
    </button>
  </>
);

// --- Main Component ---

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, isPaused, slides.length]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
  };

  if (slides.length === 0) return null;

  return (
    <section
      className="relative h-[60vh] min-h-[400px] w-full overflow-hidden md:h-[75vh]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <HeroSlideItem
          key={slide.id}
          slide={slide}
          isActive={index === current}
          isPriority={index === 0}
        />
      ))}
      {slides.length > 1 && (
        <>
          <HeroControls onPrev={goPrev} onNext={goNext} />
          <HeroIndicators count={slides.length} active={current} onSelect={goTo} />
        </>
      )}
    </section>
  );
};
