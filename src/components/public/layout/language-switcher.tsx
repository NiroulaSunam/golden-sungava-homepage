'use client';

import { useLanguage } from '@/frontend/providers/language-provider';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { lang, setLanguage } = useLanguage();

  return (
    <div className={cn('flex items-center gap-0.5 rounded-full border border-border p-0.5 text-xs font-medium', className)}>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          'rounded-full px-2.5 py-1 transition-colors',
          lang === 'en'
            ? 'bg-primary text-white'
            : 'text-muted-foreground hover:text-foreground',
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
            ? 'bg-primary text-white'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        NP
      </button>
    </div>
  );
};
