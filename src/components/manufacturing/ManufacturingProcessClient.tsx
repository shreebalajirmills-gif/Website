'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Flame, 
  ShieldCheck, 
  Layers, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  RefreshCw,
} from 'lucide-react';

export function ManufacturingProcessClient() {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      id: 'step-1',
      number: '01',
      title: 'Raw Material Segregation & Spectrometer Testing',
      tagline: 'Precision Chemical Control Before Rolling',
      icon: Flame,
      color: 'from-amber-500 to-orange-600',
      description: 'Raw materials (MS Ingots & Billets) undergo rigorous chemical analysis using optical emission spectrometers. We enforce strict limits on Sulfur (≤0.040%) and Phosphorus (≤0.040%) to ensure superior weldability and ductile purity.',
      highlights: [
        'Optical emission spectrometer chemical verification',
        'Strict Carbon Equivalent (CE) control for seismic ductility',
        '100% traceably segregated prime grade billets',
        'Zero inclusion raw material rejection protocol'
      ],
      specs: {
        'Carbon Content': '0.15% – 0.25%',
        'Sulfur (S)': 'Max 0.040%',
        'Phosphorus (P)': 'Max 0.040%',
        'S + P Combined': 'Max 0.075%'
      }
    },
    {
      id: 'step-2',
      number: '02',
      title: 'Continuous Billet Re-Heating Furnace',
      tagline: 'Uniform Thermal Conditioning at 1,200°C',
      icon: Zap,
      color: 'from-red-500 to-amber-600',
      description: 'Billets enter our fully automated continuous re-heating furnace, heated uniformly to 1,200°C. Precise temperature monitoring prevents scale loss and guarantees consistent plastic flow during high-speed rolling passes.',
      highlights: [
        'Automated multi-zone furnace temperature control',
        'Minimal surface oxidation & scale formation',
        'Optimized grain structure pre-rolling',
        'Energy-efficient recuperative heating technology'
      ],
      specs: {
        'Furnace Temp': '1,200°C ± 20°C',
        'Soaking Time': 'Optimum 45–60 mins',
        'Scale Loss': '< 1.2% Total Weight',
        'Energy Source': 'Clean Fuel Recuperation'
      }
    },
    {
      id: 'step-3',
      number: '03',
      title: 'High-Speed Multi-Stand Rolling Mill',
      tagline: 'Dimensional Precision for MS Flats, Rounds & Squares',
      icon: Layers,
      color: 'from-blue-500 to-cyan-600',
      description: 'Heated billets pass through our multi-stand roughing, intermediate, and finishing mill stands fitted with tungsten carbide rolls. Calibrated roll pass design ensures razor-sharp section geometry and exact dimensional tolerances for our core product lines: MS Flats (Patti), MS Round Bars (Gol), and MS Square Bars (Chakor) under IS 2062.',
      highlights: [
        'Dedicated rolling passes for MS Flats (Patti: 25x3mm to 100x20mm)',
        'Continuous high-speed rolling for MS Rounds (Gol: 10mm to 50mm dia)',
        'Sharp 90° edge profiling for MS Squares (Chakor: 10x10mm to 40x40mm)',
        'Tungsten carbide finishing rolls ensuring uniform surface without seams',
        'Continuous automatic gauge control (AGC) conforming to IS 1852'
      ],
      specs: {
        'Tolerance Range': 'BIS IS 1852 & IS 2062 Class A',
        'MS Flats (Patti)': '25x3 mm up to 100x20 mm',
        'MS Rounds (Gol)': '10 mm up to 50 mm Dia',
        'MS Squares (Chakor)': '10x10 mm up to 40x40 mm',
        'Surface Finish': 'Uniform, Crack-Free & Scale-Free'
      }
    },
    {
      id: 'step-4',
      number: '04',
      title: 'Thermex Water Quenching & Self-Tempering',
      tagline: 'Composite Microstructure: Hard Surface, Ductile Core',
      icon: RefreshCw,
      color: 'from-emerald-500 to-teal-600',
      description: 'Hot rolled bars immediately pass through the patented Thermex water quenching system. High-pressure water jets rapidly chill the outer layer into hard tempered martensite, while core heat self-tempers the bar into a ductile ferrite-pearlite core.',
      highlights: [
        'Patented Thermex water-quenching technology',
        'Tempered martensitic outer rim for high yield strength (500+ MPa)',
        'Ductile ferrite-pearlite core for maximum seismic elongation (>16%)',
        'Superior bendability without micro-cracking'
      ],
      specs: {
        'Quench Pressure': '12–18 Bar Water Jet',
        'Self-Tempering Temp': '580°C – 620°C Core Transfer',
        'Microstructure': 'Martensite Rim + Ferrite Core',
        'Seismic Grade': 'BIS IS 1786 Fe-500D Compliant'
      }
    },
    {
      id: 'step-5',
      number: '05',
      title: 'Automatic Rake Cooling Bed & Bundle Bundling',
      tagline: 'Controlled Atmospheric Stabilization & Dispatch Quality',
      icon: Activity,
      color: 'from-purple-500 to-indigo-600',
      description: 'Rolled Flats, Rounds, and Squares are sheared to exact 6-meter or 12-meter commercial lengths and transferred onto an automatic rake cooling bed. Controlled atmospheric cooling eliminates thermal stresses and distortion, followed by automated counting and bundle tagging.',
      highlights: [
        'Automatic cooling bed preventing warping in Flats and Squares',
        'Cold flying shear cutting for clean, square, burr-free ends',
        'Rigid bundle strapping with steel bands for safe transit',
        'Barcode-tagged Mill Test Certificate (MTC) matching Heat No. per bundle'
      ],
      specs: {
        'Standard Length': '6.0M & 12.0M (Custom Lengths Available)',
        'Bundle Weight': 'Approx. 1.5 to 2.5 MT Strapped Bundles',
        'Traceability': 'Heat Number Tagged on Every Bundle',
        'Packaging': 'Corrosion Inhibitor Strapped'
      }
    }
  ];

  return (
    <>
      {/* Process Step Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {processSteps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-4  text-left transition-all duration-300 border flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-950 text-white border-amber-400/50  scale-[1.02]'
                  : 'liquid-glass text-slate-800 border-steel-200 hover:border-steel-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-400' : 'text-steel-500'}`}>
                  PHASE {step.number}
                </span>
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-steel-600'}`} />
              </div>
              <p className="mt-3 text-xs sm:text-sm font-extrabold line-clamp-2 leading-snug">
                {step.title.split('&')[0]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Panel */}
      <div className="card-base card-product p-6 sm:p-10 border border-steel-200 bg-white/90">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Description & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 bg-slate-950 text-amber-400 flex items-center justify-center font-mono font-black text-lg border border-amber-400/30">
                {processSteps[activeStep].number}
              </span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {processSteps[activeStep].title}
                </h3>
                <p className="text-xs font-mono font-bold text-steel-900 uppercase tracking-wider mt-0.5">
                  {processSteps[activeStep].tagline}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-steel-700 leading-relaxed font-normal">
              {processSteps[activeStep].description}
            </p>

            <div className="space-y-2.5 pt-2">
              <p className="text-xs font-mono font-bold text-steel-900 uppercase tracking-widest">
                Key Technical Controls
              </p>
              {processSteps[activeStep].highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-steel-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Specs Card */}
          <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-8 border border-amber-400/30 space-y-5 relative overflow-hidden group">
            {/* Manufacturing Engine Background Image */}
            <img
              src="/assets/manufacturing-process-bg.jpg"
              alt="Shree Balaji Rolling Mill Hot Pass Process"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60 pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                  Operational Parameters
                </span>
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>

            <div className="space-y-3 font-mono text-xs sm:text-sm">
              {Object.entries(processSteps[activeStep].specs).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">{key}</span>
                  <span className="font-bold text-white text-right">{val}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/inquiry"
                className="w-full btn-primary !py-3 text-xs font-extrabold flex items-center justify-center gap-2"
              >
                <span>Request Mill Spec Sheet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
