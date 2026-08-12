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
              <img 
                src="/logo.png" 
                alt="Shree Balaji Rolling Mills Private Limited Logo" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed font-normal">
              Premier steel manufacturing platform operating 36,000 TPA structural steel & 144,000 TPA TMT bar rolling mill in Bhiwadi, Haryana.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
              <span className="glass-pill px-3 py-1 text-emerald-300 inline-flex items-center gap-1.5 border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> BIS IS 2062 & IS 1786 Certified
              </span>
              <span className="glass-pill px-3 py-1 text-slate-200">
                180,000 TPA Rolling Capacity
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
                  <strong className="text-slate-200 block font-bold">Factory Location:</strong>
                  Bhiwadi, Haryana
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block font-bold">Business Location:</strong>
                  Delhi NCR
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Bhiwadi Mill Sales Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Delhi NCR Corporate Desk</span>
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
              Privacy Policy
            </a>
            <a
              href="/templates/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Use
            </a>
            <a
              href="/templates/quality"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Quality Assurance
            </a>
            <a
              href="/templates/compliance"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Regulatory Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
