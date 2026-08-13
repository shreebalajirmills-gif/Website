'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedGrowthGraphBackground: React.FC = () => {
  // Chart points matching FY26 - FY30 trajectory (₹203 Cr -> ₹1,006 Cr)
  const points = [
    { x: 30, y: 175, label: 'FY26', val: '₹203 Cr' },
    { x: 110, y: 165, label: 'FY27', val: '₹260 Cr' },
    { x: 190, y: 100, label: 'FY28', val: '₹812 Cr' },
    { x: 270, y: 80, label: 'FY29', val: '₹903 Cr' },
    { x: 360, y: 35, label: 'FY30', val: '₹1,006 Cr' },
  ];

  // Smooth Bezier Curve Path
  const mainCurveD = "M 30 175 C 70 175, 150 160, 190 100 C 230 40, 310 70, 360 35";
  const areaD = `${mainCurveD} L 360 220 L 30 220 Z`;
  const secondaryCurveD = "M 30 185 C 80 180, 140 145, 190 115 C 240 85, 300 95, 360 50";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl bg-slate-950">
      {/* Dynamic Animated Grid Pattern */}
      <svg
        viewBox="0 0 400 240"
        className="w-full h-full object-cover opacity-75"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Main Area Fill Gradient */}
          <linearGradient id="mediaGraphGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
          </linearGradient>

          {/* Glowing Line Filters */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Shimmer Radar Beam Gradient */}
          <linearGradient id="radarBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background Grid Lines */}
        {[40, 80, 120, 160, 200].map((y, idx) => (
          <line
            key={idx}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="#1e293b"
            strokeDasharray="3 3"
            strokeWidth="0.8"
            opacity="0.6"
          />
        ))}

        {[60, 140, 220, 300, 380].map((x, idx) => (
          <line
            key={idx}
            x1={x}
            y1="0"
            x2={x}
            y2="240"
            stroke="#1e293b"
            strokeDasharray="3 3"
            strokeWidth="0.8"
            opacity="0.4"
          />
        ))}

        {/* Continuous Radar Scanning Beam */}
        <motion.rect
          x="0"
          y="0"
          width="80"
          height="240"
          fill="url(#radarBeam)"
          animate={{ x: [-80, 400] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Area Gradient Fill with Pulse */}
        <motion.path
          d={areaD}
          fill="url(#mediaGraphGradient)"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Secondary Ambient Wave Line */}
        <motion.path
          d={secondaryCurveD}
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.5"
          filter="url(#emeraldGlow)"
          animate={{ d: [secondaryCurveD, "M 30 180 C 80 185, 140 140, 190 120 C 240 90, 300 90, 360 45", secondaryCurveD] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Main Growth Trajectory Glowing Line (Infinite Stroke Draw Loop) */}
        <motion.path
          d={mainCurveD}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#goldGlow)"
          initial={{ pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0.4, 1, 1, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Traveling Tracer Cursor Light */}
        <motion.circle
          r="5"
          fill="#fbbf24"
          stroke="#ffffff"
          strokeWidth="2"
          filter="url(#goldGlow)"
          animate={{
            cx: points.map((p) => p.x),
            cy: points.map((p) => p.y),
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Interactive Year Data Nodes */}
        {points.map((pt, idx) => (
          <g key={idx}>
            {/* Vertical Marker Line */}
            <motion.line
              x1={pt.x}
              y1={pt.y}
              x2={pt.x}
              y2="220"
              stroke="#334155"
              strokeDasharray="2 2"
              strokeWidth="1"
            />

            {/* Glowing Node Circle */}
            <motion.circle
              cx={pt.x}
              cy={pt.y}
              r="4"
              fill="#0f172a"
              stroke="#f59e0b"
              strokeWidth="2"
              animate={{ r: [3, 5, 3] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.4 }}
            />

            {/* Pulsing Outer Ring */}
            <motion.circle
              cx={pt.x}
              cy={pt.y}
              r="8"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
              opacity="0.4"
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
            />
          </g>
        ))}
      </svg>

      {/* Dark Gradient Overlay for Maximum Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 pointer-events-none" />
    </div>
  );
};
