'use client';

import React, { useState } from 'react';
import { PRODUCTS_DATA } from '@/data/products';
import { ProductSpec, BuyerSegment } from '@/types';
import { Download, ShieldCheck, Clock, CheckCircle2, FileText, X, ArrowRight, Box } from 'lucide-react';
import { SteelProductViewer } from '@/components/3d/SteelProductViewer';
import { SteelComparisonMatrix } from '@/components/products/SteelComparisonMatrix';
import { downloadDynamicPdf } from '@/lib/pdf-generator';

interface ProductHubProps {
  onSelectSegment: (segment: BuyerSegment) => void;
}

export const ProductHub: React.FC<ProductHubProps> = ({ onSelectSegment }) => {
  const [activeModalProduct, setActiveModalProduct] = useState<ProductSpec | null>(null);
  const [active3DViewers, setActive3DViewers] = useState<Record<string, boolean>>({
    'structural-steel-01': true,
    'tmt-bar-01': true,
  });

  const toggle3DViewer = (productId: string) => {
    setActive3DViewers((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleOrderInquiry = (productType: 'structural_steel' | 'tmt_bar') => {
    onSelectSegment('contractor');
    const element = document.getElementById('inquiry-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveModalProduct(null);
  };

  return (
    <section id="products" className="py-28 bg-steel-base border-b border-steel-200 relative">
      
      <div className="ambient-liquid-glow ambient-glow-authority top-1/2 left-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-growth-700 text-xs font-bold uppercase tracking-wider">
            Institutional Product Suite
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-steel-900 tracking-tight">
            Structural Steel & <span className="text-gradient-growth">High-Ductility TMT Bars</span>
          </h2>
          <p className="text-base text-steel-600 leading-relaxed font-normal">
            Manufactured to Bureau of Indian Standards (BIS) IS 2062 & IS 1786 at our Bhiwadi rolling facility. Engineered for heavy infrastructure, commercial towers, and industrial framing.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {PRODUCTS_DATA.map((product) => {
            const isViewerOpen = active3DViewers[product.id] ?? true;

            return (
              <div
                key={product.id}
                className={`liquid-glass liquid-glass-interactive ${
                  product.isNewFacility ? 'liquid-glass-contractor' : 'liquid-glass-distributor'
                } rounded-3xl p-8 flex flex-col justify-between relative shadow-lg`}
              >
                <div>
                  {/* Badge & Lead Time */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full font-mono border ${
                      product.isNewFacility ? 'badge-contractor' : 'badge-distributor'
                    }`}>
                      {product.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-steel-600 font-medium glass-pill px-3 py-1">
                      <Clock className="w-3.5 h-3.5 text-growth-600" />
                      <span>Lead Time: {product.leadTime}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-extrabold text-steel-900 mb-2">{product.name}</h3>
                  <p className="text-sm font-bold text-growth-700 mb-4">{product.tagline}</p>

                  {/* 3D Interactive Model Section Toggle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-steel-600 flex items-center gap-1.5 uppercase tracking-wider">
                        <Box className="w-4 h-4 text-growth-600" />
                        <span>3D WebGL Inspection</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => toggle3DViewer(product.id)}
                        className="text-[11px] text-growth-700 hover:underline font-bold"
                      >
                        {isViewerOpen ? 'Hide 3D View' : 'Show 3D View'}
                      </button>
                    </div>

                    {isViewerOpen && (
                      <SteelProductViewer productType={product.type} />
                    )}
                  </div>

                <p className="text-xs sm:text-sm text-steel-600 leading-relaxed mb-6 font-normal">
                  {product.description}
                </p>

                {/* Liquid Glass Specifications Box */}
                <div className="grid grid-cols-2 gap-3 p-5 rounded-2xl bg-steel-100/90 border border-steel-200 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-steel-500 uppercase tracking-widest block">
                      Standard
                    </span>
                    <span className="text-sm font-bold text-steel-900 mt-1 block">
                      {product.specs.standard}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-steel-500 uppercase tracking-widest block">
                      Tensile Strength
                    </span>
                    <span className="text-sm font-bold text-growth-700 mt-1 block">
                      {product.specs.tensileStrength}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-steel-500 uppercase tracking-widest block">
                      Yield Strength
                    </span>
                    <span className="text-sm font-bold text-steel-900 mt-1 block">
                      {product.specs.yieldStrength}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-steel-500 uppercase tracking-widest block">
                      Monthly Capacity
                    </span>
                    <span className="text-sm font-bold text-trust-700 mt-1 block">
                      {product.capacity.formatMonthly}
                    </span>
                  </div>
                </div>

                {/* Quality Certifications */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-bold text-steel-500 uppercase tracking-wider block">
                    Quality Certifications:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.specs.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="badge-success px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-trust-700" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Applications */}
                <div className="space-y-2 mb-8">
                  <span className="text-xs font-bold text-steel-500 uppercase tracking-wider block">
                    Infrastructure Applications:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-steel-700 font-medium">
                    {product.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-growth-600 shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-steel-200">
                <button
                  onClick={() => setActiveModalProduct(product)}
                  className="w-full sm:w-auto flex-1 btn-secondary !py-3 !px-4 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-growth-700" />
                  <span>View Technical Specs</span>
                </button>

                <button
                  onClick={() => {
                    downloadDynamicPdf(
                      product.pdfFilename,
                      `${product.name} Datasheet`,
                      [
                        `Product Type: ${product.type}`,
                        `Standard: ${product.specs.standard}`,
                        `Tensile Strength: ${product.specs.tensileStrength}`,
                        `Yield Strength: ${product.specs.yieldStrength}`,
                        `Annual Capacity: ${product.capacity.formatTpa}`,
                        `Monthly Output: ${product.capacity.formatMonthly}`,
                        `Lead Time: ${product.leadTime}`,
                        `Certifications: ${product.specs.certifications.join(', ')}`,
                        `Factory: Bhiwadi, Haryana | Head Office: Delhi NCR`
                      ]
                    );
                  }}
                  className="w-full sm:w-auto flex-1 btn-secondary !py-3 !px-4 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-growth-700" />
                  <span>Download Spec PDF</span>
                </button>

                <button
                  onClick={() => handleOrderInquiry(product.type)}
                  className="w-full sm:w-auto flex-1 btn-primary !py-3 !px-4 text-xs font-extrabold flex items-center justify-center gap-2"
                >
                  <span>Request Bulk Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        </div>

        {/* Side-by-Side Spec Comparison Matrix */}
        <SteelComparisonMatrix />

      </div>

      {/* Technical Spec Sheet Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-steel-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="liquid-glass-prominent rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-steel-300 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-growth-700 uppercase tracking-widest block font-mono">
                  Technical Specification Datasheet
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-steel-900 mt-1">
                  {activeModalProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="btn-secondary !p-2 rounded-full text-steel-600 hover:text-steel-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 border-y border-steel-200 py-5 text-sm text-steel-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-steel-100/80 border border-steel-200">
                  <span className="text-xs text-steel-500 block font-medium">Standard Specification</span>
                  <strong className="text-steel-900 text-base block mt-1 font-bold">{activeModalProduct.specs.standard}</strong>
                </div>
                <div className="p-4 rounded-2xl bg-steel-100/80 border border-steel-200">
                  <span className="text-xs text-steel-500 block font-medium">Platform Capacity</span>
                  <strong className="text-trust-700 text-base block mt-1 font-bold">{activeModalProduct.capacity.formatTpa}</strong>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-steel-900 text-sm">Mechanical Properties:</h4>
                <div className="rounded-2xl p-4 divide-y divide-steel-200 bg-steel-50 border border-steel-200 text-xs">
                  <div className="flex justify-between py-2">
                    <span className="text-steel-600">Tensile Strength Range</span>
                    <span className="font-bold text-growth-700">{activeModalProduct.specs.tensileStrength}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-steel-600">Minimum Yield Strength</span>
                    <span className="font-bold text-steel-900">{activeModalProduct.specs.yieldStrength}</span>
                  </div>
                  {activeModalProduct.specs.elongation && (
                    <div className="flex justify-between py-2">
                      <span className="text-steel-600">Minimum Elongation</span>
                      <span className="font-bold text-steel-900">{activeModalProduct.specs.elongation}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-steel-600">Delivery Lead Time</span>
                    <span className="font-bold text-steel-800">{activeModalProduct.leadTime}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-steel-900 text-sm">Quality Compliance:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProduct.specs.certifications.map((c, i) => (
                    <span key={i} className="badge-success px-3 py-1 text-xs font-semibold rounded-full">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  downloadDynamicPdf(
                    activeModalProduct.pdfFilename,
                    `${activeModalProduct.name} Spec Sheet`,
                    [
                      `Product Type: ${activeModalProduct.type}`,
                      `Standard: ${activeModalProduct.specs.standard}`,
                      `Tensile Strength: ${activeModalProduct.specs.tensileStrength}`,
                      `Yield Strength: ${activeModalProduct.specs.yieldStrength}`,
                      `Annual Capacity: ${activeModalProduct.capacity.formatTpa}`,
                      `Monthly Output: ${activeModalProduct.capacity.formatMonthly}`,
                      `Delivery Lead Time: ${activeModalProduct.leadTime}`,
                      `Quality Certifications: ${activeModalProduct.specs.certifications.join(', ')}`,
                      `Factory: Bhiwadi, Haryana | Office: Delhi NCR`
                    ]
                  );
                }}
                className="w-full sm:w-auto flex-1 btn-secondary !py-3 !px-5 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-growth-700" />
                <span>Download Official PDF Spec</span>
              </button>

              <button
                onClick={() => handleOrderInquiry(activeModalProduct.type)}
                className="w-full sm:w-auto flex-1 btn-primary !py-3 !px-5 text-xs font-extrabold flex items-center justify-center gap-2"
              >
                <span>Proceed to Order Inquiry</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
