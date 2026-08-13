import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldAlert, ArrowLeft, Home, Package, PhoneCall } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Access Restricted | Shree Balaji Rolling Mills',
  description: 'The requested resource or action cannot be accessed.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnauthorizedPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 py-28 bg-steel-base border-b border-steel-200 relative overflow-hidden flex items-center justify-center min-h-[70vh]">
        <div className="ambient-liquid-glow ambient-glow-authority top-1/4 left-1/2 -translate-x-1/2" />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-8">
          
          {/* Restricted Access Badge & Icon */}
          <div className="mx-auto w-20 h-20 rounded-3xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shadow-lg animate-in zoom-in-90 duration-300">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <span className="glass-pill px-4 py-1.5 text-xs font-bold text-red-700 uppercase tracking-widest inline-block border-red-300">
              Access Restricted
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-steel-900 tracking-tight">
              Action Cannot Be Accessed
            </h1>
            <p className="text-sm text-steel-600 max-w-lg mx-auto font-normal leading-relaxed">
              The requested page, resource, or action is restricted or unavailable. Please use the navigation links below to return to the public website.
            </p>
          </div>

          {/* Safe Navigation Card */}
          <div className="liquid-glass-prominent rounded-3xl p-6 sm:p-8 border border-steel-200 shadow-xl space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-steel-500">
              Safe Navigation Options
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <Link
                href="/"
                className="py-3 px-4 rounded-2xl bg-white border border-steel-200 text-steel-900 font-bold text-xs hover:bg-steel-50 hover:border-steel-300 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Home className="w-4 h-4 text-steel-700" />
                <span>Return Home</span>
              </Link>
              <Link
                href="/products"
                className="py-3 px-4 rounded-2xl bg-white border border-steel-200 text-steel-900 font-bold text-xs hover:bg-steel-50 hover:border-steel-300 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Package className="w-4 h-4 text-growth-600" />
                <span>View Products</span>
              </Link>
              <Link
                href="/contact"
                className="py-3 px-4 rounded-2xl bg-steel-950 text-white font-bold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Contact Desk</span>
              </Link>
            </div>
          </div>

          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-steel-600 hover:text-steel-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shree Balaji Rolling Mills Home</span>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
