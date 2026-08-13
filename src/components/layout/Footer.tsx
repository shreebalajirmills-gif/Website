'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { BuyerSegment } from '@/types';
import { SITE_CONFIG, getWhatsAppUrl } from '@/config/site';
import { SocialLinks, SocialIcon } from '@/components/social/SocialLinks';

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
                width={180}
                height={48}
                loading="lazy"
                className="h-10 sm:h-12 w-auto object-contain transition-transform hover:scale-105"
              />
            </div>
            <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed font-normal">
              Premier steel manufacturing platform operating 36,000 TPA structural steel & 144,000 TPA TMT bar rolling mill in Bhiwadi, Haryana.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm font-semibold">
              <span className="glass-pill px-3 py-1 text-emerald-300 inline-flex items-center gap-1.5 border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> BIS IS 2062 & IS 1786 Certified
              </span>
              <span className="glass-pill px-3 py-1 text-slate-200">
                180,000 TPA Rolling Capacity
              </span>
            </div>

            {/* Official Social Media Connect Bar */}
            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Official Social Profiles & Direct Connect:
              </span>
              <SocialLinks
                className="flex items-center flex-wrap gap-2.5"
                itemClassName="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                iconClassName="w-4 h-4"
              />
            </div>
          </div>

          {/* Product Offerings Internal Linking */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-widest">
              Product Hub
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products/structural-steel" className="hover:text-amber-300 transition-colors">
                  Structural Steel Angles & Channels
                </Link>
              </li>
              <li>
                <Link href="/products/tmt-rebars" className="hover:text-amber-300 transition-colors">
                  TMT Fe-500D High-Ductility Bars
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-300 transition-colors">
                  BIS Technical Datasheets & Matrix
                </Link>
              </li>
              <li>
                <Link href="/manufacturing-processes" className="hover:text-amber-300 transition-colors">
                  Thermo-Mechanical Quenching
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-amber-300 transition-colors">
                  Steel Weight & Bundle Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Buyer Segment Portals */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-widest">
              Buyer Inquiries
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/inquiry?segment=distributor" className="hover:text-amber-300 transition-colors text-left flex items-center gap-1">
                  Distributor Growth Program <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </li>
              <li>
                <Link href="/inquiry?segment=contractor" className="hover:text-amber-300 transition-colors text-left">
                  Contractor Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/inquiry?segment=project" className="hover:text-amber-300 transition-colors text-left">
                  Infrastructure Tenders & SLAs
                </Link>
              </li>
              <li>
                <Link href="/growth" className="hover:text-amber-300 transition-colors text-left">
                  Investor & FY26–FY30 Roadmap
                </Link>
              </li>
              <li>
                <Link href="/trust" className="hover:text-amber-300 transition-colors text-left">
                  Quality & BIS Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Head Office & Factory Locations */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-widest">
              Locations & Direct Desk
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block font-bold">Factory Location:</strong>
                  {SITE_CONFIG.address.factory}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block font-bold">Business Location:</strong>
                  {SITE_CONFIG.address.office}
                </div>
              </div>
              <div className="pt-1 space-y-1.5">
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{SITE_CONFIG.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{SITE_CONFIG.contact.email}</span>
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-bold text-xs pt-1"
                >
                  <SocialIcon platform="whatsapp" className="w-3.5 h-3.5 fill-current" />
                  <span>Direct WhatsApp Quotation</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Shree Balaji Rolling Mills Private Limited. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/templates/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/templates/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/templates/quality"
              className="hover:text-white transition-colors"
            >
              Quality Assurance
            </Link>
            <Link
              href="/templates/compliance"
              className="hover:text-white transition-colors"
            >
              Regulatory Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
