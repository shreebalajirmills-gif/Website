import React, { useEffect, useRef, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

import './GrowthTimeline.css';

type GrowthDatum = {
  year: string; // FY26, FY27, ...
  revenue: number; // in crores
  ebitdaVolume: number; // absolute volume (crores)
  patMargin: number; // percent (e.g., 2.98)
};

type GrowthTimelineProps = {
  data?: GrowthDatum[];
  interactive?: boolean;
  showChart?: boolean;
};

// Helper to format INR crores with rupee symbol — simple formatter
const formatINRCrores = (val?: number) => {
  if (val === undefined || val === null) return '-';
  return `₹${val.toLocaleString('en-IN')} Cr`;
};

export const GrowthTimeline: React.FC<GrowthTimelineProps> = ({
  data = [],
  interactive = true,
  showChart = true,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!interactive) {
      setVisible(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [interactive]);

  // Derived values for badges and phase content — keep static per spec
  const phaseBlocks = [
    {
      id: 'phase-1',
      badge: 'BASELINE (FY26)',
      revenueText: '₹203 Cr',
      revenueClass: 'phase-revenue-dark',
      metric: 'Sub-1% Margins',
      description: 'Stabilization phase, preserved margins despite market contraction',
      bg: 'rgba(254, 243, 199, 0.3)', // subtle amber tint
      badgeTint: 'steel',
    },
    {
      id: 'phase-2',
      badge: 'INFLECTION (FY27-FY28)',
      revenueText: '₹260→812 Cr',
      revenueClass: 'text-gradient-growth',
      metric: '300% Revenue Jump',
      metricBold: true,
      description: 'Scale activation, margin expansion to 4.95% EBITDA',
      bg: '#fffbeb',
      badgeTint: 'growth',
    },
    {
      id: 'phase-3',
      badge: 'SCALE (FY29-FY30)',
      revenueText: '₹903–1,006 Cr',
      revenueClass: 'text-trust',
      metric: '4.78% EBITDA, 2.98% PAT Margin',
      description: 'Sustained double-digit growth, market dominance',
      bg: '#f0fdf4',
      badgeTint: 'emerald',
    },
  ];

  // Tooltip formatter
  const tooltipFormatter = (value: any, name: string) => {
    if (name === 'revenue') return [formatINRCrores(value), 'Revenue'];
    if (name === 'ebitdaVolume') return [formatINRCrores(value), 'EBITDA Volume'];
    if (name === 'patMargin') return [`${value}%`, 'PAT Margin'];
    return [value, name];
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="growth-timeline-title"
      style={{
        padding: '3rem 1rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #fffbeb 100%)',
      }}
    >
      <h2
        id="growth-timeline-title"
        className="text-gradient-growth"
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '1.75rem',
        }}
      >
        The Path to ₹1,000 Crore: Three Phases of Growth
      </h2>

      <div
        className={`timeline ${visible ? 'in-view' : ''}`}
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'stretch',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {phaseBlocks.map((p) => (
          <article
            key={p.id}
            className={`phase-block ${visible ? 'scale-in' : ''}`}
            style={{
              background: p.bg,
              borderRadius: 12,
              padding: '1rem',
              minWidth: 260,
              flex: '1 1 300px',
              boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
              transition: 'transform 480ms cubic-bezier(.2,.9,.2,1)',
            }}
            aria-labelledby={`${p.id}-title`}
          >
            <div
              className={`glass-pill badge-${p.badgeTint}`}
              style={{
                display: 'inline-block',
                padding: '6px 10px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(6px)',
                color: '#0f172a',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {p.badge}
            </div>

            <h4
              id={`${p.id}-title`}
              className={p.revenueClass}
              style={{ fontSize: '1.125rem', margin: '6px 0', fontWeight: 800, color: '#0f172a' }}
            >
              {p.revenueText}
            </h4>
            <div style={{ marginBottom: 8 }}>
              <div
                className="phase-metric"
                style={{ fontWeight: p.metricBold ? 700 : 500, color: '#374151' }}
              >
                {p.metric}
              </div>
            </div>
            <p style={{ margin: 0, color: '#334155' }}>{p.description}</p>
          </article>
        ))}
      </div>

      {showChart && (
        <article
          aria-label="Growth chart"
          style={{ marginTop: '2rem', width: '100%', maxWidth: 1120, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div style={{ width: '100%', height: 360 }}>
            <ResponsiveContainer>
              <LineChart
                data={data}
                margin={{ top: 8, right: 40, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e9ef" />
                <XAxis dataKey="year" />

                <YAxis
                  yAxisId="left"
                  tickFormatter={(v) => `${v}`}
                  label={{ value: '₹ Crore', angle: -90, position: 'insideLeft' }}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 'dataMax + 2']}
                />

                <Tooltip formatter={tooltipFormatter} />
                <Legend verticalAlign="top" height={36} />

                {/* EBITDA as area */}
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="ebitdaVolume"
                  name="EBITDA Volume"
                  stroke="#059669"
                  fill="#bbf7d0"
                  fillOpacity={0.6}
                  isAnimationActive={visible}
                  animationDuration={800}
                  animationEasing="ease-out"
                />

                {/* Revenue as line */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#d97706"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  isAnimationActive={visible}
                  animationDuration={800}
                  animationEasing="ease-out"
                />

                {/* PAT margin on secondary axis */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="patMargin"
                  name="PAT Margin"
                  stroke="#0284c7"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  isAnimationActive={visible}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            className="key-insight"
            role="note"
            aria-label="Key insight"
            style={{
              marginTop: 18,
              padding: '1rem 1.25rem',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.6)',
              boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
              backdropFilter: 'blur(8px)',
              maxWidth: 1120,
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 20 }} aria-hidden>
              💡
            </div>
            <div style={{ color: '#0f172a', fontWeight: 600 }}>
              Profitability outpaces revenue. Fixed costs plateaued; every incremental rupee of sales → bottom line.
            </div>
          </div>
        </article>
      )}

    </section>
  );
};

export default GrowthTimeline;
