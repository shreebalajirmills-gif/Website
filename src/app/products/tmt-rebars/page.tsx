'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SteelProductViewer } from '@/components/3d/SteelProductViewer';
import { ShieldCheck, Download, CheckCircle2, ArrowRight, Scale, Box, Activity } from 'lucide-react';

export default function TmtRebarsPage() {
  const rebarSizes = [
    { size: '8 mm', weightPerM: '0.395 kg/m', bundlePcs: '10 Pcs', app: 'Slab reinforcement & Stirrups' },
    { size: '10 mm', weightPerM: '0.617 kg/m', bundlePcs: '7 Pcs', app: 'Residential beams & Floor slabs' },
    { size: '12 mm', weightPerM: '0.888 kg/m', bundlePcs: '5 Pcs', app: 'Commercial columns & Beams' },
    { size: '16 mm', weightPerM: '1.580 kg/m', bundlePcs: '3 Pcs', app: 'Heavy foundations & Flyovers' },
    { size: '20 mm', weightPerM: '2.470 kg/m', bundlePcs: '2 Pcs', app: 'Bridge piers & High-rise pillars' },
    { size: '25 mm', weightPerM: '3.850 kg/m', bundlePcs: '1 Pc', app: 'Infrastructure dams & Heavy foundations' },
    { size: '32 mm', weightPerM: '6.310 kg/m', bundlePcs: '1 Pc', app: 'Industrial plant foundations & Power plants' },
  ];

  return (
    <main className="min-h-screen bg-steel-base text-steel-900 flex flex-col selection:bg-growth-500 selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-steel-base border-b border-steel-200 steel-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-contractor text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-growth-700" /> BIS IS 1786 FE-500D SEISMIC GRADE CERTIFIED
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-steel-900 tracking-tight">
            High-Ductility TMT Rebars <br />
            <span className="text-gradient-growth">(Fe-500D Grade Manufacturing)</span>
          </h1>

          <p className="text-base text-steel-600 max-w-3xl font-normal leading-relaxed">
            Thermo-mechanically treated reinforcement steel bars engineered with a tempered martensite outer layer and soft ferrite-pearlite core. Delivers high tensile strength (min 565 MPa) combined with exceptional elongation (min 16%) for Zone IV/V earthquake safety.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono">
            <span className="bg-steel-100 border border-steel-200 px-3.5 py-1.5 rounded-full font-bold text-steel-900">
              Planned Rolling Capacity: 144,000 TPA
            </span>
            <span className="bg-steel-100 border border-steel-200 px-3.5 py-1.5 rounded-full font-bold text-growth-700">
              Sulfur & Phosphorus Cap: Combined Max 0.075%
            </span>
          </div>
        </div>
      </section>

      {/* Main Content & 3D Inspector */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 3D Model Inspection Card */}
        <div className="liquid-glass-contractor rounded-3xl p-8 border border-steel-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-growth-600" />
              <h2 className="text-xl font-bold text-steel-900">3D Rib Geometry & Rebar Inspector</h2>
            </div>
            <span className="text-xs font-mono font-bold text-steel-500">Drag to Orbit 360°</span>
          </div>

          <SteelProductViewer productType="tmt_bar" />

          <p className="text-xs text-steel-600 font-normal leading-relaxed">
            Transverse ribbing pattern engineered for superior concrete bond strength per IS 1786. Undergoes 180-degree bend and mandrel re-bend tests without cracking or fracture.
          </p>
        </div>

        {/* TMT Rebar Weight Schedule Table */}
        <div className="liquid-glass-prominent rounded-3xl p-8 border border-steel-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-steel-200 pb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-growth-600" />
              <h2 className="text-xl font-bold text-steel-900">TMT Fe-500D Diameter & Weight Schedule</h2>
            </div>
            <span className="text-xs font-mono font-bold text-growth-700 bg-growth-50 px-3 py-1 rounded-full border border-growth-200">
              Formula: (D² / 162) kg/m
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-steel-200 text-steel-500 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4">Bar Diameter (mm)</th>
                  <th className="py-3 px-4">Unit Weight (kg/m)</th>
                  <th className="py-3 px-4">Standard Bundle Count</th>
                  <th className="py-3 px-4">Structural Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-200 font-mono text-steel-800">
                {rebarSizes.map((item, i) => (
                  <tr key={i} className="hover:bg-steel-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-steel-900">{item.size}</td>
                    <td className="py-3.5 px-4 font-bold text-growth-700">{item.weightPerM}</td>
                    <td className="py-3.5 px-4 text-steel-600">{item.bundlePcs}</td>
                    <td className="py-3.5 px-4 font-sans text-steel-600">{item.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="liquid-glass-contractor rounded-3xl p-8 border border-steel-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-steel-900">Require Bulk Rebar Allocation or Site Delivery Schedules?</h3>
            <p className="text-xs text-steel-600">Direct trailer load dispatch from Bhiwadi rolling mill.</p>
          </div>
          <Link
            href="/inquiry?segment=contractor"
            className="btn-primary py-3.5 px-6 rounded-2xl text-xs font-extrabold flex items-center gap-2 shrink-0"
          >
            <span>Request Rebar Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      <Footer />
    </main>
  );
}
