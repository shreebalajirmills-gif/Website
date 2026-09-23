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
    <section id="contact" ref={containerRef} className="py-24 bg-slate-950 border-b border-slate-800 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
            DIRECT SALES & MILL DISPATCH DESK
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Connect Directly With <span className="text-amber-400">Our Commercial Desk</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-normal leading-relaxed">
            Connect via Phone, WhatsApp, Email, or institutional procurement portals for immediate mill pricing, dispatch schedules, and technical queries.
          </p>
        </div>

        {/* 4 Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Card 1: Phone Calling Desk */}
          <div className="contact-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-xl" data-idx={0}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block font-mono">
                PHONE SALES DESK
              </span>
              <h3 className="text-lg font-bold text-white">Direct Call Line</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Speak directly with our mill sales desk for urgent delivery schedules & order status.
              </p>
              <div className="pt-2 text-sm font-bold text-amber-400 font-mono">
                {SITE_CONFIG.contact.phone}
              </div>
            </div>
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              className="mt-6 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Sales Desk</span>
            </a>
          </div>

          {/* Card 2: WhatsApp Instant Quotation */}
          <div className="contact-card p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-500/60 transition-all shadow-xl" data-idx={1}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <SocialIcon platform="whatsapp" className="w-5 h-5 fill-current" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block font-mono">
                WHATSAPP BUSINESS
              </span>
              <h3 className="text-lg font-bold text-white">Instant Quotation</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Start a direct chat for price quotes with prefilled inquiry details.
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-emerald-400">
                &quot;Talk for Quotation ....&quot;
              </div>
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all border border-emerald-400/40 shadow-md shadow-emerald-950"
            >
              <SocialIcon platform="whatsapp" className="w-3.5 h-3.5 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 3: Email Desk */}
          <div className="contact-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl" data-idx={2}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                CORPORATE EMAIL
              </span>
              <h3 className="text-lg font-bold text-white">Email Inquiry</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Send formal RFQs, purchase orders, or technical specification inquiries.
              </p>
              <div className="pt-2 text-xs font-mono font-semibold text-slate-300 truncate">
                {SITE_CONFIG.contact.email}
              </div>
            </div>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="mt-6 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-700"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email RFQ</span>
            </a>
          </div>

          {/* Card 4: Direct Sales Portal */}
          <div className="contact-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl" data-idx={3}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                ONLINE FORM
              </span>
              <h3 className="text-lg font-bold text-white">B2B Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Submit channel partnership terms or tender proposals through our digital form.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openInquiry('distributor')}
              className="mt-6 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-700"
            >
              <span>Open Online Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Official Social Media Profiles Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                INSTITUTIONAL SOCIAL PRESENCE
              </span>
              <h3 className="text-2xl font-black text-white">
                Official Media Channels
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Follow Shree Balaji Rolling Mills for rolling schedule announcements, steel market updates, plant expansion milestones, and product datasheets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Instagram Profile */}
            <a
              href={SITE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 hover:border-pink-500/50 hover:bg-slate-800 transition-all group flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <SocialIcon platform="instagram" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-pink-400 transition-colors block">
                  Instagram
                </span>
                <span className="text-[11px] font-mono text-slate-400">@sbrm.2026</span>
              </div>
            </a>

            {/* Facebook Profile */}
            <a
              href={SITE_CONFIG.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all group flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <SocialIcon platform="facebook" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors block">
                  Facebook
                </span>
                <span className="text-[11px] font-mono text-slate-400">Shree Balaji Roll Mill</span>
              </div>
            </a>

            {/* X / Twitter Profile */}
            <a
              href={SITE_CONFIG.socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all group flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-700 text-white border border-slate-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <SocialIcon platform="x" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors block">
                  X (Twitter)
                </span>
                <span className="text-[11px] font-mono text-slate-400">@SBRM2026</span>
              </div>
            </a>

            {/* Reddit Profile */}
            <a
              href={SITE_CONFIG.socialLinks.reddit}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 hover:border-orange-500/50 hover:bg-slate-800 transition-all group flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <SocialIcon platform="reddit" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-orange-400 transition-colors block">
                  Reddit
                </span>
                <span className="text-[11px] font-mono text-slate-400">u/ShreeBalajiRollMill</span>
              </div>
            </a>

          </div>
        </div>


      </div>
    </section>
  );
};

