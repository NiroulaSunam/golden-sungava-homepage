/**
 * Mock: Activities
 * @endpoint GET /api/activities?lang={en|np}
 * @description Extracurricular activities showcase
 * @source Scraped from goldensungavaschool.edu.np/activities.php on 2026-03-15
 * @status mock
 */

export type Activity = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export const mockActivities: Record<string, Activity[]> = {
  en: [
    { id: 1, name: 'Poem By Student', description: 'Students showcase their poetry writing and recitation skills in school assemblies and competitions.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2024-05-19/ivDvoXAKSnCBNArZ-1716116059.jpg' },
    { id: 2, name: 'Students at Red Cross Society', description: 'Students participate in Red Cross Society programs, learning first aid, community service, and humanitarian values.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2024-05-09/cq1j1NHpPq3VUMKB-1715250280.jpg' },
    { id: 3, name: 'Music Program', description: 'Vocal and instrumental music classes under the guidance of experienced music teachers.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 4, name: 'Dance', description: 'Traditional and modern dance programs including cultural performances and competitions.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 5, name: 'Art & Drawing', description: 'Creative art classes fostering imagination, fine motor skills, and artistic expression.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 6, name: 'Drama', description: 'Theatre and drama programs building confidence, public speaking, and creative storytelling.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 7, name: 'Wushu', description: 'Chinese martial arts training promoting discipline, fitness, and self-defense skills.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 8, name: 'Scout', description: 'Scouting program teaching outdoor skills, teamwork, leadership, and community service.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
  ],
  np: [
    { id: 1, name: 'विद्यार्थीद्वारा कविता', description: 'विद्यार्थीहरूले विद्यालय सभा र प्रतियोगिताहरूमा कविता लेखन र वाचन सीप प्रदर्शन गर्छन्।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2024-05-19/ivDvoXAKSnCBNArZ-1716116059.jpg' },
    { id: 2, name: 'रेड क्रस सोसाइटी', description: 'विद्यार्थीहरू रेड क्रस सोसाइटी कार्यक्रममा भाग लिन्छन्, प्राथमिक उपचार, सामुदायिक सेवा र मानवीय मूल्य सिक्छन्।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2024-05-09/cq1j1NHpPq3VUMKB-1715250280.jpg' },
    { id: 3, name: 'संगीत कार्यक्रम', description: 'अनुभवी संगीत शिक्षकहरूको मार्गदर्शनमा गायन र वाद्य संगीत कक्षाहरू।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 4, name: 'नृत्य', description: 'सांस्कृतिक प्रस्तुति र प्रतियोगिता सहितको परम्परागत र आधुनिक नृत्य कार्यक्रम।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 5, name: 'कला र चित्रकला', description: 'कल्पना, सूक्ष्म मोटर सीप र कलात्मक अभिव्यक्ति बढाउने रचनात्मक कला कक्षाहरू।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 6, name: 'नाटक', description: 'आत्मविश्वास, सार्वजनिक बोली र रचनात्मक कथा कथन निर्माण गर्ने रंगमञ्च र नाटक कार्यक्रम।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 7, name: 'वुशु', description: 'अनुशासन, स्वास्थ्य र आत्मरक्षा सीप प्रवर्द्धन गर्ने चिनियाँ मार्शल आर्ट तालिम।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
    { id: 8, name: 'स्काउट', description: 'बाहिरी सीप, सामूहिक कार्य, नेतृत्व र सामुदायिक सेवा सिकाउने स्काउटिङ कार्यक्रम।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg' },
  ],
};
