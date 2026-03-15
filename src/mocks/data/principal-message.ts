/**
 * Mock: Principal's Message
 * @endpoint GET /api/principal-message
 * @description Principal's welcome message, photo, and signature
 * @source Scraped from goldensungavaschool.edu.np/messagefromprincipal.php on 2026-03-15
 * @status mock
 */

export const mockPrincipalMessage = {
  name: 'Mahesh Chandra Gautam',
  title: 'Principal',
  photoUrl:
    'https://veda-app.s3.ap-south-1.amazonaws.com/assets/806203/undefined/2024-04-22/XWTa6ldNBT6uCjAV-1713795316.png',
  signatureUrl:
    'https://veda-app.s3.ap-south-1.amazonaws.com/assets/806203/undefined/2023-06-07/SnqDCcqvnmGcvSbH-1686113017.png',
  message: `Golden Sungava English Boarding School represents one of the best academic destinations for children of all age groups and has earned recognition as a leading institution in Changunarayan Municipality. The administration prioritizes delivering contemporary education aligned with modern needs.

Our pedagogical approach emphasizes teaching students through diverse methodologies including project works and multimedia presentations rather than isolated subject instruction. The curriculum integrates oriental culture and western technology as foundational teaching strategies.

Following the 2072 B.S. earthquake, the school constructed single-story buildings prioritizing structural safety and addressing student anxiety regarding natural disasters.

Facilities include an open playground, science laboratory, equipped library, and comfortable classrooms. Beyond academics, the institution offers ECA and CCA programs like music, art, dance, wushu, drama, and anchoring.

Staff recruitment emphasizes genuine interest in education and affinity with children over credentials alone, with emphasis on modern teaching tools proficiency.

The Pre-Primary section employs nature-based learning with play-and-learn methodologies in a domestic environment, building parental confidence.

We extend our gratitude to families supporting the institution since its establishment and invite prospective parents to visit the campus.`,
} as const;
