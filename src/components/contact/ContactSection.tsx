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
    <section id="contact" ref={containerRef} className="py-28 bg-steel-base border-b border-steel-200 relative steel-grid-pattern overflow-hidden text-steel-900">
      {/* Ambient liquid glow matching hero and trust sections */}
      <div className="ambient-liquid-glow ambient-glow-growth top-1/3 right-1/4 pointer-events-none" />
      <div className="ambient-liquid-glow ambient-glow-authority bottom-10 left-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="badge-base px-4 py-1.5 inline-flex items-center gap-2 text-steel-900 text-xs font-mono font-bold uppercase tracking-wider">
            DIRECT SALES & MILL DISPATCH DESK
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Connect Directly With <span className="text-gradient-growth">Our Commercial Desk</span>
          </h2>
          <p className="text-sm sm:text-base text-steel-600 max-w-xl mx-auto font-normal leading-relaxed">
            Connect via Phone, WhatsApp, Email, or institutional procurement portals for immediate mill pricing, dispatch schedules, and technical queries.
          </p>
        </div>

        {/* 4 Direct Contact Cards - Harmonized with Hero Pass cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Card 1: Phone Calling Desk */}
          <div className="contact-card card-base p-6 flex flex-col justify-between hover:border-amber-500 hover:shadow-xl transition-all duration-300 min-h-[310px] bg-white/90 border border-steel-200" data-idx={0}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block font-mono">
                PHONE SALES DESK
              </span>
              <h3 className="text-lg font-bold text-slate-950">Direct Call Line</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Speak directly with our mill sales desk for urgent delivery schedules & order status.
              </p>
              <div className="pt-2 text-sm font-bold text-slate-900 font-mono">
                {SITE_CONFIG.contact.phone}
              </div>
            </div>
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              className="mt-6 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Sales Desk</span>
            </a>
          </div>

          {/* Card 2: WhatsApp Instant Quotation */}
          <div className="contact-card card-base p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-xl transition-all duration-300 min-h-[310px] bg-white/90 border border-steel-200" data-idx={1}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center">
                <SocialIcon platform="whatsapp" className="w-5 h-5 fill-current" />
              </div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block font-mono">
                WHATSAPP BUSINESS
              </span>
              <h3 className="text-lg font-bold text-slate-950">Instant Quotation</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Start a direct chat for price quotes with prefilled inquiry details.
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-emerald-700">
                &quot;Talk for Quotation ....&quot;
              </div>
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 py-2.5 px-4 rounded-xl btn-whatsapp text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <SocialIcon platform="whatsapp" className="w-3.5 h-3.5 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 3: Email Desk */}
          <div className="contact-card card-base p-6 flex flex-col justify-between hover:border-amber-500 hover:shadow-xl transition-all duration-300 min-h-[310px] bg-white/90 border border-steel-200" data-idx={2}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block font-mono">
                CORPORATE EMAIL
              </span>
              <h3 className="text-lg font-bold text-slate-950">Email Inquiry</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Send formal RFQs, purchase orders, or technical specification inquiries.
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-slate-900 truncate">
                {SITE_CONFIG.contact.email}
              </div>
            </div>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="mt-6 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email RFQ</span>
            </a>
          </div>

          {/* Card 4: Direct Sales Portal */}
          <div className="contact-card card-base p-6 flex flex-col justify-between hover:border-amber-500 hover:shadow-xl transition-all duration-300 min-h-[310px] bg-white/90 border border-steel-200" data-idx={3}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block font-mono">
                ONLINE FORM
              </span>
              <h3 className="text-lg font-bold text-slate-950">B2B Portal</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Submit channel partnership terms or tender proposals through our digital form.
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-slate-800">
                Online RFP & Tender Desk
              </div>
            </div>
            <button
              type="button"
              onClick={() => openInquiry('distributor')}
              className="mt-6 py-2.5 px-4 rounded-xl btn-primary text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Open Online Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Official Social Media Profiles Grid - Light Industrial Styled */}
        <div className="card-base p-6 sm:p-8 bg-white/90 border border-steel-200 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-steel-200 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block mb-1">
                INSTITUTIONAL SOCIAL PRESENCE
              </span>
              <h3 className="text-2xl font-black text-slate-950">
                Official Media Channels
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
              className="p-4 rounded-xl bg-slate-50 border border-steel-200 hover:border-pink-500/60 hover:bg-white transition-all group flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 border border-pink-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <SocialIcon platform="instagram" className="w-5 h-5" />
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
              className="p-4 rounded-xl bg-slate-50 border border-steel-200 hover:border-blue-500/60 hover:bg-white transition-all group flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <SocialIcon platform="facebook" className="w-5 h-5" />
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
              className="p-4 rounded-xl bg-slate-50 border border-steel-200 hover:border-slate-800 hover:bg-white transition-all group flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white border border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <SocialIcon platform="x" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-black transition-colors block">
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
              className="p-4 rounded-xl bg-slate-50 border border-steel-200 hover:border-orange-500/60 hover:bg-white transition-all group flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <SocialIcon platform="reddit" className="w-5 h-5" />
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

      </div>
    </section>
  );
};

