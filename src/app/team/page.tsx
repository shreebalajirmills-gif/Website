import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { constructMetadata } from '@/lib/seo';
import { Code2, ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Tech Team | Shree Balaji Rolling Mills',
  description:
    'Engineering and digital infrastructure desk for Shree Balaji Rolling Mills Private Limited.',
  canonicalUrl: '/team',
});

export default function TeamPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 py-28 bg-steel-base border-b border-steel-200 relative overflow-hidden flex items-center justify-center min-h-[65vh]">
        <div className="ambient-liquid-glow ambient-glow-growth top-1/3 left-1/2 -translate-x-1/2" />

        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-8">
          
          {/* Header Badge */}
          <div className="space-y-3">
            <span className="glass-pill px-4 py-1.5 text-xs font-bold text-growth-700 uppercase tracking-widest inline-flex items-center gap-2">
              <Code2 className="w-4 h-4 text-growth-600" />
              <span>DIGITAL & ENGINEERING INFRASTRUCTURE</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-steel-900 tracking-tight">
              Tech Team
            </h1>
            <p className="text-sm text-steel-600 max-w-md mx-auto leading-relaxed font-normal">
              Digital architecture, platform security, and web engineering for Shree Balaji Rolling Mills Private Limited.
            </p>
          </div>

          {/* Minimal Tech Team Card */}
          <div className="liquid-glass-prominent rounded-3xl p-8 border border-steel-200 shadow-xl space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-steel-200 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-steel-900">Digital Lead & Architect</h2>
                <span className="text-xs text-steel-500 font-mono">Full-Stack & Systems Infrastructure</span>
              </div>
              <span className="glass-pill px-3 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-steel-600 font-normal">
                Engineering portfolio & technical profile:
              </span>
              <a
                href="https://utkarshmanitripathi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-2 !px-4 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 hover:text-growth-700 transition-all shadow-sm"
              >
                <span>Visit Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
