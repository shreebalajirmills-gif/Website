'use client';

import React from 'react';
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { SocialIcon } from '@/components/social/SocialLinks';

interface LocationMapSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  className = 'py-20 bg-steel-base border-b border-steel-200 relative overflow-hidden',
  title = 'Mill Facility & Corporate Offices',
  subtitle = 'Visit our manufacturing rolling mill in Bhiwadi, Haryana, or connect with our corporate sales desk in Delhi NCR.',
}) => {
  const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Bhiwadi Industrial Area Bhiwadi Haryana India'
  )}`;

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-growth-700 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-growth-600" />
            <span>GEOGRAPHIC TELEMETRY & VISITS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-steel-900 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-steel-600 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address Cards & Operations Info */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Factory Address Card */}
            <div className="liquid-glass-prominent rounded-3xl p-6 sm:p-7 border border-steel-200 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="glass-pill px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-growth-700 bg-growth-50 border-growth-200">
                  Primary Rolling Mill
                </span>
                <MapPin className="w-5 h-5 text-growth-600" />
              </div>
              <h3 className="text-xl font-bold text-steel-900">Bhiwadi Manufacturing Facility</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                {SITE_CONFIG.address.factory}
              </p>
              <div className="pt-2">
                <a
                  href={mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2.5 px-4 rounded-xl text-xs font-extrabold inline-flex items-center gap-2 shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>

            {/* Corporate Office Card */}
            <div className="liquid-glass-prominent rounded-3xl p-6 sm:p-7 border border-steel-200 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="glass-pill px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-authority-700 bg-authority-50 border-authority-200">
                  Commercial Desk
                </span>
                <MapPin className="w-5 h-5 text-authority-600" />
              </div>
              <h3 className="text-xl font-bold text-steel-900">Delhi NCR Business Office</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                {SITE_CONFIG.address.office}
              </p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                  className="py-2 px-3 bg-white border border-steel-200 rounded-xl text-steel-900 font-bold inline-flex items-center gap-1.5 hover:border-growth-400 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>{SITE_CONFIG.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="py-2 px-3 bg-white border border-steel-200 rounded-xl text-steel-900 font-bold inline-flex items-center gap-1.5 hover:border-growth-400 transition-all truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-authority-600" />
                  <span className="truncate">{SITE_CONFIG.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Operational Telemetry Summary */}
            <div className="p-5 rounded-2xl bg-steel-950 text-white space-y-2 border border-slate-800 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono">
                <Clock className="w-4 h-4" />
                <span>Mill Dispatch Hours: Mon–Sat, 09:00–18:00 IST</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                Rolling dispatch & weighbridge operations serve infrastructure projects & distributor trucks across Northern India.
              </p>
            </div>

          </div>

          {/* Right Column: Visual Map Container */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl overflow-hidden border border-steel-300 shadow-xl relative min-h-[380px] flex flex-col justify-between p-6 sm:p-8 text-white group">
            
            {/* Visual Industrial Backdrop Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
            <div className="ambient-liquid-glow ambient-glow-growth top-0 right-0 opacity-30 pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="glass-pill px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 border border-amber-400/30">
                  Interactive Route Map
                </span>
                <span className="text-xs text-slate-400 font-mono">Bhiwadi Industrial Zone</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Direct Highway Connectivity to Delhi-NCR & Jaipur Freight Corridor
              </h3>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-normal">
                Situated in the Bhiwadi Industrial Area (Rajasthan/Haryana border), offering seamless heavy freight transport to Delhi, Gurugram, Jaipur, and wider Northern Indian commercial hubs.
              </p>
            </div>

            <div className="relative z-10 pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-800">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 block">Factory Coordinates / Region:</span>
                <span className="text-xs font-bold text-slate-200">Bhiwadi Industrial Belt (NH-48 Axis)</span>
              </div>

              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-5 rounded-2xl inline-flex items-center justify-center gap-2 shadow-lg transition-all border border-emerald-400/40"
              >
                <Navigation className="w-4 h-4" />
                <span>Launch Google Maps Route</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
