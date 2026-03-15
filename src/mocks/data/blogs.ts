/**
 * Mock: Blog Posts
 * @endpoint GET /api/blogs
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

export const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: 'Krishna',
    date: '2025-08-15',
    author: 'Ranjita Tripathi',
    authorRole: 'Lower Secondary Nepali Teacher',
    excerpt: 'A Nepali-language exploration of Lord Krishna, creation mythology, and divine incarnation',
    imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2025-08-15/hQs2e1akDvXia42g-1755256600.png',
    content: null,
  },
  {
    id: 2,
    title: 'Impacts of Science And Technology',
    date: '2024-04-18',
    author: 'Rebika Khadka',
    authorRole: 'Class 10 2080 Batch Student',
    excerpt: 'Taking about science and technology in todays world it plays a very important and vital role...',
    imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/KRdl0C1U2pYcwdCx-1713432549.jpg',
    content: null,
  },
  {
    id: 3,
    title: 'Students Life',
    date: '2024-04-18',
    author: 'Suprol Shrestha',
    authorRole: 'Class 9 Student',
    excerpt: "There are many children's who are going to school who are students...",
    imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/ANSUabvHLr6ffUKo-1713430414.jpg',
    content: null,
  },
  {
    id: 4,
    title: 'Asaar 15 and Dahi Chiura Day Celebration',
    date: '2022-06-29',
    author: 'Anuka Pulami Magar',
    authorRole: 'Lower Secondary Nepali Teacher',
    excerpt: 'Cultural celebration wishes regarding Asaar 15th festival — a traditional Nepali agricultural celebration',
    imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/oRcK14FkdPZFNjJD-1713432753.png',
    content: null,
  },
];
