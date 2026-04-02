/**
 * Unit tests for language parsing utility.
 */

import { describe, it, expect } from 'vitest';
import { createMockRequest } from '@/test-utils/mock-request';
import { parseLang } from '../lang';

describe('parseLang', () => {
  it('should return "en" when no lang param is provided', () => {
    const req = createMockRequest('/api/test');
    expect(parseLang(req)).toBe('en');
  });

  it('should return "en" for ?lang=en', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { lang: 'en' },
    });
    expect(parseLang(req)).toBe('en');
  });

  it('should return "np" for ?lang=np', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { lang: 'np' },
    });
    expect(parseLang(req)).toBe('np');
  });

  it('should return "en" for invalid lang value', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { lang: 'fr' },
    });
    expect(parseLang(req)).toBe('en');
  });

  it('should return "en" for empty lang param', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { lang: '' },
    });
    expect(parseLang(req)).toBe('en');
  });
});
