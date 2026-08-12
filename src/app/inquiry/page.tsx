'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InquiryForm } from '@/components/inquiry-form/InquiryForm';
import { BuyerSegment } from '@/types';

function InquiryFormContent() {
  const searchParams = useSearchParams();
  const segmentParam = searchParams.get('segment') as BuyerSegment | null;
  const initialSegment: BuyerSegment = segmentParam || 'distributor';

  return <InquiryForm initialSegment={initialSegment} />;
}

export default function InquiryPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
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

      <Suspense fallback={<div className="text-center py-20 text-xs font-mono text-slate-500">Loading Inquiry Portal...</div>}>
        <InquiryFormContent />
      </Suspense>

      <Footer />
    </main>
  );
}
