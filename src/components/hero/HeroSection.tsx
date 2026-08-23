'use client';

import React, { useState } from 'react';
import { ArrowRight, Briefcase, Layers, Building2, TrendingUp, ChevronDown, Activity, ShieldCheck, Flame, Truck } from 'lucide-react';
import { BuyerSegment } from '@/types';
import { SteelHeroCanvas } from '@/components/3d/SteelHeroCanvas';

interface HeroSectionProps {
  onSelectSegment: (segment: BuyerSegment) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectSegment }) => {
  const [activePersona, setActivePersona] = useState<BuyerSegment>('distributor');

  const handleCtaClick = (segment: BuyerSegment) => {
    onSelectSegment(segment);
    setActivePersona(segment);
    const element = document.getElementById('inquiry-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden section-hero steel-grid-pattern border-b border-steel-200 text-steel-900">
      
      {/* Interactive 3D Metallic Steel Canvas */}
      <SteelHeroCanvas />

      {/* Refractive Ambient Liquid Glass Mesh Lights */}
      <div className="ambient-liquid-glow ambient-glow-growth top-1/4 left-1/2 -translate-x-1/2" />
      <div className="ambient-liquid-glow ambient-glow-authority top-1/3 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Mill Telemetry Badge */}
        <div className="flex justify-center mb-8">
          <div className="badge-base px-5 py-2 inline-flex items-center gap-3 backdrop-blur-xl border-steel-300">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-steel-900">
              <Flame className="w-4 h-4 text-growth-600 animate-pulse" />
              STEEL MANUFACTURING PLATFORM
            </span>
            <span className="h-3 w-px bg-steel-300" />
            <span className="text-xs font-semibold text-steel-700 tracking-wide font-mono">
              180,000 TPA CAPACITY • BHIWADI, HARYANA
            </span>
          </div>
        </div>

        {/* Hero Subject Thesis Title with Adaptive Contrast Liquid Glass Card */}
        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-20">
          <div className="card-base card-product p-6 sm:p-10 border border-slate-200/90 backdrop-blur-2xl bg-white/85 transition-all duration-300">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-950 leading-[1.06] drop-">
              The Steel Rolling Platform. <br className="hidden sm:inline" />
              <span className="text-gradient-growth">Built for Scaled Infrastructure.</span>
            </h1>

            <p className="mt-6 text-sm sm:text-lg font-medium leading-relaxed tracking-wide text-steel-700">
              Manufacturing <span className="text-steel-900 font-extrabold">IS 2062 structural steel profiles</span> and expanding into <span className="text-steel-900 font-extrabold">144,000 TPA IS 1786 Fe-500D TMT bar production</span> across Northern India.
            </p>
          </div>
        </div>

        {/* Studio Design Element: Interactive Rolling Mill Pass Terminal (Bespoke Hero Thesis) */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="badge-base px-4 py-1.5 text-center text-xs font-mono font-bold uppercase tracking-widest text-steel-900 mb-6 flex items-center justify-center gap-2 max-w-md mx-auto">
            <span>Select Your Inquiry Focus</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pass 01: Distributor */}
            <button
              onClick={() => handleCtaClick('distributor')}
              className={`liquid-glass liquid-glass-distributor p-6  text-left flex flex-col justify-between transition-all duration-300 transform group cursor-pointer ${
                activePersona === 'distributor'
                  ? 'ring-2 ring-authority-600  -translate-y-1'
                  : 'hover:-translate-y-1.5 hover: hover:border-growth-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-transparent group-hover:bg-transparent group-hover:bg-growth-50 border border-steel-300 group-hover:border-growth-400 flex items-center justify-center text-steel-900 font-mono font-bold text-xs transition-transform duration-300 group-hover:scale-110">
                    P-01
                  </div>
                  <span className="badge-distributor text-[10px] sm:text-xs px-2.5 py-1 font-mono border">
                    DISTRIBUTOR
                  </span>
                </div>
                <h3 className="text-lg font-bold text-steel-900 group-hover:text-growth-700 transition-colors">
                  Distributor Network
                </h3>
                <p className="text-xs text-steel-600 mt-1.5 leading-snug">
                  Direct mill pricing, transparent dispatch schedules, and dedicated regional supply for trade partners.
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs sm:text-sm font-bold text-steel-900 group-hover:translate-x-1 transition-transform font-mono">
                <span>Pass 01 Inquiry</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </button>

            {/* Pass 02: Contractor */}
            <button
              onClick={() => handleCtaClick('contractor')}
              className={`liquid-glass liquid-glass-contractor p-6  text-left flex flex-col justify-between transition-all duration-300 transform group cursor-pointer ${
                activePersona === 'contractor'
                  ? 'ring-2 ring-growth-600  -translate-y-1'
                  : 'hover:-translate-y-1.5 hover: hover:border-growth-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-transparent group-hover:bg-growth-50 border border-steel-300 group-hover:border-growth-400 flex items-center justify-center text-steel-900 font-mono font-bold text-xs transition-transform duration-300 group-hover:scale-110">
                    P-02
                  </div>
                  <span className="badge-contractor text-[10px] px-2.5 py-1 font-mono border">
                    CONTRACTOR
                  </span>
                </div>
                <h3 className="text-lg font-bold text-steel-900 group-hover:text-growth-700 transition-colors">
                  Contractors & EPCs
                </h3>
                <p className="text-xs text-steel-600 mt-1.5 leading-snug">
                  High-tensile structural sections & Fe-500D TMT bars engineered for heavy civic infrastructure & high-rises.
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-steel-900 group-hover:translate-x-1 transition-transform font-mono">
                <span>Pass 02 Quote</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </button>

            {/* Pass 03: Infrastructure */}
            <button
              onClick={() => handleCtaClick('project')}
              className={`liquid-glass liquid-glass-project p-6  text-left flex flex-col justify-between transition-all duration-300 transform group cursor-pointer ${
                activePersona === 'project'
                  ? 'ring-2 ring-trust-600  -translate-y-1'
                  : 'hover:-translate-y-1.5 hover: hover:border-growth-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-transparent group-hover:bg-transparent group-hover:bg-growth-50 border border-steel-300 group-hover:border-growth-400 flex items-center justify-center text-steel-900 font-mono font-bold text-xs transition-transform duration-300 group-hover:scale-110">
                    P-03
                  </div>
                  <span className="badge-project text-[10px] px-2.5 py-1 font-mono border">
                    INFRASTRUCTURE
                  </span>
                </div>
                <h3 className="text-lg font-bold text-steel-900 group-hover:text-growth-700 transition-colors">
                  Infrastructure Projects
                </h3>
                <p className="text-xs text-steel-600 mt-1.5 leading-snug">
                  BIS certified IS 2062 & IS 1786 steel sections tested for seismic resilience and industrial framing.
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-steel-900 group-hover:translate-x-1 transition-transform font-mono">
                <span>Pass 03 SLA Tender</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </button>

            {/* Pass 04: Investor */}
            <button
              onClick={() => handleCtaClick('investor')}
              className={`liquid-glass liquid-glass-investor p-6  text-left flex flex-col justify-between transition-all duration-300 transform group cursor-pointer ${
                activePersona === 'investor'
                  ? 'ring-2 ring-growth-800  -translate-y-1'
                  : 'hover:-translate-y-1.5 hover: hover:border-growth-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-transparent group-hover:bg-transparent group-hover:bg-growth-50 border border-steel-300 group-hover:border-growth-400 flex items-center justify-center text-steel-900 font-mono font-bold text-xs transition-transform duration-300 group-hover:scale-110">
                    P-04
                  </div>
                  <span className="badge-investor text-[10px] px-2.5 py-1 font-mono border">
                    CAPITAL ROADMAP
                  </span>
                </div>
                <h3 className="text-lg font-bold text-steel-900 group-hover:text-growth-700 transition-colors">
                  Investor Roadmap
                </h3>
                <p className="text-xs text-steel-600 mt-1.5 leading-snug">
                  Proven 2.42% gross margin resilience scaling toward ₹1,000+ Cr turnover by FY30.
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-steel-900 group-hover:translate-x-1 transition-transform font-mono">
                <span>Pass 04 Growth Model</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </button>

          </div>
        </div>

        {/* Live Mill Metric Telemetry Banner */}
        <div className="mt-16 max-w-5xl mx-auto p-6 sm:p-8 card-base card-product grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-steel-200">
          <div className="border-r border-steel-200 last:border-none px-2">
            <p className="text-xl md:text-2xl font-black text-steel-900 font-mono">₹203.03 Cr</p>
            <p className="text-xs text-steel-600 font-semibold mt-1">FY26 Operational Base</p>
          </div>
          <div className="border-r border-steel-200 last:border-none px-2">
            <p className="text-xl md:text-2xl font-black text-steel-900 font-mono">180,000 TPA</p>
            <p className="text-xs text-steel-600 font-semibold mt-1">Total Capacity Post-Expansion</p>
          </div>
          <div className="border-r border-steel-200 last:border-none px-2">
            <p className="text-xl md:text-2xl font-black text-steel-900 font-mono">2.42%</p>
            <p className="text-xs text-steel-600 font-semibold mt-1">Resilient Gross Margin</p>
          </div>
          <div className="px-2">
            <p className="text-xl md:text-2xl font-black text-steel-900 font-mono">₹1,006.40 Cr</p>
            <p className="text-xs text-steel-600 font-semibold mt-1">FY30 Revenue Target</p>
          </div>
        </div>

        {/* Industrial Steel Pass Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <a href="#products" className="badge-base px-5 py-2.5 flex items-center gap-2.5 text-xs font-mono font-bold text-steel-700 hover:text-growth-700 transition-colors">
            <Truck className="w-4 h-4 text-growth-600" />
            <span>EXPLORE PRODUCT CATALOG & SPECS</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-growth-600" />
          </a>
        </div>

      </div>
    </section>
  );
};
