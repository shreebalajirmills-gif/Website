import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SteelCalculatorWidget } from '@/components/tools/SteelCalculatorWidget';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = constructMetadata({
  title: 'Steel Weight & Trailer Bundle Calculator | IS 1786 & IS 2062',
  description:
    'Calculate instant site steel tonnage, weight per meter (D²/162 formula), and trailer bundle requirements for procurement managers and site engineers.',
  canonicalUrl: '/calculator',
  keywords: [
    'Steel Weight Calculator',
    'TMT Bar Weight Formula D2/162',
    'Steel Bundle Tonnage Calculator',
    'Structural Steel Weight Per Meter',
    'Trailer Load Calculator Steel',
  ],
});

export default function CalculatorPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Steel Calculator', item: '/calculator' },
  ]);

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Shree Balaji Industrial Steel Weight & Bundle Calculator',
    url: 'https://shreebalajirollingmills.com/calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'Calculate site tonnage, weight per meter, and truckload trailer bundle requirements for IS 1786 Fe-500D TMT bars and IS 2062 structural profiles.',
  };

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <JsonLd data={[breadcrumbJsonLd, webAppJsonLd]} />
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
