'use client';

import { GraduationCap, Users, Award, Calendar, type LucideIcon } from 'lucide-react';
import { useInView } from '@/lib/hooks/use-in-view';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { cn } from '@/lib/utils';

// Map icon string names from CMS to Lucide components
const iconMap: Record<string, LucideIcon> = {
  'graduation-cap': GraduationCap,
  users: Users,
  award: Award,
  calendar: Calendar,
};

// --- Sub-component ---

interface StatItemProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay: string;
  isInView: boolean;
}

const StatItem = ({ icon: Icon, value, label, delay, isInView }: StatItemProps) => (
  <div className={cn(
    'flex flex-col items-center text-center',
    'opacity-0 translate-y-4 transition-all duration-700',
    delay,
    isInView && 'opacity-100 translate-y-0',
  )}>
    <div className="mb-3 rounded-2xl bg-primary/10 p-3">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <span className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
      {value}
    </span>
    <span className="mt-1.5 text-sm font-medium text-muted-foreground">{label}</span>
  </div>
);

const STAT_DELAYS = ['delay-100', 'delay-200', 'delay-300', 'delay-400'];

// --- Main Component ---

export const StatsCounter = () => {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const { config } = useSiteConfig();
  const statsList = Array.isArray(config?.stats) ? config.stats : [];

  if (statsList.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border bg-card py-14 md:py-20">
      {/* Subtle gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gold-gradient-subtle opacity-50" />

      <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:gap-12 md:px-6">
        {statsList.map((stat, i) => (
          <StatItem
            key={stat.label}
            icon={iconMap[stat.icon] || Award}
            value={stat.value}
            label={stat.label}
            delay={STAT_DELAYS[i] ?? 'delay-100'}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
};
