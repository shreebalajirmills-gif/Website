import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SteelComparisonMatrix } from '@/components/products/SteelComparisonMatrix';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { PRODUCTS_DATA } from '@/data/products';

export const metadata: Metadata = constructMetadata({
  title: 'Products Suite | MS Flats, Round Bars & Square Bars (BIS Certified)',
  description:
    'Explore Shree Balaji Rolling Mills product catalog: IS 2062 MS Flats (Patti), Round Bars (Gol), and Square Bars (Chakor) manufactured per BIS IS 2062:2011 Grade E250 in Bhiwadi, Haryana.',
  canonicalUrl: '/products',
  keywords: [
    'MS Flats Manufacturer',
    'MS Round Bars Gol',
    'MS Square Bars Chakor',
    'IS 2062 Grade E250 Steel',
    'Bhiwadi Rolling Mill Products',
    'Patti Gol Chakor Delhi NCR',
  ],
});

export default function ProductsPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Our Products', item: '/products' },
  ]);

  return (
    <main id="main-content" className="min-h-screen bg-steel-base text-steel-900 flex flex-col selection:bg-transparent group-hover:bg-growth-500 selection:text-white">
      <JsonLd data={breadcrumbJsonLd} />
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-steel-base border-b border-steel-200 steel-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="badge-base px-4 py-1.5 inline-flex items-center gap-2 text-steel-900 text-xs font-mono font-bold uppercase tracking-wider">
            BIS Institutional Specifications
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-steel-900 tracking-tight">
            Institutional Product Suite & <span className="text-gradient-growth">Technical Standards</span>
          </h1>
          <p className="text-base text-steel-600 max-w-2xl mx-auto font-normal">
            Direct rolling mill manufactured MS Flats (Patti), MS Round Bars (Gol), and MS Square Bars (Chakor) per BIS IS 2062 Grade E250 at our Bhiwadi facility.
          </p>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS_DATA.map((product) => {
            const isStructural = product.type !== 'tmt_bar';
            const detailUrl = isStructural ? '/products/structural-steel' : '/products/tmt-rebars';

            return (
              <div
                key={product.id}
                className={`card-base p-7 border border-steel-200 flex flex-col justify-between space-y-6 ${
                  product.isNewFacility ? 'liquid-glass-contractor' : 'liquid-glass-distributor'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 text-[11px] font-mono font-bold border ${
                      product.isNewFacility ? 'badge-contractor' : 'badge-distributor'
                    }`}>
                      {product.specs.standard}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-steel-700">
                      {product.capacity.formatTpa}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-steel-900 leading-tight">
                      {product.name}
                    </h2>
                    <p className="text-xs font-bold text-growth-700 mt-1">
                      {product.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-steel-600 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Size schedule summary */}
                  {product.sizeRangeSummary && (
                    <div className="p-3 bg-steel-100/90 border border-steel-200 text-xs">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-steel-500 block font-bold">
                        Available Sizes & Sections
                      </span>
                      <span className="font-mono text-xs font-bold text-steel-900 mt-0.5 block">
                        {product.sizeRangeSummary}
                      </span>
                    </div>
                  )}

                  {/* Key Highlights */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-steel-500 block font-bold">
                      Target Applications:
                    </span>
                    <ul className="space-y-1 text-xs text-steel-700">
                      {product.applications.slice(0, 3).map((app, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-growth-600 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-steel-200">
                  <Link
                    href={detailUrl}
                    className="btn-primary w-full py-3 px-4 text-xs font-extrabold flex items-center justify-center gap-2"
                  >
                    <span>View Technical Specifications & Schedule</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Side-by-Side Matrix */}
        <SteelComparisonMatrix />
      </section>

      <Footer />
    </main>
  );
}
