'use client';

import React, { useState, useRef } from 'react';
import { FINANCIAL_METRICS } from '@/data/financial';
import { FinancialGrowthMetric } from '@/types';
import { BarChart3, Zap, Award, Download, TrendingUp, Layers, Activity } from 'lucide-react';
import { downloadDynamicPdf } from '@/lib/pdf-generator';
import { SteelSparksCanvas } from '@/components/3d/SteelSparksCanvas';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export const GrowthTimeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>(FINANCIAL_METRICS[0].year);
  const [chartMode, setChartMode] = useState<'revenue' | 'capacity' | 'ebitda'>('revenue');
  const [isManualSelection, setIsManualSelection] = useState<boolean>(false);
  const [chartLocked, setChartLocked] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll Driven Progression
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 30%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  const visibleProgress = useTransform(smoothProgress, (value) => {
    if (chartLocked) return 1;
    return Math.min(Math.max(value, 0), 1);
  });

  const activeMetric: FinancialGrowthMetric =
    FINANCIAL_METRICS.find((m) => m.year === selectedYear) || FINANCIAL_METRICS[0];

  // SVG Chart Geometry Constants
  const width = 560;
  const height = 240;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;
  const chartW = width - padLeft - padRight; // 470
  const chartH = height - padTop - padBottom; // 170

  // Calculate points dynamically based on chartMode
  const chartPoints = FINANCIAL_METRICS.map((item, idx) => {
    const cx = padLeft + (idx / (FINANCIAL_METRICS.length - 1)) * chartW;
    let val = item.revenueCr;
    let maxVal = 1000;
    let unit = '₹ Cr';
    let labelVal = `₹${item.revenueCr} Cr`;

    if (chartMode === 'capacity') {
      val = item.capacityTpa;
      maxVal = 200000;
      unit = 'TPA';
      labelVal = `${(item.capacityTpa / 1000).toFixed(0)}k TPA`;
    } else if (chartMode === 'ebitda') {
      val = item.ebitdaMarginPct;
      maxVal = 6;
      unit = '%';
      labelVal = `${item.ebitdaMarginPct}%`;
    }

    const ratio = Math.min(val / maxVal, 1);
    const cy = height - padBottom - ratio * chartH;

    return { ...item, cx, cy, val, maxVal, unit, labelVal };
  });

  // Dynamic SVG Bezier Smooth Curve & Area Path
  const pathD = chartPoints.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.cx} ${pt.cy}`;
    const prev = arr[i - 1];
    const cp1x = prev.cx + (pt.cx - prev.cx) / 2;
    const cp1y = prev.cy;
    const cp2x = prev.cx + (pt.cx - prev.cx) / 2;
    const cp2y = pt.cy;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.cx} ${pt.cy}`;
  }, '');

  const areaD = `${pathD} L ${chartPoints[chartPoints.length - 1].cx} ${height - padBottom} L ${chartPoints[0].cx} ${height - padBottom} Z`;

  // Dynamic Scroll Clip-Path width (draws graph progressively from padLeft to width - padRight)
  const clipWidth = useTransform(visibleProgress, [0, 1], [padLeft - 5, width - padRight + 10]);

  // Dynamic Cursor Glow position synchronized to scroll
  const tracerCx = useTransform(
    visibleProgress,
    [0, 0.25, 0.5, 0.75, 1],
    chartPoints.map((p) => p.cx)
  );
  const tracerCy = useTransform(
    visibleProgress,
    [0, 0.25, 0.5, 0.75, 1],
    chartPoints.map((p) => p.cy)
  );

  // Synchronize active year metric node with scroll progress
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (chartLocked) {
      setSelectedYear(FINANCIAL_METRICS[FINANCIAL_METRICS.length - 1].year);
      return;
    }

    if (isManualSelection) return;
    if (latest < 0.15) setSelectedYear(FINANCIAL_METRICS[0].year);
    else if (latest < 0.38) setSelectedYear(FINANCIAL_METRICS[1].year);
    else if (latest < 0.62) setSelectedYear(FINANCIAL_METRICS[2].year);
    else if (latest < 0.85) setSelectedYear(FINANCIAL_METRICS[3].year);
    else {
      setSelectedYear(FINANCIAL_METRICS[4].year);
      if (latest >= 0.98) {
        setChartLocked(true);
      }
    }
  });

  const handleManualYearSelect = (year: string) => {
    if (chartLocked) return;
    setIsManualSelection(true);
    setSelectedYear(year);
    setTimeout(() => setIsManualSelection(false), 5000);
  };

  const handleManualModeSelect = (mode: 'revenue' | 'capacity' | 'ebitda') => {
    if (chartLocked) return;
    setIsManualSelection(true);
    setChartMode(mode);
    setTimeout(() => setIsManualSelection(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="growth-timeline"
      className="py-28 bg-steel-base border-b border-steel-200 relative steel-grid-pattern overflow-hidden"
    >
      {/* 3D Liquid Metal Steel Sparks Canvas */}
      <SteelSparksCanvas />

      {/* Ambient Liquid Glass Light */}
      <div className="ambient-liquid-glow ambient-glow-growth top-1/3 right-10" />
      <div className="ambient-liquid-glow ambient-glow-authority bottom-10 left-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-growth-800 text-xs font-bold uppercase tracking-wider">
            Institutional Growth Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-steel-900 tracking-tight">
            Institutional Growth & <span className="text-gradient-growth">Scale Roadmap</span>
          </h2>
          <p className="text-base text-steel-600 leading-relaxed font-normal">
            Scroll down to watch the financial trajectory curve grow live alongside operational milestone expansion.
          </p>
        </div>

        {/* 3 Phase Cards in Liquid Glass */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="liquid-glass p-6 rounded-3xl border border-steel-200 relative space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-steel-500 uppercase tracking-widest font-mono">Phase 1</span>
              <span className="glass-pill px-2.5 py-0.5 text-xs font-semibold text-steel-700">Baseline</span>
            </div>
            <h3 className="text-xl font-bold text-steel-900">Baseline Foundation</h3>
            <p className="text-2xl font-black text-steel-900 font-mono">₹200 Cr Base</p>
            <p className="text-xs text-steel-600 font-normal">Initial production platform stabilization & foundation</p>
          </div>

          <div className="liquid-glass liquid-glass-contractor p-6 rounded-3xl border border-growth-400/40 relative space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-growth-800 uppercase tracking-widest font-mono">Phase 3</span>
              <span className="badge-contractor px-2.5 py-0.5 text-xs font-bold rounded-full border">Inflection</span>
            </div>
            <h3 className="text-xl font-bold text-steel-900">Capacity Inflection</h3>
            <p className="text-2xl font-black text-growth-700 font-mono">₹600 Cr Milestone</p>
            <p className="text-xs text-steel-700 font-normal">Revenue leap driven by TMT facility expansion & ramp-up</p>
          </div>

          <div className="liquid-glass liquid-glass-investor p-6 rounded-3xl border border-growth-600/40 relative space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-growth-900 uppercase tracking-widest font-mono">Phase 5</span>
              <span className="badge-investor px-2.5 py-0.5 text-xs font-bold rounded-full border">Scale</span>
            </div>
            <h3 className="text-xl font-bold text-steel-900">Scale & PAT Expansion</h3>
            <p className="text-2xl font-black text-growth-800 font-mono">₹1,000 Cr Target</p>
            <p className="text-xs text-steel-700 font-normal">Sustained market growth & profitability expansion milestone</p>
          </div>
        </div>

        {/* Phase Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {FINANCIAL_METRICS.map((metric) => {
            const isSelected = metric.year === selectedYear;
            return (
              <button
                key={metric.year}
                onClick={() => handleManualYearSelect(metric.year)}
                className={`glass-pill px-6 py-2.5 text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 text-amber-400 font-black border border-slate-700 shadow-md scale-105 ring-2 ring-amber-500/30'
                    : 'text-steel-600 hover:text-steel-900 hover:bg-steel-100'
                }`}
              >
                <span>{metric.year}</span>
                {metric.year === 'Phase 3' && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-growth-100 text-growth-800'
                    }`}
                  >
                    Inflection
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Liquid Glass Interactive Visualizer */}
        <div className="liquid-glass-prominent rounded-3xl p-6 sm:p-8 border border-steel-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          {/* Left Column: Interactive Vector Graph Visualizer */}
          <div className="lg:col-span-7 space-y-6">
            {/* Chart Header & Metric Selectors */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h4 className="text-base font-bold text-steel-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-growth-600" />
                <span>Financial Trajectory Curve</span>
              </h4>

              {/* Mode Toggles */}
              <div className="flex items-center gap-1.5 p-1 bg-steel-100 rounded-full border border-steel-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => handleManualModeSelect('revenue')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    chartMode === 'revenue'
                      ? 'bg-white text-growth-800 shadow-sm font-black'
                      : 'text-steel-600 hover:text-steel-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Revenue</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleManualModeSelect('capacity')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    chartMode === 'capacity'
                      ? 'bg-white text-trust-800 shadow-sm font-black'
                      : 'text-steel-600 hover:text-steel-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Capacity</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleManualModeSelect('ebitda')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    chartMode === 'ebitda'
                      ? 'bg-white text-amber-800 shadow-sm font-black'
                      : 'text-steel-600 hover:text-steel-900'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Margin %</span>
                </button>
              </div>
            </div>

            {/* Responsive Vector SVG Graph */}
            <div className="w-full bg-steel-50/80 rounded-2xl p-4 border border-steel-200 relative overflow-hidden shadow-inner">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                  </linearGradient>

                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Scroll Reveal Dynamic Clip Path */}
                  <clipPath id="scrollCurveClip">
                    <motion.rect x="0" y="0" height={height} style={{ width: clipWidth }} />
                  </clipPath>
                </defs>

                {/* Horizontal Gridlines */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
                  const y = height - padBottom - ratio * chartH;
                  return (
                    <line
                      key={idx}
                      x1={padLeft}
                      y1={y}
                      x2={width - padRight}
                      y2={y}
                      stroke="#cbd5e1"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Fill Area Gradient (Clipped to Scroll Progress) */}
                <motion.path
                  d={areaD}
                  fill="url(#growthGradient)"
                  clipPath="url(#scrollCurveClip)"
                  animate={{ d: areaD }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Smooth Vector Curve Line (Clipped to Scroll Progress) */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="#059669"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  clipPath="url(#scrollCurveClip)"
                  animate={{ d: pathD }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Traveling Scroll Glow Cursor Point */}
                <motion.g style={{ x: tracerCx, y: tracerCy }} clipPath="url(#scrollCurveClip)">
                  <circle r="12" className="fill-growth-500/30 animate-ping" />
                  <circle r="6" className="fill-growth-600 stroke-white stroke-2 shadow-lg" />
                </motion.g>

                {/* Data Points & Interactive Nodes */}
                {chartPoints.map((pt) => {
                  const isSelected = pt.year === selectedYear;

                  return (
                    <g key={pt.year} onClick={() => handleManualYearSelect(pt.year)} className="cursor-pointer group">
                      {/* Vertical Reference Line on Active Point */}
                      {isSelected && (
                        <motion.line
                          x1={pt.cx}
                          y1={padTop}
                          x2={pt.cx}
                          y2={height - padBottom}
                          stroke="#10b981"
                          strokeDasharray="3 3"
                          strokeWidth="1.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {/* Outer Pulse Circle */}
                      <motion.circle
                        animate={{ cx: pt.cx, cy: pt.cy, r: isSelected ? 10 : 6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={`transition-colors duration-300 ${
                          isSelected
                            ? 'fill-growth-500 stroke-growth-900 stroke-2 shadow-md'
                            : 'fill-white stroke-growth-600 stroke-2 group-hover:r-8'
                        }`}
                      />

                      {/* Inner Dot */}
                      <motion.circle
                        animate={{ cx: pt.cx, cy: pt.cy, r: isSelected ? 4 : 2 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={isSelected ? 'fill-slate-950' : 'fill-growth-600'}
                      />

                      {/* Hover / Active Badge Pill */}
                      <motion.text
                        animate={{ x: pt.cx, y: pt.cy - 14 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        textAnchor="middle"
                        className={`text-[10px] font-mono font-black ${
                          isSelected
                            ? 'fill-growth-800 font-extrabold text-xs'
                            : 'fill-steel-600 group-hover:fill-steel-900'
                        }`}
                      >
                        {pt.labelVal}
                      </motion.text>

                      {/* X-Axis Label */}
                      <text
                        x={pt.cx}
                        y={height - 12}
                        textAnchor="middle"
                        className={`text-[11px] font-mono font-bold ${
                          isSelected ? 'fill-steel-950 font-black' : 'fill-steel-500'
                        }`}
                      >
                        {pt.year}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right Column: Liquid Glass Active Metric Card */}
          <div className="lg:col-span-5 liquid-glass p-6 rounded-2xl border border-steel-200 space-y-5 bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-steel-200 pb-4">
              <div>
                <span className="text-xs font-bold text-growth-700 uppercase tracking-widest block font-mono">
                  Phase: {activeMetric.phase}
                </span>
                <h3 className="text-3xl font-black text-steel-900 mt-0.5">
                  {activeMetric.year} Metrics
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-steel-500 font-bold uppercase tracking-wider block">Total Platform</span>
                <span className="text-sm font-black text-trust-700 block mt-0.5">
                  {activeMetric.capacityTpa.toLocaleString()} TPA
                </span>
              </div>
            </div>

            <p className="text-xs text-steel-700 leading-relaxed italic p-3.5 rounded-xl bg-steel-50 border border-steel-200">
              &ldquo;{activeMetric.phaseDescription}&rdquo;
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3.5 rounded-xl bg-steel-50 border border-steel-200">
                <span className="text-[10px] text-steel-500 uppercase tracking-wider font-bold block">Revenue</span>
                <span className="text-xl font-black text-steel-900 mt-0.5 block">₹{activeMetric.revenueCr} Cr</span>
              </div>
              <div className="p-3.5 rounded-xl bg-steel-50 border border-steel-200">
                <span className="text-[10px] text-steel-500 uppercase tracking-wider font-bold block">EBITDA Margin</span>
                <span className="text-xl font-black text-growth-700 mt-0.5 block">{activeMetric.ebitdaMarginPct}%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-steel-50 border border-steel-200">
                <span className="text-[10px] text-steel-500 uppercase tracking-wider font-bold block">PAT Net Profit</span>
                <span className="text-xl font-black text-trust-700 mt-0.5 block">₹{activeMetric.patCr} Cr</span>
              </div>
              <div className="p-3.5 rounded-xl bg-steel-50 border border-steel-200">
                <span className="text-[10px] text-steel-500 uppercase tracking-wider font-bold block">PAT Margin</span>
                <span className="text-xl font-black text-authority-700 mt-0.5 block">{activeMetric.patMarginPct}%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-steel-200">
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-growth-600 shrink-0 mt-0.5" />
                <p className="text-xs text-steel-700 leading-snug">
                  <strong className="text-steel-900 font-bold block mb-0.5">Execution Highlight:</strong>
                  {activeMetric.keyHighlight}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Operating Leverage Key Insight Banner */}
        <div className="mt-8 p-6 rounded-3xl liquid-glass liquid-glass-contractor flex flex-col sm:flex-row items-center justify-between gap-4 border border-growth-400/40 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-growth-100 text-growth-700 shrink-0 border border-growth-300">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-steel-900">Operating Leverage Principle</h4>
              <p className="text-xs text-steel-700 mt-0.5">
                Fixed costs plateaued. Every incremental rupee of sales from TMT capacity expansion flows directly into EBITDA & net profit expansion.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                downloadDynamicPdf(
                  'SBMPL_FY30_Growth_Report.pdf',
                  'REPORT: Path to ₹1,000 Crore Growth Trajectory',
                  [
                    'Baseline FY26: Revenue ₹203 Cr | EBITDA 2.42% | PAT ₹0.95 Cr',
                    'Inflection FY27-FY28: Revenue ₹260 Cr -> ₹812 Cr | Capacity 180,000 TPA',
                    'Scale FY29-FY30: Revenue ₹903 Cr -> ₹1,006 Cr | PAT ₹30.00 Cr (2.98%)',
                    'Key Driver: Operating leverage & TMT Rebar Fe-500D 144,000 TPA expansion',
                    'Factory: Bhiwadi, Haryana | Head Office: Delhi NCR'
                  ]
                );
              }}
              className="btn-secondary px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-growth-700" />
              <span>Download Report.pdf</span>
            </button>

            <a
              href="#inquiry-portal"
              className="btn-primary px-5 py-2.5 rounded-full text-xs font-bold"
            >
              Investor Deck Request
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
