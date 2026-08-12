import React, { useEffect, useRef } from 'react';
import type { LogoData, CertificationData, StatData } from './TrustSection';

type Props = {
  logos: LogoData[];
  certifications: CertificationData[];
  stats: StatData[];
  testimonials?: string[];
};

// Tailwind-compatible version of the TrustSection component. This file intentionally uses
// Tailwind utility class names but does NOT add Tailwind to the project. To enable,
// install Tailwind and configure PostCSS, then import this component instead of the CSS
// version.

const TrustSectionTailwind: React.FC<Props> = ({ logos, certifications, stats, testimonials }) => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const animatedEls = Array.from(root.querySelectorAll<HTMLElement>('.animate-on-scroll'));
    const animatedChecked = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          if (el.hasAttribute('data-stat-value') && !animatedChecked.has(el)) {
            animatedChecked.add(el);
            const target = parseFloat(el.getAttribute('data-stat-value') || '0');
            if (!Number.isNaN(target) && isFinite(target)) countUp(el, target, 1500);
          }
        }
      });
    }, { threshold: 0.15 });

    animatedEls.forEach((el, i) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function countUp(el: HTMLElement, target: number, duration = 1500) {
    const start = performance.now();
    const startVal = 0;
    function frame(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const value = startVal + (target - startVal) * easeOutCubic(progress);
      el.textContent = Math.round(value).toLocaleString();
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

  return (
    <section ref={rootRef} className="bg-gradient-to-br from-[#f0fdf4] via-[#f8fafc] to-[#f0fdf4] p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-7">
          <h2 className="text-2xl font-semibold text-[#0f172a]">Why Shree Balaji?</h2>
          <h3 className="text-lg text-emerald-900">Trusted by Northern India's Most Demanding Projects</h3>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <article>
            <h4 className="text-sm tracking-wider text-emerald-800 mb-3">CERTIFICATIONS & COMPLIANCE</h4>
            <ul className="grid grid-cols-2 gap-2 md:grid-cols-4" aria-label="Certifications">
              {certifications.map((c, idx) => (
                <li key={c.id || c.title} className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-100 shadow-sm animate-on-scroll" style={{ transitionDelay: `${idx * 80}ms` }}>
                  {c.iconSrc ? <img src={c.iconSrc} alt={c.alt || c.title} className="w-9 h-9 object-contain" loading="lazy"/> : <span aria-hidden>🏷️</span>}
                  <span className="font-semibold">{c.title}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 mt-3">Every product certified to Indian Standards. Quality is non-negotiable.</p>
          </article>

          <article>
            <h4 className="text-sm tracking-wider text-sky-800 mb-3">MANUFACTURING SCALE</h4>
            <div className="flex flex-col gap-3 md:flex-row">
              {stats.map((s, idx) => (
                <div key={s.id || s.label} className="bg-white/80 p-3 rounded shadow animate-on-scroll" style={{ transitionDelay: `${idx * 120}ms` }}>
                  <div className="text-sm text-gray-700">{s.label}</div>
                  <h3 className="font-mono text-sky-600 text-xl" data-stat-value={extractNumeric(s.value)}>0</h3>
                  <div className="text-gray-600 text-sm">{s.subtext}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mt-3">5x scale-up ensures your supply is never a constraint.</p>
          </article>

          <article>
            <h4 className="text-sm tracking-wider text-violet-700 mb-3">TRUSTED BY INDIA'S LARGEST PROJECTS</h4>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6" aria-live="polite">
              {logos.slice(0,10).map((logo, idx) => (
                <div key={logo.id || idx} className="w-24 h-24 mx-auto flex items-center justify-center opacity-70 hover:opacity-100 transition transform animate-on-scroll" style={{ transitionDelay: `${idx * 80}ms` }} tabIndex={0} role="button" aria-label={logo.alt || `Customer logo ${idx+1}`}>
                  <img src={logo.src} alt={logo.alt || `Logo ${idx+1}`} className="max-w-4/5 max-h-4/5 grayscale hover:grayscale-0 transition" loading="lazy" />
                </div>
              ))}
            </div>
            <p className="font-semibold mt-2">+ 50 more projects across Northern India</p>
            <p className="text-gray-600 mt-1">₹203 Cr FY26 revenue from Northern India's biggest construction, infrastructure, and industrial players.</p>
          </article>

          <article>
            <h4 className="text-sm tracking-wider text-emerald-800 mb-3">DELIVERY & RELIABILITY</h4>
            <ul className="space-y-3 bg-white/80 p-3 rounded">
              {[
                '2–4 week lead times (competitive)',
                'On-time delivery commitment: 98%+',
                'Regional logistics optimized (Delhi NCR hub)',
                'Bulk delivery for infrastructure projects',
              ].map((text, idx) => (
                <li key={text} className="flex items-start gap-3 animate-on-scroll" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-sm text-emerald-600 bg-emerald-50">✓</span>
                  <span className="text-gray-600">{text}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {testimonials && testimonials.length > 0 && (
          <aside className="mt-4 p-3">
            <h4 className="text-sm">Testimonials</h4>
            <ul>
              {testimonials.map((t,i) => <li key={i} className="text-gray-600">“{t}”</li>)}
            </ul>
          </aside>
        )}
      </div>
    </section>
  );
};

function extractNumeric(str: string) { return (str || '').replace(/[^0-9.]/g, '') || '0'; }

export default TrustSectionTailwind;
