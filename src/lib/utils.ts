import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const GOOGLE_DRIVE_FILE_PATTERNS = [
  /\/file\/d\/([^/]+)/,
  /[?&]id=([^&]+)/,
];

/**
 * Get acronym/short name from a full name.
 * e.g., "Golden Sungava English Boarding School" → "GSEBS"
 */
export const getAcronym = (name?: string): string => {
  if (!name) return '';
  return name
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .join('');
};

/**
 * Get a shortened display name — first two words.
 * e.g., "Golden Sungava English Boarding School" → "Golden Sungava"
 */
export const getShortName = (name?: string, wordCount = 2): string => {
  if (!name) return '';
  return name.split(/\s+/).slice(0, wordCount).join(' ');
};

export const extractGoogleDriveFileId = (url: string): string | null => {
  for (const pattern of GOOGLE_DRIVE_FILE_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
};

export const normalizeImageUrl = (url?: string | null): string => {
  if (!url) return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:') || trimmed.startsWith('/')) {
    return trimmed;
  }

  if (trimmed.includes('drive.google.com')) {
    const fileId = extractGoogleDriveFileId(trimmed);
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }

  return trimmed;
};

export const isRemoteImageUrl = (url?: string | null): boolean => {
  if (!url) return false;

  const normalized = normalizeImageUrl(url);
  return normalized.startsWith('http://') || normalized.startsWith('https://');
};
