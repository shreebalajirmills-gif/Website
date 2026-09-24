'use client';

import React from 'react';
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink, Truck } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface LocationMapSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  className = 'py-28 bg-steel-base border-b border-steel-200 relative steel-grid-pattern overflow-hidden text-steel-900',
  title = 'Mill Plant & Freight Dispatch Hub',
  subtitle = 'Strategic manufacturing in Bhiwadi industrial belt directly linked to Delhi-NCR & Western Freight Corridor.',
}) => {
  const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Bhiwadi Industrial Area Bhiwadi Haryana India'
  )}`;

  return (
    <section className={className}>
      {/* Precision Industrial Ambient Grid */}
      <div className="ambient-liquid-glow ambient-glow-growth top-0 right-1/4 pointer-events-none" />
      <div className="ambient-liquid-glow ambient-glow-authority bottom-0 left-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-base text-steel-900 text-xs font-mono font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Facility Telemetry & Dispatches</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-steel-600 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Unified Integrated Command Card */}
        <div className="card-base bg-white/90 border border-steel-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Dual Facility & Operations Desk */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-steel-200">
            
            <div className="space-y-6">
              
              {/* Primary Plant Hub */}
              <div className="space-y-3.5 p-6 rounded-xl bg-slate-50 border border-steel-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs font-mono font-black uppercase tracking-wider text-amber-700">
                      Primary Rolling Mill Plant
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-steel-700 bg-white px-2.5 py-1 rounded-md border border-steel-200 shadow-2xs">180,000 TPA</span>
                </div>
                <h3 className="text-xl font-black text-slate-950 tracking-tight">Bhiwadi Manufacturing Facility</h3>
                <p className="text-sm text-steel-600 leading-relaxed font-normal">
                  {SITE_CONFIG.address.factory}
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs font-mono text-steel-600">
                  <span className="inline-flex items-center gap-1.5 text-amber-700 font-semibold">
                    <Truck className="w-4 h-4" /> NH-48 Heavy Freight Access
                  </span>
                  <span className="text-steel-400">•</span>
                  <span className="text-steel-600">Weighbridge Active</span>
                </div>
              </div>

              {/* Commercial Sales Desk */}
              <div className="space-y-3.5 p-6 rounded-xl bg-slate-50 border border-steel-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-steel-800">
                    Commercial Desk & Corporate Office
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/80">Sales & Tenders</span>
                </div>
                <h3 className="text-xl font-black text-slate-950 tracking-tight">Delhi NCR Business Office</h3>
                <p className="text-sm text-steel-600 leading-relaxed font-normal">
                  {SITE_CONFIG.address.office}
                </p>
                <div className="pt-2 flex flex-wrap gap-3 text-xs">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                    className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold inline-flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>{SITE_CONFIG.contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold inline-flex items-center gap-2 transition-colors truncate shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span className="truncate">{SITE_CONFIG.contact.email}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* High-Contrast Mill Dispatch Hours Bar */}
            <div className="p-6 rounded-xl bg-amber-50/70 border border-amber-200/80 shadow-sm space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-amber-800" />
                </div>
                <span className="text-xs sm:text-sm font-black text-amber-900 tracking-wide font-mono uppercase">
                  Mill Dispatch Hours: Mon–Sat, 09:00–18:00 IST
                </span>
              </div>
              <p className="text-xs sm:text-sm text-steel-700 leading-relaxed font-normal pl-11">
                Rolling dispatch & weighbridge operations serve infrastructure projects & distributor trucks across Northern India with 24/7 gate entry clearance.
              </p>
            </div>

          </div>

          {/* Right Column: Visual Highway Freight Connectivity & Google Maps Action */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-50 via-white to-slate-100 relative">
            
            {/* Top Corridor Specs */}
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200">
                  Freight Route Logistics
                </span>
                <span className="text-xs font-mono text-steel-500 font-semibold">Delhi-NCR / Jaipur Corridor</span>
              </div>

              <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-snug">
                Direct Highway Connectivity for Seamless Heavy Dispatch
              </h3>

              <p className="text-xs sm:text-sm text-steel-600 leading-relaxed font-normal">
                Situated squarely inside the Bhiwadi Industrial Area (Rajasthan/Haryana axis) with immediate link to NH-48 and the Western Dedicated Freight Corridor. Direct trailer fleet dispatches reach NCR job-sites within 3–5 hours.
              </p>

              {/* Transit Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-white border border-steel-200 shadow-sm text-center">
                  <div className="text-lg font-black font-mono text-amber-700">~60 km</div>
                  <div className="text-[10px] text-steel-500 font-bold uppercase tracking-wider mt-0.5">Gurugram Hub</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-steel-200 shadow-sm text-center">
                  <div className="text-lg font-black font-mono text-slate-900">~85 km</div>
                  <div className="text-[10px] text-steel-500 font-bold uppercase tracking-wider mt-0.5">Delhi Ring Rd</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-steel-200 shadow-sm text-center">
                  <div className="text-lg font-black font-mono text-slate-900">~200 km</div>
                  <div className="text-[10px] text-steel-500 font-bold uppercase tracking-wider mt-0.5">Jaipur Axis</div>
                </div>
              </div>
            </div>

            {/* Bottom Route Action */}
            <div className="pt-8 relative z-10 border-t border-steel-200 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-steel-500 block uppercase font-bold">Destination Pin</span>
                <span className="text-xs font-bold text-slate-900">Bhiwadi Industrial Belt (NH-48 Axis)</span>
              </div>

              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl btn-primary font-bold text-xs inline-flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
