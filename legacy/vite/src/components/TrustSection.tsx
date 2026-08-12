import React, { useEffect, useRef } from 'react';
import './TrustSection.css';

export type LogoData = { id?: string; src: string; alt?: string };
export type CertificationData = { id?: string; iconSrc?: string; title: string; alt?: string };
export type StatData = { id?: string; label: string; value: string; subtext?: string };

type Props = {
  logos?: LogoData[];
  certifications?: CertificationData[];
  stats?: StatData[];
  testimonials?: string[];
};

const TrustSection: React.FC<Props> = ({ logos = [], certifications = [], stats = [], testimonials }) => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const statEls = Array.from(root.querySelectorAll<HTMLElement>('[data-stat-value]'));
    const animatedChecked = new Set<Element>();

    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('in-view');

          if (el.hasAttribute('data-stat-value') && !animatedChecked.has(el)) {
            animatedChecked.add(el);
            const target = parseFloat(el.getAttribute('data-stat-value') || '0');
            const isNumber = !Number.isNaN(target) && isFinite(target);
            if (isNumber) countUp(el, target, 1500);
          }
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.15 });

    // Observe stat numbers and animated items (checkmarks and logos)
    statEls.forEach((el) => observer.observe(el));

    const animatedEls = Array.from(root.querySelectorAll<HTMLElement>('.animate-on-scroll'));
    animatedEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function countUp(el: HTMLElement, target: number, duration = 1500) {
    const start = performance.now();
    const startVal = 0;
    const isInteger = Number.isInteger(target);

    function frame(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const value = startVal + (target - startVal) * easeOutCubic(progress);
      el.textContent = isInteger ? Math.round(value).toLocaleString() : value.toFixed(0);
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  return (
    <section className="trust-section" ref={rootRef} aria-labelledby="trust-heading">
      <div className="trust-inner">
        <header className="trust-header">
          <h2 id="trust-heading" className="trust-title">Why Shree Balaji?</h2>
          <h3 className="trust-subtitle">Trusted by Northern India's Most Demanding Projects</h3>
        </header>

        <div className="trust-grid">
          {/* Certifications & Compliance */}
          <article className="trust-card">
            <h4 className="sub-title text-trust">CERTIFICATIONS & COMPLIANCE</h4>
            <ul className="badge-grid" aria-label="Certifications">
              {certifications.map((c, idx) => (
                <li key={c.id || c.title} className="badge glass-pill animate-on-scroll" style={{ transitionDelay: `${idx * 80}ms` }}>
                  {c.iconSrc ? (
                    <img src={c.iconSrc} alt={c.alt || c.title} className="badge-icon" loading="lazy" />
                  ) : (
                    <span className="badge-icon-placeholder" aria-hidden>🏷️</span>
                  )}
                  <span className="badge-text">{c.title}</span>
                </li>
              ))}
            </ul>
            <p className="supporting text-secondary">Every product certified to Indian Standards. Quality is non-negotiable.</p>
          </article>

          {/* Manufacturing Scale */}
          <article className="trust-card">
            <h4 className="sub-title text-authority">MANUFACTURING SCALE</h4>
            <div className="stats-row">
              {stats.map((s, idx) => (
                <div key={s.id || s.label} className="card-capacity animate-on-scroll" style={{ transitionDelay: `${idx * 120}ms` }}>
                  <div className="stat-label">{s.label}</div>
                  <h3 className="stat-value-wrap">
                    <span className="stat-value animate-on-scroll" data-stat-value={extractNumeric(s.value)} aria-label={s.value}>0</span>
                    <span className="stat-unit">{extractUnit(s.value)}</span>
                  </h3>
                  <div className="stat-subtext">{s.subtext}</div>
                </div>
              ))}
            </div>
            <p className="supporting text-secondary">5x scale-up ensures your supply is never a constraint.</p>
          </article>

          {/* Customer Logos */}
          <article className="trust-card">
            <h4 className="sub-title text-growth">TRUSTED BY INDIA'S LARGEST PROJECTS</h4>
            <div className="logo-grid" aria-live="polite">
              {logos.slice(0, 10).map((logo, idx) => (
                <div key={logo.id || idx} className="logo-container animate-on-scroll" style={{ transitionDelay: `${idx * 80}ms` }} tabIndex={0} role="button" aria-label={logo.alt || `Customer logo ${idx + 1}`}>
                  <img src={logo.src} alt={logo.alt || 'Customer logo'} loading="lazy" />
                </div>
              ))}
            </div>
            <p className="fallback text-muted">+ 50 more projects across Northern India</p>
            <p className="supporting text-secondary">₹203 Cr FY26 revenue from Northern India's biggest construction, infrastructure, and industrial players.</p>
          </article>

          {/* Delivery & Reliability */}
          <article className="trust-card">
            <h4 className="sub-title text-trust">DELIVERY & RELIABILITY</h4>
            <ul className="checklist card-trust">
              {[
                '2–4 week lead times (competitive)',
                'On-time delivery commitment: 98%+',
                'Regional logistics optimized (Delhi NCR hub)',
                'Bulk delivery for infrastructure projects',
              ].map((text, idx) => (
                <li key={text} className="check-item animate-on-scroll" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <span className="check-icon animate-on-scroll" aria-hidden>✓</span>
                  <span className="check-text text-secondary">{text}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {testimonials && testimonials.length > 0 && (
          <aside className="testimonials">
            <h4 className="sub-title">Testimonials</h4>
            <ul>
              {testimonials.map((t, i) => (
                <li key={i} className="text-secondary">“{t}”</li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </section>
  );
};

function extractNumeric(str: string) {
  // tries to extract numeric value from a string like "36,000 TPA" or "144000"
  const digits = (str || '').replace(/[^0-9.]/g, '');
  return digits || '0';
}

function extractUnit(str: string) {
  // return non-digit portion (units/labels) e.g. "36,000 TPA" -> "TPA"
  if (!str) return '';
  return str.replace(/[0-9,\.]/g, '').trim();
}

export default TrustSection;
