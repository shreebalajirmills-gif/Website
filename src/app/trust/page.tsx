'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TrustSection } from '@/components/trust/TrustSection';

export default function TrustPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <section className="pt-36 pb-12 bg-white border-b border-slate-200 steel-grid-pattern text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            BIS & ISO QUALITY ASSURANCE
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
            Institutional Trust & <span className="text-gradient-amber">Quality Testing</span>
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto">
            Certified to Bureau of Indian Standards (BIS) IS 2062 & IS 1786. Full chemical lab analysis, tensile testing, and site delivery SLA proof.
          </p>
        </div>
      </section>

      <TrustSection />

      <Footer />
    </main>
  );
}
