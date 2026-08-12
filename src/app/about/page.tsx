'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  MapPin,
  Users,
  Leaf,
  FileSpreadsheet
} from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '2010', title: 'Company Establishment', desc: 'Shree Balaji Rolling Mills Private Limited incorporated with foundational vision for Northern India infrastructure steel.' },
    { year: '2015', title: '36,000 TPA Structural Steel Mill', desc: 'Bhiwadi, Haryana rolling facility commissioned for IS 2062 MS Angles, Channels, and Joists.' },
    { year: '2022', title: '144,000 TPA TMT Expansion Plan', desc: 'Initiated ₹12+ Crore capital expansion for Thermex quenched IS 1786 Fe-500D TMT bar production.' },
    { year: 'FY25', title: '₹242.33 Cr Revenue Base', desc: 'Achieved major operational milestone supplying leading civic, industrial, and real estate projects in NCR.' },
    { year: 'FY30', title: '₹1,006.40 Cr Target Roadmap', desc: 'Scaling total mill throughput to 180,000 TPA to capture Northern India infrastructure boom.' },
  ];

  return (
    <main className="min-h-screen bg-steel-base text-primary font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden steel-grid-pattern border-b border-steel-200">
        <div className="ambient-liquid-glow ambient-glow-growth top-1/3 left-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="glass-pill px-5 py-2 inline-flex items-center gap-2.5 backdrop-blur-xl border-steel-300 mb-6 shadow-sm">
            <Building2 className="w-4 h-4 text-growth-600" />
            <span className="text-xs font-mono font-bold text-growth-700 uppercase tracking-wider">
              SHREE BALAJI ROLLING MILLS PVT. LTD.
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-tight">
            Engineering Northern India's <br />
            <span className="text-gradient-growth">Steel Infrastructure Foundation</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-steel-600 max-w-3xl mx-auto leading-relaxed">
            Operating a state-of-the-art rolling mill facility in Bhiwadi, Haryana with 36,000 TPA structural steel capacity and scaling to 180,000 TPA total capacity post TMT expansion.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#journey" className="btn-secondary text-xs !py-2.5 !px-5 rounded-full font-bold">
              Know Our Journey
            </a>
            <a href="#why-us" className="btn-secondary text-xs !py-2.5 !px-5 rounded-full font-bold">
              Why Choose Us
            </a>
            <a href="#clients" className="btn-secondary text-xs !py-2.5 !px-5 rounded-full font-bold">
              Our Clients
            </a>
            <a href="#environment" className="btn-secondary text-xs !py-2.5 !px-5 rounded-full font-bold">
              Environment & Sustainability
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: Know Our Journey */}
      <section id="journey" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="glass-pill px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-growth-700">
            Corporate History & Scale
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mt-4 tracking-tight">
            Know Our Journey
          </h2>
          <p className="mt-3 text-steel-600 text-sm sm:text-base">
            From a regional rolling mill to a ₹1,000+ Cr turnover industrial platform.
          </p>
        </div>

        <div className="relative border-l-2 border-growth-500/30 ml-4 sm:ml-32 space-y-12 py-4">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              {/* Year Marker Pill */}
              <div className="absolute -left-4 sm:-left-28 top-0 sm:top-1 font-mono font-black text-xs sm:text-sm text-growth-700 bg-growth-50 border border-growth-300 px-3 py-1 rounded-full shadow-sm">
                {m.year}
              </div>
              
              {/* Node Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-growth-600 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

              <div className="liquid-glass p-6 rounded-3xl border border-steel-200 hover:border-growth-400 transition-all space-y-2">
                <h3 className="text-xl font-bold text-slate-950">{m.title}</h3>
                <p className="text-xs sm:text-sm text-steel-600 leading-relaxed font-normal">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Why Choose Us */}
      <section id="why-us" className="py-24 bg-steel-subtle border-y border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="glass-pill px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-authority-700">
              Institutional Advantage
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mt-4 tracking-tight">
              Why Choose Shree Balaji
            </h2>
            <p className="mt-3 text-steel-600 text-sm sm:text-base">
              Why top infrastructure contractors, trade distributors, and developers partner with our Bhiwadi mill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="liquid-glass p-8 rounded-3xl border border-steel-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-950">Direct Mill Pricing</h3>
              <p className="text-xs sm:text-sm text-steel-600 leading-relaxed">
                Eliminate intermediary markups. Get transparent mill-direct billing, structured payment terms, and guaranteed dispatch schedules.
              </p>
            </div>

            <div className="liquid-glass p-8 rounded-3xl border border-steel-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-authority-100 border border-authority-300 flex items-center justify-center text-authority-800 font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-950">180,000 TPA Total Scale</h3>
              <p className="text-xs sm:text-sm text-steel-600 leading-relaxed">
                Combined 36,000 TPA IS 2062 structural profiles + 144,000 TPA IS 1786 Fe-500D TMT bar mill ensures zero supply chain bottlenecks.
              </p>
            </div>

            <div className="liquid-glass p-8 rounded-3xl border border-steel-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-growth-100 border border-growth-300 flex items-center justify-center text-growth-800 font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-950">BIS & Lab Certified</h3>
              <p className="text-xs sm:text-sm text-steel-600 leading-relaxed">
                Every truck batch is backed by 100% optical emission spectrometer chemical reports and UTM physical tensile test certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EBrochure and Corporate Profile */}
      <section id="ebrochure" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="liquid-glass-prominent rounded-3xl p-8 sm:p-12 border border-steel-200 shadow-2xl bg-slate-950 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="glass-pill px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 border border-amber-400/30">
              Corporate Downloads
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              E-Brochure & Corporate Profile
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Download our comprehensive technical datasheets, BIS IS 2062 & IS 1786 compliance documentation, and financial scale report.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              href="/inquiry"
              className="btn-primary !py-3.5 !px-6 rounded-2xl text-xs font-extrabold text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download Corporate Profile</span>
            </Link>
            <Link
              href="/growth"
              className="btn-secondary !py-3.5 !px-6 rounded-2xl text-xs font-extrabold text-center text-slate-950"
            >
              View FY26–FY30 Financial Plan
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 4: Environment & Sustainability */}
      <section id="environment" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="glass-pill px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
            Green Steel Commitment
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mt-4 tracking-tight">
            Environment & Sustainability
          </h2>
          <p className="mt-3 text-steel-600 text-sm sm:text-base">
            Responsible manufacturing practices at our Bhiwadi industrial facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="liquid-glass p-6 rounded-3xl border border-steel-200 space-y-3">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-950">100% Scrap Recycling</h3>
            <p className="text-xs text-steel-600 leading-relaxed">
              Utilizing prime steel scrap to minimize iron ore depletion and reduce carbon footprint per metric ton produced.
            </p>
          </div>

          <div className="liquid-glass p-6 rounded-3xl border border-steel-200 space-y-3">
            <Users className="w-8 h-8 text-growth-600" />
            <h3 className="text-lg font-bold text-slate-950">Zero Effluent Discharge</h3>
            <p className="text-xs text-steel-600 leading-relaxed">
              Recirculating Thermex quench water in closed-loop cooling towers, preventing industrial wastewater discharge.
            </p>
          </div>

          <div className="liquid-glass p-6 rounded-3xl border border-steel-200 space-y-3">
            <ShieldCheck className="w-8 h-8 text-authority-600" />
            <h3 className="text-lg font-bold text-slate-950">Recuperative Heating</h3>
            <p className="text-xs text-steel-600 leading-relaxed">
              Continuous billet re-heating furnace equipped with waste-heat recuperators to reduce fuel consumption by 18%.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
