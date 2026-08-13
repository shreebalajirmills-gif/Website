import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SteelProductViewer } from '@/components/3d/SteelProductViewer';
import { ShieldCheck, ArrowRight, Scale, Box } from 'lucide-react';
import { constructMetadata, getBreadcrumbJsonLd, getProductJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { PRODUCTS_DATA } from '@/data/products';

export const metadata: Metadata = constructMetadata({
  title: 'IS 2062 Structural Steel Angles & Channels Manufacturing | 36,000 TPA',
  description:
    'Manufactured per BIS IS 2062:2011 Grade E250 in Bhiwadi, Haryana. High-tensile equal angles & channels for industrial framing, transmission line towers, and bridges.',
  canonicalUrl: '/products/structural-steel',
  keywords: [
    'IS 2062 Structural Steel',
    'MS Angles Manufacturer Bhiwadi',
    'Steel Channels IS 2062 Grade E250',
    'Transmission Tower Angles Delhi NCR',
    '36000 TPA Structural Mill',
  ],
});

export default function StructuralSteelPage() {
  const structuralProduct = PRODUCTS_DATA[0];

  const angleSizes = [
    { size: '40 x 40 x 5 mm', weightPerM: '2.97 kg/m', length: '12 Meters', app: 'Light Fabrication & Bracing' },
    { size: '50 x 50 x 6 mm', weightPerM: '4.47 kg/m', length: '12 Meters', app: 'Roof Trusses & Shed Framing' },
    { size: '65 x 65 x 6 mm', weightPerM: '5.89 kg/m', length: '12 Meters', app: 'Transmission Towers & Girders' },
    { size: '75 x 75 x 6 mm', weightPerM: '6.84 kg/m', length: '12 Meters', app: 'Industrial Plant Platforms' },
    { size: '90 x 90 x 8 mm', weightPerM: '10.92 kg/m', length: '12 Meters', app: 'Heavy Structural Stanchions' },
    { size: '100 x 100 x 10 mm', weightPerM: '14.90 kg/m', length: '12 Meters', app: 'Bridge Columns & Cranes' },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Our Products', item: '/products' },
    { name: 'Structural Steel', item: '/products/structural-steel' },
  ]);

  const productJsonLd = getProductJsonLd({
    name: structuralProduct.name,
    description: structuralProduct.description,
    url: '/products/structural-steel',
    standard: structuralProduct.specs.standard,
    capacity: structuralProduct.capacity.formatTpa,
    applications: structuralProduct.applications,
  });

  return (
    <main id="main-content" className="min-h-screen bg-steel-base text-steel-900 flex flex-col selection:bg-growth-500 selection:text-white">
      <JsonLd data={[breadcrumbJsonLd, productJsonLd]} />
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-steel-base border-b border-steel-200 steel-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-distributor text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-authority-700" /> BIS IS 2062 GRADE E250 CERTIFIED
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-steel-900 tracking-tight">
            Structural Steel Angles <br />
            <span className="text-gradient-growth">& Channels Manufacturing</span>
          </h1>

          <p className="text-base text-steel-600 max-w-3xl font-normal leading-relaxed">
            Manufactured from high-grade structural billets at our Bhiwadi rolling facility. Engineered for heavy industrial framing, transmission line towers, warehousing sheds, and EPC infrastructure projects.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono">
            <span className="bg-steel-100 border border-steel-200 px-3.5 py-1.5 rounded-full font-bold text-steel-900">
              Annual Platform Capacity: 36,000 TPA
            </span>
            <span className="bg-steel-100 border border-steel-200 px-3.5 py-1.5 rounded-full font-bold text-authority-700">
              Weldability Rating: Carbon Equivalent Max 0.38%
            </span>
          </div>
        </div>
      </section>

      {/* Main Content & 3D Inspector */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 3D Model Inspection Card */}
        <div className="liquid-glass-prominent rounded-3xl p-8 border border-steel-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-growth-600" />
              <h2 className="text-xl font-bold text-steel-900">3D Interactive Structural Section Inspector</h2>
            </div>
            <span className="text-xs font-mono font-bold text-steel-500">Drag to Orbit 360°</span>
          </div>

          <SteelProductViewer productType="structural_steel" />

          <p className="text-xs text-steel-600 font-normal leading-relaxed">
            Every section undergoes ultrasonic defect detection and chemical lab testing per IS 2062 standards. Guaranteed uniform flange thickness, crisp 90-degree corner radii, and zero surface scaling.
          </p>
        </div>

        {/* Dimension & Weight Schedule Table */}
        <div className="liquid-glass-prominent rounded-3xl p-8 border border-steel-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-steel-200 pb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-growth-600" />
              <h2 className="text-xl font-bold text-steel-900">Standard Equal Angle Section Schedule</h2>
            </div>
            <span className="text-xs font-mono font-bold text-growth-700 bg-growth-50 px-3 py-1 rounded-full border border-growth-200">
              IS 2062 Dimensions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-steel-200 text-steel-500 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4">Section Size (mm)</th>
                  <th className="py-3 px-4">Unit Weight (kg/m)</th>
                  <th className="py-3 px-4">Standard Stock Length</th>
                  <th className="py-3 px-4">Primary Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-200 font-mono text-steel-800">
                {angleSizes.map((item, i) => (
                  <tr key={i} className="hover:bg-steel-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-steel-900">{item.size}</td>
                    <td className="py-3.5 px-4 font-bold text-growth-700">{item.weightPerM}</td>
                    <td className="py-3.5 px-4 text-steel-600">{item.length}</td>
                    <td className="py-3.5 px-4 font-sans text-steel-600">{item.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="liquid-glass-contractor rounded-3xl p-8 border border-steel-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-steel-900">Require Custom Section Modulus or Bulk Freight Delivery?</h3>
            <p className="text-xs text-steel-600">Direct dispatch available across Delhi NCR, Haryana, UP, and Punjab.</p>
          </div>
          <Link
            href="/inquiry?segment=contractor"
            className="btn-primary py-3.5 px-6 rounded-2xl text-xs font-extrabold flex items-center gap-2 shrink-0"
          >
            <span>Request Structural Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      <Footer />
    </main>
  );
}
