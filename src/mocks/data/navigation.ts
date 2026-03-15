/**
 * Mock: Navigation Menu
 * @endpoint GET /api/navigation?lang={en|np}
 * @description CMS-driven navigation menu structure
 * @source Based on goldensungavaschool.edu.np navigation on 2026-03-15
 * @status mock
 */

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mockNavigation: Record<string, NavItem[]> = {
  en: [
    { label: 'Home', href: '/' },
    {
      label: 'About Us',
      href: '/about',
      children: [
        { label: 'About Us', href: '/about' },
        { label: "Principal's Message", href: '/principal-message' },
        { label: 'Teacher & Staff', href: '/staff' },
      ],
    },
    {
      label: 'Gallery',
      href: '/gallery',
      children: [
        { label: 'Photos', href: '/gallery/photos' },
        { label: 'Videos', href: '/gallery/videos' },
      ],
    },
    {
      label: 'News & Events',
      href: '/news',
      children: [
        { label: 'News', href: '/news' },
        { label: 'Events', href: '/events' },
      ],
    },
    { label: 'Notices', href: '/notices' },
    { label: 'Admission', href: '/admission' },
    { label: 'Activities', href: '/activities' },
    { label: 'Calendar', href: '/calendar' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Downloads', href: '/downloads' },
    { label: 'Payment Info', href: '/payment-info' },
    { label: 'Contact', href: '/contact' },
  ],
  np: [
    { label: 'गृहपृष्ठ', href: '/' },
    {
      label: 'हाम्रो बारेमा',
      href: '/about',
      children: [
        { label: 'हाम्रो बारेमा', href: '/about' },
        { label: 'प्रधानाध्यापकको सन्देश', href: '/principal-message' },
        { label: 'शिक्षक तथा कर्मचारी', href: '/staff' },
      ],
    },
    {
      label: 'ग्यालरी',
      href: '/gallery',
      children: [
        { label: 'फोटोहरू', href: '/gallery/photos' },
        { label: 'भिडियोहरू', href: '/gallery/videos' },
      ],
    },
    {
      label: 'समाचार र कार्यक्रम',
      href: '/news',
      children: [
        { label: 'समाचार', href: '/news' },
        { label: 'कार्यक्रम', href: '/events' },
      ],
    },
    { label: 'सूचना', href: '/notices' },
    { label: 'भर्ना', href: '/admission' },
    { label: 'क्रियाकलाप', href: '/activities' },
    { label: 'पात्रो', href: '/calendar' },
    { label: 'सुविधाहरू', href: '/facilities' },
    { label: 'ब्लग', href: '/blogs' },
    { label: 'डाउनलोड', href: '/downloads' },
    { label: 'भुक्तानी जानकारी', href: '/payment-info' },
    { label: 'सम्पर्क', href: '/contact' },
  ],
};
