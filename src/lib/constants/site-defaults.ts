/**
 * Hardcoded fallback site configuration.
 * Used when the CMS API is unavailable and no cached data exists.
 * Values match the English mock site-config.
 */

import type { SiteConfig } from '@/types/api';

export const SITE_DEFAULTS: SiteConfig = {
  schoolName: 'Golden Sungava English Boarding School',
  tagline: 'Explore potentiality of the students',
  logoUrl: '/images/logo.png',
  establishedYear: null,
  address: 'Changunarayan-2 (Duwakot), Bhaktapur, Nepal',
  phones: ['01-6614896', '01-6615702', '9851160980', '9841472550'],
  emails: ['sungava2053@gmail.com', 'pmina9561@gmail.com'],
  officeHours: '10:00 AM - 3:30 PM (weekdays)',
  socialLinks: {
    facebook: 'https://www.facebook.com/goldensungavaschool',
    whatsapp: '9851160980',
    messenger: 'https://m.me/goldensungavaschool',
  },
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.123!2d85.123!3d27.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sChangunarayan-2%2C+Duwakot%2C+Bhaktapur!5e0!3m2!1sen!2snp',
  theme: {
    primaryColor: '#B8860B',
    primaryLight: '#D4A017',
    primaryDark: '#8B6508',
    backgroundColor: '#FFFFFF',
    foregroundColor: '#1A1A1A',
    mutedColor: '#F5F3EF',
    mutedForeground: '#6B6B6B',
    accentColor: '#1A1A1A',
    accentForeground: '#F5F3EF',
  },
  seo: {
    defaultTitle: 'Golden Sungava English Boarding School | Bhaktapur, Nepal',
    defaultDescription:
      'Premium English-medium boarding school in Changunarayan-2, Duwakot, Bhaktapur. Serving students from Play Group to Grade 10 with modern facilities, sports, science lab, computer lab, and holistic education.',
    ogImage: '/images/logo.png',
    keywords: [
      'Golden Sungava School',
      'English boarding school Bhaktapur',
      'school in Duwakot',
      'Changunarayan school',
      'best school in Bhaktapur',
      'boarding school Nepal',
    ],
  },
  currency: 'NPR',
  languages: ['en', 'np'],
  defaultLanguage: 'en',
};

export const DEFAULT_LANGUAGE = 'en' as const;
