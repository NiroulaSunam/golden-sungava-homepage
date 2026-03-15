/**
 * Mock: Hero Carousel Slides
 * @endpoint GET /api/hero-slides?lang={en|np}
 * @description Homepage hero carousel slides with images, text, and CTAs
 * @source Based on goldensungavaschool.edu.np homepage carousel on 2026-03-15
 * @status mock
 */

export type HeroSlide = {
  id: number;
  heading: string;
  subheading: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
};

export const mockHeroSlides: Record<string, HeroSlide[]> = {
  en: [
    {
      id: 1,
      heading: 'Explore the Potentiality of Your Child',
      subheading: 'Golden Sungava English Boarding School — Nurturing excellence since establishment in Changunarayan, Bhaktapur',
      imageUrl: '/images/logo.png',
      ctaText: 'Get Admission',
      ctaLink: '/admission',
    },
    {
      id: 2,
      heading: 'Modern Education, Traditional Values',
      subheading: 'Integrating oriental culture and western technology for holistic student development',
      imageUrl: '/images/logo.png',
      ctaText: 'Explore Our School',
      ctaLink: '/about',
    },
    {
      id: 3,
      heading: 'Where Every Child Shines',
      subheading: 'Sports, arts, music, dance, drama, wushu — extracurricular programs that build complete individuals',
      imageUrl: '/images/logo.png',
      ctaText: 'View Activities',
      ctaLink: '/activities',
    },
  ],
  np: [
    {
      id: 1,
      heading: 'तपाईंको बच्चाको सम्भावना खोज्नुहोस्',
      subheading: 'गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुल — चाँगुनारायण, भक्तपुरमा उत्कृष्टताको पोषण',
      imageUrl: '/images/hero/hero-1.jpg',
      ctaText: 'भर्ना लिनुहोस्',
      ctaLink: '/admission',
    },
    {
      id: 2,
      heading: 'आधुनिक शिक्षा, परम्परागत मूल्य',
      subheading: 'समग्र विद्यार्थी विकासका लागि पूर्वीय संस्कृति र पश्चिमी प्रविधिको एकीकरण',
      imageUrl: '/images/logo.png',
      ctaText: 'हाम्रो विद्यालय हेर्नुहोस्',
      ctaLink: '/about',
    },
    {
      id: 3,
      heading: 'जहाँ हरेक बच्चा चम्किन्छ',
      subheading: 'खेलकुद, कला, संगीत, नृत्य, नाटक, वुशु — पूर्ण व्यक्तित्व निर्माण गर्ने पाठ्यक्रम बाहिरका कार्यक्रमहरू',
      imageUrl: '/images/logo.png',
      ctaText: 'क्रियाकलापहरू हेर्नुहोस्',
      ctaLink: '/activities',
    },
  ],
};
