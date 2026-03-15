/**
 * Mock: Site Configuration
 * @endpoint GET /api/site-config?lang={en|np}
 * @description Global site settings — school identity, branding, contact, social links
 * @source Scraped from goldensungavaschool.edu.np on 2026-03-15
 * @status mock
 */

type SiteConfig = {
  schoolName: string;
  tagline: string;
  logoUrl: string;
  establishedYear: number | null;
  address: string;
  phones: string[];
  emails: string[];
  officeHours: string;
  socialLinks: {
    facebook: string;
    whatsapp: string;
    messenger: string;
  };
  googleMapsEmbed: string;
  theme: {
    primaryColor: string;
    primaryLight: string;
    primaryDark: string;
    backgroundColor: string;
    foregroundColor: string;
    mutedColor: string;
    mutedForeground: string;
    accentColor: string;
    accentForeground: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
    keywords: string[];
  };
  currency: string;
  languages: string[];
  defaultLanguage: string;
};

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
  },
};
