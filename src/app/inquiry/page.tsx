import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InquiryPageClient } from '@/components/inquiry-form/InquiryPageClient';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = constructMetadata({
  title: 'Direct Rolling Mill Inquiry Portal | Quotes & Distributorship',
  description:
    'Submit channel partnership terms, contractor bulk quote requests, or infrastructure tender proposals directly to Shree Balaji Rolling Mills sales desk in Bhiwadi.',
  canonicalUrl: '/inquiry',
  keywords: [
    'Steel Quotation Request',
    'Bhiwadi Rolling Mill Direct Quote',
    'TMT Bar Bulk Inquiry',
    'Structural Steel Distributorship',
  ],
});

export default function InquiryPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Inquiry Portal', item: '/inquiry' },
  ]);

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <JsonLd data={breadcrumbJsonLd} />
      <Header />

      <section className="pt-36 pb-12 bg-white border-b border-slate-200 steel-grid-pattern text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            CONTEXT-AWARE B2B ROUTING
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
            Direct Rolling Mill <span className="text-gradient-amber">Inquiry Portal</span>
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto">
            Submit your channel partnership terms, contractor bulk quote requirements, or tender SLA proposals directly to our commercial sales desk.
          </p>
        </div>
      </section>

      <InquiryPageClient />

      <Footer />
    </main>
  );
}
