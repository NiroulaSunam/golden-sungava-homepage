'use client';

import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import type { StaffMember } from '@/types/api';
import { departmentLabels, designationLabels } from '@/mocks/data/staff';
import { PageHeader } from '@/components/shared/page-header';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';
import { cn } from '@/lib/utils';

// --- Sub-component ---

interface StaffCardProps {
  member: StaffMember;
  lang: string;
}

const StaffCard = ({ member, lang }: StaffCardProps) => {
  const deptLabel = lang === 'np'
    ? departmentLabels.np[member.department] || member.department
    : member.department;
  const designLabel = lang === 'np'
    ? designationLabels[member.designation] || member.designation
    : member.designation;

  return (
    <div className="card-gold-accent flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/10">
        <ImageWithFallback
          src={member.photoUrl || '/images/placeholder.svg'}
          alt={member.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="min-w-0">
        <h3 className="font-heading text-base font-semibold">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{designLabel}</p>
        <p className="text-xs text-primary">{deptLabel}</p>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
          >
            <Mail className="h-3 w-3" />
            {member.email}
          </a>
        )}
      </div>
    </div>
  );
};

// --- Main Component ---

export const StaffDirectoryClient = () => {
  const { lang, t } = useLanguage();
  const { config } = useSiteConfig();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [activeDept, setActiveDept] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<StaffMember[]>('staff', { lang });
      if (data) setStaff(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  const staffList = Array.isArray(staff) ? staff : [];
  const departments = Array.from(new Set(
    staffList
      .map((member) => member.department)
      .filter((department): department is string => typeof department === 'string' && department.trim().length > 0),
  ));

  const filtered = activeDept === 'all'
    ? staffList
    : staffList.filter((m) => m.department === activeDept);

  const staffDescription = config?.pageDescriptions?.staff || '';

  return (
    <>
      <PageHeader
        title={t('heading.staff')}
        subtitle={staffDescription}
        breadcrumbs={[{ label: t('heading.staff'), href: '/staff' }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {/* Department Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveDept('all')}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeDept === 'all' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground',
            )}
          >
            {t('misc.all')}
          </button>
          {departments.map((dept) => {
            const label = lang === 'np' ? departmentLabels.np[dept] || dept : dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setActiveDept(dept)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  activeDept === dept ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Staff Grid */}
        {isLoading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonLoader key={i} variant="card" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((member, i) => (
              <StaffCard key={`${member.name}-${i}`} member={member} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
