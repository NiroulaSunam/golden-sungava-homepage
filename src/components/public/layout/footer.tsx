'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { useLanguage } from '@/frontend/providers/language-provider';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';

// --- Sub-components ---

const FooterContactItem = ({ icon: Icon, children }: { icon: typeof Phone; children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-sm text-white/60">
    <div className="mt-0.5 rounded-lg bg-white/5 p-1.5">
      <Icon className="h-3.5 w-3.5 text-primary-light" />
    </div>
    <span>{children}</span>
  </li>
);

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">{title}</h3>
    {children}
  </div>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="group flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-primary-light"
    >
      <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
      {children}
    </Link>
  </li>
);

// --- Main Footer ---

export const Footer = () => {
  const { config } = useSiteConfig();
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Gold gradient top border */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* School Info */}
            <div className="lg:pr-4">
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={config.logoUrl}
                  alt={config.schoolName}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <h3 className="font-heading text-lg font-bold text-white">{config.schoolName}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/50">{config.tagline}</p>

              {/* Social Links */}
              <div className="mt-6 flex gap-2">
                <a
                  href={config.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white/5 p-2.5 text-white/50 transition-all hover:bg-primary/20 hover:text-primary-light"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${config.socialLinks.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white/5 p-2.5 text-white/50 transition-all hover:bg-primary/20 hover:text-primary-light"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={config.socialLinks.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white/5 p-2.5 text-white/50 transition-all hover:bg-primary/20 hover:text-primary-light"
                  aria-label="Messenger"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <FooterSection title={t('footer.quickLinks')}>
              <ul className="space-y-2.5">
                {[
                  { label: t('nav.about'), href: '/about' },
                  { label: t('nav.admission'), href: '/admission' },
                  { label: t('nav.news'), href: '/news' },
                  { label: t('nav.contact'), href: '/contact' },
                  { label: t('nav.gallery'), href: '/gallery/photos' },
                  { label: t('nav.downloads'), href: '/downloads' },
                ].map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </FooterSection>

            {/* Contact Info */}
            <FooterSection title={t('footer.contactInfo')}>
              <ul className="space-y-4">
                <FooterContactItem icon={MapPin}>{config.address}</FooterContactItem>
                <FooterContactItem icon={Phone}>
                  {config.phones.slice(0, 2).join(', ')}
                </FooterContactItem>
                <FooterContactItem icon={Mail}>{config.emails[0]}</FooterContactItem>
                <FooterContactItem icon={Clock}>{config.officeHours}</FooterContactItem>
              </ul>
            </FooterSection>

            {/* Newsletter / CTA */}
            <div>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">{config.footer.ctaHeading}</h3>
              <p className="text-sm leading-relaxed text-white/50">
                {config.footer.ctaDescription}
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl"
              >
                {config.footer.ctaButtonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-14 border-t border-white/[0.06] pt-6">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-xs text-white/30">
                &copy; {year} {config.schoolName}. {t('footer.copyright')}
              </p>
              <p className="text-xs text-white/20">
                {config.footer.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
