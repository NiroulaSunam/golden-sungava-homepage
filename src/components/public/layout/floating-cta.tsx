'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/frontend/providers/language-provider';

export const FloatingCTA = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden">
      <Link
        href="/admission"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-2xl"
      >
        {t('action.getAdmission')}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};
