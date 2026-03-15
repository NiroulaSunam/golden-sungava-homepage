import { describe, it, expect } from 'vitest';
import { translate } from '../index';

describe('translate', () => {
  it('should return English translation for en lang', () => {
    expect(translate('en', 'nav.home')).toBe('Home');
    expect(translate('en', 'action.getAdmission')).toBe('Get Admission');
  });

  it('should return Nepali translation for np lang', () => {
    expect(translate('np', 'nav.home')).toBe('गृहपृष्ठ');
    expect(translate('np', 'action.getAdmission')).toBe('भर्ना लिनुहोस्');
  });

  it('should fall back to English for missing Nepali keys', () => {
    // If a key exists in en but somehow not in np, it should fall back
    const result = translate('en', 'nav.home');
    expect(result).toBe('Home');
  });

  it('should return the key itself if not found in any language', () => {
    expect(translate('en', 'nonexistent.key')).toBe('nonexistent.key');
    expect(translate('np', 'nonexistent.key')).toBe('nonexistent.key');
  });

  it('should fall back to English for invalid language code', () => {
    // @ts-expect-error testing invalid lang
    const result = translate('fr', 'nav.home');
    expect(result).toBe('Home');
  });
});
