'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/hero/HeroSection';
import { ProductHub } from '@/components/products/ProductHub';
import { SteelCalculatorWidget } from '@/components/tools/SteelCalculatorWidget';
import { GrowthTimeline } from '@/components/timeline/GrowthTimeline';
import { InquiryForm } from '@/components/inquiry-form/InquiryForm';
import { TrustSection } from '@/components/trust/TrustSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { BuyerSegment } from '@/types';

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
      <GrowthTimeline />

      {/* Context-Aware Buyer Inquiry Portal */}
      <InquiryForm initialSegment={selectedSegment} />

      {/* Institutional Trust & Certifications Proof */}
      <TrustSection />

      {/* Multi-Channel Contact & Regional Desk */}
      <ContactSection onSelectSegment={handleSelectSegment} />

      {/* Global Footer */}
      <Footer onSelectSegment={handleSelectSegment} />
    </main>
  );
}
