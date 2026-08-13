'use client';

import React from 'react';
import { SITE_CONFIG, getWhatsAppUrl } from '@/config/site';

export type SocialPlatform = 'instagram' | 'facebook' | 'x' | 'reddit' | 'whatsapp' | 'phone' | 'email';

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ platform, className = 'w-4 h-4' }) => {
  switch (platform) {
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'x':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'reddit':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.182 1.207.49 1.184-.846 2.83-1.418 4.643-1.488l.965-4.523 3.413.72a1.249 1.249 0 0 1 1.01-.701zM9.25 12C8.561 12 8 12.562 8 13.25s.561 1.25 1.25 1.25 1.25-.562 1.25-1.25S9.939 12 9.25 12zm5.5 0c-.689 0-1.25.562-1.25 1.25s.561 1.25 1.25 1.25 1.25-.562 1.25-1.25S15.439 12 14.75 12zm-5.462 4.542a.503.503 0 0 0-.353.858c.847.847 2.083 1.09 3.065 1.09s2.218-.243 3.065-1.09a.503.503 0 0 0-.712-.712c-.628.629-1.583.802-2.353.802s-1.725-.173-2.353-.802a.503.503 0 0 0-.359-.146z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.43-9.874 9.877-9.874 2.636 0 5.114 1.028 6.974 2.89a9.83 9.83 0 012.88 6.982c-.001 5.446-4.431 9.876-9.876 9.876m0-18.064c-5.962 0-10.812 4.85-10.817 10.814a10.77 10.77 0 001.637 5.753L0 24l6.452-1.692a10.77 10.77 0 005.596 1.564h.005c5.963 0 10.817-4.854 10.819-10.817 0-2.89-1.125-5.606-3.167-7.649A10.74 10.74 0 0012.051 3.72z" />
        </svg>
      );
    case 'phone':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'email':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
  }
};

export interface SocialLinksProps {
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
  showLabels?: boolean;
  whatsappMessage?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = 'flex items-center gap-3',
  itemClassName = 'p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
  iconClassName = 'w-4 h-4',
  showLabels = false,
  whatsappMessage,
}) => {
  const items = [
    {
      name: 'Instagram',
      href: SITE_CONFIG.socialLinks.instagram,
      platform: 'instagram' as SocialPlatform,
      external: true,
    },
    {
      name: 'Facebook',
      href: SITE_CONFIG.socialLinks.facebook,
      platform: 'facebook' as SocialPlatform,
      external: true,
    },
    {
      name: 'X',
      href: SITE_CONFIG.socialLinks.x,
      platform: 'x' as SocialPlatform,
      external: true,
    },
    {
      name: 'Reddit',
      href: SITE_CONFIG.socialLinks.reddit,
      platform: 'reddit' as SocialPlatform,
      external: true,
    },
    {
      name: 'WhatsApp',
      href: getWhatsAppUrl(whatsappMessage),
      platform: 'whatsapp' as SocialPlatform,
      external: true,
    },
    {
      name: 'Email',
      href: `mailto:${SITE_CONFIG.contact.email}`,
      platform: 'email' as SocialPlatform,
      external: false,
    },
    {
      name: 'Call Us',
      href: `tel:${SITE_CONFIG.contact.phoneRaw}`,
      platform: 'phone' as SocialPlatform,
      external: false,
    },
  ];

  return (
    <div className={className}>
      {items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          aria-label={item.name}
          title={item.name}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          className={itemClassName}
        >
          <SocialIcon platform={item.platform} className={iconClassName} />
          {showLabels && <span className="text-xs font-semibold">{item.name}</span>}
        </a>
      ))}
    </div>
  );
};
