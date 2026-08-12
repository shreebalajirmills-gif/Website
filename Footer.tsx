import React, { useEffect, useRef, useState } from 'react';

// Types
export type FooterLink = { title: string; href?: string; icon?: React.ReactNode; external?: boolean };
export type FooterColumn = { title: string; links: FooterLink[] };
export type SocialLink = { name: string; href: string; ariaLabel?: string; icon?: React.ReactNode };

type Props = {
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  newsletterOnSubmit?: (email: string) => void;
};

const defaultColumns: FooterColumn[] = [
  {
    title: 'PRODUCTS',
    links: [
      { title: 'Structural Steel', href: '/products/structural-steel' },
      { title: 'TMT Bar', href: '/products/tmt-bar' },
      { title: 'Specifications', href: '/products/specifications' },
      { title: 'Download Datasheets', href: '/datasheets', icon: <span aria-hidden>📥</span> },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Leadership Team', href: '/leadership' },
      { title: 'Our Story', href: '/story' },
      { title: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      { title: 'Contact Us', href: '/contact' },
      { title: 'FAQ', href: '/faq' },
      { title: 'Certifications', href: '/certifications' },
      { title: 'Delivery & Logistics', href: '/delivery' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
      { title: 'Cookie Policy', href: '/cookies' },
      { title: 'Disclaimer', href: '/disclaimer' },
    ],
  },
  {
    title: 'INVESTORS',
    links: [
      { title: 'Financial Highlights', href: '/investors/financials' },
      { title: 'Growth Trajectory', href: '/investors/growth' },
      { title: 'Investor Deck', href: '/investors/deck', icon: <span aria-hidden>📄</span> },
      { title: 'IR Contact', href: '/investors/contact' },
    ],
  },
];

const defaultSocial: SocialLink[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com', ariaLabel: 'LinkedIn' },
  { name: 'X', href: 'https://twitter.com', ariaLabel: 'Twitter / X' },
  { name: 'Instagram', href: 'https://www.instagram.com', ariaLabel: 'Instagram' },
  { name: 'WhatsApp', href: 'https://wa.me/918800106726', ariaLabel: 'WhatsApp' },
];

const Footer: React.FC<Props> = ({ columns = defaultColumns, socialLinks = defaultSocial, newsletterOnSubmit }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [inViewMap, setInViewMap] = useState<Record<string, boolean>>({});

  // Newsletter state
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'success' | 'submitting'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.fadeId;
        if (!id) return;
        if (entry.isIntersecting) {
          setInViewMap((s) => ({ ...s, [id]: true }));
        }
      });
    }, { threshold: 0.08 });

    const items = containerRef.current?.querySelectorAll('[data-fade-id]');
    items?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNewsletterSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMsg('');

    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setNewsletterStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setNewsletterStatus('submitting');
    try {
      // If parent wants to handle, call prop
      if (newsletterOnSubmit) {
        await Promise.resolve(newsletterOnSubmit(trimmed));
      }
      setNewsletterStatus('success');
      setEmail('');
    } catch (err) {
      setNewsletterStatus('error');
      setErrorMsg('Subscription failed. Please try again later.');
    }
  };

  // small helpers for styles
  const textSecondary = 'rgba(203,213,225,0.85)'; // #cbd5e1 at 0.85
  const textDim = 'rgba(203,213,225,0.65)';
  const accent = '#f59e0b'; // growth-500

  return (
    <footer
      ref={containerRef}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        paddingTop: 40,
        paddingBottom: 40,
      }}
      className="px-4 md:py-20 py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Columns */}
          {columns.map((col, colIdx) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="space-y-4"
              data-fade-id={`col-${colIdx}`}
              style={{ opacity: inViewMap[`col-${colIdx}`] ? 1 : 0, transform: inViewMap[`col-${colIdx}`] ? 'none' : 'translateY(8px)', transition: `opacity 0.6s ease-out ${colIdx * 0.05}s, transform 0.6s ease-out ${colIdx * 0.05}s` }}
            >
              <h4 className="text-white font-bold leading-tight" style={{ fontWeight: 700 }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, idx) => (
                  <li key={link.title}>
                    <a
                      href={link.href || '#'}
                      className="inline-flex items-center"
                      style={{ color: textSecondary, fontSize: col.title === 'LEGAL' ? 14 : 16, transition: 'color 0.25s ease, transform 0.25s ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = accent; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = textSecondary; }}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.icon && <span className="mr-2">{link.icon}</span>}
                      <span>{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter - place at end on desktop (keeps grid of 5) */}
          <div
            data-fade-id={`newsletter`}
            style={{ opacity: inViewMap['newsletter'] ? 1 : 0, transform: inViewMap['newsletter'] ? 'none' : 'translateY(8px)', transition: `opacity 0.6s ease-out ${0.25}s, transform 0.6s ease-out ${0.25}s` }}
            className="space-y-4"
          >
            <h4 className="text-white font-bold" style={{ fontWeight: 700 }}>Stay Updated</h4>
            <p style={{ color: textSecondary }}>Subscribe for growth updates and industry insights</p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-md px-3 py-2 bg-white/5 border border-white/10 text-white placeholder-white/60 focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-amber-500 text-white font-medium"
                style={{ background: accent }}
                disabled={newsletterStatus === 'submitting'}
              >
                {newsletterStatus === 'submitting' ? 'Submitting...' : 'Subscribe'}
              </button>
            </form>
            {newsletterStatus === 'success' && <p style={{ color: textSecondary }}>Thanks for subscribing!</p>}
            {newsletterStatus === 'error' && <p style={{ color: '#ffb4b4' }}>{errorMsg}</p>}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(203,213,225,0.3)' }} className="mt-8 pt-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div style={{ color: textSecondary }}>
              © 2026 Shree Balaji Rolling Mills. All rights reserved.
            </div>

            <div style={{ color: textDim }}>
              Registered office: Delhi NCR | Factory: Bhiwari, Haryana
            </div>

            <div style={{ color: textSecondary }}>
              Contact: <a href="tel:+918800106726" style={{ color: textSecondary }}>+91 88001 06726</a> | Email: <a href="mailto:shreebalajirmills@gmail.com" style={{ color: textSecondary }}>shreebalajirmills@gmail.com</a>
            </div>
          </div>

          {/* Social icons row */}
          <div className="mt-6 flex gap-3 items-center">
            {socialLinks.map((s, idx) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.ariaLabel || s.name}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center"
                style={{ width: 32, height: 32, color: '#ffffff', transition: 'transform 0.25s ease, color 0.25s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)'; (e.currentTarget as HTMLElement).style.color = accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
              >
                {/* Simple SVG icons by name - fallback circle if unknown */}
                {s.icon ? s.icon : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    {s.name.toLowerCase().includes('linkedin') && (
                      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4zM9 8.5h3.8v2.1h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.7 4.78 6.2V24h-4v-7.3c0-1.74 0-3.98-2.5-3.98-2.5 0-2.88 1.95-2.88 3.86V24H9z" />
                    )}
                    {s.name.toLowerCase().includes('twitter') && (
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-1.8 1.07-2.64 1.3A4.48 4.48 0 0 0 12 6.28v1A10.66 10.66 0 0 1 3.16 4.15 4.48 4.48 0 0 0 5.88 10.8a4.41 4.41 0 0 1-2.03-.56v.06a4.49 4.49 0 0 0 3.6 4.4 4.52 4.52 0 0 1-2.02.08 4.5 4.5 0 0 0 4.2 3.12A9 9 0 0 1 1 19.54 12.7 12.7 0 0 0 7 21c8.29 0 12.84-6.87 12.84-12.82 0-.2 0-.4-.02-.6A9.18 9.18 0 0 0 23 3z" />
                    )}
                    {s.name.toLowerCase().includes('instagram') && (
                      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm0 7.3A2.8 2.8 0 1 1 14.8 13 2.8 2.8 0 0 1 12 15.8zM18.5 6a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
                    )}
                    {s.name.toLowerCase().includes('whatsapp') && (
                      <path d="M20.5 3.5a11.9 11.9 0 0 0-17 0 11.9 11.9 0 0 0 0 17l-1.5 5 5-1.5a11.9 11.9 0 0 0 17 0 11.9 11.9 0 0 0 0-17zM12 19.5a7.5 7.5 0 0 1-4.13-1.25L6 18l1.81-1.75A7.5 7.5 0 1 1 12 19.5zM16 13.5c-.2-.1-1.2-.6-1.4-.6s-.4 0-.6.6c-.2.6-.6.8-1.2.6s-1.6-.6-2.9-1.9-1.9-2.2-1.9-2.9.4-1 1-1 1.2.2 1.6.6.6.6.9.6.3 0 .6-.6.2-1 .4-1.2.7-.4 1.6-.4 1.6.6 2 1.1 1 1.2 1.1 1.6.1 1-.3 1.6c-.4.7-1 1-1.2 1.1z" />
                    )}
                    {/* fallback */}
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Inline styles for responsive adjustments and smaller icon sizes on mobile */}
      <style>{`
        @media (max-width: 640px) {
          footer { padding-top: 3rem; padding-bottom: 3rem; }
          [data-fade-id] { transition-duration: 0.45s !important; }
          a[aria-label] { width: 24px !important; height: 24px !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
