'use client';

import React from 'react';
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink, ShieldCheck, Truck } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface LocationMapSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  className = 'py-20 bg-slate-900 border-b border-slate-800 relative overflow-hidden',
  title = 'Mill Plant & Freight Dispatch Hub',
  subtitle = 'Strategic manufacturing in Bhiwadi industrial belt directly linked to Delhi-NCR & Western Freight Corridor.',
}) => {
  const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Bhiwadi Industrial Area Bhiwadi Haryana India'
  )}`;

  return (
    <section className={className}>
      {/* Precision Industrial Ambient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Facility Telemetry & Dispatches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Unified Integrated Command Card */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Dual Facility & Operations Desk */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-slate-800/80">
            
            <div className="space-y-6">
              
              {/* Primary Plant Hub */}
              <div className="space-y-3.5 p-6 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-mono font-black uppercase tracking-wider text-amber-400">
                      Primary Rolling Mill Plant
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">180,000 TPA</span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">Bhiwadi Manufacturing Facility</h3>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {SITE_CONFIG.address.factory}
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-300">
                  <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Truck className="w-4 h-4" /> NH-48 Heavy Freight Access
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300">Weighbridge Active</span>
                </div>
              </div>

              {/* Commercial Sales Desk */}
              <div className="space-y-3.5 p-6 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-300">
                    Commercial Desk & Corporate Office
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">Sales & Tenders</span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">Delhi NCR Business Office</h3>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {SITE_CONFIG.address.office}
                </p>
                <div className="pt-2 flex flex-wrap gap-3 text-xs">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold inline-flex items-center gap-2 border border-slate-600 transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>{SITE_CONFIG.contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold inline-flex items-center gap-2 border border-slate-600 transition-colors truncate shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span className="truncate">{SITE_CONFIG.contact.email}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* High-Contrast Mill Dispatch Hours Bar */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-sm sm:text-base font-black text-amber-400 tracking-wide font-mono uppercase">
                  Mill Dispatch Hours: Mon–Sat, 09:00–18:00 IST
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal pl-11">
                Rolling dispatch & weighbridge operations serve infrastructure projects & distributor trucks across Northern India with 24/7 gate entry clearance.
              </p>
            </div>

          </div>

          {/* Right Column: Visual Highway Freight Connectivity & Single Google Maps Action */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950 relative">
            
            {/* Top Corridor Specs */}
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20">
                  Freight Route Logistics
                </span>
                <span className="text-xs font-mono text-slate-400">Delhi-NCR / Jaipur Corridor</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
                Direct Highway Connectivity for Seamless Heavy Dispatch
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Situated squarely inside the Bhiwadi Industrial Area (Rajasthan/Haryana axis) with immediate link to NH-48 and the Western Dedicated Freight Corridor. Direct trailer fleet dispatches reach NCR job-sites within 3–5 hours.
              </p>

              {/* Transit Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-lg font-black font-mono text-amber-400">~60 km</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Gurugram Hub</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-lg font-black font-mono text-white">~85 km</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Delhi Ring Rd</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-lg font-black font-mono text-white">~200 km</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Jaipur Axis</div>
                </div>
              </div>
            </div>

            {/* Bottom Single Unified Route Action */}
            <div className="pt-8 relative z-10 border-t border-slate-800 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Destination Pin</span>
                <span className="text-xs font-bold text-slate-200">Bhiwadi Industrial Belt (NH-48 Axis)</span>
              </div>

              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] shrink-0"
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
