import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';
import { SteelComparisonMatrix } from '@/components/products/SteelComparisonMatrix';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = constructMetadata({
  title: 'Products Suite | Structural Steel & TMT Bars (BIS Certified)',
  description:
    'Explore Shree Balaji Rolling Mills product catalog: IS 2062 Structural Steel Angles & Channels (36,000 TPA) and IS 1786 Fe-500D High-Ductility TMT Rebars (144,000 TPA).',
  canonicalUrl: '/products',
  keywords: [
    'IS 2062 Angles and Channels',
    'Fe 500D TMT Bar Catalog',
    'Structural Steel Specifications India',
    'Bhiwadi Rolling Mill Products',
  ],
});

export default function ProductsPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Our Products', item: '/products' },
  ]);

  return (
    <main id="main-content" className="min-h-screen bg-steel-base text-steel-900 flex flex-col selection:bg-growth-500 selection:text-white">
      <JsonLd data={breadcrumbJsonLd} />
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-steel-base border-b border-steel-200 steel-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-growth-700 text-xs font-mono font-bold uppercase tracking-wider">
            BIS Institutional Specifications
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-steel-900 tracking-tight">
            Institutional Product Suite & <span className="text-gradient-growth">Technical Standards</span>
          </h1>
          <p className="text-base text-steel-600 max-w-2xl mx-auto font-normal">
            Direct rolling mill manufactured structural steel profiles (IS 2062) and high-ductility TMT rebars (IS 1786 Fe-500D) engineered for Northern India’s commercial infrastructure.
          </p>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Structural Steel Dedicated Entry Card */}
          <div className="liquid-glass liquid-glass-distributor rounded-3xl p-8 border border-steel-200 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="badge-distributor px-3 py-1 rounded-full text-xs font-extrabold font-mono">
                  BIS IS 2062 Grade E250
                </span>
                <span className="text-xs font-mono font-bold text-authority-700">36,000 TPA Capacity</span>
              </div>

              <h2 className="text-3xl font-black text-steel-900 mb-2">Structural Angles & Channels</h2>
              <p className="text-sm font-bold text-growth-700 mb-4">Industrial Framing, Transmission Towers & Sheds</p>
              <p className="text-xs sm:text-sm text-steel-600 leading-relaxed mb-6 font-normal">
                Manufactured from premium steel billets in Bhiwadi. Features high weldability (Carbon max 0.23%), uniform flange thickness, and zero internal lamination defects.
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-steel-100/90 border border-steel-200 mb-6 text-xs font-mono">
                <div>
                  <span className="text-steel-500 block text-[10px]">MIN YIELD STRENGTH</span>
                  <span className="text-steel-900 font-bold text-sm">250 MPa</span>
                </div>
                <div>
                  <span className="text-steel-500 block text-[10px]">TENSILE STRENGTH</span>
                  <span className="text-growth-700 font-bold text-sm">410 – 540 MPa</span>
                </div>
              </div>
            </div>

            <Link
              href="/products/structural-steel"
              className="btn-primary py-3.5 px-6 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <span>Explore In-Depth Structural Steel Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* TMT Rebar Dedicated Entry Card */}
          <div className="liquid-glass liquid-glass-contractor rounded-3xl p-8 border border-steel-200 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="badge-contractor px-3 py-1 rounded-full text-xs font-extrabold font-mono">
                  BIS IS 1786 Fe-500D
                </span>
                <span className="text-xs font-mono font-bold text-growth-700">144,000 TPA Target</span>
              </div>

              <h2 className="text-3xl font-black text-steel-900 mb-2">High-Ductility TMT Rebars</h2>
              <p className="text-sm font-bold text-growth-700 mb-4">High-Rise Foundations, Civil Bridges & Seismic Zones</p>
              <p className="text-xs sm:text-sm text-steel-600 leading-relaxed mb-6 font-normal">
                Thermo-mechanically treated rebars (8mm to 32mm) with high elongation (min 16%) for seismic energy absorption during earthquakes.
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-steel-100/90 border border-steel-200 mb-6 text-xs font-mono">
                <div>
                  <span className="text-steel-500 block text-[10px]">MIN YIELD STRENGTH</span>
                  <span className="text-steel-900 font-bold text-sm">500 MPa</span>
                </div>
                <div>
                  <span className="text-steel-500 block text-[10px]">MIN ELONGATION</span>
                  <span className="text-trust-700 font-bold text-sm">16% (Seismic)</span>
                </div>
              </div>
            </div>

            <Link
              href="/products/tmt-rebars"
              className="btn-primary py-3.5 px-6 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <span>Explore In-Depth TMT Rebar Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Technical Side-by-Side Matrix */}
        <SteelComparisonMatrix />
      </section>

      <Footer />
    </main>
  );
}
