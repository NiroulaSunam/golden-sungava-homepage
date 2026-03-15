import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Get acronym/short name from a full name.
 * e.g., "Golden Sungava English Boarding School" → "GSEBS"
 */
export const getAcronym = (name: string): string =>
  name
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .join('');

/**
 * Get a shortened display name — first two words.
 * e.g., "Golden Sungava English Boarding School" → "Golden Sungava"
 */
export const getShortName = (name: string, wordCount = 2): string =>
  name.split(/\s+/).slice(0, wordCount).join(' ');
