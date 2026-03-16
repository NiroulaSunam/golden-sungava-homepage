/**
 * Mock: Payment Methods
 * @endpoint GET /api/payment-methods?lang={en|np}
 * @description Available fee payment methods with step-by-step instructions
 * @status mock
 */

export type PaymentMethod = {
  id: number;
  name: string;
  icon: string;
  color: string;
  steps: string[];
};

export const mockPaymentMethods: Record<string, PaymentMethod[]> = {
  en: [
    {
      id: 1,
      name: 'Khalti',
      icon: 'khalti',
      color: 'bg-purple-600',
      steps: [
        'Open the Khalti app on your phone',
        'Search for "Golden Sungava" or scan the QR code',
        'Enter the fee amount and student details',
        'Confirm payment and save the receipt',
        'Share the receipt screenshot with the school',
      ],
    },
    {
      id: 2,
      name: 'eSewa',
      icon: 'esewa',
      color: 'bg-green-600',
      steps: [
        'Open the eSewa app on your phone',
        'Go to "School Fee Payment" or scan the QR code',
        'Enter the fee amount and student details',
        'Confirm payment and save the receipt',
        'Share the receipt screenshot with the school',
      ],
    },
  ],
  np: [
    {
      id: 1,
      name: 'खल्ती',
      icon: 'khalti',
      color: 'bg-purple-600',
      steps: [
        'आफ्नो फोनमा खल्ती एप खोल्नुहोस्',
        '"गोल्डेन सुनगाभा" खोज्नुहोस् वा QR कोड स्क्यान गर्नुहोस्',
        'शुल्क रकम र विद्यार्थीको विवरण प्रविष्ट गर्नुहोस्',
        'भुक्तानी पुष्टि गर्नुहोस् र रसिद सुरक्षित गर्नुहोस्',
        'रसिदको स्क्रिनसट विद्यालयलाई पठाउनुहोस्',
      ],
    },
    {
      id: 2,
      name: 'इसेवा',
      icon: 'esewa',
      color: 'bg-green-600',
      steps: [
        'आफ्नो फोनमा इसेवा एप खोल्नुहोस्',
        '"स्कुल फी पेमेन्ट" मा जानुहोस् वा QR कोड स्क्यान गर्नुहोस्',
        'शुल्क रकम र विद्यार्थीको विवरण प्रविष्ट गर्नुहोस्',
        'भुक्तानी पुष्टि गर्नुहोस् र रसिद सुरक्षित गर्नुहोस्',
        'रसिदको स्क्रिनसट विद्यालयलाई पठाउनुहोस्',
      ],
    },
  ],
};
