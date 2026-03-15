/**
 * English UI Labels
 * All user-facing text in the application.
 */

export const en = {
  // Navigation
  'nav.home': 'Home',
  'nav.about': 'About Us',
  'nav.principal': "Principal's Message",
  'nav.staff': 'Teacher & Staff',
  'nav.gallery': 'Gallery',
  'nav.photos': 'Photos',
  'nav.videos': 'Videos',
  'nav.news': 'News',
  'nav.events': 'Events',
  'nav.newsEvents': 'News & Events',
  'nav.notices': 'Notices',
  'nav.admission': 'Admission',
  'nav.activities': 'Activities',
  'nav.calendar': 'Calendar',
  'nav.facilities': 'Facilities',
  'nav.blogs': 'Blogs',
  'nav.downloads': 'Downloads',
  'nav.payment': 'Payment Info',
  'nav.contact': 'Contact',

  // Common actions
  'action.viewAll': 'View All',
  'action.readMore': 'Read More',
  'action.getAdmission': 'Get Admission',
  'action.contactUs': 'Contact Us',
  'action.download': 'Download',
  'action.submit': 'Submit',
  'action.close': 'Close',
  'action.previous': 'Previous',
  'action.next': 'Next',
  'action.search': 'Search',
  'action.filter': 'Filter',
  'action.install': 'Install App',

  // Headings
  'heading.facilities': 'Our Facilities',
  'heading.activities': 'Our Activities',
  'heading.latestNews': 'Latest News',
  'heading.upcomingEvents': 'Upcoming Events',
  'heading.blogs': 'From Our Blog',
  'heading.testimonials': 'What People Say',
  'heading.staff': 'Our Team',
  'heading.gallery': 'Photo Gallery',
  'heading.videoGallery': 'Video Gallery',
  'heading.downloads': 'Downloads',
  'heading.paymentInfo': 'Payment Information',
  'heading.contactUs': 'Contact Us',
  'heading.admission': 'Admission',
  'heading.calendar': 'Academic Calendar',
  'heading.about': 'About Us',
  'heading.principalMessage': "Principal's Message",
  'heading.notices': 'Notices',

  // Form labels
  'form.name': 'Full Name',
  'form.email': 'Email Address',
  'form.phone': 'Phone Number',
  'form.subject': 'Subject',
  'form.message': 'Message',
  'form.grade': 'Grade',
  'form.dob': 'Date of Birth',
  'form.address': 'Address',
  'form.parentName': "Parent's Name",
  'form.parentPhone': "Parent's Phone",
  'form.required': 'This field is required',
  'form.invalidEmail': 'Please enter a valid email',
  'form.invalidPhone': 'Please enter a valid phone number',
  'form.submitSuccess': 'Form submitted successfully!',
  'form.submitError': 'Submission failed. Please try again.',

  // Footer
  'footer.quickLinks': 'Quick Links',
  'footer.contactInfo': 'Contact Information',
  'footer.followUs': 'Follow Us',
  'footer.officeHours': 'Office Hours',
  'footer.copyright': 'All rights reserved.',

  // Empty states
  'empty.noNews': 'No news articles available.',
  'empty.noEvents': 'No upcoming events.',
  'empty.noNotices': 'No notices available.',
  'empty.comingSoon': 'Coming soon',

  // Language
  'lang.english': 'English',
  'lang.nepali': 'नेपाली',
  'lang.switchTo': 'Switch to',
  'lang.fallback': 'Content shown in English',

  // Misc
  'misc.loading': 'Loading...',
  'misc.offline': 'You are offline',
  'misc.imageNotAvailable': 'Image not available',
  'misc.department': 'Department',
  'misc.all': 'All',
} as const;

export type TranslationKey = keyof typeof en;
