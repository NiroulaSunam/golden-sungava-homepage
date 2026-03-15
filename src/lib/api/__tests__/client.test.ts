import { describe, it, expect } from 'vitest';
import { fetchApi } from '../client';
import type { HeroSlide, NavItem, SiteConfig } from '@/types/api';

describe('fetchApi', () => {
  it('should return mock data for unimplemented endpoint', async () => {
    const result = await fetchApi<HeroSlide[]>('hero-slides', { lang: 'en' });

    expect(result.isMock).toBe(true);
    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0].heading).toBeDefined();
  });

  it('should return English data by default when no lang specified', async () => {
    const result = await fetchApi<SiteConfig>('site-config');

    expect(result.isMock).toBe(true);
    expect(result.data.schoolName).toBe('Golden Sungava English Boarding School');
  });

  it('should return Nepali data when lang is np', async () => {
    const result = await fetchApi<SiteConfig>('site-config', { lang: 'np' });

    expect(result.isMock).toBe(true);
    expect(result.data.schoolName).toContain('गोल्डेन');
  });

  it('should fall back to English when requested language is unavailable', async () => {
    const result = await fetchApi<NavItem[]>('navigation', { lang: 'fr' });

    expect(result.isMock).toBe(true);
    expect(result.data).toBeDefined();
    // Falls back to English since 'fr' does not exist
    expect(result.data[0].label).toBe('Home');
  });

  it('should never throw — always return structured response', async () => {
    // Even invalid endpoints shouldn't throw (though TypeScript prevents this at compile time)
    const result = await fetchApi<unknown>('site-config');
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('error');
    expect(result).toHaveProperty('isMock');
  });
});
