'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Flame, 
  ShieldCheck, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Zap, 
  Scale, 
  FileText,
  Building2,
  RefreshCw,
  Award
} from 'lucide-react';

export default function ManufacturingProcessesPage() {
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
      tagline: 'Dimensional Precision Across Structural & Rebar Profiles',
      icon: Layers,
      color: 'from-blue-500 to-cyan-600',
      description: 'Heated billets pass through our multi-stand roughing, intermediate, and finishing mill stands fitted with tungsten carbide rolls. This ensures razor-sharp section geometry for IS 2062 structural profiles and uniform rib height for TMT bars.',
      highlights: [
        'Computerized roll pass design for exact sectional tolerances',
        'Tungsten carbide finishing rolls for flawless surface finish',
        'Synchronized high-speed rolling up to 30 m/sec',
        'Continuous automatic gauge control (AGC)'
      ],
      specs: {
        'Tolerance Range': 'BIS IS 1852 & IS 1786 Strict Class',
        'Structural Profiles': 'MS Angles, Channels, Joists',
        'TMT Bar Range': '8mm to 32mm Diameter',
        'Surface Finish': 'Smooth & Crack-Free'
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
      description: 'Quenched bars are sheared to standard 12-meter lengths and transferred onto an automatic rake cooling bed. Controlled air cooling ensures residual stress relief, uniform mechanical properties, and automatic bundle tagging for full batch traceability.',
      highlights: [
        'Automatic rake cooling bed for uniform cooling rate',
        'Cold flying shear cutting for clean, burr-free ends',
        'Automated counting, bundling, and metal strap tying',
        'Barcode-tagged mill test certificate (MTC) attachment'
      ],
      specs: {
        'Standard Length': '12.0 Meters (Custom Available)',
        'Bundle Weight': 'Approx. 2.0 to 2.5 MT per Bundle',
        'Traceability': 'Heat Number Tagged per Bundle',
        'Packaging': 'Corrosion Inhibitor Strapped'
      }
    }
  ];

  const qualityChecks = [
    {
      title: 'Liquid Metal Chemical Analysis',
      desc: 'Optical Emission Spectrometry testing of every heat to verify Carbon, Sulfur, Phosphorus, and Manganese levels before casting.',
      metric: '≤ 0.040% S & P'
    },
    {
      title: 'UTM Tensile & Yield Testing',
      desc: 'Universal Testing Machine verification ensuring Fe-500D yield strength exceeds 500 N/mm² and elongation exceeds 16%.',
      metric: '> 545 N/mm² UTS'
    },
    {
      title: 'Mandrel Bend & Re-Bend Test',
      desc: '180° cold bend around specified mandrel diameter to confirm zero surface cracking and high seismic flexibility.',
      metric: '180° No Cracks'
    },
    {
      title: 'Rib Profile & Weight Tolerance Check',
      desc: 'Digital projector measurement of rib height, rib spacing, and unit weight per meter according to IS 1786 norms.',
      metric: 'IS 1786 Class A'
    }
  ];

  return (
    <main className="min-h-screen bg-steel-base text-primary font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden steel-grid-pattern border-b border-steel-200">
        <div className="ambient-liquid-glow ambient-glow-growth top-1/3 left-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="glass-pill px-5 py-2 inline-flex items-center gap-2.5 backdrop-blur-xl border-steel-300 mb-6 shadow-sm">
            <Flame className="w-4 h-4 text-growth-600 animate-pulse" />
            <span className="text-xs font-mono font-bold text-growth-700 uppercase tracking-wider">
              THERMO-MECHANICAL MANUFACTURING ENGINE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-tight">
            Manufacturing Processes & <br />
            <span className="text-gradient-growth">Integrated Quality System</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-steel-600 max-w-3xl mx-auto leading-relaxed">
            Discover how Shree Balaji Rolling Mills combines advanced induction melting, continuous rolling mill passes, and Thermex water-quenching technology in Bhiwadi, Haryana to produce 180,000 TPA structural steel and Fe-500D TMT bars.
          </p>

          {/* Quick Nav Anchors */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#process" className="btn-secondary text-xs !py-2.5 !px-5 rounded-full font-bold">
              The 5-Step Process
            </a>
            <a href="#iqms" className="btn-secondary text-xs !py-2.5 !px-5 rounded-full font-bold">
              IQMS System
            </a>
            <a href="#quality-checks" className="btn-secondary text-xs !py-2.5 !px-5 rounded-full font-bold">
              Laboratory Checks
            </a>
            <a href="#testing-guide" className="btn-secondary text-xs !py-2.5 !px-5 rounded-full font-bold">
              How to Test TMT Bar
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: The 5-Step Thermo-Mechanical Process */}
      <section id="process" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="glass-pill px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-growth-700">
            Step-By-Step Engineering
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mt-4 tracking-tight">
            The 5-Stage TMT & Rolling Process
          </h2>
          <p className="mt-4 text-steel-600 text-sm sm:text-base">
            Click through each phase below to inspect the metallurgy, thermal cycles, and technical specifications of our Bhiwadi rolling facility.
          </p>
        </div>

        {/* Process Step Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-950 text-white border-amber-400/50 shadow-xl scale-[1.02]'
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
        <div className="liquid-glass-prominent rounded-3xl p-6 sm:p-10 border border-steel-200 shadow-2xl bg-white/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Description & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-mono font-black text-lg border border-amber-400/30">
                  {processSteps[activeStep].number}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {processSteps[activeStep].title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-growth-700 uppercase tracking-wider mt-0.5">
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
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-400/30 shadow-xl space-y-5">
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
                  className="w-full btn-primary !py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Request Mill Spec Sheet</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: Integrated Quality Management System (IQMS) */}
      <section id="iqms" className="py-24 bg-steel-subtle border-y border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-4">
              <span className="glass-pill px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-authority-700">
                Quality System (IQMS)
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                Integrated Quality Management System
              </h2>
              <p className="text-steel-600 text-sm sm:text-base leading-relaxed">
                Our Bhiwadi mill operates an end-to-end Integrated Quality Management System (IQMS). Every heat of molten steel is tracked, tested, and certified before dispatching to infrastructure sites across Northern India.
              </p>
            </div>
            
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="liquid-glass p-5 rounded-2xl border border-steel-200">
                <p className="text-3xl font-black text-growth-700 font-mono">100%</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Spectrometer Heat Testing</p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-steel-200">
                <p className="text-3xl font-black text-authority-700 font-mono">Fe-500D</p>
                <p className="text-xs font-bold text-slate-800 mt-1">High Ductility Grade</p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-steel-200">
                <p className="text-3xl font-black text-trust-700 font-mono">IS 2062</p>
                <p className="text-xs font-bold text-slate-800 mt-1">BIS Structural License</p>
              </div>
              <div className="liquid-glass p-5 rounded-2xl border border-steel-200">
                <p className="text-3xl font-black text-emerald-700 font-mono">0 Defect</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Mill Dispatch Standard</p>
              </div>
            </div>
          </div>

          {/* IQMS 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityChecks.map((qc, i) => (
              <div key={i} className="liquid-glass p-6 rounded-3xl border border-steel-200 hover:border-growth-400 transition-all space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-mono font-bold text-sm">
                  Q-0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-950">{qc.title}</h3>
                <p className="text-xs text-steel-600 leading-relaxed">{qc.desc}</p>
                <div className="pt-2 border-t border-steel-200/80 flex items-center justify-between text-xs font-mono font-bold text-growth-700">
                  <span>BENCHMARK</span>
                  <span>{qc.metric}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: Quality Checks & Chemical / Mechanical Tolerance Tables */}
      <section id="quality-checks" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="glass-pill px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-trust-700">
            BIS Specification Compliance
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mt-4 tracking-tight">
            Chemical & Mechanical Property Matrix
          </h2>
          <p className="mt-3 text-steel-600 text-sm sm:text-base">
            Strict adherence to BIS IS 1786:2008 (Fe-500D Grade) and IS 2062:2011 structural steel standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chemical Composition Table */}
          <div className="liquid-glass p-6 sm:p-8 rounded-3xl border border-steel-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-steel-200 pb-3">
              <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600" />
                Chemical Composition Limits
              </h3>
              <span className="text-xs font-mono font-bold text-growth-700 bg-growth-50 px-3 py-1 rounded-full border border-growth-200">
                IS 1786 Fe-500D
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-steel-200 text-steel-600 font-mono uppercase">
                    <th className="py-2.5 font-bold">Element</th>
                    <th className="py-2.5 font-bold">BIS IS 1786 Max</th>
                    <th className="py-2.5 font-bold text-growth-700">SBF Mill Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-200/60 font-mono text-steel-800">
                  <tr>
                    <td className="py-2.5 font-semibold">Carbon (C)</td>
                    <td className="py-2.5 text-steel-600">0.25% Max</td>
                    <td className="py-2.5 font-bold text-growth-700">0.18% – 0.22%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">Sulfur (S)</td>
                    <td className="py-2.5 text-steel-600">0.040% Max</td>
                    <td className="py-2.5 font-bold text-growth-700">≤ 0.035%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">Phosphorus (P)</td>
                    <td className="py-2.5 text-steel-600">0.040% Max</td>
                    <td className="py-2.5 font-bold text-growth-700">≤ 0.035%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">S + P Combined</td>
                    <td className="py-2.5 text-steel-600">0.075% Max</td>
                    <td className="py-2.5 font-bold text-growth-700">≤ 0.068%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">Carbon Equivalent (CE)</td>
                    <td className="py-2.5 text-steel-600">0.42% Max</td>
                    <td className="py-2.5 font-bold text-growth-700">0.36% – 0.39%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mechanical Properties Table */}
          <div className="liquid-glass p-6 sm:p-8 rounded-3xl border border-steel-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-steel-200 pb-3">
              <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
                <Scale className="w-5 h-5 text-authority-600" />
                Mechanical Performance Matrix
              </h3>
              <span className="text-xs font-mono font-bold text-authority-700 bg-authority-50 px-3 py-1 rounded-full border border-authority-200">
                Seismic Resistance
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-steel-200 text-steel-600 font-mono uppercase">
                    <th className="py-2.5 font-bold">Property</th>
                    <th className="py-2.5 font-bold">BIS Standard</th>
                    <th className="py-2.5 font-bold text-authority-700">SBF Tested Avg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-200/60 font-mono text-steel-800">
                  <tr>
                    <td className="py-2.5 font-semibold">Yield Stress (YS)</td>
                    <td className="py-2.5 text-steel-600">500 N/mm² Min</td>
                    <td className="py-2.5 font-bold text-authority-700">525 – 540 N/mm²</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">Ultimate Tensile (UTS)</td>
                    <td className="py-2.5 text-steel-600">565 N/mm² Min</td>
                    <td className="py-2.5 font-bold text-authority-700">600 – 625 N/mm²</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">UTS / YS Ratio</td>
                    <td className="py-2.5 text-steel-600">≥ 1.10 Min</td>
                    <td className="py-2.5 font-bold text-authority-700">1.15 – 1.18</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">Total Elongation</td>
                    <td className="py-2.5 text-steel-600">16.0% Min</td>
                    <td className="py-2.5 font-bold text-authority-700">18.5% – 21.0%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">180° Cold Bend</td>
                    <td className="py-2.5 text-steel-600">No Rupture</td>
                    <td className="py-2.5 font-bold text-authority-700">100% Pass Rate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: How to Test SBF TMT Rapid Bar (Site Contractor Guide) */}
      <section id="testing-guide" className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="glass-pill px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 border border-amber-400/30">
              Contractor & Site Engineer Manual
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
              How to Test TMT Bar Quality on Site
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Quick 4-step site protocol to verify authenticity, weight tolerance, ductility, and rib geometry before pouring concrete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Guide Step 1 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-amber-400/50 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm border border-amber-500/30">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Weight Per Meter Test</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cut exactly 1-meter bar sample. Weigh on digital scale and verify against BIS IS 1786 nominal weights (e.g. 12mm bar = 0.888 kg/m ± 5%).
              </p>
            </div>

            {/* Guide Step 2 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-amber-400/50 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm border border-amber-500/30">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Mandrel Bend Test</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bend the TMT bar cold to 180° using a standard bending mandrel. Inspect the outer bend radius for any hairline cracks or surface splits.
              </p>
            </div>

            {/* Guide Step 3 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-amber-400/50 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm border border-amber-500/30">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Embossing & Rib Check</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verify clear mill embossing "SHREE BALAJI 500D" along the bar axis. Ensure sharp transverse ribs for high concrete bonding strength.
              </p>
            </div>

            {/* Guide Step 4 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-amber-400/50 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm border border-amber-500/30">
                04
              </div>
              <h3 className="text-lg font-bold text-white">Mill Test Certificate (MTC)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Match the bundle tag Heat Number with the Mill Test Certificate (MTC) supplied with every truck dispatch from Bhiwadi.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: Commitment to Quality & Environment */}
      <section id="commitment" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="liquid-glass-prominent rounded-3xl p-8 sm:p-12 border border-steel-200 shadow-2xl bg-white/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="glass-pill px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
              Sustainable Rolling Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Our Commitment to Environment & Zero Defect
            </h2>
            <p className="text-steel-600 text-sm sm:text-base leading-relaxed">
              At Shree Balaji Rolling Mills Private Limited, quality and sustainability go hand in hand. Our Bhiwadi plant utilizes 100% recyclable steel scrap, energy-efficient furnace recuperators, and zero-effluent discharge water cooling systems.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              href="/inquiry"
              className="btn-primary !py-3.5 !px-6 rounded-2xl text-xs font-extrabold text-center shadow-lg"
            >
              Request Custom Quality Report
            </Link>
            <Link
              href="/trust"
              className="btn-secondary !py-3.5 !px-6 rounded-2xl text-xs font-extrabold text-center flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-growth-700" />
              <span>View BIS Certificates</span>
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
