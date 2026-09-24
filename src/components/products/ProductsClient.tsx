'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Camera, Image as ImageIcon } from 'lucide-react';
import { SteelComparisonMatrix } from '@/components/products/SteelComparisonMatrix';
import { RequestProductImagesModal } from '@/components/products/RequestProductImagesModal';
import { PRODUCTS_DATA } from '@/data/products';

export default function ProductsClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('all');
  const [selectedProductName, setSelectedProductName] = useState<string | undefined>(undefined);

  const handleOpenPhotoRequest = (category: string = 'all', productName?: string) => {
    setSelectedProductCategory(category);
    setSelectedProductName(productName);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-steel-base border-b border-steel-200 steel-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-base px-4 py-1.5 inline-flex items-center gap-2 text-steel-900 text-xs font-mono font-bold uppercase tracking-wider">
            BIS Institutional Specifications
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-steel-900 tracking-tight">
            Institutional Product Suite & <span className="text-amber-600">Technical Standards</span>
          </h1>
          <p className="text-base text-steel-600 max-w-2xl mx-auto font-normal">
            Direct rolling mill manufactured MS Flats (Patti), MS Round Bars (Gol), and MS Square Bars (Chakor) per BIS IS 2062 Grade E250 at our Bhiwadi facility.
          </p>

          {/* Action Trigger for Requesting Product Images */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenPhotoRequest('all')}
              className="btn-primary py-3.5 px-6 text-sm font-bold flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Request Product & Mill Photos</span>
            </button>
            <Link
              href="/inquiry"
              className="btn-secondary py-3.5 px-6 text-sm font-bold flex items-center gap-2"
            >
              <span>Submit Commercial Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
                className="card-base card-product p-7 border border-steel-200 flex flex-col justify-between space-y-6 bg-white dark:bg-slate-900"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-mono font-bold border rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
                      {product.specs.standard}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-steel-700 dark:text-steel-300">
                      {product.capacity.formatTpa}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-steel-900 dark:text-white leading-tight">
                      {product.name}
                    </h2>
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-1">
                      {product.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-steel-600 dark:text-steel-400 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Size schedule summary */}
                  {product.sizeRangeSummary && (
                    <div className="p-3 bg-steel-100/90 dark:bg-slate-800/80 border border-steel-200 dark:border-slate-700 text-xs rounded-lg">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-steel-500 dark:text-steel-400 block font-bold">
                        Available Sizes & Sections
                      </span>
                      <span className="font-mono text-xs font-bold text-steel-900 dark:text-white mt-0.5 block">
                        {product.sizeRangeSummary}
                      </span>
                    </div>
                  )}

                  {/* Key Highlights */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-steel-500 dark:text-steel-400 block font-bold">
                      Target Applications:
                    </span>
                    <ul className="space-y-1 text-xs text-steel-700 dark:text-steel-300">
                      {product.applications.slice(0, 3).map((app, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-steel-200 dark:border-slate-800 space-y-2">
                  {/* Button to request photos of this specific product */}
                  <button
                    type="button"
                    onClick={() => handleOpenPhotoRequest(product.type, product.name)}
                    className="w-full py-2.5 px-4 text-xs font-bold rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Request Product Images / Frames</span>
                  </button>

                  <Link
                    href={detailUrl}
                    className="btn-primary w-full py-2.5 px-4 text-xs font-extrabold flex items-center justify-center gap-2"
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

      {/* Modal for Requesting Product Images with 1.88s delay & frame preview */}
      <RequestProductImagesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCategory={selectedProductCategory}
        defaultProductTitle={selectedProductName}
      />
    </>
  );
}
