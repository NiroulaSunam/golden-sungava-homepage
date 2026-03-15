'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

/**
 * Custom hook using the Intersection Observer API.
 * Returns a ref to attach to the element and a boolean for in-view state.
 * Components apply CSS animation classes when the element enters the viewport.
 */
export const useInView = <T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px',
}: UseInViewOptions = {}) => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, rootMargin]);

  return { ref, isInView };
};
