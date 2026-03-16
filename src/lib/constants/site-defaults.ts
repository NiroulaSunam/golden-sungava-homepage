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
  stats: [
    { icon: 'graduation-cap', value: '1000+', label: 'Students Enrolled' },
    { icon: 'users', value: '50+', label: 'Expert Teachers' },
    { icon: 'award', value: '20+', label: 'Years of Excellence' },
    { icon: 'calendar', value: '100+', label: 'Events Per Year' },
  ],
  heroAccentText: 'Golden Sungava',
  sectionSubtitles: {
    facilities: 'World-class infrastructure for holistic development',
    activities: 'Nurturing talent beyond the classroom',
    latestNews: 'Stay informed about school happenings',
    upcomingEvents: 'Mark your calendar for important dates',
    blogs: 'Insights and stories from our school community',
    testimonials: 'What parents and students say about us',
  },
  pageDescriptions: {
    about: 'Nurturing excellence in Changunarayan, Bhaktapur',
    admission: 'Apply for admission at Golden Sungava English Boarding School. Play Group to Grade 10.',
    contact: 'Get in touch with us. We would love to hear from you.',
    paymentInfo: 'We kindly request you to pay the fees either online or by visiting the school.',
    facilities: 'Explore our school facilities — sports, labs, library, transport, and more.',
    activities: 'Extracurricular programs that build complete individuals.',
    gallery: 'Explore moments from school life — events, celebrations, and everyday learning.',
    staff: 'Meet our dedicated team of teachers and staff.',
    calendar: 'Academic calendar and events schedule.',
    downloads: 'Download forms, syllabi, and other documents.',
    notices: 'Official school notices and announcements.',
  },
  footer: {
    ctaHeading: 'Get In Touch',
    ctaDescription: 'Ready to give your child the best education? Visit us or get in touch today.',
    ctaButtonText: 'Contact Us',
    tagline: 'Crafted with care for quality education',
  },
};

export const DEFAULT_LANGUAGE = 'en' as const;
