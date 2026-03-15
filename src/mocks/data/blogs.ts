/**
 * Mock: Blog Posts
 * @endpoint GET /api/blogs?lang={en|np}
 * @description Blog posts with authors and featured images
 * @source Scraped from goldensungavaschool.edu.np/blogs.php on 2026-03-15
 * @status mock
 */

export type BlogPost = {
  id: number;
  title: string;
  date: string;
  author: string;
  authorRole: string;
  excerpt: string;
  imageUrl: string;
  content: string | null;
};

export const mockBlogs: Record<string, BlogPost[]> = {
  en: [
    { id: 1, title: 'Krishna', date: '2025-08-15', author: 'Ranjita Tripathi', authorRole: 'Lower Secondary Nepali Teacher', excerpt: 'A Nepali-language exploration of Lord Krishna, creation mythology, and divine incarnation', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2025-08-15/hQs2e1akDvXia42g-1755256600.png', content: null },
    { id: 2, title: 'Impacts of Science And Technology', date: '2024-04-18', author: 'Rebika Khadka', authorRole: 'Class 10 2080 Batch Student', excerpt: 'Taking about science and technology in todays world it plays a very important and vital role...', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/KRdl0C1U2pYcwdCx-1713432549.jpg', content: null },
    { id: 3, title: 'Students Life', date: '2024-04-18', author: 'Suprol Shrestha', authorRole: 'Class 9 Student', excerpt: "There are many children's who are going to school who are students...", imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/ANSUabvHLr6ffUKo-1713430414.jpg', content: null },
    { id: 4, title: 'Asaar 15 and Dahi Chiura Day Celebration', date: '2022-06-29', author: 'Anuka Pulami Magar', authorRole: 'Lower Secondary Nepali Teacher', excerpt: 'Cultural celebration wishes regarding Asaar 15th festival — a traditional Nepali agricultural celebration', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/oRcK14FkdPZFNjJD-1713432753.png', content: null },
  ],
  np: [
    { id: 1, title: 'कृष्ण', date: '2025-08-15', author: 'रञ्जिता त्रिपाठी', authorRole: 'निम्न माध्यमिक नेपाली शिक्षक', excerpt: 'जगत पिता श्रीकृष्ण, सृष्टि पौराणिक कथा, र दिव्य अवतारको नेपाली भाषामा अन्वेषण', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2025-08-15/hQs2e1akDvXia42g-1755256600.png', content: null },
    { id: 2, title: 'विज्ञान र प्रविधिको प्रभाव', date: '2024-04-18', author: 'रेबिका खड्का', authorRole: 'कक्षा १० (२०८०) विद्यार्थी', excerpt: 'आजको संसारमा विज्ञान र प्रविधिले धेरै महत्त्वपूर्ण र अत्यावश्यक भूमिका खेल्दछ...', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/KRdl0C1U2pYcwdCx-1713432549.jpg', content: null },
    { id: 3, title: 'विद्यार्थी जीवन', date: '2024-04-18', author: 'सुप्रोल श्रेष्ठ', authorRole: 'कक्षा ९ विद्यार्थी', excerpt: 'धेरै बालबालिकाहरू विद्यालय जान्छन् जो विद्यार्थी हुन्...', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/ANSUabvHLr6ffUKo-1713430414.jpg', content: null },
    { id: 4, title: 'असार १५ र दहि चिउरा खाने दिनको शुभकामना', date: '2022-06-29', author: 'अनुका पुलामी मगर', authorRole: 'निम्न माध्यमिक नेपाली शिक्षक', excerpt: 'असार १५ को पर्व — परम्परागत नेपाली कृषि उत्सवको सांस्कृतिक शुभकामना', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/oRcK14FkdPZFNjJD-1713432753.png', content: null },
  ],
};
