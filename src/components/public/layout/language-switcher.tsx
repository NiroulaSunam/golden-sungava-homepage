'use client';

import { useLanguage } from '@/frontend/providers/language-provider';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { lang, setLanguage } = useLanguage();

  return (
    <div className={cn('flex items-center gap-0.5 rounded-full border border-white/15 bg-[#10283B] p-0.5 text-xs font-semibold text-white', className)}>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          'rounded-full px-2.5 py-1 transition-colors',
          lang === 'en'
            ? 'bg-primary text-[#173B58]'
            : 'text-white/70 hover:text-white',
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('np')}
        className={cn(
          'rounded-full px-2.5 py-1 transition-colors',
          lang === 'np'
            ? 'bg-primary text-[#173B58]'
            : 'text-white/70 hover:text-white',
        )}
      >
        NP
      </button>
    </div>
  );
};
