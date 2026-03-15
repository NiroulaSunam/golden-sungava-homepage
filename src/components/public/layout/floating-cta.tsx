'use client';

import Link from 'next/link';
import { useLanguage } from '@/frontend/providers/language-provider';

export const FloatingCTA = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden">
      <Link
        href="/admission"
        className="block w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
      >
        {t('action.getAdmission')}
      </Link>
    </div>
  );
};
