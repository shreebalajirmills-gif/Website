'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { BuyerSegment } from '@/types';
import { SITE_CONFIG, getWhatsAppUrl } from '@/config/site';
import { SocialIcon } from '@/components/social/SocialLinks';

interface ContactSectionProps {
  onSelectSegment: (segment: BuyerSegment) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSelectSegment }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const cards = Array.from(node.querySelectorAll<HTMLElement>('.contact-card'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const openInquiry = (segment: BuyerSegment) => {
    onSelectSegment(segment);

    const portal = document.getElementById('inquiry-portal');
    if (portal) {
      portal.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    router.push(`/inquiry?segment=${segment}`);
  };

  return (
    <section id="contact" ref={containerRef} className="py-28 bg-steel-base border-b border-steel-200 relative overflow-hidden">
      <div className="ambient-liquid-glow ambient-glow-authority top-1/3 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-authority-700 text-xs font-bold uppercase tracking-wider">
            DIRECT SALES & MILL DISPATCH DESK
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-steel-900 tracking-tight">
            Get In Touch With <span className="text-gradient-authority">Our Commercial Desk</span>
          </h2>
          <p className="text-sm text-steel-600 max-w-xl mx-auto font-normal leading-relaxed">
            Connect directly via Phone, Email, WhatsApp, or explore our official social channels for instant price quotes, structural steel specifications, and rolling mill dispatch schedules.
          </p>
        </div>

        {/* 4 Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Card 1: Phone Calling Desk */}
          <div className="contact-card liquid-glass liquid-glass-interactive p-6 rounded-3xl flex flex-col justify-between shadow-md border border-steel-200" data-idx={0}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest block font-mono">
                PHONE SALES DESK
              </span>
              <h3 className="text-xl font-bold text-steel-900">Direct Call Line</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Speak directly with our mill sales desk for urgent delivery schedules & order status.
              </p>
              <div className="pt-2 text-sm font-bold text-slate-900 font-mono">
                {SITE_CONFIG.contact.phone}
              </div>
            </div>
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              className="mt-6 btn-primary py-3 px-4 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +91 8800106726</span>
            </a>
          </div>

          {/* Card 2: WhatsApp Instant Quotation */}
          <div className="contact-card liquid-glass liquid-glass-interactive p-6 rounded-3xl flex flex-col justify-between shadow-md border border-emerald-200/80 bg-emerald-50/30" data-idx={1}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center">
                <SocialIcon platform="whatsapp" className="w-5 h-5 fill-current" />
              </div>
              <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest block font-mono">
                WHATSAPP BUSINESS
              </span>
              <h3 className="text-xl font-bold text-steel-900">Instant Quotation</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Start a direct chat for price quotes with prefilled inquiry details.
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-emerald-800">
                &quot;Talk for Quotation ....&quot;
              </div>
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all border border-emerald-400/40"
            >
              <SocialIcon platform="whatsapp" className="w-3.5 h-3.5 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 3: Email Desk */}
          <div className="contact-card liquid-glass liquid-glass-interactive p-6 rounded-3xl flex flex-col justify-between shadow-md border border-steel-200" data-idx={2}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-authority-50 text-authority-700 border border-authority-200 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold text-authority-700 uppercase tracking-widest block font-mono">
                CORPORATE EMAIL
              </span>
              <h3 className="text-xl font-bold text-steel-900">Email Inquiry</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Send formal RFQs, purchase orders, or technical specification inquiries.
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-slate-800 truncate">
                {SITE_CONFIG.contact.email}
              </div>
            </div>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="mt-6 btn-secondary py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email Request</span>
            </a>
          </div>

          {/* Card 4: Direct Sales Portal */}
          <div className="contact-card liquid-glass liquid-glass-interactive p-6 rounded-3xl flex flex-col justify-between shadow-md border border-steel-200" data-idx={3}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-trust-50 text-trust-700 border border-trust-200 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold text-trust-700 uppercase tracking-widest block font-mono">
                ONLINE FORM
              </span>
              <h3 className="text-xl font-bold text-steel-900">B2B Portal</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Submit channel partnership terms or tender proposals through our digital form.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openInquiry('distributor')}
              className="mt-6 btn-project py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Open Online Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Official Social Media Profiles Grid */}
        <div className="liquid-glass-prominent rounded-3xl p-8 border border-steel-200 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-steel-200 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-growth-700 uppercase tracking-wider block mb-1">
                INSTITUTIONAL SOCIAL PRESENCE
              </span>
              <h3 className="text-2xl font-black text-steel-900">
                Official Social Media Channels
              </h3>
            </div>
            <p className="text-xs text-steel-600 max-w-md">
              Follow Shree Balaji Rolling Mills for rolling schedule announcements, steel market updates, plant expansion milestones, and product datasheets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Instagram Profile */}
            <a
              href={SITE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-steel-200 hover:border-pink-500/50 hover:shadow-md transition-all group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <SocialIcon platform="instagram" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-pink-600 transition-colors block">
                  Instagram
                </span>
                <span className="text-[11px] font-mono text-steel-500">@sbrm.2026</span>
              </div>
            </a>

            {/* Facebook Profile */}
            <a
              href={SITE_CONFIG.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-steel-200 hover:border-blue-600/50 hover:shadow-md transition-all group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <SocialIcon platform="facebook" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors block">
                  Facebook
                </span>
                <span className="text-[11px] font-mono text-steel-500">Shree Balaji Roll Mill</span>
              </div>
            </a>

            {/* X / Twitter Profile */}
            <a
              href={SITE_CONFIG.socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-steel-200 hover:border-slate-900/50 hover:shadow-md transition-all group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <SocialIcon platform="x" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-slate-950 transition-colors block">
                  X (Twitter)
                </span>
                <span className="text-[11px] font-mono text-steel-500">@SBRM2026</span>
              </div>
            </a>

            {/* Reddit Profile */}
            <a
              href={SITE_CONFIG.socialLinks.reddit}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-steel-200 hover:border-orange-500/50 hover:shadow-md transition-all group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <SocialIcon platform="reddit" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors block">
                  Reddit
                </span>
                <span className="text-[11px] font-mono text-steel-500">u/ShreeBalajiRollMill</span>
              </div>
            </a>

          </div>
        </div>

        {/* Factory & Business Locations Details */}
        <div className="liquid-glass-prominent rounded-3xl p-8 border border-steel-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xl">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-steel-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-growth-600" />
              <span>Factory & Corporate Locations</span>
            </h3>
            <p className="text-xs text-steel-600 leading-relaxed font-normal">
              Shree Balaji Rolling Mills Private Limited operates steel manufacturing and corporate sales desks serving Northern India.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-steel-50 border border-steel-200">
                <strong className="text-growth-700 block font-bold mb-1">Factory Facility:</strong>
                {SITE_CONFIG.address.factory}
              </div>
              <div className="p-4 rounded-2xl bg-steel-50 border border-steel-200">
                <strong className="text-steel-900 block font-bold mb-1">Corporate Sales Office:</strong>
                {SITE_CONFIG.address.office}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-steel-50 border border-steel-200 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-steel-900 border-b border-steel-200 pb-3">
              <Clock className="w-4 h-4 text-growth-600" />
              <span>Mill Capacity & Operational Telemetry</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-steel-700">
                <span>Total Post-Expansion Capacity:</span>
                <span className="font-bold text-growth-700">180,000 TPA</span>
              </div>
              <div className="flex justify-between text-steel-700">
                <span>Structural Steel Line:</span>
                <span className="font-bold text-steel-900">36,000 TPA (3,000 MT/mo)</span>
              </div>
              <div className="flex justify-between text-steel-700 pt-2 border-t border-steel-200">
                <span>TMT Bar Facility:</span>
                <span className="font-bold text-trust-700">144,000 TPA (12,000 MT/mo)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

