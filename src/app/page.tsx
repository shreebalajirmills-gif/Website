'use client';

import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/hero/HeroSection';
import { ProductHub } from '@/components/products/ProductHub';
import { SteelCalculatorWidget } from '@/components/tools/SteelCalculatorWidget';
import { TrustSection } from '@/components/trust/TrustSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { BuyerSegment } from '@/types';

// ─── Three.js canvases — SSR disabled, skeleton handles loading state ───
// These are consumed inside HeroSection, ProductHub, and GrowthTimeline
// but we also export them for use at the page level if needed.
export const SteelHeroCanvas = dynamic(
  () => import('@/components/3d/SteelHeroCanvas').then(m => ({ default: m.SteelHeroCanvas })),
  { ssr: false }
)

export const SteelSparksCanvas = dynamic(
  () => import('@/components/3d/SteelSparksCanvas').then(m => ({ default: m.SteelSparksCanvas })),
  { ssr: false }
)

export const SteelProductViewer = dynamic(
  () => import('@/components/3d/SteelProductViewer').then(m => ({ default: m.SteelProductViewer })),
  { ssr: false }
)

// ─── Heavy sections — code-split, SSR enabled ─────────────────────────
const GrowthTimeline = dynamic(
  () => import('@/components/timeline/GrowthTimeline').then(m => ({ default: m.GrowthTimeline }))
)

const InquiryForm = dynamic(
  () => import('@/components/inquiry-form/InquiryForm').then(m => ({ default: m.InquiryForm }))
)

export default function Home() {
  const [selectedSegment, setSelectedSegment] = useState<BuyerSegment>('distributor');

  const handleSelectSegment = (segment: BuyerSegment) => {
    setSelectedSegment(segment);
  };

  return (
    <main id="main-content" className="min-h-screen bg-steel-base text-primary flex flex-col selection:bg-growth-500 selection:text-white font-sans">
      {/* Fixed Institutional Navigation Dock */}
      <Header onSelectSegment={handleSelectSegment} />

      {/* Hero Banner with 3D Steel Canvas & Segment Selection */}
      <HeroSection onSelectSegment={handleSelectSegment} />

      {/* Structural Steel & TMT Bar Product Hub with 3D Inspector & Matrix */}
      <ProductHub onSelectSegment={handleSelectSegment} />

      {/* Interactive Industrial Steel Weight & Bundle Calculator Tool */}
      <SteelCalculatorWidget />

      {/* FY26–FY30 Path to ₹1,000 Crore Growth Timeline with 3D Sparks Engine */}
      <Suspense fallback={<div className="py-28 bg-steel-base" aria-label="Loading growth timeline..." />}>
        <GrowthTimeline />
      </Suspense>

      {/* Context-Aware Buyer Inquiry Portal */}
      <Suspense fallback={<div className="py-28 bg-steel-subtle" aria-label="Loading inquiry form..." />}>
        <InquiryForm initialSegment={selectedSegment} />
      </Suspense>

      {/* Institutional Trust & Certifications Proof */}
      <TrustSection />

      {/* Multi-Channel Contact & Regional Desk */}
      <ContactSection onSelectSegment={handleSelectSegment} />

      {/* Global Footer */}
      <Footer onSelectSegment={handleSelectSegment} />
    </main>
  );
}
