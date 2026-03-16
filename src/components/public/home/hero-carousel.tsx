'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide } from '@/types/api';
import { cn } from '@/lib/utils';

// --- Sub-components ---

interface HeroSlideProps {
  slide: HeroSlide;
  isActive: boolean;
  accentText: string;
}

const HeroSlideItem = ({ slide, isActive, accentText }: HeroSlideProps) => (
  <div
    className={cn(
      'absolute inset-0 transition-opacity duration-1000',
      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none',
    )}
  >
    {/* Gradient background */}
    <div className="absolute inset-0 bg-gold-gradient" />
    {/* Texture overlay */}
    <div className="absolute inset-0 texture-overlay" />
    {/* Vignette overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
    {/* Side gradient for depth */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

    {/* Content */}
    <div className="absolute inset-0 z-10 flex items-center">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-20">
        <div className="max-w-2xl">
          {/* Decorative accent */}
          <div className="hero-stagger-1 mb-6 flex items-center gap-3 opacity-0">
            <div className="h-px w-8 bg-primary-light" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
              {accentText}
            </span>
          </div>

          <h1 className="hero-stagger-2 font-heading text-4xl font-bold leading-[1.1] text-white opacity-0 md:text-5xl lg:text-6xl xl:text-7xl">
            {slide.heading}
          </h1>

          <p className="hero-stagger-3 mt-5 max-w-lg text-base leading-relaxed text-white/80 opacity-0 md:text-lg">
            {slide.subheading}
          </p>

          {/* CTA area */}
          <div className="hero-stagger-3 mt-8 flex flex-wrap items-center gap-4 opacity-0">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 md:px-8 md:py-4 md:text-base"
            >
              {slide.ctaText}
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/10 md:px-7 md:py-4 md:text-base"
            >
              Learn More
            </Link>
          </div>
        </div>
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
  <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-10">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onSelect(i)}
        className={cn(
          'rounded-full transition-all duration-300',
          i === active
            ? 'h-2.5 w-10 bg-primary'
            : 'h-2.5 w-2.5 bg-white/40 hover:bg-white/70',
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
      className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/20 p-4 text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-black/40 lg:flex"
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
    <button
      type="button"
      onClick={onNext}
      className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/20 p-4 text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-black/40 lg:flex"
      aria-label="Next slide"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  </>
);

// --- Main Component ---

interface HeroCarouselProps {
  slides: HeroSlide[];
  accentText?: string;
}

export const HeroCarousel = ({ slides, accentText = 'Golden Sungava' }: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(goNext, 6000);
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
      className="relative h-[60vh] min-h-[480px] w-full overflow-hidden md:h-[80vh] md:min-h-[600px]"
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
          accentText={accentText}
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
