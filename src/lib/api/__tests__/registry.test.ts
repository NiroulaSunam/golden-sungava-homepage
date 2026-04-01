import { describe, it, expect } from 'vitest';
import { apiRegistry, isImplemented, getApiUrl } from '../registry';

describe('apiRegistry', () => {
  it('should have all 16 endpoints registered', () => {
    expect(Object.keys(apiRegistry).length).toBe(16);
  });

  it('should have all 16 endpoints implemented', () => {
    Object.values(apiRegistry).forEach((config) => {
      expect(config.implemented).toBe(true);
    });
  });

  it('should return correct implementation status', () => {
    expect(isImplemented('site-config')).toBe(true);
    expect(isImplemented('hero-slides')).toBe(true);
    expect(isImplemented('faqs')).toBe(true);
  });

  it('should return correct API URLs', () => {
    expect(getApiUrl('site-config')).toBe('/api/site-config');
    expect(getApiUrl('news')).toBe('/api/news');
    expect(getApiUrl('gallery-events')).toBe('/api/gallery/events');
    expect(getApiUrl('faqs')).toBe('/api/faqs');
  });

  it('should have description for every endpoint', () => {
    Object.values(apiRegistry).forEach((config) => {
      expect(config.description).toBeTruthy();
      expect(config.description.length).toBeGreaterThan(5);
    });
  });
});
