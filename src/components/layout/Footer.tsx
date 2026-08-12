'use client';

import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { BuyerSegment } from '@/types';

interface FooterProps {
  onSelectSegment?: (segment: BuyerSegment) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSegment = () => {} }) => {
  const scrollToForm = (segment: BuyerSegment) => {
    onSelectSegment(segment);
    const element = document.getElementById('inquiry-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400 py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
                SB
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wider text-slate-100 uppercase">
                  Shree Balaji
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
                  Rolling Mills Pvt. Ltd.
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed font-normal">
              Use this footer block for your real company summary, proof points, and operating notes once the MVP content is ready.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
              <span className="glass-pill px-3 py-1 text-emerald-300 inline-flex items-center gap-1.5 border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Brand Badge Placeholder
              </span>
              <span className="glass-pill px-3 py-1 text-slate-200">
                Quality Badge Placeholder
              </span>
            </div>
          </div>

          {/* Product Offerings */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Product Hub
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors">
                  Structural Steel Angles & Channels
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors">
                  TMT Fe-500D High-Ductility Bars
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors">
                  BIS Technical Datasheets
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors">
                  Custom Structural Profiles
                </a>
              </li>
            </ul>
          </div>

          {/* Buyer Segment Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Buyer Inquiries
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollToForm('distributor')} className="hover:text-amber-300 transition-colors text-left flex items-center gap-1">
                  Distributor Growth Program <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </li>
              <li>
                <button onClick={() => scrollToForm('contractor')} className="hover:text-amber-300 transition-colors text-left">
                  Contractor Bulk Orders
                </button>
              </li>
              <li>
                <button onClick={() => scrollToForm('project')} className="hover:text-amber-300 transition-colors text-left">
                  Infrastructure Tenders & SLAs
                </button>
              </li>
              <li>
                <button onClick={() => scrollToForm('investor')} className="hover:text-amber-300 transition-colors text-left">
                  Investor & Growth Deck Access
                </button>
              </li>
            </ul>
          </div>

          {/* Head Office & Factory */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Locations & Desk
            </h4>
            <div className="space-y-2.5 text-xs leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block font-bold">Primary Location:</strong>
                  Add your office or site address here.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block font-bold">Secondary Desk:</strong>
                  Add your regional desk or support location here.
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Contact number to be added</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email address to be added</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Shree Balaji Rolling Mills Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="/templates/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Template
            </a>
            <a
              href="/templates/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms Template
            </a>
            <a
              href="/templates/quality"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Quality Template
            </a>
            <a
              href="/templates/compliance"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Compliance Template
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
