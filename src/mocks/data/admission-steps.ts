/**
 * Mock: Admission Steps
 * @endpoint GET /api/admission-steps?lang={en|np}
 * @description Step-by-step admission process guide
 * @status mock
 */

export type AdmissionStep = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export const mockAdmissionSteps: Record<string, AdmissionStep[]> = {
  en: [
    { id: 1, icon: 'file-text', title: 'Fill Form', description: 'Complete the online admission form below' },
    { id: 2, icon: 'users', title: 'Visit School', description: 'Bring original documents for verification' },
    { id: 3, icon: 'graduation-cap', title: 'Get Admitted', description: 'Complete enrollment and start learning' },
  ],
  np: [
    { id: 1, icon: 'file-text', title: 'फारम भर्नुहोस्', description: 'तलको अनलाइन भर्ना फारम भर्नुहोस्' },
    { id: 2, icon: 'users', title: 'विद्यालय भ्रमण', description: 'प्रमाणपत्रहरूको सक्कली प्रति लिएर आउनुहोस्' },
    { id: 3, icon: 'graduation-cap', title: 'भर्ना हुनुहोस्', description: 'भर्ना प्रक्रिया पूरा गर्नुहोस् र सिक्न सुरु गर्नुहोस्' },
  ],
};
