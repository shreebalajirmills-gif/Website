import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { constructMetadata } from '@/lib/seo';
import { ShieldAlert, ArrowLeft, Layers, Phone, Building2 } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Page Not Found (404)',
  description: 'The requested page could not be found on Shree Balaji Rolling Mills digital platform.',
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-steel-base text-steel-900 flex flex-col font-sans">
      <Header />

      <main id="main-content" className="flex-1 pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center flex flex-col items-center justify-center space-y-8">
        
        <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 text-xs font-mono font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          HTTP 404 — PAGE NOT FOUND
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
          The requested page <br />
          <span className="text-gradient-growth">could not be found</span>
        </h1>

        <p className="text-sm sm:text-base text-steel-600 max-w-lg leading-relaxed">
          The link you followed may be expired, relocated, or mistyped. Use the navigation links below to return to our primary steel products catalog or commercial sales desk.
        </p>

        {/* Recommended Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl pt-4">
          <Link
            href="/"
            className="liquid-glass p-5 rounded-2xl border border-steel-200 hover:border-growth-400 text-left transition-all group space-y-2"
          >
            <Building2 className="w-5 h-5 text-growth-600 group-hover:scale-110 transition-transform" />
            <h2 className="text-sm font-bold text-slate-950">Platform Home</h2>
            <p className="text-xs text-steel-600">Return to mill overview & 180,000 TPA capacity hub</p>
          </Link>

          <Link
            href="/products"
            className="liquid-glass p-5 rounded-2xl border border-steel-200 hover:border-growth-400 text-left transition-all group space-y-2"
          >
            <Layers className="w-5 h-5 text-authority-600 group-hover:scale-110 transition-transform" />
            <h2 className="text-sm font-bold text-slate-950">Product Suite</h2>
            <p className="text-xs text-steel-600">Inspect IS 2062 structural & IS 1786 Fe-500D rebars</p>
          </Link>

          <Link
            href="/contact"
            className="liquid-glass p-5 rounded-2xl border border-steel-200 hover:border-growth-400 text-left transition-all group space-y-2"
          >
            <Phone className="w-5 h-5 text-trust-600 group-hover:scale-110 transition-transform" />
            <h2 className="text-sm font-bold text-slate-950">Contact Desk</h2>
            <p className="text-xs text-steel-600">Bhiwadi mill sales & Delhi NCR corporate team</p>
          </Link>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="btn-primary py-3 px-6 rounded-full text-xs font-extrabold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Website</span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
