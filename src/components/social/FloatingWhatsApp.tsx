'use client';

import React from 'react';
import { getWhatsAppUrl } from '@/config/site';
import { SocialIcon } from './SocialLinks';

interface FloatingWhatsAppProps {
  customMessage?: string;
  label?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  customMessage,
  label = 'Talk for Quotation',
}) => {
  const whatsappUrl = getWhatsAppUrl(customMessage);

  return (
    <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp for Instant Steel Tonnage & Price Quotation"
        className="group relative inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 border border-emerald-400/40"
      >
        {/* Pulse Indicator */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-100"></span>
        </span>

        {/* WhatsApp Icon */}
        <SocialIcon platform="whatsapp" className="w-5 h-5 fill-current shrink-0" />

        {/* Text Label */}
        <span className="hidden sm:inline tracking-tight font-sans font-bold">{label}</span>
        <span className="sm:hidden font-sans font-bold">Quote</span>
      </a>
    </div>
  );
};
