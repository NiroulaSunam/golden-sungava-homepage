/**
 * Mock: FAQs
 * @endpoint GET /api/faqs?lang={en|np}
 * @description Frequently asked questions for admission page
 * @source Based on common school admission queries
 * @status mock
 */

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const mockFaqs: Record<string, FaqItem[]> = {
  en: [
    { id: 1, question: 'What grades does Golden Sungava offer?', answer: 'We offer classes from Play Group to Grade 10, covering pre-primary, primary, lower secondary, and secondary levels.' },
    { id: 2, question: 'How can I apply for admission?', answer: 'You can apply online through our admission form on this page, scan the QR code, or visit the school directly at Changunarayan-2, Duwakot, Bhaktapur.' },
    { id: 3, question: 'What documents are required for admission?', answer: 'Birth certificate, previous school records (transfer certificate and marksheet), passport-size photos, and parent/guardian ID copy.' },
    { id: 4, question: 'Is there a school bus service?', answer: 'Yes, we provide bus and van transportation covering major routes in Bhaktapur district. Contact us for route details.' },
    { id: 5, question: 'What extracurricular activities are available?', answer: 'We offer music, art, dance, wushu, drama, anchoring, football, volleyball, scout, and Red Cross Society programs.' },
    { id: 6, question: 'What are the school hours?', answer: 'School assembly starts at 9:30 AM and dismissal is at 3:45 PM on weekdays.' },
    { id: 7, question: 'How can I pay the school fees?', answer: 'Fees can be paid online via Khalti or eSewa apps, or by visiting the school directly. See our Payment Info page for details.' },
  ],
  np: [
    { id: 1, question: 'गोल्डेन सुनगाभाले कुन कक्षाहरू प्रदान गर्छ?', answer: 'हामी प्ले ग्रुपदेखि कक्षा १० सम्म कक्षाहरू प्रदान गर्दछौं, जसमा पूर्व-प्राथमिक, प्राथमिक, निम्न माध्यमिक र माध्यमिक तह समावेश छ।' },
    { id: 2, question: 'म भर्नाको लागि कसरी आवेदन दिन सक्छु?', answer: 'तपाईं यस पृष्ठमा रहेको हाम्रो भर्ना फारम मार्फत अनलाइन आवेदन दिन सक्नुहुन्छ, QR कोड स्क्यान गर्न सक्नुहुन्छ, वा सिधै विद्यालयमा आउन सक्नुहुन्छ।' },
    { id: 3, question: 'भर्नाको लागि कुन कागजातहरू आवश्यक छन्?', answer: 'जन्मदर्ता प्रमाणपत्र, अघिल्लो विद्यालयको अभिलेख (स्थानान्तरण प्रमाणपत्र र अंकपत्र), पासपोर्ट साइजका फोटोहरू, र अभिभावकको परिचयपत्रको प्रतिलिपि।' },
    { id: 4, question: 'विद्यालय बस सेवा छ?', answer: 'हो, हामी भक्तपुर जिल्लाका प्रमुख मार्गहरू समेटेको बस र भ्यान यातायात सेवा प्रदान गर्दछौं। मार्गको विवरणका लागि हामीलाई सम्पर्क गर्नुहोस्।' },
    { id: 5, question: 'कुन पाठ्यक्रम बाहिरका क्रियाकलापहरू उपलब्ध छन्?', answer: 'हामी संगीत, कला, नृत्य, वुशु, नाटक, एन्करिङ, फुटबल, भलिबल, स्काउट, र रेड क्रस सोसाइटी कार्यक्रमहरू प्रदान गर्दछौं।' },
    { id: 6, question: 'विद्यालयको समय के हो?', answer: 'विद्यालयको प्रार्थना सभा बिहान ९:३० बजे सुरु हुन्छ र छुट्टी दिउँसो ३:४५ बजे हुन्छ।' },
    { id: 7, question: 'म विद्यालयको शुल्क कसरी तिर्न सक्छु?', answer: 'शुल्क खल्ती वा eSewa एपबाट अनलाइन तिर्न सकिन्छ, वा सिधै विद्यालयमा आएर तिर्न सकिन्छ। विवरणका लागि हाम्रो भुक्तानी जानकारी पृष्ठ हेर्नुहोस्।' },
  ],
};
