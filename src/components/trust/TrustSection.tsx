'use client';

import React from 'react';
import { CERTIFICATIONS, CLIENT_LOGOS } from '@/data/trust';
import { ShieldCheck, Award, Factory, Truck, CheckCircle, Building, Activity, Download } from 'lucide-react';
import { downloadDynamicPdf } from '@/lib/pdf-generator';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust-credibility" className="py-28 bg-steel-base border-b border-steel-200 relative steel-grid-pattern overflow-hidden">
      
      {/* Ambient Liquid Glass Light */}
      <div className="ambient-liquid-glow ambient-glow-trust top-1/2 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-trust-700 text-xs font-bold uppercase tracking-wider">
            Institutional Trust & Execution Proof
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-steel-900 tracking-tight">
            Why Northern India’s Major Projects <span className="text-gradient-trust">Trust Shree Balaji</span>
          </h2>
          <p className="text-base text-steel-600 leading-relaxed font-normal">
            From Bureau of Indian Standards (BIS) product certifications to our 180,000 TPA manufacturing platform, we deliver institutional reliability without middleman delays.
          </p>
        </div>

        {/* 4 Pillars in Liquid Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="liquid-glass liquid-glass-project p-6 rounded-3xl space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-2xl bg-trust-50 text-trust-700 border border-trust-200 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-steel-900">BIS & ISO Certified</h3>
            <p className="text-xs text-steel-600 leading-relaxed font-normal">
              Every steel profile and TMT bar undergoes chemical & tensile lab testing per IS 2062 & IS 1786 standards.
            </p>
          </div>

          <div className="liquid-glass liquid-glass-contractor p-6 rounded-3xl space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-2xl bg-growth-50 text-growth-700 border border-growth-200 flex items-center justify-center">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-steel-900">180,000 TPA Scale</h3>
            <p className="text-xs text-steel-600 leading-relaxed font-normal">
              Integrated manufacturing hub at Bhiwadi, Haryana with 36,000 TPA Structural Steel and 144,000 TPA TMT capacity.
            </p>
          </div>

          <div className="liquid-glass liquid-glass-distributor p-6 rounded-3xl space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-2xl bg-authority-50 text-authority-700 border border-authority-200 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-steel-900">Direct Mill Dispatch</h3>
            <p className="text-xs text-steel-600 leading-relaxed font-normal">
              Streamlined regional logistics dispatch for infrastructure and commercial construction sites across Northern India.
            </p>
          </div>

          <div className="liquid-glass liquid-glass-investor p-6 rounded-3xl space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-growth-800 border border-amber-200 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-steel-900">Margin Resilience</h3>
            <p className="text-xs text-steel-600 leading-relaxed font-normal">
              Proven 2.42% gross margin stability across steel cycle contractions, giving trade partners pricing discipline.
            </p>
          </div>

        </div>

        {/* Certifications Liquid Showcase */}
        <div className="liquid-glass-prominent rounded-3xl p-8 border border-steel-200 mb-16 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-growth-600" />
            <h3 className="text-xl font-bold text-steel-900">Government & International Certifications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.id} className="p-5 rounded-2xl bg-steel-50 border border-steel-200 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-trust-50 border border-trust-200 text-trust-700 rounded-xl shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-steel-900 text-sm">{cert.name}</h4>
                      <span className="badge-contractor px-2.5 py-0.5 text-[10px] font-black font-mono rounded-full">
                        {cert.code}
                      </span>
                    </div>
                    <p className="text-xs text-steel-600 mt-1">{cert.description}</p>
                    <span className="text-[11px] text-steel-500 mt-1 block">Issued by: {cert.issuer}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    downloadDynamicPdf(
                      `${cert.code}_Certification.pdf`,
                      `OFFICIAL CERTIFICATE: ${cert.name}`,
                      [
                        `Certificate Code: ${cert.code}`,
                        `Issuing Authority: ${cert.issuer}`,
                        `Scope: ${cert.description}`,
                        `Holder: Shree Balaji Rolling Mills Private Limited`,
                        `Plant Location: Bhiwari, Haryana`,
                        `Head Office: Delhi NCR`,
                        `Status: Active & Verified Compliance`
                      ]
                    );
                  }}
                  className="btn-secondary !py-2 !px-3 text-[11px] font-bold shrink-0 flex items-center gap-1.5 self-end sm:self-center"
                >
                  <Download className="w-3.5 h-3.5 text-growth-700" />
                  <span>Download PDF</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos Liquid Grid */}
        <div className="liquid-glass-prominent rounded-3xl p-8 border border-steel-200 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <h3 className="text-xl font-bold text-steel-900">Trusted Across Northern India Infrastructure</h3>
            <p className="text-xs text-steel-600 font-normal">
              Supplying contractors, commercial developers, and warehousing parks in Delhi NCR, Haryana & UP.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.id}
                className="glass-pill p-4 text-center space-y-1.5 flex flex-col items-center justify-center min-h-[105px] hover:border-growth-500 transition-colors"
              >
                <Building className="w-5 h-5 text-growth-600" />
                <span className="text-xs font-bold text-steel-900 block leading-tight">{client.name}</span>
                <span className="text-[10px] text-steel-500 block">{client.category}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
