import type { SiteConfig } from '@/types/api';

export const DEFAULT_ADMISSION_PATH = '/admission';

export const getAdmissionMode = (config?: Partial<SiteConfig> | null): 'internal' | 'external' =>
  config?.admissionMode === 'external' ? 'external' : 'internal';

export const getAdmissionExternalUrl = (config?: Partial<SiteConfig> | null): string => {
  const value = config?.admissionExternalUrl?.trim();
  return value || '';
};

export const getAdmissionHref = (config?: Partial<SiteConfig> | null): string =>
  getAdmissionMode(config) === 'external' && getAdmissionExternalUrl(config)
    ? getAdmissionExternalUrl(config)
    : DEFAULT_ADMISSION_PATH;

export const shouldRedirectAdmissionExternally = (config?: Partial<SiteConfig> | null): boolean =>
  getAdmissionMode(config) === 'external' && Boolean(getAdmissionExternalUrl(config));
