import { useEffect } from 'react';

/**
 * Locks body scroll while the hook is mounted (or while `active` is true).
 * Restores the original overflow value on unmount.
 */
export const useScrollLock = (active = true) => {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
};
