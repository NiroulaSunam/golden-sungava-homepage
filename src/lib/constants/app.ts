/**
 * Application-wide constants
 * Configuration values used across the codebase
 */

/**
 * Pagination defaults
 */
export const PAGINATION_CONFIG = {
  /** Default page size */
  DEFAULT_PAGE_SIZE: 10,
  /** Maximum allowed page size */
  MAX_PAGE_SIZE: 100,
  /** Available page size options */
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100] as const,
} as const;

/**
 * Currency configuration
 */
export const CURRENCY_CONFIG = {
  /** Default currency code */
  CODE: 'NPR',
  /** Currency symbol */
  SYMBOL: 'Rs.',
  /** Locale for number formatting */
  LOCALE: 'en-IN',
  /** Decimal places for currency display */
  DECIMAL_PLACES: 2,
} as const;

/**
 * Layout configuration
 * Dimensions for layout components
 */
export const LAYOUT_CONFIG = {
  /** Sidebar drawer width in pixels */
  DRAWER_WIDTH: 260,
  /** Maximum content width for centered layout */
  CONTENT_MAX_WIDTH: 1200,
  /** Mobile bottom navigation bar height in pixels */
  MOBILE_NAV_HEIGHT: 64,
  /** FAB offset from bottom to clear mobile nav */
  MOBILE_FAB_BOTTOM: 80,
} as const;
