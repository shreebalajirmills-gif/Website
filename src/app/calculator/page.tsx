'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SteelCalculatorWidget } from '@/components/tools/SteelCalculatorWidget';

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <section className="pt-36 pb-12 bg-white border-b border-slate-200 steel-grid-pattern text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            ENGINEERING SITE CALCULATOR
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
            Steel Weight & <span className="text-gradient-amber">Logistics Calculator</span>
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto">
            Calculate instant site tonnage, weight per meter (IS 1786 / IS 2062), and truckload trailer bundle requirements for procurement managers.
          </p>
        </div>
      </section>

      <SteelCalculatorWidget />

      <Footer />
    </main>
  );
}
