'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/contact/ContactSection';
import { useRouter } from 'next/navigation';
import { BuyerSegment } from '@/types';

export default function ContactPage() {
  const router = useRouter();

  const handleSelectSegment = (segment: BuyerSegment) => {
    router.push(`/inquiry?segment=${segment}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <section className="pt-36 pb-12 bg-white border-b border-slate-200 steel-grid-pattern text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
            MVP CONTACT PLACEHOLDERS
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
            Multi-Channel <span className="text-gradient-amber">Contact Desk</span>
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto">
            Use these placeholder routes for chat, callback, email, and form testing while the live details are being finalized.
          </p>
        </div>
      </section>

      <ContactSection onSelectSegment={handleSelectSegment} />

      <Footer />
    </main>
  );
}
