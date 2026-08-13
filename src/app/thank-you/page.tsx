import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { constructMetadata } from '@/lib/seo';
import { CheckCircle2, Package, Calculator, Home, Clock, PhoneCall } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Enquiry Submitted | Shree Balaji Rolling Mills',
  description: 'Thank you for submitting your commercial inquiry to Shree Balaji Rolling Mills Private Limited.',
  noIndex: true,
});

function ThankYouContent() {
  return (
    <main id="main-content" className="flex-1 py-28 bg-steel-base border-b border-steel-200 relative overflow-hidden flex items-center justify-center min-h-[70vh]">
      <div className="ambient-liquid-glow ambient-glow-growth top-1/4 left-1/2 -translate-x-1/2 scale-125" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-8">
        
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-lg animate-in zoom-in-90 duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="glass-pill px-4 py-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest inline-block border-emerald-300">
            ENQUIRY CONFIRMED & ROUTED
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-steel-900 tracking-tight">
            Thank You For Your Enquiry
          </h1>
          <p className="text-sm text-steel-600 max-w-lg mx-auto font-normal leading-relaxed">
            Our commercial sales team will review your enquiry and get back to you as soon as possible.
          </p>
        </div>

        {/* Expected Next Steps Card */}
        <div className="liquid-glass-prominent rounded-3xl p-6 sm:p-8 border border-steel-200 shadow-xl space-y-6 text-left">
          
          <div className="flex items-center gap-3 border-b border-steel-200 pb-4">
            <Clock className="w-5 h-5 text-growth-600 shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">What Happens Next?</h2>
              <p className="text-xs text-steel-600 font-normal">
                Your inquiry has been assigned to our Bhiwadi sales desk for commercial validation. Standard response time is within 24 business hours.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-steel-500 block text-center">
              Continue Exploring SBRM Platform:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/products"
                className="py-3 px-4 rounded-2xl bg-white border border-steel-200 text-steel-900 font-bold text-xs hover:bg-steel-50 hover:border-steel-300 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Package className="w-4 h-4 text-growth-600" />
                <span>View Products</span>
              </Link>
              <Link
                href="/calculator"
                className="py-3 px-4 rounded-2xl bg-white border border-steel-200 text-steel-900 font-bold text-xs hover:bg-steel-50 hover:border-steel-300 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Calculator className="w-4 h-4 text-authority-600" />
                <span>Steel Calculator</span>
              </Link>
              <Link
                href="/"
                className="py-3 px-4 rounded-2xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Home className="w-4 h-4 text-amber-400" />
                <span>Return Home</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Immediate Call Alternative */}
        <div className="pt-2">
          <p className="text-xs text-steel-600 font-normal">
            Need urgent dispatch status? Call our sales desk directly at{' '}
            <a href="tel:+918800106726" className="font-bold text-steel-900 hover:text-growth-700 underline inline-flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-amber-600" />
              +91 8800106726
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="py-28 text-center text-xs font-mono text-steel-500">Loading confirmation...</div>}>
        <ThankYouContent />
      </Suspense>
      <Footer />
    </>
  );
}
