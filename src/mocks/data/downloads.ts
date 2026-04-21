export type DownloadItem = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  sortOrder: number;
};

export const mockDownloads: Record<'en' | 'np', DownloadItem[]> = {
  en: [],
  np: [],
};
