/**
 * Mock: Navigation Menu
 * @endpoint GET /api/navigation?lang={en|np}
 * @description CMS-driven navigation menu structure — grouped into 6 top-level items
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
      label: 'About',
      href: '/about',
      children: [
        { label: 'About Us', href: '/about' },
        { label: "Principal's Message", href: '/principal-message' },
        { label: 'Teacher & Staff', href: '/staff' },
        { label: 'Facilities', href: '/facilities' },
      ],
    },
    {
      label: 'Academics',
      href: '/admission',
      children: [
        { label: 'Admission', href: '/admission' },
        { label: 'Activities', href: '/activities' },
        { label: 'Calendar', href: '/calendar' },
        { label: 'Downloads', href: '/downloads' },
      ],
    },
    {
      label: 'News',
      href: '/news',
      children: [
        { label: 'News', href: '/news' },
        { label: 'Events', href: '/events' },
        { label: 'Notices', href: '/notices' },
        { label: 'Blogs', href: '/blogs' },
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
    { label: 'Contact', href: '/contact',
      children: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'Payment Info', href: '/payment-info' },
      ],
    },
  ],
  np: [
    { label: 'गृहपृष्ठ', href: '/' },
    {
      label: 'परिचय',
      href: '/about',
      children: [
        { label: 'हाम्रो बारेमा', href: '/about' },
        { label: 'प्रधानाध्यापकको सन्देश', href: '/principal-message' },
        { label: 'शिक्षक तथा कर्मचारी', href: '/staff' },
        { label: 'सुविधाहरू', href: '/facilities' },
      ],
    },
    {
      label: 'शैक्षिक',
      href: '/admission',
      children: [
        { label: 'भर्ना', href: '/admission' },
        { label: 'क्रियाकलाप', href: '/activities' },
        { label: 'पात्रो', href: '/calendar' },
        { label: 'डाउनलोड', href: '/downloads' },
      ],
    },
    {
      label: 'समाचार',
      href: '/news',
      children: [
        { label: 'समाचार', href: '/news' },
        { label: 'कार्यक्रम', href: '/events' },
        { label: 'सूचना', href: '/notices' },
        { label: 'ब्लग', href: '/blogs' },
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
      label: 'सम्पर्क',
      href: '/contact',
      children: [
        { label: 'सम्पर्क गर्नुहोस्', href: '/contact' },
        { label: 'भुक्तानी जानकारी', href: '/payment-info' },
      ],
    },
  ],
};
