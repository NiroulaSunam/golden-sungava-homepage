/**
 * Mock: Testimonials
 * @endpoint GET /api/testimonials?lang={en|np}
 * @description Parent and student testimonials
 * @source Scraped from goldensungavaschool.edu.np homepage on 2026-03-15
 * @status mock
 */

export type Testimonial = {
  id: number;
  quote: string;
  authorName: string;
  role: string;
  photoUrl: string | null;
};

export const mockTestimonials: Record<string, Testimonial[]> = {
  en: [
    { id: 1, quote: 'My child has shown remarkable growth since joining Golden Sungava. The teachers are dedicated and the learning environment is excellent.', authorName: 'Parent', role: 'Parent', photoUrl: null },
    { id: 2, quote: 'The school focuses on holistic development — academics, sports, arts, and life skills. My confidence has grown tremendously.', authorName: 'Student', role: 'Student', photoUrl: null },
    { id: 3, quote: 'Golden Sungava provides a nurturing environment where every child gets personal attention. The academic improvement is visible.', authorName: 'Parent', role: 'Parent', photoUrl: null },
    { id: 4, quote: 'The ECA programs — music, dance, drama, wushu — make school exciting. I look forward to going to school every day.', authorName: 'Student', role: 'Student', photoUrl: null },
    { id: 5, quote: 'As a teacher at Golden Sungava, I am grateful to be part of a community that truly values education and the growth of every child.', authorName: 'Teacher', role: 'Staff', photoUrl: null },
  ],
  np: [
    { id: 1, quote: 'गोल्डेन सुनगाभामा भर्ना भएपछि मेरो बच्चाले उल्लेखनीय प्रगति देखाएको छ। शिक्षकहरू समर्पित छन् र सिकाइ वातावरण उत्कृष्ट छ।', authorName: 'अभिभावक', role: 'अभिभावक', photoUrl: null },
    { id: 2, quote: 'विद्यालयले समग्र विकासमा ध्यान दिन्छ — शिक्षा, खेलकुद, कला, र जीवन सीप। मेरो आत्मविश्वास धेरै बढेको छ।', authorName: 'विद्यार्थी', role: 'विद्यार्थी', photoUrl: null },
    { id: 3, quote: 'गोल्डेन सुनगाभाले हरेक बच्चालाई व्यक्तिगत ध्यान दिने पोषणकारी वातावरण प्रदान गर्दछ। शैक्षिक सुधार स्पष्ट देखिन्छ।', authorName: 'अभिभावक', role: 'अभिभावक', photoUrl: null },
    { id: 4, quote: 'ECA कार्यक्रमहरू — संगीत, नृत्य, नाटक, वुशु — विद्यालय रोमाञ्चक बनाउँछन्। म हरेक दिन विद्यालय जान उत्सुक हुन्छु।', authorName: 'विद्यार्थी', role: 'विद्यार्थी', photoUrl: null },
    { id: 5, quote: 'गोल्डेन सुनगाभामा शिक्षकको रूपमा, शिक्षा र हरेक बच्चाको विकासलाई साँच्चै महत्व दिने समुदायको हिस्सा हुन पाउँदा म कृतज्ञ छु।', authorName: 'शिक्षक', role: 'कर्मचारी', photoUrl: null },
  ],
};
