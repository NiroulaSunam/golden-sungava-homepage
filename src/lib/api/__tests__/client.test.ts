import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchApi } from '../client';
import type { HeroSlide, NavItem, SiteConfig } from '@/types/api';

// Mock global fetch — all endpoints are now implemented so fetchApi will try real API
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('fetchApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fall back to mock data when API returns error', async () => {
    mockFetch.mockRejectedValue(new Error('fetch failed'));

    const result = await fetchApi<HeroSlide[]>('hero-slides', { lang: 'en' });

    expect(result.isMock).toBe(false);
    expect(result.error).toBe('fetch failed');
    expect(result.data).toBeNull();
  });

  it('should return API data when fetch succeeds', async () => {
    const apiData = { school_name: 'Test School' };
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(apiData)),
    });

    const result = await fetchApi<SiteConfig>('site-config', { lang: 'en' });

    expect(result.isMock).toBe(false);
    expect(result.error).toBeNull();
    expect(result.data).toEqual(apiData);
  });

  it('should fall back to mock on non-ok response', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500, text: () => Promise.resolve('') });

    const result = await fetchApi<SiteConfig>('site-config');

    expect(result.isMock).toBe(false);
    expect(result.error).toBe('API returned 500');
    expect(result.data).toBeNull();
  });

  it('should append lang query parameter to fetch URL', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('[]'),
    });

    await fetchApi<NavItem[]>('navigation', { lang: 'np' });

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain('lang=np');
  });

  it('should never throw — always return structured response', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const result = await fetchApi<unknown>('site-config');
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('error');
    expect(result).toHaveProperty('isMock');
  });
});
