/**
 * Translation Helper
 * Provides the translation dictionary lookup for the LanguageProvider.
 */

import { en, type TranslationKey } from './translations/en';
import { np } from './translations/np';
import type { LanguageCode } from '@/types/api';

const dictionaries: Record<LanguageCode, Record<string, string>> = { en, np };

/**
 * Get a translated string by key for the given language.
 * Falls back to English if key is missing in the target language.
 */
export const translate = (lang: LanguageCode, key: string): string => {
  const dict = dictionaries[lang] || dictionaries.en;
  return dict[key] ?? dictionaries.en[key] ?? key;
};

export type { TranslationKey };
export { en, np };
