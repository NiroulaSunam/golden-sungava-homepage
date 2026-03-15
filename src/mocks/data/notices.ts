/**
 * Mock: Notices
 * @endpoint GET /api/notices?lang={en|np}
 * @description Official school notices and announcements
 * @source Scraped from goldensungavaschool.edu.np/notices.php on 2026-03-15
 * @status mock
 */

export type Notice = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  pdfUrl: string | null;
};

export const mockNotices: Record<string, Notice[]> = {
  en: [
    { id: 1, title: 'School Holiday for Elections & Women\'s Day', date: '2026-03-03', excerpt: 'School closure announced for Representative Assembly elections and Women\'s Day', pdfUrl: null },
    { id: 2, title: 'ECA & CCA Classes Suspended', date: '2026-02-25', excerpt: 'Classes suspended due to 3-story building construction within campus', pdfUrl: null },
    { id: 3, title: 'Grand Finale Invitation — Parents\' Talent Hunt', date: '2026-02-17', excerpt: 'Grand Finale of Parents\' Talent Hunt, Dancing Star, and Singing Idol competitions', pdfUrl: null },
    { id: 4, title: 'Golden Sungava Dancing Star Update', date: '2026-02-16', excerpt: 'Top-4 contestants\' videos posted on Facebook; social media voting instructions', pdfUrl: null },
    { id: 5, title: 'School Schedule Change', date: '2026-02-13', excerpt: 'School schedule changed: assembly at 9:30 AM, dismissal at 3:45 PM', pdfUrl: null },
    { id: 6, title: 'Parents\' Talent Hunt Registration', date: '2026-02-12', excerpt: 'Parent talent competition registration form and detailed rules', pdfUrl: null },
    { id: 7, title: 'Dancing Star Semifinal Round', date: '2026-02-09', excerpt: 'Semifinal videos uploaded; voting deadline Magh 29, 8:00 AM', pdfUrl: null },
    { id: 8, title: 'Parents Talent & Dance Audition', date: '2026-02-02', excerpt: 'Audition dates: Magh 22-23; Grand Finale February 6', pdfUrl: null },
    { id: 9, title: 'Second Trimester Exam Results', date: '2026-01-23', excerpt: 'Results released Magh 10; payment deadline required', pdfUrl: null },
    { id: 10, title: 'Saraswati Puja Invitation', date: '2026-01-22', excerpt: 'Saraswati Puja and enrollment ceremony; free admission for Nursery-9', pdfUrl: null },
  ],
  np: [
    { id: 1, title: 'निर्वाचन र महिला दिवसको लागि विद्यालय बिदा', date: '2026-03-03', excerpt: 'प्रतिनिधि सभा निर्वाचन र महिला दिवसको लागि विद्यालय बन्द', pdfUrl: null },
    { id: 2, title: 'ECA र CCA कक्षा स्थगित', date: '2026-02-25', excerpt: 'क्याम्पसभित्र ३ तल्ले भवन निर्माणको कारण कक्षाहरू स्थगित', pdfUrl: null },
    { id: 3, title: 'ग्रान्ड फिनाले निमन्त्रणा — अभिभावक प्रतिभा खोज', date: '2026-02-17', excerpt: 'अभिभावक प्रतिभा खोज, ड्यान्सिङ स्टार र सिंगिङ आइडल प्रतियोगिताको ग्रान्ड फिनाले', pdfUrl: null },
    { id: 4, title: 'गोल्डेन सुनगाभा ड्यान्सिङ स्टार अपडेट', date: '2026-02-16', excerpt: 'शीर्ष ४ प्रतिस्पर्धीहरूको भिडियो फेसबुकमा पोस्ट; सामाजिक सञ्जाल मतदान निर्देशन', pdfUrl: null },
    { id: 5, title: 'विद्यालय तालिका परिवर्तन', date: '2026-02-13', excerpt: 'विद्यालय तालिका परिवर्तन: प्रार्थना सभा ९:३० बजे, छुट्टी ३:४५ बजे', pdfUrl: null },
    { id: 6, title: 'अभिभावक प्रतिभा खोज दर्ता', date: '2026-02-12', excerpt: 'अभिभावक प्रतिभा प्रतियोगिता दर्ता फारम र विस्तृत नियमहरू', pdfUrl: null },
    { id: 7, title: 'ड्यान्सिङ स्टार सेमिफाइनल राउन्ड', date: '2026-02-09', excerpt: 'सेमिफाइनल भिडियो अपलोड; मतदान समयसीमा माघ २९, बिहान ८ बजे', pdfUrl: null },
    { id: 8, title: 'अभिभावक प्रतिभा र नृत्य अडिसन', date: '2026-02-02', excerpt: 'अडिसन मिति: माघ २२-२३; ग्रान्ड फिनाले फेब्रुअरी ६', pdfUrl: null },
    { id: 9, title: 'दोस्रो त्रैमासिक परीक्षाफल', date: '2026-01-23', excerpt: 'माघ १० मा नतिजा प्रकाशित; भुक्तानी समयसीमा आवश्यक', pdfUrl: null },
    { id: 10, title: 'सरस्वती पूजा निमन्त्रणा', date: '2026-01-22', excerpt: 'सरस्वती पूजा र विद्यारम्भ समारोह; नर्सरी-९ सम्म निःशुल्क भर्ना', pdfUrl: null },
  ],
};
