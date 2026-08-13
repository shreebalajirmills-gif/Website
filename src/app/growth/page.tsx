import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GrowthTimeline } from '@/components/timeline/GrowthTimeline';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = constructMetadata({
  title: 'FY26–FY30 Growth Roadmap | Path to ₹1,000 Crore Revenue',
  description:
    'Explore Shree Balaji Rolling Mills 5x capacity expansion roadmap (36,000 TPA to 180,000 TPA), gross margin resilience (2.42%), and projected ₹1,006.40 Cr turnover by FY30.',
  canonicalUrl: '/growth',
  keywords: [
    'Shree Balaji Growth Roadmap',
    'Steel Mill Financial Plan',
    '180000 TPA Steel Expansion',
    'Bhiwadi Rolling Mill Revenue Model',
  ],
});

export default function GrowthPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Growth Roadmap', item: '/growth' },
  ]);

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <JsonLd data={breadcrumbJsonLd} />
      <Header />

      <section className="pt-36 pb-12 bg-white border-b border-slate-200 steel-grid-pattern text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            FINANCIAL ROADMAP & OPERATING LEVERAGE
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
            Path to <span className="text-gradient-amber">₹1,000 Crore Revenue</span>
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto">
            Comprehensive breakdown of Shree Balaji’s revenue trajectory, gross margin resilience, and 5x capacity expansion model (FY26 through FY30).
          </p>
        </div>
      </section>

      <GrowthTimeline />

      <Footer />
    </main>
  );
}
