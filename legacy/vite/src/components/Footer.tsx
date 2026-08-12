import React, { useEffect, useRef, useState } from 'react';

export type FooterLink = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon?: React.ReactNode; // optional custom icon
};

type Props = {
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  newsletterOnSubmit?: (email: string) => void;
};

const defaultColumns: FooterColumn[] = [
  {
    title: 'PRODUCTS',
    links: [
      { label: 'Structural Steel', href: '/products/structural-steel' },
      { label: 'TMT Bar', href: '/products/tmt-bar' },
      { label: 'Specifications', href: '/products/specifications' },
      { label: 'Download Datasheets', href: '/assets/datasheets/datasheet.pdf', icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 16l4-5h-3V4h-2v7H8l4 5zM4 20h16v2H4v-2z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Leadership Team', href: '/leadership' },
      { label: 'Our Story', href: '/our-story' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Delivery & Logistics', href: '/delivery-logistics' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
  {
    title: 'INVESTORS',
    links: [
      { label: 'Financial Highlights', href: '/investors/financial-highlights' },
      { label: 'Growth Trajectory', href: '/investors/growth-trajectory' },
      { label: 'Investor Deck', href: '/assets/investor-deck.pdf', icon: (
          <svg width="14" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M14 2H6a2 2 0 0 0-2 2v16l4-2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM8 8h8v2H8V8z" />
          </svg>
        ),
      },
      { label: 'IR Contact', href: '/investors/contact' },
    ],
  },
];

const defaultSocial: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/shree-balaji-rolling-mills',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8.98h4.56V24H.2V8.98zM8.98 8.98h4.38v2.06h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 6.99V24h-4.56v-7.63c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.98-2.93 4.02V24H8.98V8.98z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/shreebalaji',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M23 3.01a9.35 9.35 0 0 1-2.69.74 4.7 4.7 0 0 0 2.06-2.59 9.42 9.42 0 0 1-2.98 1.14 4.7 4.7 0 0 0-8.01 4.29A13.34 13.34 0 0 1 1.64 2.16a4.7 4.7 0 0 0 1.45 6.27 4.66 4.66 0 0 1-2.13-.59v.06a4.7 4.7 0 0 0 3.77 4.61 4.66 4.66 0 0 1-2.12.08 4.7 4.7 0 0 0 4.39 3.26A9.42 9.42 0 0 1 1 20.54a13.31 13.31 0 0 0 7.22 2.12c8.66 0 13.39-7.17 13.39-13.38l-.01-.61A9.5 9.5 0 0 0 23 3.01z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/shreebalajicom',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zM12 7.75A4.25 4.25 0 1 0 12 16.25 4.25 4.25 0 0 0 12 7.75zm0 2.06a2.19 2.19 0 1 1 0 4.38 2.19 2.19 0 0 1 0-4.38zM17.8 6.2a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/918800106726?text=Hello%20Shree%20Balaji',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .12 5.25.12 11.88c0 2.09.55 4.13 1.6 5.92L0 24l6.36-1.67A11.86 11.86 0 0 0 12 23.76c6.63 0 11.88-5.25 11.88-11.88 0-3.18-1.24-6.17-3.36-8.4zM12 21.76c-1.3 0-2.57-.34-3.7-.99l-.26-.15-3.78.99.99-3.69-.17-.27A8.4 8.4 0 0 1 3.12 11.88C3.12 7.06 7.18 3 12 3c2.2 0 4.26.68 5.95 1.95A8.31 8.31 0 0 1 20.88 11.9c0 4.82-4.06 8.86-8.88 8.86zM17.1 14.3c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.33.2-.61.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.86-.15-.27-.02-.42.12-.56.12-.12.27-.33.41-.5.14-.17.18-.28.27-.46.09-.18.04-.34-.02-.48-.07-.14-.61-1.5-.84-2.05-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.64 1.12 2.82.14.18 1.93 3.03 4.68 4.25 3.27 1.42 3.27 0.95 3.85.89.59-.07 1.92-.78 2.19-1.53.27-.74.27-1.38.19-1.53-.08-.16-.27-.27-.54-.41z" />
      </svg>
    ),
  },
];

export default function Footer({ columns = defaultColumns, socialLinks = defaultSocial, newsletterOnSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Intersection observer for fade-in stagger
    const el = containerRef.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll('.fade-in')) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const idx = Number(target.dataset.index || '0');
            target.style.transition = `opacity 0.6s ease-out ${idx * 0.05}s, transform 0.6s ease-out ${idx * 0.05}s`;
            target.classList.add('in-view');
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.08 }
    );

    items.forEach((it) => io.observe(it));

    return () => io.disconnect();
  }, [columns]);

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setError(null);
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setMsg('Thanks for subscribing!');
    // capture before clearing
    const submittedEmail = email;
    setEmail('');
    if (newsletterOnSubmit) {
      try {
        newsletterOnSubmit(submittedEmail);
      } catch (err) {
        // swallow errors from handler
      }
    }
  };

  // Utility to download files (fetch + blob) so PDF/data links work cross-origin-safe when hosted
  const downloadFile = async (url: string, suggestedName?: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        // fallback to opening in new tab
        window.open(url, '_blank', 'noopener');
        return;
      }
      const blob = await res.blob();
      const link = document.createElement('a');
      const href = window.URL.createObjectURL(blob);
      link.href = href;
      link.download = suggestedName || url.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(href);
    } catch (err) {
      // last resort: open the URL
      window.open(url, '_blank', 'noopener');
    }
  };

  return (
    <footer
      ref={containerRef}
      className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-20 px-4 sm:py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 sm:gap-6 grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-5">
          {/* Columns */}
          {columns.map((col, colIndex) => (
            <nav key={col.title} aria-labelledby={`footer-${colIndex}`} className="fade-in opacity-0 transform translate-y-4" data-index={colIndex}>
              <h4 id={`footer-${colIndex}`} className="text-white font-bold mb-4 text-base lg:text-lg">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link, i) => (
                  <li key={link.label}>
                    <a
                      href={link.href || '#'}
                      className="inline-flex items-center gap-2 text-[rgba(203,213,225,0.85)] text-base hover:text-[#f59e0b]"
                      style={{ transition: 'color 250ms ease, transform 250ms ease' }}
                      aria-label={link.label}
                    >
                      {link.icon && <span className="shrink-0">{link.icon}</span>}
                      <span className={col.title === 'LEGAL' ? 'text-[0.875rem]' : ''}>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

        </div>

        {/* Newsletter full-width row (separate section) */}
        <div className="mt-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="lg:w-1/2 fade-in opacity-0 transform translate-y-4" data-index={columns.length}>
              <h4 className="text-white font-bold mb-2">Stay Updated</h4>
              <p className="text-[rgba(203,213,225,0.85)] mb-4">Subscribe for growth updates and industry insights</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Email address"
                  className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[rgba(203,213,225,0.6)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] w-full sm:w-auto"
                />
                <button
                  type="submit"
                  className="bg-[#f59e0b] text-[#0f172a] px-4 py-2 rounded text-sm font-medium hover:brightness-95 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              {msg && <p className="text-green-300 text-sm mt-2">{msg}</p>}
            </div>

            {/* Social icons placed to the right on large screens */}
            <div className="lg:w-1/2 flex lg:justify-end items-center fade-in opacity-0 transform translate-y-4" data-index={columns.length + 1}>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="text-white w-8 h-8 flex items-center justify-center rounded transform hover:scale-[1.2] hover:text-[#f59e0b]"
                    style={{ transition: 'transform 250ms ease' }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {s.icon ? s.icon : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social icons + company info */}
        <div className="mt-10 border-t" style={{ borderColor: 'rgba(203, 213, 225, 0.3)' }}>
          <div className="pt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* kept for visual/ordering parity but social icons are already shown above on larger screens */}
            </div>

            <div className="flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
              <div className="text-[rgba(203,213,225,0.85)] text-sm">
                © 2026 Shree Balaji Rolling Mills. All rights reserved.
              </div>

              <div className="text-[rgba(203,213,225,0.7)] text-sm">
                Registered office: <span className="text-[rgba(203,213,225,0.6)]">Delhi NCR</span> | Factory: <span className="text-[rgba(203,213,225,0.6)]">Bhiwari, Haryana</span>
              </div>

              <div className="text-[rgba(203,213,225,0.85)] text-sm">
                Contact: <a className="hover:text-[#f59e0b]" href="tel:+918800106726">+91 88001 06726</a> | Email: <a className="hover:text-[#f59e0b]" href="mailto:shreebalajirmills@gmail.com">shreebalajirmills@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles for fade-in baseline and responsive tweaks */}
      <style>{`
        .fade-in { opacity: 0; transform: translateY(16px); }
        .fade-in.in-view { opacity: 1; transform: translateY(0); }

        @media (max-width: 640px) {
          /* mobile tweaks: smaller icons and font sizes */
          a > svg { width: 16px !important; height: 16px !important; }
          /* h4 and links scale down on mobile */
          footer h4 { font-size: 1rem !important; }
          footer a { font-size: 0.875rem !important; }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          /* tablet: ensure compact sizing */
          footer h4 { font-size: 1.05rem; }
          footer a { font-size: 0.95rem; }
        }
      `}</style>
    </footer>
  );
}
