/**
 * Mock: Notices
 * @endpoint GET /api/notices
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

export const mockNotices: Notice[] = [
  { id: 1, title: 'School Holiday for Representative Assembly Elections & Women\'s Day', date: '2026-03-03', excerpt: 'School closure announced for Representative Assembly elections and Women\'s Day', pdfUrl: null },
  { id: 2, title: 'ECA & CCA Classes Suspended', date: '2026-02-25', excerpt: 'Classes suspended due to 3-story building construction within campus', pdfUrl: null },
  { id: 3, title: 'Grand Finale Invitation — Parents\' Talent Hunt', date: '2026-02-17', excerpt: 'Grand Finale of Parents\' Talent Hunt, Dancing Star, and Singing Idol competitions on Falgun 6', pdfUrl: null },
  { id: 4, title: 'Golden Sungava Dancing Star Update', date: '2026-02-16', excerpt: 'Top-4 contestants\' videos posted on Facebook; social media voting instructions', pdfUrl: null },
  { id: 5, title: 'School Schedule Change', date: '2026-02-13', excerpt: 'School schedule changed: assembly at 9:30 AM, dismissal at 3:45 PM', pdfUrl: null },
  { id: 6, title: 'Golden Sungava Parents\' Talent Hunt Registration', date: '2026-02-12', excerpt: 'Parent talent competition registration form and detailed rules for various performance categories', pdfUrl: null },
  { id: 7, title: 'Dancing Star Semifinal Round', date: '2026-02-09', excerpt: 'Semifinal videos uploaded; voting deadline Magh 29, 8:00 AM', pdfUrl: null },
  { id: 8, title: 'Parents Talent & Dance Audition', date: '2026-02-02', excerpt: 'Audition dates: Magh 22-23; Grand Finale February 6', pdfUrl: null },
  { id: 9, title: 'Second Trimester Exam Results', date: '2026-01-23', excerpt: 'Results released Magh 10; payment deadline required', pdfUrl: null },
  { id: 10, title: 'Saraswati Puja Invitation', date: '2026-01-22', excerpt: 'Saraswati Puja and enrollment ceremony Magh 9; free admission for classes Nursery-9', pdfUrl: null },
  { id: 11, title: 'Saraswati Puja Program', date: '2026-01-20', excerpt: 'Cultural event Magh 9; 3,000 rupees deposit required for Play Group', pdfUrl: null },
  { id: 12, title: 'School Open on Sonam Losar', date: '2026-01-18', excerpt: 'School operates normally despite Sonam Losar festival calendar marking', pdfUrl: null },
  { id: 13, title: 'Winter Break Announcement', date: '2026-01-05', excerpt: 'Winter break Paus 22 - Magh 2; Class 10 exempted', pdfUrl: null },
  { id: 14, title: 'School Holiday — Tamu Losar', date: '2025-12-29', excerpt: 'School closed Pus 15 for Tamu Losar; exams resume Pus 16', pdfUrl: null },
  { id: 15, title: 'School Open on Christmas Day', date: '2025-12-24', excerpt: 'School operates normally despite Christmas calendar designation', pdfUrl: null },
];
