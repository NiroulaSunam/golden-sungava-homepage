'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle } from 'lucide-react';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { useLanguage } from '@/frontend/providers/language-provider';

// --- Sub-components ---

const FooterContactItem = ({ icon: Icon, children }: { icon: typeof Phone; children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-sm text-accent-foreground/70">
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
    <span>{children}</span>
  </li>
);

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="mb-4 font-heading text-lg font-semibold text-accent-foreground">{title}</h3>
    {children}
  </div>
);

// --- Main Footer ---

export const Footer = () => {
  const { config } = useSiteConfig();
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Gold top border gradient */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#111111] text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* School Info */}
            <div>
              <h3 className="mb-4 font-heading text-xl font-semibold text-white">{config.schoolName}</h3>
              <p className="text-sm text-accent-foreground/70">{config.tagline}</p>
            </div>

            {/* Quick Links */}
            <FooterSection title={t('footer.quickLinks')}>
              <ul className="space-y-2">
                {[
                  { label: t('nav.about'), href: '/about' },
                  { label: t('nav.admission'), href: '/admission' },
                  { label: t('nav.news'), href: '/news' },
                  { label: t('nav.contact'), href: '/contact' },
                  { label: t('nav.gallery'), href: '/gallery/photos' },
                  { label: t('nav.downloads'), href: '/downloads' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-accent-foreground/70 transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterSection>

            {/* Contact Info */}
            <FooterSection title={t('footer.contactInfo')}>
              <ul className="space-y-3">
                <FooterContactItem icon={MapPin}>{config.address}</FooterContactItem>
                <FooterContactItem icon={Phone}>
                  {config.phones.slice(0, 2).join(', ')}
                </FooterContactItem>
                <FooterContactItem icon={Mail}>{config.emails[0]}</FooterContactItem>
                <FooterContactItem icon={Clock}>{config.officeHours}</FooterContactItem>
              </ul>
            </FooterSection>

            {/* Social Links */}
            <FooterSection title={t('footer.followUs')}>
              <div className="flex gap-3">
                <a
                  href={config.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2.5 text-accent-foreground/70 transition-colors hover:bg-primary hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={`https://wa.me/${config.socialLinks.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2.5 text-accent-foreground/70 transition-colors hover:bg-primary hover:text-white"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href={config.socialLinks.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2.5 text-accent-foreground/70 transition-colors hover:bg-primary hover:text-white"
                  aria-label="Messenger"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </FooterSection>
          </div>

          {/* Copyright */}
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-accent-foreground/50">
            &copy; {year} {config.schoolName}. {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
};
