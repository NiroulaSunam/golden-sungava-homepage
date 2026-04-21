import type { LanguageCode } from '@/types/api';

export const resolveLocalizedSiteText = (
  value: string | null | undefined,
  englishDefault: string,
  translatedDefault: string,
  lang: LanguageCode,
) => {
  const trimmedValue = typeof value === 'string' ? value.trim() : '';

  if (lang === 'np' && (!trimmedValue || trimmedValue === englishDefault)) {
    return translatedDefault;
  }

  return trimmedValue || englishDefault;
};
