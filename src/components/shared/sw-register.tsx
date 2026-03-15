'use client';

import { useEffect } from 'react';

/**
 * Registers the service worker on mount.
 * Only runs in production and when the browser supports service workers.
 */
export const SwRegister = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.error('SW registration failed:', err);
      });
    }
  }, []);

  return null;
};
