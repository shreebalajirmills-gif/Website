'use client';

import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/hero/HeroSection';
import { ComponentSkeleton } from '@/components/ui/skeleton/ComponentSkeleton';
import { BuyerSegment } from '@/types';
import { motion, Variants } from 'framer-motion';

// Dynamically imported components that load individually on demand
const ProductHub = dynamic(
  () => import('@/components/products/ProductHub').then((m) => ({ default: m.ProductHub })),
  {
    loading: () => <ComponentSkeleton title="Loading Product Hub..." badge="BIS Product Suite" heightClass="min-h-[550px]" />,
    ssr: true,
  }
);

const SteelCalculatorWidget = dynamic(
  () => import('@/components/tools/SteelCalculatorWidget').then((m) => ({ default: m.SteelCalculatorWidget })),
  {
    loading: () => <ComponentSkeleton title="Loading Steel Calculator..." badge="B2B Engineering Tool" heightClass="min-h-[450px]" />,
    ssr: true,
  }
);

const GrowthTimeline = dynamic(
  () => import('@/components/timeline/GrowthTimeline').then((m) => ({ default: m.GrowthTimeline })),
  {
    loading: () => <ComponentSkeleton title="Loading Growth Timeline..." badge="FY26–FY30 Roadmap" heightClass="min-h-[500px]" />,
    ssr: true,
  }
);

const InquiryForm = dynamic(
  () => import('@/components/inquiry-form/InquiryForm').then((m) => ({ default: m.InquiryForm })),
  {
    loading: () => <ComponentSkeleton title="Loading Inquiry Portal..." badge="Commercial Desk" heightClass="min-h-[450px]" />,
    ssr: true,
  }
);

const TrustSection = dynamic(
  () => import('@/components/trust/TrustSection').then((m) => ({ default: m.TrustSection })),
  {
    loading: () => <ComponentSkeleton title="Loading Trust & Certifications..." badge="Institutional Credibility" heightClass="min-h-[400px]" />,
    ssr: true,
  }
);

const ContactSection = dynamic(
  () => import('@/components/contact/ContactSection').then((m) => ({ default: m.ContactSection })),
  {
    loading: () => <ComponentSkeleton title="Loading Direct Dispatch Desk..." badge="Sales Channels" heightClass="min-h-[420px]" />,
    ssr: true,
  }
);

const LocationMapSection = dynamic(
  () => import('@/components/location/LocationMapSection').then((m) => ({ default: m.LocationMapSection })),
  {
    loading: () => <ComponentSkeleton title="Loading Mill Coordinates & Map..." badge="Bhiwadi Facility Map" heightClass="min-h-[380px]" />,
    ssr: true,
  }
);

const FAQSection = dynamic(
  () => import('@/components/faq/FAQSection').then((m) => ({ default: m.FAQSection })),
  {
    loading: () => <ComponentSkeleton title="Loading Institutional FAQs..." badge="Technical Questions" heightClass="min-h-[360px]" />,
    ssr: true,
  }
);

const Footer = dynamic(
  () => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })),
  {
    loading: () => <div className="h-48 bg-steel-900" />,
    ssr: true,
  }
);

// Gentle, slow, and staggered reveal animations for individual component entry
const gentleSlowFade: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier deceleration
    },
  },
};

export function HomePageClient() {
  const [selectedSegment, setSelectedSegment] = useState<BuyerSegment>('distributor');

  const handleSelectSegment = (segment: BuyerSegment) => {
    setSelectedSegment(segment);
  };

  return (
    <main id="main-content" className="min-h-screen bg-steel-base text-primary flex flex-col selection:bg-transparent group-hover:bg-growth-500 selection:text-white font-sans">
      {/* Fixed Institutional Navigation Dock */}
      <Header onSelectSegment={handleSelectSegment} />

      {/* 1. Hero Banner with 3D Steel Canvas & Persona Selection */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={gentleSlowFade}
      >
        <HeroSection onSelectSegment={handleSelectSegment} />
      </motion.div>

      {/* 2. Structural Steel & TMT Bar Product Hub with 3D WebGL Inspector */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gentleSlowFade}
      >
        <Suspense fallback={<ComponentSkeleton title="Loading Product Hub..." badge="BIS Product Suite" heightClass="min-h-[550px]" />}>
          <ProductHub onSelectSegment={handleSelectSegment} />
        </Suspense>
      </motion.div>

      {/* 3. Interactive Industrial Steel Weight & Bundle Calculator Tool */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gentleSlowFade}
      >
        <Suspense fallback={<ComponentSkeleton title="Loading Steel Calculator..." badge="B2B Engineering Tool" heightClass="min-h-[450px]" />}>
          <SteelCalculatorWidget />
        </Suspense>
      </motion.div>

      {/* 4. FY26–FY30 Path to ₹1,000 Crore Growth Timeline with 3D Sparks Engine */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gentleSlowFade}
      >
        <Suspense fallback={<ComponentSkeleton title="Loading Growth Timeline..." badge="FY26–FY30 Roadmap" heightClass="min-h-[500px]" />}>
          <GrowthTimeline />
        </Suspense>
      </motion.div>

      {/* 5. Context-Aware Buyer Inquiry Portal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gentleSlowFade}
      >
        <Suspense fallback={<ComponentSkeleton title="Loading Inquiry Portal..." badge="Commercial Desk" heightClass="min-h-[450px]" />}>
          <InquiryForm initialSegment={selectedSegment} />
        </Suspense>
      </motion.div>

      {/* 6. Institutional Trust & Certifications Proof */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gentleSlowFade}
      >
        <Suspense fallback={<ComponentSkeleton title="Loading Trust & Certifications..." badge="Institutional Credibility" heightClass="min-h-[400px]" />}>
          <TrustSection />
        </Suspense>
      </motion.div>

      {/* 7. Multi-Channel Contact & Regional Desk */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gentleSlowFade}
      >
        <Suspense fallback={<ComponentSkeleton title="Loading Direct Dispatch Desk..." badge="Sales Channels" heightClass="min-h-[420px]" />}>
          <ContactSection onSelectSegment={handleSelectSegment} />
        </Suspense>
      </motion.div>

      {/* 8. Bhiwadi Mill Location Map & Route Directions */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gentleSlowFade}
      >
        <Suspense fallback={<ComponentSkeleton title="Loading Mill Coordinates & Map..." badge="Bhiwadi Facility Map" heightClass="min-h-[380px]" />}>
          <LocationMapSection />
        </Suspense>
      </motion.div>

      {/* 9. Institutional Steel FAQ Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gentleSlowFade}
      >
        <Suspense fallback={<ComponentSkeleton title="Loading Institutional FAQs..." badge="Technical Questions" heightClass="min-h-[360px]" />}>
          <FAQSection />
        </Suspense>
      </motion.div>

      {/* 10. Global Footer */}
      <Suspense fallback={<div className="h-48 bg-steel-900" />}>
        <Footer onSelectSegment={handleSelectSegment} />
      </Suspense>
    </main>
  );
}
