/**
 * Mock: Site Configuration
 * @endpoint GET /api/site-config?lang={en|np}
 * @description Global site settings — school identity, branding, contact, social links
 * @source Scraped from goldensungavaschool.edu.np on 2026-03-15
 * @status mock
 */

import type { SiteConfig } from '@/types/api';

const shared = {
  logoUrl: '/images/logo.png',
  establishedYear: null,
  phones: ['01-6614896', '01-6615702', '9851160980', '9841472550'],
  emails: ['sungava2053@gmail.com', 'pmina9561@gmail.com'],
  socialLinks: {
    facebook: 'https://www.facebook.com/goldensungavaschool',
    whatsapp: '9851160980',
    messenger: 'https://m.me/goldensungavaschool',
  },
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8!2d85.4133!3d27.6859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a1f0a0a0a01%3A0x1a2b3c4d5e6f7890!2sGolden+Sungava+English+Boarding+School!5e0!3m2!1sen!2snp',
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
  currency: 'NPR',
  languages: ['en', 'np'],
  defaultLanguage: 'en',
};

export const mockSiteConfig: Record<string, SiteConfig> = {
  en: {
    ...shared,
    schoolName: 'Golden Sungava English Boarding School',
    tagline: 'Explore potentiality of the students',
    address: 'Changunarayan-2 (Duwakot), Bhaktapur, Nepal',
    officeHours: '10:00 AM - 3:30 PM (weekdays)',
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
  },
  np: {
    ...shared,
    schoolName: 'गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुल',
    tagline: 'विद्यार्थीहरूको सम्भावनाको खोजी',
    address: 'चाँगुनारायण-२ (दुवाकोट), भक्तपुर, नेपाल',
    officeHours: 'बिहान १०:०० - दिउँसो ३:३० (कार्य दिन)',
    seo: {
      defaultTitle: 'गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुल | भक्तपुर, नेपाल',
      defaultDescription:
        'चाँगुनारायण-२, दुवाकोट, भक्तपुरमा अवस्थित प्रिमियम अंग्रेजी माध्यमको बोर्डिङ विद्यालय। प्ले ग्रुपदेखि कक्षा १० सम्म आधुनिक सुविधा, खेलकुद, विज्ञान प्रयोगशाला, कम्प्युटर ल्याब, र समग्र शिक्षा।',
      ogImage: '/images/logo.png',
      keywords: [
        'गोल्डेन सुनगाभा स्कुल',
        'अंग्रेजी बोर्डिङ विद्यालय भक्तपुर',
        'दुवाकोट विद्यालय',
        'चाँगुनारायण विद्यालय',
        'भक्तपुरको उत्कृष्ट विद्यालय',
        'बोर्डिङ स्कुल नेपाल',
      ],
    },
    stats: [
      { icon: 'graduation-cap', value: '१०००+', label: 'भर्ना भएका विद्यार्थीहरू' },
      { icon: 'users', value: '५०+', label: 'अनुभवी शिक्षकहरू' },
      { icon: 'award', value: '२०+', label: 'उत्कृष्टताको वर्षहरू' },
      { icon: 'calendar', value: '१००+', label: 'वार्षिक कार्यक्रमहरू' },
    ],
    heroAccentText: 'गोल्डेन सुनगाभा',
    sectionSubtitles: {
      facilities: 'समग्र विकासका लागि विश्वस्तरीय पूर्वाधार',
      activities: 'कक्षाकोठा बाहिरको प्रतिभा विकास',
      latestNews: 'विद्यालयका गतिविधिहरूबारे जानकारी',
      upcomingEvents: 'महत्त्वपूर्ण मितिहरू क्यालेन्डरमा चिन्ह लगाउनुहोस्',
      blogs: 'हाम्रो विद्यालय समुदायका कथा र अन्तर्दृष्टि',
      testimonials: 'अभिभावक र विद्यार्थीहरूको भनाइ',
    },
    pageDescriptions: {
      about: 'चाँगुनारायण, भक्तपुरमा उत्कृष्टता पोषण गर्दै',
      admission: 'गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुलमा भर्नाको लागि आवेदन दिनुहोस्। प्ले ग्रुपदेखि कक्षा १० सम्म।',
      contact: 'हामीसँग सम्पर्क गर्नुहोस्। तपाईंबाट सुन्न पाउँदा खुशी लाग्छ।',
      paymentInfo: 'कृपया शुल्क अनलाइन वा विद्यालय आएर तिर्नुहोस्।',
      facilities: 'हाम्रो विद्यालयका सुविधाहरू — खेलकुद, प्रयोगशाला, पुस्तकालय, यातायात, र अरू।',
      activities: 'पूर्ण व्यक्तित्व निर्माण गर्ने पाठ्येतर कार्यक्रमहरू।',
      gallery: 'विद्यालय जीवनका क्षणहरू — कार्यक्रम, उत्सव, र दैनिक सिकाइ।',
      staff: 'हाम्रो समर्पित शिक्षक र कर्मचारी टोलीलाई भेट्नुहोस्।',
      calendar: 'शैक्षिक पात्रो र कार्यक्रम तालिका।',
      downloads: 'फारमहरू, पाठ्यक्रम, र अन्य कागजातहरू डाउनलोड गर्नुहोस्।',
      notices: 'विद्यालयका आधिकारिक सूचना र घोषणाहरू।',
    },
    footer: {
      ctaHeading: 'सम्पर्कमा रहनुहोस्',
      ctaDescription: 'तपाईंको बच्चालाई उत्कृष्ट शिक्षा दिन चाहनुहुन्छ? आज नै हामीलाई भेट्नुहोस् वा सम्पर्क गर्नुहोस्।',
      ctaButtonText: 'सम्पर्क गर्नुहोस्',
      tagline: 'गुणस्तरीय शिक्षाको लागि मायाले बनाइएको',
    },
  },
};
