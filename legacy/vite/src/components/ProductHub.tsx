import React, { useEffect, useRef, useState } from 'react';

interface ProductHubProps {
  onDownloadStructural: () => void;
  onDownloadTMT: () => void;
  showComparison?: boolean;
}

const diagonalPatternDataUri = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cdefs%3E%3Cpattern id='p' width='12' height='12' patternUnits='userSpaceOnUse'%3E%3Cpath d='M-1,1 l2,-2 M0,12 l12,-12 M10,13 l2,-2' stroke='%23e6e7e9' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E`;

export const ProductHub: React.FC<ProductHubProps> = ({
  onDownloadStructural,
  onDownloadTMT,
  showComparison = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<'structural' | 'tmt' | null>(null);
  const [showTable, setShowTable] = useState<boolean>(!!showComparison);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const structuralStyle: React.CSSProperties = {
    borderLeft: hovered === 'structural' ? '4px solid #f59e0b' : '4px solid #d97706',
    transition: 'border-color 180ms ease, box-shadow 180ms ease',
    boxShadow: hovered === 'structural' ? '0 20px 40px rgba(15,23,42,0.12)' : undefined,
  };

  const tmtStyle: React.CSSProperties = {
    borderLeft: hovered === 'tmt' ? '4px solid #10b981' : '4px solid #059669',
    transition: 'border-color 180ms ease, box-shadow 180ms ease',
    boxShadow: hovered === 'tmt' ? '0 20px 40px rgba(2,132,102,0.08)' : undefined,
  };

  return (
    <section
      ref={ref}
      aria-labelledby="producthub-title"
      className="py-12 px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: `linear-gradient(135deg, #fffbeb 0%, #f8fafc 50%, #fffbeb 100%), url('${diagonalPatternDataUri}')`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          transition: 'transform 700ms cubic-bezier(.22,.9,.25,1), opacity 700ms ease',
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            id="producthub-title"
            className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-sky-600 to-emerald-600"
          >
            Our Steel Manufacturing Platform
          </h2>

          <div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowTable((s) => !s)}
              aria-pressed={showTable}
              aria-label="Toggle comparison table"
            >
              {showTable ? 'Hide Comparison' : 'Show Comparison'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Structural Steel Card */}
          <article
            className="liquid-glass-prominent relative rounded-xl p-6 transform transition-transform duration-300 ease-out hover:-translate-y-1.5"
            style={structuralStyle}
            aria-labelledby="structural-title"
            onMouseEnter={() => setHovered('structural')}
            onMouseLeave={() => setHovered(null)}
          >
            <h3 id="structural-title" className="text-xl font-semibold text-[#0f172a] mb-2">
              STRUCTURAL STEEL
            </h3>

            <div className="inline-flex items-center mb-4">
              <span className="glass-pill text-sm px-3 py-1 rounded-full bg-amber-50 text-amber-800 shadow-sm">
                Grade A | 250–400 MPa Tensile
              </span>
            </div>

            <ul className="space-y-2 mb-4">
              <li className="flex items-start text-sm">
                <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                </svg>
                <span>BIS: IS 2062</span>
              </li>
              <li className="flex items-start text-sm">
                <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                </svg>
                <span>ISO 9001:2015</span>
              </li>
            </ul>

            <div className="mb-3 font-mono font-bold text-lg">36,000 TPA | 3,000 MT/month</div>
            <div className="text-sm text-gray-500 mb-4">Lead Time: 2–4 weeks</div>

            <div className="mt-4">
              <button
                type="button"
                className="btn-secondary inline-flex items-center gap-2"
                onClick={onDownloadStructural}
                aria-label="Download Structural Steel Spec Sheet"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 16l4-5h-3V4h-2v7H8l4 5z" />
                  <path d="M20 18H4v2h16v-2z" />
                </svg>
                Download Spec Sheet
              </button>
            </div>
          </article>

          {/* TMT Bar Card */}
          <article
            className="liquid-glass-prominent relative rounded-xl p-6 transform transition-transform duration-300 ease-out hover:-translate-y-1.5"
            style={tmtStyle}
            aria-labelledby="tmt-title"
            onMouseEnter={() => setHovered('tmt')}
            onMouseLeave={() => setHovered(null)}
          >
            <h3 id="tmt-title" className="text-xl font-semibold text-[#0f172a] mb-2">
              TMT BAR (NEW) <span aria-hidden>🚀</span>
            </h3>

            <div className="inline-flex items-center mb-4">
              <span className="glass-pill text-sm px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 shadow-sm">
                India's Fastest-Growing Steel Segment
              </span>
            </div>

            <ul className="space-y-2 mb-4">
              <li className="flex items-start text-sm">
                <svg className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                </svg>
                <span>BIS 1786-2015</span>
              </li>
              <li className="flex items-start text-sm">
                <svg className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                </svg>
                <span>ISO 9001:2015</span>
              </li>
              <li className="flex items-start text-sm">
                <svg className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                </svg>
                <span>Earthquake-Resistant</span>
              </li>
            </ul>

            <div className="mb-3 font-mono font-bold text-lg">144,000 TPA | 12,000 MT/month</div>
            <div className="text-sm text-gray-500 mb-4">Lead Time: 1–3 weeks</div>

            <div className="mt-4">
              <button
                type="button"
                className="btn-secondary inline-flex items-center gap-2"
                onClick={onDownloadTMT}
                aria-label="Download TMT Bar Spec Sheet"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 16l4-5h-3V4h-2v7H8l4 5z" />
                  <path d="M20 18H4v2h16v-2z" />
                </svg>
                Download Spec Sheet
              </button>
            </div>
          </article>
        </div>

        {/* Comparison Table (hidden on mobile) */}
        {showTable && (
          <div className="mt-8 overflow-auto hidden md:block">
            <table className="w-full table-fixed text-left border-collapse bg-white/50 backdrop-blur rounded-lg shadow-sm">
              <thead>
                <tr>
                  <th className="p-3 font-medium">Feature</th>
                  <th className="p-3 font-medium">STRUCTURAL STEEL</th>
                  <th className="p-3 font-medium">TMT BAR (NEW)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 align-top">Grade / Tensile</td>
                  <td className="p-3">Grade A | 250–400 MPa</td>
                  <td className="p-3">Multiple grades | Earthquake-focused</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 align-top">Certifications</td>
                  <td className="p-3">BIS: IS 2062 | ISO 9001:2015</td>
                  <td className="p-3">BIS 1786-2015 | ISO 9001:2015</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 align-top">Capacity</td>
                  <td className="p-3">36,000 TPA | 3,000 MT/month</td>
                  <td className="p-3">144,000 TPA | 12,000 MT/month</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 align-top">Lead Time</td>
                  <td className="p-3">2–4 weeks</td>
                  <td className="p-3">1–3 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductHub;
