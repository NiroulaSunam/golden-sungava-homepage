/**
 * Mock: News Articles
 * @endpoint GET /api/news?lang={en|np}
 * @description News articles with thumbnails, dates, and excerpts
 * @source Scraped from goldensungavaschool.edu.np/news.php on 2026-03-15
 * @status mock
 */

export type NewsArticle = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  content: string | null;
};

export const mockNews: Record<string, NewsArticle[]> = {
  en: [
    { id: 1, title: 'Invitation ! Invitation !! Invitation !!!', date: '2026-01-22', excerpt: 'Saraswati Puja and spring festival with ceremonial program for younger learners', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2026-01-22/bgXv9ukTNBj92nq5-1769074393.jpg', category: 'Events', content: null },
    { id: 2, title: 'Pay fee from Online Platform (Khalti App)', date: '2025-04-04', excerpt: 'We kindly request you to pay the fees either online or by visiting the school', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-04-04/KsAw4vtJNP5IEDIa-1743754377.png', category: 'Payment', content: null },
    { id: 3, title: 'Pay fee from Online Platform', date: '2025-04-04', excerpt: 'Fee payment request through online channels or direct school visit', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-04-04/6LU1XKnpb1Kpxk6f-1743754053.jpg', category: 'Payment', content: null },
    { id: 4, title: 'Final Term Exam Result & New Session 2082', date: '2025-04-03', excerpt: 'Annual examination results and new academic session announcement', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2024-04-15/RljMrSLn0R7STBAr-1713169748.jpg', category: 'Academic', content: null },
    { id: 5, title: 'About Holiday & Weekly Health Camp', date: '2025-02-27', excerpt: 'Information regarding scheduled holiday and health camp services at the institution', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-02-27/rXTbdQRp7oDcRd4Q-1740667147.jpg', category: 'Administrative', content: null },
    { id: 6, title: 'Picnic Notice to Grade 10', date: '2025-02-25', excerpt: 'Educational activity announcement for Grade 10 students involving school-organized excursion', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-02-25/K32rz2OfqDLRIvDC-1740478425.png', category: 'Events', content: null },
    { id: 7, title: 'Invitation ! Invitation !! Invitation !!!', date: '2025-02-02', excerpt: 'Saraswati Puja and spring festival celebration with alphabet initiation ceremony for young students', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-02-02/x9y0alOEuKucAb4T-1738496993.jpg', category: 'Events', content: null },
    { id: 8, title: "A Teacher's Reflection on Golden Sungava: Nurturing Excellence", date: '2024-10-27', excerpt: 'As a teacher at Golden Sungava English Boarding School, I am grateful to be part of a community', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2024-10-27/EovtjKl6I8iaHbsy-1730024506.jpg', category: 'Staff Perspective', content: null },
    { id: 9, title: 'First Terminal Examination 2081 Result', date: '2024-07-26', excerpt: 'Academic examination results announcement with scheduled publication details', imageUrl: 'https://veda-app.s3.ap-south-1.amazonaws.com/assets/2/goldenlogo.svg', category: 'Academic', content: null },
    { id: 10, title: 'Admission Open ! Admission Open !! Admission Open !!!', date: '2024-04-21', excerpt: 'ADMISSION OPEN for PG to IX VISIT US to GRAB the OFFER! HURRY UP', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2024-04-21/3hupRMBHdFHnnKYo-1713687360.jpg', category: 'Admissions', content: null },
  ],
  np: [
    { id: 1, title: 'निमन्त्रणा ! निमन्त्रणा !! निमन्त्रणा !!!', date: '2026-01-22', excerpt: 'सरस्वती पूजा र वसन्त उत्सव सँगै साना विद्यार्थीहरूका लागि विद्यारम्भ कार्यक्रम', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2026-01-22/bgXv9ukTNBj92nq5-1769074393.jpg', category: 'कार्यक्रम', content: null },
    { id: 2, title: 'अनलाइन प्लेटफर्मबाट शुल्क भुक्तानी (खल्ती एप)', date: '2025-04-04', excerpt: 'कृपया शुल्क अनलाइन वा विद्यालयमा आएर भुक्तानी गर्नुहोला', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-04-04/KsAw4vtJNP5IEDIa-1743754377.png', category: 'भुक्तानी', content: null },
    { id: 3, title: 'अनलाइन प्लेटफर्मबाट शुल्क भुक्तानी', date: '2025-04-04', excerpt: 'अनलाइन माध्यम वा सिधै विद्यालय भ्रमण गरेर शुल्क भुक्तानी अनुरोध', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-04-04/6LU1XKnpb1Kpxk6f-1743754053.jpg', category: 'भुक्तानी', content: null },
    { id: 4, title: 'वार्षिक परीक्षा नतिजा र नयाँ सत्र २०८२', date: '2025-04-03', excerpt: 'वार्षिक परीक्षा नतिजा र नयाँ शैक्षिक सत्रको घोषणा', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2024-04-15/RljMrSLn0R7STBAr-1713169748.jpg', category: 'शैक्षिक', content: null },
    { id: 5, title: 'बिदा र साप्ताहिक स्वास्थ्य शिविर सम्बन्धमा', date: '2025-02-27', excerpt: 'तोकिएको बिदा र संस्थामा स्वास्थ्य शिविर सेवा सम्बन्धी जानकारी', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-02-27/rXTbdQRp7oDcRd4Q-1740667147.jpg', category: 'प्रशासनिक', content: null },
    { id: 6, title: 'कक्षा १० लाई पिकनिक सूचना', date: '2025-02-25', excerpt: 'कक्षा १० का विद्यार्थीहरूका लागि विद्यालय आयोजित शैक्षिक भ्रमण', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-02-25/K32rz2OfqDLRIvDC-1740478425.png', category: 'कार्यक्रम', content: null },
    { id: 7, title: 'निमन्त्रणा ! निमन्त्रणा !! निमन्त्रणा !!!', date: '2025-02-02', excerpt: 'सरस्वती पूजा र वसन्त उत्सव — साना विद्यार्थीहरूका लागि विद्यारम्भ समारोह', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-02-02/x9y0alOEuKucAb4T-1738496993.jpg', category: 'कार्यक्रम', content: null },
    { id: 8, title: 'गोल्डेन सुनगाभामा एक शिक्षकको अनुभव: उत्कृष्टताको पोषण', date: '2024-10-27', excerpt: 'गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुलमा शिक्षकको रूपमा, म एउटा समुदायको हिस्सा हुन पाउँदा कृतज्ञ छु', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2024-10-27/EovtjKl6I8iaHbsy-1730024506.jpg', category: 'कर्मचारी दृष्टिकोण', content: null },
    { id: 9, title: 'प्रथम त्रैमासिक परीक्षा २०८१ नतिजा', date: '2024-07-26', excerpt: 'शैक्षिक परीक्षा नतिजा प्रकाशन तालिका सहित घोषणा', imageUrl: 'https://veda-app.s3.ap-south-1.amazonaws.com/assets/2/goldenlogo.svg', category: 'शैक्षिक', content: null },
    { id: 10, title: 'भर्ना खुला ! भर्ना खुला !! भर्ना खुला !!!', date: '2024-04-21', excerpt: 'PG देखि IX सम्म भर्ना खुला — हामीलाई भेट्न आउनुहोस्!', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/news/2024-04-21/3hupRMBHdFHnnKYo-1713687360.jpg', category: 'भर्ना', content: null },
  ],
};
