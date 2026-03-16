/**
 * Mock: Gallery Events
 * @endpoint GET /api/gallery-events?lang={en|np}
 * @description Event-based gallery grouping photos and videos per event
 * @source Scraped from goldensungavaschool.edu.np/photos.php on 2026-03-15
 * @status mock
 */

export type GalleryPhoto = {
  id: number;
  url: string;
  caption?: string;
};

export type GalleryEvent = {
  id: number;
  name: string;
  date: string;
  coverUrl: string;
  photos: GalleryPhoto[];
  videos: { videoId: string; title: string }[];
};

export const mockGalleryEvents: Record<string, GalleryEvent[]> = {
  en: [
    {
      id: 1,
      name: "Golden Sungava Parents' Talent Hunt 2082",
      date: '2026-02-27',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg',
      photos: [
        { id: 1, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', caption: "Parents' Talent Hunt opening" },
        { id: 2, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', caption: 'Performance highlights' },
        { id: 3, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', caption: 'Prize ceremony' },
        { id: 4, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', caption: 'Group photo' },
      ],
      videos: [],
    },
    {
      id: 2,
      name: 'Academy + ECA Prize Distribution 2082',
      date: '2026-02-24',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg',
      photos: [
        { id: 5, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', caption: 'Prize distribution ceremony' },
        { id: 6, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', caption: 'Award winners' },
        { id: 7, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', caption: 'Stage program' },
      ],
      videos: [
        { videoId: 'dQw4w9WgXcQ', title: 'Annual Day Celebration 2082' },
      ],
    },
    {
      id: 3,
      name: 'Sports Meet 2082',
      date: '2026-02-24',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg',
      photos: [
        { id: 8, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', caption: 'Opening ceremony' },
        { id: 9, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', caption: 'Track events' },
        { id: 10, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', caption: 'Victory lap' },
        { id: 11, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg', caption: 'Medal ceremony' },
        { id: 12, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', caption: 'Team photo' },
      ],
      videos: [
        { videoId: 'dQw4w9WgXcQ', title: 'Sports Meet Highlights' },
      ],
    },
    {
      id: 4,
      name: "Father's Day 2082",
      date: '2025-08-23',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg',
      photos: [
        { id: 13, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', caption: "Father's Day celebration" },
        { id: 14, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', caption: 'Stage program' },
        { id: 15, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', caption: 'Family moment' },
      ],
      videos: [],
    },
    {
      id: 5,
      name: 'Science, Math & Computer Exhibition 2082',
      date: '2025-08-15',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg',
      photos: [
        { id: 16, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', caption: 'Science projects' },
        { id: 17, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', caption: 'Math models' },
        { id: 18, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', caption: 'Computer demonstrations' },
      ],
      videos: [
        { videoId: 'dQw4w9WgXcQ', title: 'School Tour - Golden Sungava' },
      ],
    },
    {
      id: 6,
      name: 'ECA Prize Distribution 2082',
      date: '2026-02-22',
      coverUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff_image/2026-02-22/ntpswnxmSwfhK8NP-1771742910.jpeg',
      photos: [
        { id: 19, url: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff_image/2026-02-22/ntpswnxmSwfhK8NP-1771742910.jpeg', caption: 'ECA prize distribution' },
        { id: 20, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', caption: 'Winners on stage' },
        { id: 21, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', caption: 'Certificate ceremony' },
      ],
      videos: [],
    },
    {
      id: 7,
      name: 'Rakshya Bandhan Gai Jatra 2082',
      date: '2025-08-15',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg',
      photos: [
        { id: 22, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', caption: 'Gai Jatra celebration' },
        { id: 23, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', caption: 'Costume parade' },
        { id: 24, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', caption: 'Raksha Bandhan ceremony' },
      ],
      videos: [],
    },
    {
      id: 8,
      name: 'Krishna Janasthami 2082',
      date: '2025-08-15',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg',
      photos: [
        { id: 25, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', caption: 'Krishna Janasthami celebration' },
        { id: 26, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', caption: 'Cultural performance' },
        { id: 27, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', caption: 'Student performances' },
      ],
      videos: [],
    },
    {
      id: 9,
      name: 'Election Day - 2082 BS',
      date: '2025-06-10',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg',
      photos: [
        { id: 28, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg', caption: 'Student council election' },
        { id: 29, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', caption: 'Voting process' },
        { id: 30, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', caption: 'Results announcement' },
      ],
      videos: [],
    },
    {
      id: 10,
      name: 'Prospectus Year 2082 B.S.',
      date: '2025-04-04',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg',
      photos: [
        { id: 31, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', caption: 'Prospectus cover shoot' },
        { id: 32, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', caption: 'Campus tour' },
        { id: 33, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', caption: 'Student activities' },
      ],
      videos: [],
    },
  ],
  np: [
    {
      id: 1,
      name: 'गोल्डेन सुनगाभा अभिभावक प्रतिभा खोज २०८२',
      date: '2026-02-27',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg',
      photos: [
        { id: 1, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', caption: 'अभिभावक प्रतिभा खोज उद्घाटन' },
        { id: 2, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', caption: 'प्रस्तुतिका मुख्य अंशहरू' },
        { id: 3, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', caption: 'पुरस्कार वितरण' },
        { id: 4, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', caption: 'सामूहिक तस्बिर' },
      ],
      videos: [],
    },
    {
      id: 2,
      name: 'शैक्षिक + ECA पुरस्कार वितरण २०८२',
      date: '2026-02-24',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg',
      photos: [
        { id: 5, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', caption: 'पुरस्कार वितरण समारोह' },
        { id: 6, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', caption: 'विजेताहरू' },
        { id: 7, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', caption: 'मञ्च कार्यक्रम' },
      ],
      videos: [
        { videoId: 'dQw4w9WgXcQ', title: 'वार्षिक दिवस समारोह २०८२' },
      ],
    },
    {
      id: 3,
      name: 'खेलकुद दिवस २०८२',
      date: '2026-02-24',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg',
      photos: [
        { id: 8, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', caption: 'उद्घाटन समारोह' },
        { id: 9, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', caption: 'ट्र्याक प्रतियोगिता' },
        { id: 10, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', caption: 'विजय गोद' },
        { id: 11, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg', caption: 'पदक वितरण' },
        { id: 12, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', caption: 'टोली तस्बिर' },
      ],
      videos: [
        { videoId: 'dQw4w9WgXcQ', title: 'खेलकुद दिवसका मुख्य क्षणहरू' },
      ],
    },
    {
      id: 4,
      name: 'बुबाको दिन २०८२',
      date: '2025-08-23',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg',
      photos: [
        { id: 13, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', caption: 'बुबाको दिन समारोह' },
        { id: 14, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', caption: 'मञ्च कार्यक्रम' },
        { id: 15, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', caption: 'पारिवारिक क्षण' },
      ],
      videos: [],
    },
    {
      id: 5,
      name: 'विज्ञान, गणित र कम्प्युटर प्रदर्शनी २०८२',
      date: '2025-08-15',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg',
      photos: [
        { id: 16, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', caption: 'विज्ञान परियोजना' },
        { id: 17, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', caption: 'गणित मोडल' },
        { id: 18, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', caption: 'कम्प्युटर प्रदर्शन' },
      ],
      videos: [
        { videoId: 'dQw4w9WgXcQ', title: 'विद्यालय भ्रमण - गोल्डेन सुनगाभा' },
      ],
    },
    {
      id: 6,
      name: 'ECA पुरस्कार वितरण २०८२',
      date: '2026-02-22',
      coverUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff_image/2026-02-22/ntpswnxmSwfhK8NP-1771742910.jpeg',
      photos: [
        { id: 19, url: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff_image/2026-02-22/ntpswnxmSwfhK8NP-1771742910.jpeg', caption: 'ECA पुरस्कार वितरण' },
        { id: 20, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', caption: 'विजेताहरू मञ्चमा' },
        { id: 21, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', caption: 'प्रमाणपत्र वितरण' },
      ],
      videos: [],
    },
    {
      id: 7,
      name: 'रक्षाबन्धन गाईजात्रा २०८२',
      date: '2025-08-15',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg',
      photos: [
        { id: 22, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', caption: 'गाईजात्रा समारोह' },
        { id: 23, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', caption: 'वेशभूषा प्रदर्शन' },
        { id: 24, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', caption: 'रक्षाबन्धन समारोह' },
      ],
      videos: [],
    },
    {
      id: 8,
      name: 'कृष्ण जन्माष्टमी २०८२',
      date: '2025-08-15',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg',
      photos: [
        { id: 25, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', caption: 'कृष्ण जन्माष्टमी समारोह' },
        { id: 26, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', caption: 'सांस्कृतिक प्रस्तुति' },
        { id: 27, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', caption: 'विद्यार्थी प्रस्तुति' },
      ],
      videos: [],
    },
    {
      id: 9,
      name: 'निर्वाचन दिवस - २०८२',
      date: '2025-06-10',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg',
      photos: [
        { id: 28, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg', caption: 'विद्यार्थी परिषद निर्वाचन' },
        { id: 29, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', caption: 'मतदान प्रक्रिया' },
        { id: 30, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', caption: 'नतिजा घोषणा' },
      ],
      videos: [],
    },
    {
      id: 10,
      name: 'प्रस्पेक्टस वर्ष २०८२ वि.सं.',
      date: '2025-04-04',
      coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg',
      photos: [
        { id: 31, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', caption: 'प्रस्पेक्टस कभर शूट' },
        { id: 32, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', caption: 'क्याम्पस भ्रमण' },
        { id: 33, url: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', caption: 'विद्यार्थी क्रियाकलाप' },
      ],
      videos: [],
    },
  ],
};
